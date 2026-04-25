'use strict';

/* ══════════════════════════════════════════════════════════════
   BARYA · Hackathon Edition · app.js
   ══════════════════════════════════════════════════════════════ */

// ── AREAS DATABASE (80+ Metro Manila locations) ───────────────
const AREAS = [
  { name:'Cubao',             city:'Quezon City',   lat:14.6192,lng:121.0509,icon:'🏙️' },
  { name:'Fairview',          city:'Quezon City',   lat:14.7000,lng:121.0508,icon:'🏘️' },
  { name:'Novaliches',        city:'Quezon City',   lat:14.7197,lng:121.0327,icon:'🏘️' },
  { name:'Commonwealth',      city:'Quezon City',   lat:14.6900,lng:121.0730,icon:'🏘️' },
  { name:'Batasan Hills',     city:'Quezon City',   lat:14.6867,lng:121.1000,icon:'🏛️' },
  { name:'Katipunan',         city:'Quezon City',   lat:14.6489,lng:121.0764,icon:'🎓' },
  { name:'Tandang Sora',      city:'Quezon City',   lat:14.6814,lng:121.0497,icon:'🏘️' },
  { name:'Visayas Avenue',    city:'Quezon City',   lat:14.6623,lng:121.0387,icon:'🛣️' },
  { name:'Project 4',         city:'Quezon City',   lat:14.6225,lng:121.0703,icon:'🏘️' },
  { name:'Kamias',            city:'Quezon City',   lat:14.6373,lng:121.0533,icon:'🏘️' },
  { name:'Scout Area',        city:'Quezon City',   lat:14.6341,lng:121.0423,icon:'🏘️' },
  { name:'North Avenue',      city:'Quezon City',   lat:14.6520,lng:121.0326,icon:'🚇' },
  { name:'Quezon Avenue',     city:'Quezon City',   lat:14.6441,lng:121.0327,icon:'🚇' },
  { name:'Divisoria',         city:'Manila',        lat:14.5995,lng:120.9723,icon:'🛍️' },
  { name:'Quiapo',            city:'Manila',        lat:14.5986,lng:120.9822,icon:'⛪' },
  { name:'Recto',             city:'Manila',        lat:14.6010,lng:120.9867,icon:'🚇' },
  { name:'Sampaloc',          city:'Manila',        lat:14.6094,lng:120.9944,icon:'🏘️' },
  { name:'Sta. Mesa',         city:'Manila',        lat:14.6017,lng:121.0108,icon:'🏘️' },
  { name:'Pandacan',          city:'Manila',        lat:14.5900,lng:120.9960,icon:'🏭' },
  { name:'Malate',            city:'Manila',        lat:14.5700,lng:120.9920,icon:'🏙️' },
  { name:'Ermita',            city:'Manila',        lat:14.5795,lng:120.9844,icon:'🏙️' },
  { name:'Intramuros',        city:'Manila',        lat:14.5893,lng:120.9753,icon:'🏛️' },
  { name:'Tondo',             city:'Manila',        lat:14.6183,lng:120.9697,icon:'🏘️' },
  { name:'Binondo',           city:'Manila',        lat:14.5999,lng:120.9742,icon:'🏮' },
  { name:'Paco',              city:'Manila',        lat:14.5762,lng:121.0012,icon:'🏘️' },
  { name:'Sta. Ana',          city:'Manila',        lat:14.5776,lng:121.0115,icon:'🏘️' },
  { name:'Manila',            city:'Manila',        lat:14.5995,lng:120.9842,icon:'🏙️' },
  { name:'Caloocan',          city:'Caloocan',      lat:14.6500,lng:120.9672,icon:'🏙️' },
  { name:'Monumento',         city:'Caloocan',      lat:14.6538,lng:120.9832,icon:'🗽' },
  { name:'Malabon',           city:'Malabon',       lat:14.6624,lng:120.9577,icon:'🏘️' },
  { name:'Navotas',           city:'Navotas',       lat:14.6640,lng:120.9440,icon:'🐟' },
  { name:'Valenzuela',        city:'Valenzuela',    lat:14.7011,lng:120.9830,icon:'🏭' },
  { name:'Marikina',          city:'Marikina',      lat:14.6494,lng:121.1028,icon:'👟' },
  { name:'Antipolo',          city:'Rizal',         lat:14.6257,lng:121.1756,icon:'⛰️' },
  { name:'Cainta',            city:'Rizal',         lat:14.5747,lng:121.1239,icon:'🏘️' },
  { name:'Taytay',            city:'Rizal',         lat:14.5590,lng:121.1355,icon:'🏘️' },
  { name:'San Juan',          city:'San Juan',      lat:14.6014,lng:121.0310,icon:'🏘️' },
  { name:'Greenhills',        city:'San Juan',      lat:14.5977,lng:121.0427,icon:'🏬' },
  { name:'Mandaluyong',       city:'Mandaluyong',   lat:14.5794,lng:121.0359,icon:'🏙️' },
  { name:'Ortigas',           city:'Pasig',         lat:14.5870,lng:121.0562,icon:'🏢' },
  { name:'Pasig',             city:'Pasig',         lat:14.5764,lng:121.0851,icon:'🏙️' },
  { name:'Shaw Boulevard',    city:'Mandaluyong',   lat:14.5875,lng:121.0488,icon:'🛣️' },
  { name:'Makati',            city:'Makati',        lat:14.5547,lng:121.0244,icon:'🏢' },
  { name:'Ayala',             city:'Makati',        lat:14.5473,lng:121.0210,icon:'🏙️' },
  { name:'BGC',               city:'Taguig',        lat:14.5510,lng:121.0477,icon:'🏙️' },
  { name:'Taguig',            city:'Taguig',        lat:14.5206,lng:121.0554,icon:'🏘️' },
  { name:'Pasay',             city:'Pasay',         lat:14.5389,lng:121.0000,icon:'✈️' },
  { name:'Baclaran',          city:'Pasay',         lat:14.5315,lng:120.9976,icon:'🚇' },
  { name:'MOA',               city:'Pasay',         lat:14.5355,lng:120.9835,icon:'🏬' },
  { name:'Parañaque',         city:'Parañaque',     lat:14.4793,lng:121.0198,icon:'🏘️' },
  { name:'Las Piñas',         city:'Las Piñas',     lat:14.4489,lng:120.9829,icon:'🏘️' },
  { name:'Alabang',           city:'Muntinlupa',    lat:14.4237,lng:121.0451,icon:'🏬' },
  { name:'Muntinlupa',        city:'Muntinlupa',    lat:14.4081,lng:121.0415,icon:'🏙️' },
];

