#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║              BARYA-CLI v1.0 — FARE SURVIVAL AGENT            ║
║         Filipino Commuter's 2026 Jeepney Fare Crisis         ║
╚══════════════════════════════════════════════════════════════╝
"""

import os
import sys
import json
import time
import math
import threading
from pathlib import Path
from datetime import datetime

# ── dependency guard ────────────────────────────────────────────
try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table
    from rich.text import Text
    from rich.columns import Columns
    from rich.rule import Rule
    from rich.prompt import Prompt
    from rich.live import Live
    from rich.spinner import Spinner
    from rich import box
    import google.generativeai as genai
except ImportError:
    print("Missing dependencies. Run:  pip install rich google-generativeai")
    sys.exit(1)

# ── constants ────────────────────────────────────────────────────
FARES_JSON = Path(__file__).parent / "fares.json"
GEMINI_MODEL = "gemini-1.5-flash"

# Hard-coded 2026 Fare Constants (LTFRB MC 2024-011 / March 2026)
FARE = {
    "traditional": {"base": 14.00, "base_km": 4, "per_km": 2.00,   "label": "Traditional Jeepney"},
    "modern":      {"base": 17.00, "base_km": 4, "per_km": 2.40,   "label": "Modern/E-Jeepney"},
    "piston":      {"base": 23.00, "base_km": 4, "per_km": 2.00,   "label": "PISTON Petition (⚠️  PENDING)"},
}

NCR_DAILY_WAGE   = 610.00
WORKING_DAYS_MO  = 22

console = Console()


# ════════════════════════════════════════════════════════════════
#  FARE ENGINE
# ════════════════════════════════════════════════════════════════

def calc_fare(fare_type: str, distance_km: float) -> float:
    """Calculate one-way fare using the LTFRB matrix."""
    f = FARE[fare_type]
    if distance_km <= f["base_km"]:
        return f["base"]
    extra = distance_km - f["base_km"]
    return f["base"] + math.ceil(extra) * f["per_km"]


def load_fares_json() -> dict:
    with open(FARES_JSON, encoding="utf-8") as fp:
        return json.load(fp)


# ════════════════════════════════════════════════════════════════
#  TERMINAL UI HELPERS
# ════════════════════════════════════════════════════════════════

BANNER = """[bold yellow]
  ██████   █████  ██████  ██    ██  █████       ██████ ██      ██
  ██   ██ ██   ██ ██   ██  ██  ██  ██   ██     ██      ██      ██
  ██████  ███████ ██████    ████   ███████     ██      ██      ██
  ██   ██ ██   ██ ██   ██    ██    ██   ██     ██      ██      ██
  ██████  ██   ██ ██   ██    ██    ██   ██      ██████ ███████ ██
