import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, SlidersHorizontal, Eye, EyeOff, Check, ArrowRightLeft, 
  Bike, Tag, Layers, ShieldCheck, ShoppingBag, X, CheckCircle, AlertCircle
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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <header className="bg-slate-900 text-white p-4 shadow-lg flex flex-wrap justify-between items-center gap-4 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-xl text-slate-900">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">VELO-POS Pro</h1>
            <p className="text-xs text-slate-400">Verkäufer-Beratungssystem</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setKundenModus(!kundenModus)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
              kundenModus 
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {kundenModus ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{kundenModus ? 'Kundenmodus (Aktiv)' : 'Händlermodus (EK/Marge sichtbar)'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-5 space-y-6 shrink-0">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="font-bold text-slate-700 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filter
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
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              Zurücksetzen
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Kategorie</label>
              <select value={selectedKategorie} onChange={e => setSelectedKategorie(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                {kategorien.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Rahmengröße</label>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {groessen.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGroesse(g)}
                    className={`py-1.5 text-xs font-medium rounded border ${
                      selectedGroesse === g 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Max. Preis: {maxPreis} €</label>
              <input 
                type="range" min="500" max="6000" step="100" value={maxPreis} 
                onChange={e => setMaxPreis(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Marke</label>
              <select value={selectedMarke} onChange={e => setSelectedMarke(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                {marken.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Material</label>
              <select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                {materialien.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" checked={onlyInStock} onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Sofort auf Lager</span>
              </label>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" placeholder="Modell, Schaltung, Zubehör suchen..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Gezeigte Modelle: <span className="text-slate-900 font-bold">{filteredProducts.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => {
              const isCompared = compareList.some(item => item.id === p.id);
              return (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
                  <div className="relative h-48 bg-slate-100">
                    <img src={p.bild} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {p.kategorie}
                    </span>
                    <button 
                      onClick={() => toggleCompare(p)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                        isCompared ? 'bg-emerald-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{p.marke}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.auf_lager ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {p.auf_lager ? `Auf Lager (${p.bestand})` : 'Nachbestellung'}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg leading-snug mt-1">{p.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                      <div><span className="font-medium text-slate-700">Größe:</span> {p.groesse}</div>
                      <div><span className="font-medium text-slate-700">Material:</span> {p.material}</div>
                      <div className="col-span-2 truncate"><span className="font-medium text-slate-700">Schaltung:</span> {p.schaltung}</div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-black text-slate-900">{p.preis_eur.toLocaleString()} €</div>
                        {!kundenModus && (
                          <div className="text-xs text-amber-600 font-medium mt-0.5">
                            EK: {p.ek_preis} € | Marge: {p.marge_prozent}%
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setActiveModalProduct(p)}
                        className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition"
                      >
                        Details & Beratung
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {activeModalProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-6 flex-col md:flex-row">
              <img src={activeModalProduct.bild} alt="" className="w-full md:w-1/2 h-56 object-cover rounded-2xl" />
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-600 uppercase">{activeModalProduct.marke}</span>
                <h2 className="text-2xl font-bold text-slate-900">{activeModalProduct.name}</h2>
                <div className="text-3xl font-black text-slate-900">{activeModalProduct.preis_eur.toLocaleString()} €</div>
                <div className="text-sm text-slate-600">Rahmenform: <span className="font-semibold text-slate-800">{activeModalProduct.rahmenform}</span></div>
                <div className="text-sm text-slate-600">Farbe: <span className="font-semibold text-slate-800">{activeModalProduct.farbe}</span></div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
              <h4 className="font-bold text-sm text-slate-700">Mitgeliefertes Zubehör:</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProduct.zubehoer.length > 0 ? (
                  activeModalProduct.zubehoer.map((z, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                      ✓ {z}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">Kein Zubehör enthalten</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