// ── RAIL STATIONS (for smart direction generation) ─────────────
const STATIONS = [
  // LRT-1 (North→South)
  { name:'FPJ',               line:'LRT1', order:1,  lat:14.6540,lng:120.9835 },
  { name:'Balintawak',        line:'LRT1', order:2,  lat:14.6589,lng:121.0019 },
  { name:'Monumento',         line:'LRT1', order:3,  lat:14.6538,lng:120.9832 },
  { name:'5th Avenue',        line:'LRT1', order:4,  lat:14.6450,lng:120.9832 },
  { name:'R. Papa',           line:'LRT1', order:5,  lat:14.6371,lng:120.9837 },
  { name:'Abad Santos',       line:'LRT1', order:6,  lat:14.6293,lng:120.9838 },
  { name:'Doroteo Jose',      line:'LRT1', order:7,  lat:14.6033,lng:120.9836 },
  { name:'Carriedo',          line:'LRT1', order:8,  lat:14.5997,lng:120.9843 },
  { name:'Central Terminal',  line:'LRT1', order:9,  lat:14.5919,lng:120.9842 },
  { name:'UN Avenue',         line:'LRT1', order:10, lat:14.5842,lng:120.9885 },
  { name:'Pedro Gil',         line:'LRT1', order:11, lat:14.5756,lng:120.9916 },
  { name:'Quirino',           line:'LRT1', order:12, lat:14.5700,lng:120.9941 },
  { name:'Vito Cruz',         line:'LRT1', order:13, lat:14.5652,lng:120.9972 },
  { name:'Gil Puyat',         line:'LRT1', order:14, lat:14.5542,lng:121.0147 },
  { name:'Libertad',          line:'LRT1', order:15, lat:14.5480,lng:121.0073 },
  { name:'EDSA (LRT1)',       line:'LRT1', order:16, lat:14.5390,lng:121.0005 },
  { name:'Baclaran',          line:'LRT1', order:17, lat:14.5315,lng:120.9976 },
  // LRT-2 (East→West)
  { name:'Antipolo',          line:'LRT2', order:1,  lat:14.6257,lng:121.1756 },
  { name:'Marikina-Pasig',    line:'LRT2', order:2,  lat:14.6403,lng:121.1286 },
  { name:'Santolan',          line:'LRT2', order:3,  lat:14.6319,lng:121.0994 },
  { name:'Katipunan',         line:'LRT2', order:4,  lat:14.6489,lng:121.0764 },
  { name:'Anonas',            line:'LRT2', order:5,  lat:14.6295,lng:121.0519 },
  { name:'Araneta-Cubao',     line:'LRT2', order:6,  lat:14.6192,lng:121.0509 },
  { name:'Betty Go-Belmonte', line:'LRT2', order:7,  lat:14.6099,lng:121.0388 },
  { name:'Gilmore',           line:'LRT2', order:8,  lat:14.6048,lng:121.0327 },
  { name:'J. Ruiz',           line:'LRT2', order:9,  lat:14.6021,lng:121.0258 },
  { name:'V. Mapa',           line:'LRT2', order:10, lat:14.5993,lng:121.0196 },
  { name:'Pureza',            line:'LRT2', order:11, lat:14.5987,lng:121.0078 },
  { name:'Legarda',           line:'LRT2', order:12, lat:14.5997,lng:120.9963 },
  { name:'Recto',             line:'LRT2', order:13, lat:14.6010,lng:120.9867 },
  // MRT-3 (North→South)
  { name:'North Avenue',      line:'MRT3', order:1,  lat:14.6520,lng:121.0326 },
  { name:'Quezon Avenue',     line:'MRT3', order:2,  lat:14.6441,lng:121.0327 },
  { name:'GMA-Kamuning',      line:'MRT3', order:3,  lat:14.6360,lng:121.0350 },
  { name:'Araneta-Cubao',     line:'MRT3', order:4,  lat:14.6165,lng:121.0522 },
  { name:'Santolan-Annapolis',line:'MRT3', order:5,  lat:14.6003,lng:121.0583 },
  { name:'Ortigas',           line:'MRT3', order:6,  lat:14.5870,lng:121.0562 },
  { name:'Shaw Boulevard',    line:'MRT3', order:7,  lat:14.5875,lng:121.0488 },
  { name:'Boni',              line:'MRT3', order:8,  lat:14.5790,lng:121.0414 },
  { name:'Guadalupe',         line:'MRT3', order:9,  lat:14.5658,lng:121.0483 },
  { name:'Buendia',           line:'MRT3', order:10, lat:14.5540,lng:121.0347 },
  { name:'Ayala',             line:'MRT3', order:11, lat:14.5473,lng:121.0210 },
  { name:'Magallanes',        line:'MRT3', order:12, lat:14.5428,lng:121.0162 },
  { name:'Taft Avenue',       line:'MRT3', order:13, lat:14.5393,lng:121.0005 },
];