[/bold yellow]"""

TAGLINE = "[dim cyan]🚌  Filipino Commuter Fare Survival Agent  •  2026 Jeepney Crisis Edition[/dim cyan]"


def print_banner():
    console.print(BANNER)
    console.print(TAGLINE, justify="center")
    console.print(Rule(style="yellow dim"))
    ts = datetime.now().strftime("%A, %B %d %Y  •  %I:%M %p")
    console.print(f"[dim]⏱  {ts}[/dim]", justify="center")
    console.print()


def thinking(label: str = "Agent is thinking"):
    """Context manager — shows a spinner while blocking work runs."""
    class _Thinking:
        def __enter__(self):
            self._live = Live(
                Spinner("dots12", text=f"[bold cyan] {label}…[/bold cyan]"),
                console=console, refresh_per_second=12, transient=True
            )
            self._live.__enter__()
            return self
        def __exit__(self, *args):
            self._live.__exit__(*args)
    return _Thinking()


def fare_table(dist: float, fares_data: dict) -> Table:
    tbl = Table(
        title=f"[bold white]📊 Fare Matrix — {dist} km Journey[/bold white]",
        box=box.ROUNDED, border_style="yellow",
        show_header=True, header_style="bold cyan",
        min_width=68
    )
    tbl.add_column("Mode",             style="white",       width=26)
    tbl.add_column("One-Way ₱",        style="green bold",  justify="right", width=12)
    tbl.add_column("Round-Trip ₱",     style="green",       justify="right", width=14)
    tbl.add_column("Monthly (22d) ₱",  style="yellow",      justify="right", width=16)

    for key, label, color in [
        ("traditional", "Traditional Jeepney",     "bright_green"),
        ("modern",      "Modern/E-Jeepney",         "cyan"),
        ("piston",      "⚠️  PISTON Petition",       "red"),
    ]:
        ow  = calc_fare(key, dist)
        rt  = ow * 2
        mo  = rt * WORKING_DAYS_MO
        tbl.add_row(
            f"[{color}]{label}[/{color}]",
            f"[{color}]₱{ow:.2f}[/{color}]",
            f"[{color}]₱{rt:.2f}[/{color}]",
            f"[{color}]₱{mo:.2f}[/{color}]",
        )
    return tbl


def opportunity_cost_panel(dist: float) -> Panel:
    trad_ow   = calc_fare("traditional", dist)
    piston_ow = calc_fare("piston",      dist)

    delta_ow  = piston_ow - trad_ow
    delta_rt  = delta_ow  * 2
    delta_mo  = delta_rt  * WORKING_DAYS_MO
    delta_yr  = delta_mo  * 12

    wage_pct_now    = (trad_ow  * 2 / NCR_DAILY_WAGE) * 100
    wage_pct_piston = (piston_ow * 2 / NCR_DAILY_WAGE) * 100

    extra_work_hrs  = delta_mo / (NCR_DAILY_WAGE / 8)
    rice_kg         = delta_mo / 50          # ≈ ₱50/kg NFA rice
    elec_days       = delta_mo / 30          # ≈ ₱30/day electricity

    body = (
        f"[bold red]💸 Economic Opportunity Loss Report[/bold red]\n\n"
        f"  [white]Per-ride increase    :[/white] [red bold]+₱{delta_ow:.2f}[/red bold]\n"
        f"  [white]Daily round-trip Δ  :[/white] [red bold]+₱{delta_rt:.2f}[/red bold]\n"
        f"  [white]Monthly loss (22d)  :[/white] [red bold]+₱{delta_mo:.2f}[/red bold]\n"
        f"  [white]Annual loss         :[/white] [red bold]+₱{delta_yr:.2f}[/red bold]\n\n"
        f"  [white]% of daily wage NOW :[/white] [yellow]{wage_pct_now:.1f}%[/yellow] of ₱{NCR_DAILY_WAGE}/day\n"
        f"  [white]% of daily wage if  :[/white] [red bold]{wage_pct_piston:.1f}%[/red bold] (PISTON approved)\n\n"
        f"  [dim]What ₱{delta_mo:.0f}/month could instead buy:[/dim]\n"
        f"  [cyan]  • {rice_kg:.1f} kg of NFA rice @ ₱50/kg[/cyan]\n"
        f"  [cyan]  • {elec_days:.0f} days of household electricity @ ₱30/day[/cyan]\n"
        f"  [cyan]  • {extra_work_hrs:.1f} extra hours of minimum-wage labour needed[/cyan]"
    )
    return Panel(body, border_style="red", expand=False, padding=(1, 2))


def rail_alternatives_panel(fares_data: dict, origin: str, destination: str) -> Panel:
    lrt2 = fares_data["lrt2"]
    mrt3 = fares_data["mrt3"]

    body = (
        f"[bold cyan]🚇 Rail Alternatives (50% Discount active since Mar 23, 2026)[/bold cyan]\n\n"
        f"  [white]LRT-2 Min fare  :[/white] [green]₱{lrt2['fare_matrix']['minimum_fare_discounted']:.0f}[/green] "
        f"[dim](was ₱{lrt2['fare_matrix']['minimum_fare_original']:.0f})[/dim]\n"
        f"  [white]LRT-2 Max fare  :[/white] [green]₱{lrt2['fare_matrix']['maximum_fare_discounted']:.0f}[/green] "
        f"[dim](was ₱{lrt2['fare_matrix']['maximum_fare_original']:.0f})[/dim]\n"
        f"  [white]LRT-2 Cubao→Recto:[/white] [green bold]₱{lrt2['key_routes']['Cubao_to_Recto']['discounted_fare']:.0f}[/green bold] "
        f"⏱  ~{lrt2['key_routes']['Cubao_to_Recto']['travel_time_mins']} min\n\n"
        f"  [white]MRT-3 Min fare  :[/white] [green]₱{mrt3['fare_matrix']['minimum_fare_discounted']:.0f}[/green] "
        f"[dim](was ₱{mrt3['fare_matrix']['minimum_fare_original']:.0f})[/dim]\n"
        f"  [white]MRT-3 Max fare  :[/white] [green]₱{mrt3['fare_matrix']['maximum_fare_discounted']:.0f}[/green] "
        f"[dim](was ₱{mrt3['fare_matrix']['maximum_fare_original']:.0f})[/dim]\n"
        f"  [white]MRT-3 Cubao→Ayala:[/white] [green bold]₱{mrt3['key_routes']['Cubao_to_Ayala']['discounted_fare']:.0f}[/green bold] "
        f"⏱  ~{mrt3['key_routes']['Cubao_to_Ayala']['travel_time_mins']} min\n\n"
        f"  [dim]Tip: Beep card holders get seamless interline transfers.[/dim]"
    )
    return Panel(body, border_style="cyan", expand=False, padding=(1, 2))


def legal_panel() -> Panel:
    body = (
        "[bold red]⚖️  Commuter Legal Shield[/bold red]\n\n"
        "[white]The Law (LTFRB Rules & Regulations):[/white]\n"
        "  • Drivers [bold]MUST display[/bold] the official LTFRB-stamped Fare Matrix\n"
        "    [bold]conspicuously inside the vehicle[/bold] at all times.\n"
        "  • Charging above the matrix rate = [red bold]illegal overcharging[/red bold].\n\n"
        "[yellow]If a driver charges above the legal rate or has NO posted matrix:[/yellow]\n\n"
        "  [bold green]Script (Tagalog):[/bold green]\n"
        '  [italic cyan]"Kuya/Ate, puwede po bang ipakita ang Fare Matrix ninyo?\n'
        "   Ayon sa LTFRB, kailangan itong nakadisplay. Kung walang matrix,\n"
        '   may karapatan po ako na hindi bayaran ang dagdag na bayad."[/italic cyan]\n\n'
        "  [bold green]Script (English):[/bold green]\n"
        '  [italic cyan]"Driver, please show your posted LTFRB Fare Matrix.\n'
        "   Under transport regulations, no excess fare can be collected\n"
        '   without a displayed matrix. I will not pay above the legal rate."[/italic cyan]\n\n'
        "[white]Hotlines to report overcharging:[/white]\n"
        "  [cyan]• LTFRB Hotline  : (02) 8426-2515[/cyan]\n"
        "  [cyan]• DOTr Action    : 790-8303 / Text DOTR to 2919[/cyan]\n"
        "  [cyan]• MMDA           : 136 (Metro Manila)[/cyan]\n"
        "  [cyan]• 8888 Citizen   : 8888 (all gov complaints)[/cyan]"
    )
    return Panel(body, border_style="red dim", expand=False, padding=(1, 2))


# ════════════════════════════════════════════════════════════════
#  GEMINI AI REASONING ENGINE
# ════════════════════════════════════════════════════════════════

def run_gemini_analysis(origin: str, destination: str, distance: float, fares_data: dict) -> str:
    """Call Gemini 1.5 Flash to generate a hyper-local recommendation."""
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        return (
            "[yellow]⚠️  Gemini API key not set.[/yellow]\n"
            "   Set GEMINI_API_KEY in your environment to enable AI recommendations.\n"
            "   [dim]Example: set GEMINI_API_KEY=your_key_here[/dim]"
        )

    trad_ow   = calc_fare("traditional", distance)
    piston_ow = calc_fare("piston",      distance)
    delta_mo  = (piston_ow - trad_ow) * 2 * WORKING_DAYS_MO

    prompt = f"""You are Barya-CLI, a hyper-local AI transit agent for Filipino commuters in Metro Manila in April 2026.

