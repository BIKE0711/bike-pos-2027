import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, SlidersHorizontal, Eye, EyeOff, Check, ArrowRightLeft, 
  Bike, Tag, Layers, ShieldCheck, ShoppingBag, X, CheckCircle, Sparkles, ChevronRight
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "VeloCity E-Urban 500", kategorie: "E-Bike", marke: "VeloCity", preis_eur: 2899, ek_preis: 1850, marge_prozent: 36, groesse: "M", material: "Aluminium", einsatzbereich: "City", rahmenform: "Tiefeinsteiger", schaltung: "Shimano Nexus 8-Gang", farbe: "Mattschwarz", auf_lager: true, bestand: 3, zubehoer: ["Schutzbleche", "Gepäckträger", "Beleuchtung"], bild: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "VeloCity E-Urban 500", kategorie: "E-Bike", marke: "VeloCity", preis_eur: 2899, ek_preis: 1850, marge_prozent: 36, groesse: "L", material: "Aluminium", einsatzbereich: "City", rahmenform: "Tiefeinsteiger", schaltung: "Shimano Nexus 8-Gang", farbe: "Mattschwarz", auf_lager: false, bestand: 0, zubehoer: ["Schutzbleche", "Gepäckträger", "Beleuchtung"], bild: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "VeloCity E-Urban 500", kategorie: "E-Bike", marke: "VeloCity", preis_eur: 2899, ek_preis: 1850, marge_prozent: 36, groesse: "S", material: "Aluminium", einsatzbereich: "City", rahmenform: "Tiefeinsteiger", schaltung: "Shimano Nexus 8-Gang", farbe: "Sonnengelb", auf_lager: true, bestand: 1, zubehoer: ["Schutzbleche", "Gepäckträger", "Beleuchtung"], bild: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "TrailHawk Enduro Pro", kategorie: "MTB", marke: "TrailHawk", preis_eur: 4499, ek_preis: 2900, marge_prozent: 35, groesse: "L", material: "Carbon", einsatzbereich: "Trail / Enduro", rahmenform: "Diamant", schaltung: "SRAM GX Eagle 12-Gang", farbe: "Steingrau", auf_lager: true, bestand: 2, zubehoer: ["Kettenführung"], bild: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "TrailHawk Enduro Pro", kategorie: "MTB", marke: "TrailHawk", preis_eur: 4499, ek_preis: 2900, marge_prozent: 35, groesse: "XL", material: "Carbon", einsatzbereich: "Trail / Enduro", rahmenform: "Diamant", schaltung: "SRAM GX Eagle 12-Gang", farbe: "Steingrau", auf_lager: true, bestand: 1, zubehoer: ["Kettenführung"], bild: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "TrailHawk Enduro Comp", kategorie: "MTB", marke: "TrailHawk", preis_eur: 3199, ek_preis: 2100, marge_prozent: 34, groesse: "M", material: "Aluminium", einsatzbereich: "Trail / Enduro", rahmenform: "Diamant", schaltung: "Shimano Deore 12-Gang", farbe: "Signalrot", auf_lager: true, bestand: 4, zubehoer: ["Kettenführung"], bild: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "RacerX Aero Carbon", kategorie: "Rennrad", marke: "RacerX", preis_eur: 3899, ek_preis: 2500, marge_prozent: 36, groesse: "54 cm", material: "Carbon", einsatzbereich: "Straße", rahmenform: "Diamant", schaltung: "Shimano 105 Di2", farbe: "Glossy Black", auf_lager: true, bestand: 2, zubehoer: [], bild: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "RacerX Aero Carbon", kategorie: "Rennrad", marke: "RacerX", preis_eur: 3899, ek_preis: 2500, marge_prozent: 36, groesse: "56 cm", material: "Carbon", einsatzbereich: "Straße", rahmenform: "Diamant", schaltung: "Shimano 105 Di2", farbe: "Glossy Black", auf_lager: true, bestand: 1, zubehoer: [], bild: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "GravelKing Endurance 7", kategorie: "Gravelbike", marke: "GravelKing", preis_eur: 2199, ek_preis: 1400, marge_prozent: 36, groesse: "S", material: "Aluminium", einsatzbereich: "Gravel / Allroad", rahmenform: "Trapez", schaltung: "Shimano GRX 400", farbe: "Moosgrün", auf_lager: true, bestand: 5, zubehoer: [], bild: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80" },
  { id: 11, name: "GravelKing Endurance 7", kategorie: "Gravelbike", marke: "GravelKing", preis_eur: 2199, ek_preis: 1400, marge_prozent: 36, groesse: "M", material: "Aluminium", einsatzbereich: "Gravel / Allroad", rahmenform: "Trapez", schaltung: "Shimano GRX 400", farbe: "Moosgrün", auf_lager: true, bestand: 3, zubehoer: [], bild: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80" },
  { id: 12, name: "GravelKing Endurance 7", kategorie: "Gravelbike", marke: "GravelKing", preis_eur: 2199, ek_preis: 1400, marge_prozent: 36, groesse: "L", material: "Aluminium", einsatzbereich: "Gravel / Allroad", rahmenform: "Diamant", schaltung: "Shimano GRX 400", farbe: "Moosgrün", auf_lager: true, bestand: 2, zubehoer: [], bild: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80" },
  { id: 13, name: "GravelKing Carbon Pro", kategorie: "Gravelbike", marke: "GravelKing", preis_eur: 3499, ek_preis: 2200, marge_prozent: 37, groesse: "M", material: "Carbon", einsatzbereich: "Gravel / Allroad", rahmenform: "Diamant", schaltung: "SRAM Rival eTap", farbe: "Sandbeige", auf_lager: true, bestand: 1, zubehoer: ["Tubeless-Kit"], bild: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80" },
  { id: 14, name: "NordicRide Trekking Master", kategorie: "Trekking", marke: "NordicRide", preis_eur: 1299, ek_preis: 820, marge_prozent: 36, groesse: "M", material: "Aluminium", einsatzbereich: "Trekking / Tour", rahmenform: "Trapez", schaltung: "Shimano XT 30-Gang", farbe: "Dunkelblau", auf_lager: true, bestand: 6, zubehoer: ["Gepäckträger", "Seitenständer", "Beleuchtung"], bild: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80" },
  { id: 15, name: "NordicRide Trekking Master", kategorie: "Trekking", marke: "NordicRide", preis_eur: 1299, ek_preis: 820, marge_prozent: 36, groesse: "L", material: "Aluminium", einsatzbereich: "Trekking / Tour", rahmenform: "Diamant", schaltung: "Shimano XT 30-Gang", farbe: "Dunkelblau", auf_lager: true, bestand: 4, zubehoer: ["Gepäckträger", "Seitenständer", "Beleuchtung"], bild: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80" },
  { id: 22, name: "VeloCity E-Mountain 900", kategorie: "E-MTB", marke: "VeloCity", preis_eur: 5299, ek_preis: 3400, marge_prozent: 35, groesse: "M", material: "Carbon", einsatzbereich: "Trail / Enduro", rahmenform: "Diamant", schaltung: "SRAM X01 Eagle", farbe: "Kupfer/Schwarz", auf_lager: true, bestand: 2, zubehoer: ["Kettenführung"], bild: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80" },
  { id: 26, name: "CargoX Family E-Load", kategorie: "Lastenrad", marke: "CargoX", preis_eur: 4999, ek_preis: 3300, marge_prozent: 34, groesse: "One Size", material: "Aluminium", einsatzbereich: "Familie / Transport", rahmenform: "Tiefeinsteiger", schaltung: "Enviolo Stufenlos", farbe: "Mattschwarz", auf_lager: true, bestand: 1, zubehoer: ["Kinderbank", "Regendach", "Gurt-System"], bild: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80" },
  { id: 36, name: "Helm SafetyPro MIPS", kategorie: "Zubehör", marke: "SafeRide", preis_eur: 129, ek_preis: 65, marge_prozent: 49, groesse: "M", material: "Kunststoff", einsatzbereich: "Zubehör", rahmenform: "N/A", schaltung: "N/A", farbe: "Mattschwarz", auf_lager: true, bestand: 12, zubehoer: ["LED-Rücklicht"], bild: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedKategorie, setSelectedKategorie] = useState('Alle');
  const [selectedMarke, setSelectedMarke] = useState('Alle');
  const [selectedGroesse, setSelectedGroesse] = useState('Alle');
  const [selectedMaterial, setSelectedMaterial] = useState('Alle');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPreis, setMaxPreis] = useState(6000);
  const [kundenModus, setKundenModus] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const kategorien = ['Alle', ...new Set(PRODUCTS.map(p => p.kategorie))];
  const marken = ['Alle', ...new Set(PRODUCTS.map(p => p.marke))];
  const groessen = ['Alle', ...new Set(PRODUCTS.map(p => p.groesse))];
  const materialien = ['Alle', ...new Set(PRODUCTS.map(p => p.material))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.schaltung.toLowerCase().includes(search.toLowerCase());
      const matchKat = selectedKategorie === 'Alle' || p.kategorie === selectedKategorie;
      const matchMarke = selectedMarke === 'Alle' || p.marke === selectedMarke;
      const matchGroesse = selectedGroesse === 'Alle' || p.groesse === selectedGroesse;
      const matchMat = selectedMaterial === 'Alle' || p.material === selectedMaterial;
      const matchStock = !onlyInStock || p.auf_lager;
      const matchPreis = p.preis_eur <= maxPreis;
      return matchSearch && matchKat && matchMarke && matchGroesse && matchMat && matchStock && matchPreis;
    });
  }, [search, selectedKategorie, selectedMarke, selectedGroesse, selectedMaterial, onlyInStock, maxPreis]);

  const toggleCompare = (p) => {
    if (compareList.find(item => item.id === p.id)) {
      setCompareList(compareList.filter(item => item.id !== p.id));
    } else {
      if (compareList.length < 3) setCompareList([...compareList, p]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER WITH ORIGINAL BIKE AND STYLE LOGO */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-40 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          {/* LOGO ICON */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/5 shrink-0">
            <svg viewBox="0 0 100 100" className="w-7 h-7 fill-slate-950">
              <circle cx="50" cy="50" r="48" fill="#000000" />
              <path d="M28 35 C 28 32, 72 32, 72 35 C 72 38, 60 37, 53 38 L 53 68 C 53 71, 47 71, 47 68 L 47 38 C 40 37, 28 38, 28 35 Z" fill="#ffffff" />
            </svg>
          </div>

          {/* BRAND NAME */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-[0.2em] text-white uppercase font-sans">
                BIKE AND STYLE
              </span>
              <span className="text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 tracking-normal">
                POS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide">Verkäufer-Beratungsmodul</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setKundenModus(!kundenModus)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-xs transition shadow-sm ${
              kundenModus 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {kundenModus ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{kundenModus ? 'Kundenmodus (Preise)' : 'Händlermodus (EK & Marge)'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* SIDEBAR FILTER */}
        <aside className="w-full md:w-80 bg-slate-900/50 border-r border-slate-800/80 p-6 space-y-6 shrink-0">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="font-bold text-slate-200 flex items-center gap-2 text-sm uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Filter & Suche
            </h2>
            <button 
              onClick={() => {
                setSelectedKategorie('Alle');
                setSelectedMarke('Alle');
                setSelectedGroesse('Alle');
                setSelectedMaterial('Alle');
                setOnlyInStock(false);
                setMaxPreis(6000);
                setSearch('');
              }}
              className="text-xs text-slate-400 hover:text-emerald-400 transition"
            >
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Kategorie</label>
              <select value={selectedKategorie} onChange={e => setSelectedKategorie(e.target.value)} className="w-full mt-1.5 p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                {kategorien.map(k => <option key={k} value={k} className="bg-slate-900">{k}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Rahmengröße</label>
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {groessen.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGroesse(g)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                      selectedGroesse === g 
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span className="uppercase tracking-wider">Max. Preis</span>
                <span className="text-emerald-400 font-bold text-sm">{maxPreis.toLocaleString()} €</span>
              </div>
              <input 
                type="range" min="500" max="6000" step="100" value={maxPreis} 
                onChange={e => setMaxPreis(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-400 bg-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Marke</label>
              <select value={selectedMarke} onChange={e => setSelectedMarke(e.target.value)} className="w-full mt-1.5 p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                {marken.map(m => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Material</label>
              <select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)} className="w-full mt-1.5 p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                {materialien.map(m => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" checked={onlyInStock} onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition">Nur sofort Verfügbare</span>
              </label>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input 
                type="text" placeholder="Modell, Schaltung oder Zubehör suchen..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-inner"
              />
            </div>
            <div className="text-xs text-slate-400 font-medium bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
              Gefunden: <span className="text-emerald-400 font-bold">{filteredProducts.length}</span> Modelle
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => {
              const isCompared = compareList.some(item => item.id === p.id);
              return (
                <div key={p.id} className="bg-slate-900/90 rounded-3xl border border-slate-800/80 shadow-xl hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/5 transition duration-300 flex flex-col overflow-hidden group">
                  <div className="relative h-52 bg-slate-950 overflow-hidden">
                    <img src={p.bild} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                    
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                      {p.kategorie}
                    </span>
                    
                    <button 
                      onClick={() => toggleCompare(p)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition ${
                        isCompared 
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' 
                          : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/50'
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">{p.marke}</span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          p.auf_lager 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {p.auf_lager ? `Auf Lager (${p.bestand})` : 'Bestellbar'}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-lg leading-snug">{p.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800/50 text-slate-400">
                      <div><span className="text-slate-500">Größe:</span> <span className="text-slate-200 font-semibold">{p.groesse}</span></div>
                      <div><span className="text-slate-500">Material:</span> <span className="text-slate-200 font-semibold">{p.material}</span></div>
                      <div className="col-span-2 truncate"><span className="text-slate-500">Schaltung:</span> <span className="text-slate-200 font-semibold">{p.schaltung}</span></div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-3 flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-black text-white">{p.preis_eur.toLocaleString()} €</div>
                        {!kundenModus && (
                          <div className="text-xs text-amber-400 font-medium mt-0.5">
                            EK: {p.ek_preis} € | Marge: {p.marge_prozent}%
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setActiveModalProduct(p)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* FLOATING COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-40">
          <div className="text-xs text-slate-300 font-medium">
            <span className="text-emerald-400 font-bold">{compareList.length}</span>/3 im Vergleich
          </div>
          <button 
            onClick={() => setShowCompareModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition shadow-lg shadow-emerald-500/20"
          >
            Jetzt Vergleichen
          </button>
          <button onClick={() => setCompareList([])} className="text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DETAIL MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 bg-slate-800 p-2 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-6 flex-col md:flex-row">
              <img src={activeModalProduct.bild} alt="" className="w-full md:w-1/2 h-56 object-cover rounded-2xl border border-slate-800" />
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{activeModalProduct.marke}</span>
                <h2 className="text-2xl font-bold text-white leading-snug">{activeModalProduct.name}</h2>
                <div className="text-3xl font-black text-emerald-400">{activeModalProduct.preis_eur.toLocaleString()} €</div>
                <div className="text-sm text-slate-400">Rahmenform: <span className="font-semibold text-slate-200">{activeModalProduct.rahmenform}</span></div>
                <div className="text-sm text-slate-400">Farbe: <span className="font-semibold text-slate-200">{activeModalProduct.farbe}</span></div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Mitgeliefertes Zubehör</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProduct.zubehoer.length > 0 ? (
                  activeModalProduct.zubehoer.map((z, i) => (
                    <span key={i} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
                      ✓ {z}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">Kein Zubehör enthalten</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Produktvergleich</h3>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map(item => (
                <div key={item.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <img src={item.bild} alt="" className="w-full h-32 object-cover rounded-xl" />
                  <div className="font-bold text-sm text-white">{item.name}</div>
                  <div className="text-xl font-extrabold text-emerald-400">{item.preis_eur.toLocaleString()} €</div>
                  <div className="text-xs space-y-1 text-slate-400 border-t border-slate-800 pt-2">
                    <div><b className="text-slate-200">Größe:</b> {item.groesse}</div>
                    <div><b className="text-slate-200">Material:</b> {item.material}</div>
                    <div><b className="text-slate-200">Schaltung:</b> {item.schaltung}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