const LINE_COLOR   = { LRT1:'#16a34a', LRT2:'#2563eb', MRT3:'#dc2626' };
const LINE_LABEL   = { LRT1:'LRT-1 (Berde)', LRT2:'LRT-2 (Asul)', MRT3:'MRT-3 (Pula)' };
const LINE_ICON    = { LRT1:'🟢', LRT2:'🔵', MRT3:'🔴' };

// Interchange connections
const INTERCHANGES = [
  // MRT3 Taft Ave ↔ LRT1 EDSA  (same compound)
  { a:'MRT3-13', b:'LRT1-16', walkMin:5, note:'Lumabas ng MRT Taft, pumasok sa LRT-1 EDSA exit' },
  // LRT2 Recto ↔ LRT1 Doroteo Jose (~7 min walk)
  { a:'LRT2-13', b:'LRT1-7',  walkMin:7, note:'Mula Recto Station, lakad papunta sa Doroteo Jose LRT-1 (~7 min)' },
];

// ── KNOWN JEEPNEY SIGNBOARDS ───────────────────────────────────
const JEEP_SIGNS = {
  'cubao-divisoria':      '"DIVISORIA" o "QUIAPO-DIVISORIA"',
  'cubao-quiapo':         '"QUIAPO" o "CUBAO-QUIAPO"',
  'cubao-recto':          '"RECTO" o "STA. MESA-RECTO"',
  'fairview-cubao':       '"CUBAO" o "PHILCOA-CUBAO"',
  'novaliches-cubao':     '"CUBAO" o "NOVALICHES-CUBAO"',
  'caloocan-manila':      '"DIVISORIA" o "MONUMENTO-DIVISORIA"',
  'monumento-divisoria':  '"DIVISORIA" o "MONUMENTO-DIVISORIA"',
  'pasay-makati':         '"AYALA" o "PASAY-AYALA"',
  'makati-pasay':         '"PASAY" o "LIBERTAD" o "BACLARAN"',
  'mandaluyong-makati':   '"AYALA" o "MANDALUYONG-AYALA"',
  'san juan-quiapo':      '"QUIAPO" o "CROSSING-QUIAPO"',
  'marikina-cubao':       '"CUBAO" o "MARIKINA-CUBAO"',
  'antipolo-cubao':       '"CUBAO" o "ANTIPOLO-CUBAO"',
};

// ── 2026 FARE CONSTANTS ────────────────────────────────────────
const ROAD_MODES = [
  { key:'trad',  icon:'🚌', name:'Tradisyonal na Jeepney',  note:'Hindi aircon · bawat araw gamit',        base:14, baseKm:4, perKm:2.00, colorClass:'c-green',  tag:'tag-legal',   tagText:'✓ Legal' },
  { key:'mod',   icon:'🚐', name:'Modern / E-Jeepney',      note:'May aircon · mas bago',                  base:17, baseKm:4, perKm:2.40, colorClass:'c-blue',   tag:'tag-legal',   tagText:'✓ Legal' },
  { key:'bord',  icon:'🚍', name:'Ordinaryong Bus',         note:'Hindi aircon · mas maraming upuan',      base:13, baseKm:5, perKm:1.80, colorClass:'c-orange', tag:'tag-legal',   tagText:'✓ Legal' },
  { key:'bac',   icon:'❄️', name:'Aircon Bus',              note:'Malamig · komportable',                  base:15, baseKm:5, perKm:2.20, colorClass:'c-blue',   tag:'tag-legal',   tagText:'✓ Legal' },
  { key:'p2p',   icon:'🚌', name:'P2P Express Bus',         note:'Direkta · nakatakdang ruta · walang tayo-baba', base:60, baseKm:null, perKm:null, colorClass:'c-orange', tag:'tag-legal', tagText:'✓ Legal' },
  { key:'piston',icon:'⚠️', name:'PISTON Petition',         note:'₱23 base fare — HINDI PA APRUBADO ng LTFRB', base:23, baseKm:4, perKm:2.00, colorClass:'c-red', tag:'tag-pending', tagText:'Hindi pa Aprubado' },
];

const RAIL_FARES = [
  { label:'LRT-1', disc:[15,35], orig:[30,70],  color:'#16a34a', line:'LRT1' },
  { label:'LRT-2', disc:[15,32], orig:[30,64],  color:'#2563eb', line:'LRT2' },
  { label:'MRT-3', disc:[14,32], orig:[28,64],  color:'#dc2626', line:'MRT3' },
];

const NCR_WAGE   = 610;
const DAYS_MO    = 22;

// ════════════════════════════════════════════════════════════════
//  CORE MATH
// ════════════════════════════════════════════════════════════════
function hav(a, b) {
  const R = 6371, dLat = (b.lat-a.lat)*Math.PI/180, dLng = (b.lng-a.lng)*Math.PI/180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}
function roadDist(a, b){ return Math.round(hav(a,b)*1.42*10)/10; }
function calcFare(m, d) {
  if (m.perKm === null) return m.base;
  if (d <= m.baseKm) return m.base;
  return m.base + Math.ceil(d - m.baseKm) * m.perKm;
}

// ════════════════════════════════════════════════════════════════
//  AUTOCOMPLETE
// ════════════════════════════════════════════════════════════════
let selFrom = null, selTo = null;