Route: {origin} → {destination} ({distance} km)

FARE DATA (March 2026 LTFRB):
- Traditional Jeepney: ₱{trad_ow:.2f} one-way (₱14 base + ₱2/km after 4km)
- Modern Jeepney: ₱{calc_fare('modern', distance):.2f} one-way
- PISTON Petition (PENDING - NOT YET APPROVED): ₱{piston_ow:.2f} one-way
- Monthly budget loss IF PISTON approved: ₱{delta_mo:.2f}/month

RAIL OPTIONS (50% discount active since March 23, 2026):
- LRT-2 Cubao→Recto: ₱18 (was ₱36), ~15-20 min
- MRT-3 available for Quezon Ave/EDSA routes
- NCR Daily Minimum Wage: ₱610/day

Generate a CONCISE (max 250 words) response in this EXACT structure:
1. 🎯 RECOMMENDED ROUTE for this specific origin-destination
2. ⚡ FASTEST OPTION with time and cost
3. 💰 CHEAPEST OPTION with savings vs jeepney
4. 🗺️ STEP-BY-STEP DISKARTE (practical commuter directions with landmarks)
5. 📱 USEFUL APPS (Sakay.ph, Google Maps, Beep App mentions)

Write in a friendly Taglish tone (mix of Filipino-English casual). Be practical and hyper-local."""

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)
    return response.text


# ════════════════════════════════════════════════════════════════
#  MAIN FLOW
# ════════════════════════════════════════════════════════════════

def get_distance(origin: str, destination: str) -> float:
    """Simple distance lookup for common Metro Manila routes, or prompt user."""
    common_routes = {
        frozenset(["cubao", "divisoria"]):        10.5,
        frozenset(["cubao", "recto"]):            10.5,
        frozenset(["cubao", "quiapo"]):           11.0,
        frozenset(["makati", "taguig"]):           8.0,
        frozenset(["quezon city", "manila"]):     14.0,
        frozenset(["antipolo", "cubao"]):         16.0,
        frozenset(["caloocan", "manila"]):        12.0,
        frozenset(["pasay", "makati"]):            5.0,
        frozenset(["mandaluyong", "ortigas"]):     3.5,
        frozenset(["paranaque", "bgc"]):           9.0,
        frozenset(["las pinas", "alabang"]):       6.0,
        frozenset(["fairview", "cubao"]):         14.0,
        frozenset(["san juan", "quiapo"]):         7.0,
    }
    key = frozenset([origin.lower().strip(), destination.lower().strip()])
    if key in common_routes:
        dist = common_routes[key]
        console.print(f"  [green]✓ Known route detected:[/green] [white]{dist} km[/white]")
        return dist

    console.print("  [dim]Route not in database. Please enter distance manually.[/dim]")
    while True:
        raw = Prompt.ask("  [yellow]Enter approximate distance in km[/yellow]")
        try:
            return float(raw)
        except ValueError:
            console.print("  [red]Invalid number. Try again.[/red]")


def run_barya_analysis(origin: str, destination: str):
    console.print()
    console.print(Rule(f"[bold yellow]🚌 BARYA ANALYSIS: {origin.upper()} → {destination.upper()}[/bold yellow]"))
    console.print()

    # 1 ── Load data
    with thinking("Loading fare database"):
        fares_data = load_fares_json()
        time.sleep(0.4)

    # 2 ── Get distance
    console.print("[bold]📍 Resolving route distance…[/bold]")
    dist = get_distance(origin, destination)
    console.print()

    # 3 ── Fare table
    with thinking("Computing LTFRB fare matrix"):
        time.sleep(0.5)
    console.print(fare_table(dist, fares_data))
    console.print()

    # 4 ── Opportunity cost
    with thinking("Calculating Economic Opportunity Loss"):
        time.sleep(0.6)
    console.print(opportunity_cost_panel(dist))
    console.print()

    # 5 ── Rail alternatives
    with thinking("Fetching rail alternatives"):
        time.sleep(0.4)
    console.print(rail_alternatives_panel(fares_data, origin, destination))
    console.print()

    # 6 ── Legal panel
    console.print(legal_panel())
    console.print()

    # 7 ── Gemini AI
    console.print(Rule("[bold magenta]🤖 Gemini 1.5 Flash — AI Recommendation[/bold magenta]"))
    ai_text = ""
    with thinking("Running agentic reasoning via Gemini 1.5 Flash"):
        ai_text = run_gemini_analysis(origin, destination, dist, fares_data)

    ai_panel = Panel(
        ai_text,
        title="[magenta bold]🧠 AI Diskarte[/magenta bold]",
        border_style="magenta",
        padding=(1, 2),
        expand=False,
    )
    console.print(ai_panel)
    console.print()

    # 8 ── Footer
    console.print(Rule(style="yellow dim"))
    console.print(
        "[dim]⚠️  PISTON petition (Apr 20, 2026) is NOT yet approved by LTFRB. "
        "The ₱14 base rate remains the legal standard as of April 25, 2026.[/dim]"
    )
    console.print(
        "[dim]📌 Data sources: LTFRB MC 2024-011 | DOTR 50% Rail Discount (Mar 23, 2026) | NCR Min Wage (DOLE)[/dim]"
    )
    console.print()


def main():
    print_banner()

    console.print(Panel(
        "[bold white]Welcome to [yellow]Barya-CLI[/yellow] — your commuter survival agent.\n"
        "Enter your route and get a complete fare breakdown, legal advice,\n"
        "and AI-powered transit recommendations in seconds.[/bold white]",
        border_style="yellow",
        padding=(0, 2),
    ))
    console.print()

    while True:
        origin      = Prompt.ask("[bold cyan]🏠 FROM (e.g. Cubao)[/bold cyan]").strip()
        destination = Prompt.ask("[bold cyan]📍 TO   (e.g. Divisoria)[/bold cyan]").strip()

        if not origin or not destination:
            console.print("[red]Please enter both origin and destination.[/red]")
            continue

        run_barya_analysis(origin, destination)

        again = Prompt.ask("\n[yellow]Analyze another route?[/yellow] [dim](y/n)[/dim]", default="n")
        if again.lower() not in ("y", "yes"):
            break

    console.print()
    console.print(Panel(
        "[green bold]Salamat sa paggamit ng Barya-CLI! 🙏\n"
        "Stay informed. Know your rights. Commute smart.[/green bold]",
        border_style="green",
    ))


if __name__ == "__main__":
    main()