function autocomplete(inputEl, dropEl, onPick) {
  let items = [], fidx = -1;

  function show(q) {
    q = q.toLowerCase().trim();
    if (!q) { dropEl.innerHTML=''; dropEl.classList.remove('open'); return; }
    items = AREAS.filter(a => a.name.toLowerCase().includes(q)||a.city.toLowerCase().includes(q)).slice(0,8);
    if (!items.length) { dropEl.innerHTML=''; dropEl.classList.remove('open'); return; }
    dropEl.innerHTML = items.map((a,i)=>`
      <div class="ac-item" data-i="${i}">
        <span class="ac-icon">${a.icon}</span>
        <span class="ac-name">${a.name}</span>
        <span class="ac-city">${a.city}</span>
      </div>`).join('');
    dropEl.classList.add('open');
    fidx = -1;
  }

  function pick(a){ inputEl.value=a.name; dropEl.innerHTML=''; dropEl.classList.remove('open'); onPick(a); }

  inputEl.addEventListener('input', e => { onPick(null); show(e.target.value); });
  inputEl.addEventListener('keydown', e => {
    const rows = [...dropEl.querySelectorAll('.ac-item')];
    if (e.key==='ArrowDown'){ fidx=Math.min(fidx+1,rows.length-1); rows.forEach((r,i)=>r.classList.toggle('highlighted',i===fidx)); e.preventDefault(); }
    else if (e.key==='ArrowUp'){ fidx=Math.max(fidx-1,-1); rows.forEach((r,i)=>r.classList.toggle('highlighted',i===fidx)); e.preventDefault(); }
    else if (e.key==='Enter' && fidx>=0 && items[fidx]) pick(items[fidx]);
    else if (e.key==='Escape') dropEl.classList.remove('open');
  });
  dropEl.addEventListener('mousedown', e => {
    const item = e.target.closest('.ac-item');
    if (item && items[+item.dataset.i]) pick(items[+item.dataset.i]);
  });
  document.addEventListener('click', e => {
    if (!inputEl.contains(e.target)&&!dropEl.contains(e.target)) dropEl.classList.remove('open');
  });
}

// ════════════════════════════════════════════════════════════════
//  SMART DIRECTION GENERATOR
// ════════════════════════════════════════════════════════════════

function nearestStation(area, radius=2.8) {
  let best=null, bestD=Infinity;
  for (const s of STATIONS) {
    const d = hav(area, s);
    if (d<bestD && d<=radius) { bestD=d; best={...s, walkKm:d}; }
  }
  return best;
}

function stationKey(s){ return `${s.line}-${s.order}`; }

function railFareBetween(sFrom, sTo) {
  // 50% discounted fare bracket by station count
  const gap = Math.abs(sTo.order - sFrom.order);
  if (sFrom.line !== sTo.line) return null;
  const lineMaxDisc = { LRT1:35, LRT2:32, MRT3:32 };
  const lineMinDisc = { LRT1:15, LRT2:15, MRT3:14 };
  if (gap === 0) return lineMinDisc[sFrom.line];
  const ratio = gap / (sFrom.line==='LRT1'?16: 12);
  const disc = lineMinDisc[sFrom.line] + Math.round(ratio * (lineMaxDisc[sFrom.line]-lineMinDisc[sFrom.line]));
  return Math.min(Math.max(disc, lineMinDisc[sFrom.line]), lineMaxDisc[sFrom.line]);
}

function travelTimeMin(sFrom, sTo) {
  const gap = Math.abs(sTo.order - sFrom.order);
  return gap * 3 + 5; // ~3 min/station + 5 min boarding buffer
}

function walkTime(km) { return Math.round(km * 14); } // ~14 min/km walking

function generateDirections(fromArea, toArea, dist) {
  const options = [];
  const fromSt  = nearestStation(fromArea);
  const toSt    = nearestStation(toArea);

  // ── OPTION A: Rail (if both near stations on same/connected line) ──
  if (fromSt && toSt && dist >= 3.5) {
    const sameLine = fromSt.line === toSt.line;
    const different = fromSt.name !== toSt.name;

    if (sameLine && different) {
      const fare    = railFareBetween(fromSt, toSt);
      const trainT  = travelTimeMin(fromSt, toSt);
      const wFromT  = walkTime(fromSt.walkKm);
      const wToT    = walkTime(toSt.walkKm);
      const totalT  = trainT + wFromT + wToT;
      const lineName= LINE_LABEL[fromSt.line];
      const dir     = fromSt.order < toSt.order ? 'papuntang dulo' : 'pabalik sa simula';

      const steps = [];
      if (fromSt.walkKm > 0.15) {
        steps.push({ icon:'🚶', action:`Lumakad papunta sa ${fromSt.name} Station`, detail:`Mga ${wFromT} minuto mula sa ${fromArea.name}`, cost:null });
      }
      steps.push({ icon:'🎟️', action:`Bumili ng ticket o i-tap ang Beep Card`, detail:`Bayad: ₱${fare} · 50% diskuwento na ipinatupad ngayong 2026`, cost:`₱${fare}` });
      steps.push({ icon:`${LINE_ICON[fromSt.line]}`, action:`Sumakay ng ${lineName}`, detail:`Mula ${fromSt.name} ${dir} — bumaba sa ${toSt.name} Station\nMga ${trainT} minuto · ${Math.abs(toSt.order-fromSt.order)} hinto`, cost:null });
      if (toSt.walkKm > 0.15) {
        steps.push({ icon:'🚶', action:`Lumabas at lakad papunta sa ${toArea.name}`, detail:`Mga ${wToT} minuto lakad mula sa ${toSt.name} Station`, cost:null });
      }

      options.push({
        rank:1, tag:'green', tagLabel:'Pinaka-Mura at Mabilis', type:lineName,
        price:`₱${fare}`, priceClass:'green',
        time:`~${totalT} minuto`, steps
      });
    }

    // Try interchange (MRT3-Taft ↔ LRT1-EDSA)
    if (!sameLine && fromSt.line==='MRT3' && toSt.line==='LRT1') {
      const mrt3Taft = STATIONS.find(s=>s.line==='MRT3'&&s.order===13);
      const lrt1Edsa = STATIONS.find(s=>s.line==='LRT1'&&s.order===16);
      if (mrt3Taft && lrt1Edsa) {
        const fare1 = railFareBetween(fromSt, mrt3Taft);
        const fare2 = railFareBetween(lrt1Edsa, toSt);
        const totalFare = (fare1||0)+(fare2||0);
        const train1T = travelTimeMin(fromSt, mrt3Taft);
        const train2T = travelTimeMin(lrt1Edsa, toSt);
        const wFromT  = walkTime(fromSt.walkKm);
        const wToT    = walkTime(toSt.walkKm);
        const totalT  = train1T + 8 + train2T + wFromT + wToT;

        const steps = [];
        if (fromSt.walkKm>0.15) steps.push({ icon:'🚶', action:`Lumakad papunta sa ${fromSt.name} Station`, detail:`Mga ${wFromT} minuto mula sa ${fromArea.name}`, cost:null });
        steps.push({ icon:'🎟️', action:'Bumili ng ticket / tap Beep Card', detail:`Bayad: ₱${fare1}`, cost:`₱${fare1}` });
        steps.push({ icon:'🔴', action:'Sumakay ng MRT-3 papuntang Taft Avenue', detail:`Bumaba sa Taft Avenue Station\nMga ${train1T} minuto`, cost:null });
        steps.push({ icon:'🔀', action:'Mag-transfer sa LRT-1 EDSA Station', detail:'Lumabas ng MRT-3, pumasok sa LRT-1 EDSA exit · Mga 5-8 minuto lakad', cost:null });
        steps.push({ icon:'🎟️', action:'Bumili ng bagong ticket para sa LRT-1', detail:`Bayad: ₱${fare2}`, cost:`₱${fare2}` });
        steps.push({ icon:'🟢', action:`Sumakay ng LRT-1 papuntang ${toSt.name}`, detail:`Mga ${train2T} minuto`, cost:null });
        if (toSt.walkKm>0.15) steps.push({ icon:'🚶', action:`Lumabas at lakad papunta sa ${toArea.name}`, detail:`Mga ${wToT} minuto mula sa ${toSt.name}`, cost:null });

        options.push({
          rank:1, tag:'green', tagLabel:'Rail + Transfer (Mura pa rin)', type:'MRT-3 + LRT-1',
          price:`₱${totalFare}`, priceClass:'green',
          time:`~${totalT} minuto`, steps
        });
      }
    }

    // LRT2 ↔ LRT1 transfer (Recto → Doroteo Jose)
    if (!sameLine && (fromSt.line==='LRT2'||toSt.line==='LRT2') && (fromSt.line==='LRT1'||toSt.line==='LRT1')) {
      const lrt2Recto   = STATIONS.find(s=>s.line==='LRT2'&&s.order===13);
      const lrt1DorJose = STATIONS.find(s=>s.line==='LRT1'&&s.order===7);
      if (lrt2Recto && lrt1DorJose) {
        // Always compute same-line fares — LRT2 portion and LRT1 portion separately
        const lrt2Side = fromSt.line==='LRT2' ? fromSt : toSt;
        const lrt1Side = fromSt.line==='LRT1' ? fromSt : toSt;
        const fare1 = railFareBetween(lrt2Side, lrt2Recto) || 15;
        const fare2 = railFareBetween(lrt1DorJose, lrt1Side) || 15;
        const t1    = travelTimeMin(lrt2Side, lrt2Recto);
        const t2    = travelTimeMin(lrt1DorJose, lrt1Side);
        const totalFare = fare1 + fare2;
        const totalT    = t1+10+t2+walkTime(fromSt.walkKm)+walkTime(toSt.walkKm);

        const steps = [];
        if (fromSt.walkKm>0.15) steps.push({ icon:'🚶', action:`Lumakad papunta sa ${fromSt.name} Station`, detail:`Mga ${walkTime(fromSt.walkKm)} minuto`, cost:null });
        steps.push({ icon:'🎟️', action:'Bumili ng ticket / tap Beep Card (LRT-2)', detail:`Bayad: ₱${fare1}`, cost:`₱${fare1}` });
        steps.push({ icon:'🔵', action:`Sumakay ng LRT-2 papuntang Recto Station`, detail:`Bumaba sa Recto Station · ~${t1} minuto`, cost:null });
        steps.push({ icon:'🔀', action:'Lumabas at lakad papunta sa Doroteo Jose (LRT-1)', detail:'~7–10 minuto · sundan ang karatula palabas ng Recto Station', cost:null });
        steps.push({ icon:'🎟️', action:'Bumili ng bagong ticket (LRT-1)', detail:`Bayad: ₱${fare2}`, cost:`₱${fare2}` });
        steps.push({ icon:'🟢', action:`Sumakay ng LRT-1 papuntang ${lrt1Side.name}`, detail:`~${t2} minuto`, cost:null });
        if (toSt.walkKm>0.15) steps.push({ icon:'🚶', action:`Lumabas at lakad papunta sa ${toArea.name}`, detail:`Mga ${walkTime(toSt.walkKm)} minuto`, cost:null });

        options.push({
          rank: options.length===0?1:2,
          tag: options.length===0?'green':'blue',
          tagLabel: options.length===0?'Pinaka-Mura at Mabilis':'LRT-2 + LRT-1 Transfer',
          type:'LRT-2 (Asul) + LRT-1 (Berde)',
          price:`₱${totalFare}`, priceClass: options.length===0?'green':'blue',
          time:`~${totalT} minuto`, steps
        });
      }
    }
  }

  // ── OPTION B: Jeepney (always available) ──────────────────────
  const tradFare = calcFare(ROAD_MODES[0], dist);
  const jeepTime = Math.round(dist * 5 + 8); // avg Metro Manila jeep speed ~12km/h

  const routeKey = `${fromArea.name.toLowerCase()}-${toArea.name.toLowerCase()}`;
  const revKey   = `${toArea.name.toLowerCase()}-${fromArea.name.toLowerCase()}`;
  const signboard= JEEP_SIGNS[routeKey] || JEEP_SIGNS[revKey] || `"${toArea.name.toUpperCase()}"`;

  const jeepSteps = [
    { icon:'📍', action:`Pumunta sa pinakamalapit na jeepney stop sa ${fromArea.name}`, detail:`Karaniwan nasa tabi ng kalsada o sa may palengke`, cost:null },
    { icon:'🚏', action:`Humanap ng jeepney na may pabalang:`, detail:`Pumara ng kamay — ilagay sa harap ng dibdib para mahinto`, cost:null, signboard },
    { icon:'💰', action:`Bayad sa driver o conductor: ₱${tradFare.toFixed(2)}`, detail:`Kung may sukli — hintayin ang tama. Huwag pabayaang manghingi ng dagdag.`, cost:`₱${tradFare.toFixed(2)}` },
    { icon:'📣', action:`Sabihin kung saan bababa`, detail:`"Manong, para po sa ${toArea.name}" — tumawag bago pa man makarating`, cost:null },
  ];

  const busOrdFare = calcFare(ROAD_MODES[2], dist);
  const busAcFare  = calcFare(ROAD_MODES[3], dist);

  options.push({
    rank: options.length===0?1:2,
    tag:  options.length===0?'green':'gray',
    tagLabel: options.length===0?'Pinaka-Mura':'Alternatibo',
    type:`Jeepney`,
    price:`₱${tradFare.toFixed(2)}`, priceClass: options.length===0?'green':'',
    time:`~${jeepTime} minuto`, steps:jeepSteps
  });

  // ── OPTION C: Aircon Bus (if > 6km) ───────────────────────────
  if (dist >= 6) {
    options.push({
      rank:options.length+1, tag:'blue', tagLabel:'Mas Komportable',
      type:'Aircon Bus',
      price:`₱${busAcFare.toFixed(2)}`, priceClass:'blue',
      time:`~${Math.round(jeepTime*1.15)} minuto`,
      steps:[
        { icon:'📍', action:`Pumunta sa bus stop na pinakamalapit sa ${fromArea.name}`, detail:'Karaniwan nasa EDSA, major road, o terminal', cost:null },
        { icon:'🚍', action:`Sumakay ng Aircon Bus papuntang ${toArea.name}`, detail:'Hanapin ang bus na may tamang destinasyon sa harap', cost:null },
        { icon:'💰', action:`Bayad: ₱${busAcFare.toFixed(2)}`, detail:'May conductor — sabihin kung saan pupunta para sa tamang bayad', cost:`₱${busAcFare.toFixed(2)}` },
        { icon:'📣', action:`Sabihin kung saan bababa`, detail:`"Para po sa ${toArea.name}" — tumawag bago pa man makarating`, cost:null },
      ]
    });
  }

  return options.slice(0,3);
}

// ════════════════════════════════════════════════════════════════
//  RENDER FUNCTIONS
// ════════════════════════════════════════════════════════════════

function renderRouteHero(fromArea, toArea, dist) {
  document.getElementById('routeHero').innerHTML = `
    <span class="rh-route">
      ${fromArea.icon} ${fromArea.name}
      <span class="rh-arrow">→</span>
      ${toArea.icon} ${toArea.name}
    </span>
    <div class="rh-meta">
      <span class="rh-chip">📏 ~${dist} km</span>
      <span class="rh-chip">📅 Abril 25, 2026</span>
    </div>`;
}

function renderDirections(options) {
  if (!options.length) {
    document.getElementById('directionsWrap').innerHTML = '<p style="color:var(--text-2)">Walang nahanap na ruta.</p>';
    return;
  }

  const html = options.map((opt,i) => `
    <div class="route-option ${i===0?'recommended':i===1?'runner-up':''}">
      <div class="ro-header ${i===0?'bg-green':i===1?'bg-blue':'bg-default'}">
        <div class="ro-badge-row">
          <span class="ro-badge ${opt.tag}">${opt.tagLabel}</span>
          <span class="ro-type">${opt.type}</span>
        </div>
        <div class="ro-price-block">
          <div class="ro-price ${opt.priceClass}">${opt.price} <span style="font-size:.75rem;font-weight:500;color:var(--text-3)">one-way</span></div>
          <div class="ro-time">⏱ ${opt.time}</div>
        </div>
      </div>
      <div class="ro-steps">
        ${opt.steps.map((s,j) => `
          <div class="ro-step">
            <div class="step-num">${j+1}</div>
            <div class="step-icon-box">${s.icon}</div>
            <div class="step-info">
              <div class="step-action">${s.action}</div>
              ${s.signboard ? `<span class="step-signboard">🪧 ${s.signboard}</span>` : ''}
              <div class="step-detail">${s.detail.replace(/\n/g,'<br/>')}</div>
            </div>
            ${s.cost ? `<div class="step-cost">${s.cost}</div>` : ''}
          </div>`).join('')}
      </div>
    </div>`).join('');

  document.getElementById('directionsWrap').innerHTML = `<div class="route-options">${html}</div>`;
}

function renderFares(dist) {
  const cheapestFare = Math.min(...ROAD_MODES.filter(m=>m.key!=='piston').map(m=>calcFare(m,dist)));

  const roadHtml = ROAD_MODES.map(m => {
    const fare = calcFare(m, dist);
    const rt   = fare * 2;
    const isCheap = m.key!=='piston' && fare===cheapestFare;
    const tagText = isCheap ? '⭐ Pinakamura' : m.tagText;
    const tagCls  = isCheap ? 'tag-best' : m.tag;
    return `
      <div class="fare-row ${isCheap?'cheapest':''} ${m.key==='piston'?'is-danger':''}">
        <div class="fare-icon-box">${m.icon}</div>
        <div class="fare-info">
          <div class="fare-name-row">
            <span class="fare-name">${m.name}</span>
            <span class="fare-tag ${tagCls}">${tagText}</span>
          </div>
          <div class="fare-note">${m.note}</div>
        </div>
        <div class="fare-prices">
          <div class="fare-ow ${m.colorClass}">₱${fare.toFixed(2)}</div>
          <div class="fare-rt">Balikan ₱${rt.toFixed(2)}</div>
        </div>
      </div>`;
  }).join('');

  const railHtml = RAIL_FARES.map(r => `
    <div class="fare-row">
      <div class="fare-icon-box">🚇</div>
      <div class="fare-info">
        <div class="fare-name-row">
          <span class="fare-name">${r.label}</span>
          <span class="fare-tag tag-discount">50% Bawas</span>
        </div>
        <div class="fare-note">₱${r.disc[0]}–₱${r.disc[1]} · Dati ₱${r.orig[0]}–₱${r.orig[1]}</div>
      </div>
      <div class="fare-prices">
        <div class="fare-ow" style="color:${r.color}">₱${r.disc[0]}–${r.disc[1]}</div>
        <div class="fare-rt">Bawas na 50%</div>
      </div>
    </div>`).join('');

  document.getElementById('faresWrap').innerHTML =
    roadHtml +
    `<div class="rail-sep">🚇 LRT at MRT · 50% Diskuwento simula March 23, 2026</div>` +
    railHtml;
}

function renderImpact(dist) {
  const tradFare = calcFare(ROAD_MODES[0], dist);
  const pisFare  = calcFare(ROAD_MODES[5], dist);
  const tradMo   = tradFare * 2 * DAYS_MO;
  const pisMo    = pisFare  * 2 * DAYS_MO;
  const deltaMo  = pisMo - tradMo;
  const wagePct  = (tradFare*2/NCR_WAGE*100).toFixed(1);

  document.getElementById('impactWrap').innerHTML = `
    <div class="impact-grid">
      <div class="impact-box">
        <div class="impact-val amber">₱${tradMo.toFixed(0)}</div>
        <div class="impact-label">Buwanang gastos sa pamasahe ngayon<br/>(jeepney · balikan · 22 araw)</div>
      </div>
      <div class="impact-box">
        <div class="impact-val amber">${wagePct}%</div>
        <div class="impact-label">ng araw-araw mong sahod (₱${NCR_WAGE})<br/>napupunta sa pamasahe</div>
      </div>
    </div>
    ${deltaMo>0?`
    <div class="equiv-items">
      <div class="equiv-item"><span class="emoji">📢</span><span>Kung magtataas ang base fare sa ₱23 (PISTON petition), <strong>dagdag na ₱${deltaMo.toFixed(0)}</strong> bawat buwan ang kailangan mo.</span></div>
      <div class="equiv-item"><span class="emoji">🍚</span><span>Iyon ay katumbas ng <strong>${(deltaMo/50).toFixed(1)} kilo ng bigas</strong> @ ₱50/kilo na hindi mo mabibili.</span></div>
      <div class="equiv-item"><span class="emoji">💡</span><span>O kaya <strong>${Math.round(deltaMo/30)} araw ng singil sa kuryente</strong> @ ₱30/araw.</span></div>
    </div>`:''}`;
}

function renderPiston(dist) {
  const tradFare = calcFare(ROAD_MODES[0], dist);
  const pisFare  = calcFare(ROAD_MODES[5], dist);
  const diff     = pisFare - tradFare;

  document.getElementById('pistonWrap').innerHTML = `
    <h2 class="block-title">⚠️ Ang PISTON Petisyon — Ano Ito?</h2>
    <div class="piston-card">
      <div class="piston-icon">⚠️</div>
      <div>
        <div class="piston-title">₱23 na base fare — HINDI PA OPISYAL AT APRUBADO</div>
        <div class="piston-body">
          Noong <strong>Abril 20, 2026</strong>, nag-file ang PISTON (samahan ng mga driver at operator) ng petisyon sa LTFRB para itaas ang base fare mula ₱14 patungong ₱23.<br/><br/>
          Para sa iyong ruta (${dist} km), ang pagkakaiba ay <span class="piston-highlight">+₱${diff.toFixed(2)} bawat sakay</span>.
          Ang <strong>₱14.00 na base fare ang tanging legal na pamantayan ngayon</strong>.
          Kung may driver na nagsingil ng ₱23 base fare — <strong>overcharging iyon at karapatang iultol</strong>.
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════
//  GEMINI AI
// ════════════════════════════════════════════════════════════════
async function runAI(fromArea, toArea, dist) {
  const key = document.getElementById('apiKey').value.trim();
  if (!key) return;

  document.getElementById('aiBlock').removeAttribute('hidden');
  document.getElementById('aiLoading').style.display = 'flex';
  document.getElementById('aiOutput').setAttribute('hidden','');

  const tRadFare = calcFare(ROAD_MODES[0], dist);
  const prompt = `Ikaw si Barya, isang matulunging transit guide para sa mga Pilipinong commuter sa Metro Manila noong Abril 2026.

Ruta: ${fromArea.name} → ${toArea.name} · ${dist} km

KASALUKUYANG DATA (Abril 2026):
- Jeepney: ₱${tRadFare.toFixed(2)} one-way (₱14 base + ₱2/km pagkatapos ng 4km)
- LRT-1 (Berde): ₱15–35 na may 50% diskuwento
- LRT-2 (Asul): ₱15–32 na may 50% diskuwento  
- MRT-3 (Pula): ₱14–32 na may 50% diskuwento
- Minimum wage NCR: ₱610/araw

Magsulat ng maikli (max 180 salita) at direktang rekomendasyon sa Taglish.
FORMAT:
🎯 PINAKA-MAINAM: [isang linya lang]
🗺️ EKSAKTONG DAAN: [sunud-sunod, may landmark]
💡 TIPS: [2-3 praktikal na payo]

Maging direkta. Hugis ang sagot tulad ng isinulat ng isang matandang lolo/lola na marunong sa ruta.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ contents:[{parts:[{text:prompt}]}], generationConfig:{maxOutputTokens:350,temperature:0.65} }) }
    );
    const d = await res.json();
    const t = d?.candidates?.[0]?.content?.parts?.[0]?.text;
    document.getElementById('aiOutput').textContent = t || 'Walang sagot. Subukan muli.';
  } catch {
    document.getElementById('aiOutput').textContent = '❌ Hindi makakonekta sa AI. Suriin ang API key mo.';
  }
  document.getElementById('aiLoading').style.display = 'none';
  document.getElementById('aiOutput').removeAttribute('hidden');
}

// ════════════════════════════════════════════════════════════════
//  MAIN FLOW
// ════════════════════════════════════════════════════════════════
function analyze(fromArea, toArea) {
  if (!fromArea || !toArea) {
    alert('Paki-pumili ng simula at destinasyon mula sa mga mungkahi sa dropdown.');
    return;
  }
  if (fromArea.name === toArea.name) {
    alert('Pareho ang simula at destinasyon. Subukang mag-input ng ibang lugar.');
    return;
  }

  const dist = roadDist(fromArea, toArea);

  // Generate all data instantly — no delay
  const directions = generateDirections(fromArea, toArea, dist);
  renderRouteHero(fromArea, toArea, dist);
  renderDirections(directions);
  renderFares(dist);
  renderImpact(dist);
  renderPiston(dist);

  // Show results immediately
  document.getElementById('loadingWrap').setAttribute('hidden','');
  document.getElementById('resultsWrap').removeAttribute('hidden');
  document.getElementById('aiBlock').setAttribute('hidden','');
  document.getElementById('resultsWrap').scrollIntoView({behavior:'instant', block:'start'});

  // AI runs in background (non-blocking)
  runAI(fromArea, toArea, dist);
}

// ════════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  autocomplete(document.getElementById('fromInput'), document.getElementById('fromDrop'), a => selFrom = a);
  autocomplete(document.getElementById('toInput'),   document.getElementById('toDrop'),   a => selTo   = a);

  // Fuzzy fallback
  function fuzzyFind(val) {
    const q = val.toLowerCase().trim();
    return AREAS.find(a => a.name.toLowerCase()===q) ||
           AREAS.find(a => a.name.toLowerCase().startsWith(q)) ||
           AREAS.find(a => a.name.toLowerCase().includes(q)) || null;
  }

  document.getElementById('goBtn').addEventListener('click', () => {
    if (!selFrom) selFrom = fuzzyFind(document.getElementById('fromInput').value);
    if (!selTo)   selTo   = fuzzyFind(document.getElementById('toInput').value);
    analyze(selFrom, selTo);
  });

  ['fromInput','toInput'].forEach(id =>
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key==='Enter') document.getElementById('goBtn').click();
    })
  );

  document.getElementById('swapBtn').addEventListener('click', () => {
    const fv = document.getElementById('fromInput').value;
    const tv = document.getElementById('toInput').value;
    document.getElementById('fromInput').value = tv;
    document.getElementById('toInput').value   = fv;
    [selFrom, selTo] = [selTo, selFrom];
  });

  document.querySelectorAll('.qr-chip').forEach(btn => btn.addEventListener('click', () => {
    selFrom = AREAS.find(a=>a.name===btn.dataset.from)||null;
    selTo   = AREAS.find(a=>a.name===btn.dataset.to)||null;
    document.getElementById('fromInput').value = btn.dataset.from;
    document.getElementById('toInput').value   = btn.dataset.to;
    document.getElementById('goBtn').click();
  }));

  document.getElementById('resetBtn').addEventListener('click', () => {
    selFrom = selTo = null;
    document.getElementById('fromInput').value = '';
    document.getElementById('toInput').value   = '';
    document.getElementById('resultsWrap').setAttribute('hidden','');
    document.getElementById('searchWrap').scrollIntoView({behavior:'smooth'});
  });
});
