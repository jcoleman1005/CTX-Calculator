import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// --- ICONS ---
const CalculatorIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
);
const SyringeIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 15-6-6"/><path d="m17 10 4-4"/><path d="m12 5 4-4"/><path d="m5 16 6-6"/><path d="m8 20 6-6"/><path d="m1 21 2-2"/><path d="m19 6 3-3"/><path d="m2 18 3 3"/></svg>
);
const AlertCircleIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);
const InfoIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const BabyIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.8 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.8A9 9 0 0 1 12 3v0a9 9 0 0 1 7 3.3z"/></svg>
);
const ToddlerIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1"/><circle cx="12" cy="9" r="3"/></svg>
);
const UserIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const FlaskIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
);
const CheckIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);
const EyeIcon = ({size=20, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
);
const SunIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
const MoonIcon = ({size=24, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const XIcon = ({size=16, className=""}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

// --- UPDATE TOAST COMPONENT ---
function UpdateToast() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisterError(error) {
            console.error('Service worker registration error', error);
        },
    });

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex-1">
                <p className="text-sm font-bold">Update Available</p>
                <p className="text-xs opacity-80 mt-0.5">Refresh to load the latest guidelines.</p>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setNeedRefresh(false)} 
                    className="p-1.5 opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Dismiss update"
                >
                    <XIcon size={18} />
                </button>
                <button 
                    onClick={() => updateServiceWorker(true)} 
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow transition-colors"
                >
                    Reload
                </button>
            </div>
        </div>
    );
}

// --- MAIN APP COMPONENT ---
export default function App() {
    const [doseOrdered, setDoseOrdered] = useState('');
    const [vialSize, setVialSize] = useState('1000');
    const [ageGroup, setAgeGroup] = useState('child_older');
    const [reconstitutedVol, setReconstitutedVol] = useState('2.9');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showWork, setShowWork] = useState(false);
    const [result, setResult] = useState(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    const MAX_DOSE = 1000;
    const isDoseOverLimit = parseFloat(doseOrdered) > MAX_DOSE;

    const VIAL_DATA = {
        '500': { mg: 500, diluent: 1.0, totalVolume: 1.4 },
        '1000': { mg: 1000, diluent: 2.1, totalVolume: 2.9 }
    };

    const AGE_GUIDELINES = {
        'infant': { label: 'Infant (< 1 yr)', maxPerSite: 1.0 },
        'toddler': { label: 'Toddler (1-2 yrs)', maxPerSite: 1.5 },
        'child_older': { label: 'Child (> 2 yrs)', maxPerSite: 2.0 }
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const standard = VIAL_DATA[vialSize].totalVolume.toString();
        setReconstitutedVol(standard);
        setIsConfirmed(false);
    }, [vialSize]);

    useEffect(() => {
        if (isConfirmed && !isDoseOverLimit) {
            calculate();
        } else {
            setResult(null);
        }
    }, [doseOrdered, vialSize, ageGroup, reconstitutedVol, isConfirmed, isDoseOverLimit]);

    const handleDoseChange = (e) => {
        setDoseOrdered(e.target.value);
        setIsConfirmed(false);
    };

    const calculate = () => {
        const dose = parseFloat(doseOrdered);
        const actualYield = parseFloat(reconstitutedVol);

        if (!dose || isNaN(dose) || !actualYield || isNaN(actualYield)) {
            setResult(null);
            return;
        }

        const vial = VIAL_DATA[vialSize];
        const concentration = vial.mg / actualYield;
        const calculatedVolume = dose / concentration;
        const roundedVolume = Math.round(calculatedVolume * 10) / 10;

        const guideline = AGE_GUIDELINES[ageGroup];
        const numInjections = Math.ceil(roundedVolume / guideline.maxPerSite);

        setResult({
            volume: roundedVolume,
            exactVolume: calculatedVolume.toFixed(2),
            concentration: concentration.toFixed(1),
            numInjections,
            maxPerSite: guideline.maxPerSite,
            vialUsed: vial,
            currentYield: actualYield
        });
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300 relative pt-4">
            <UpdateToast />
            
            <div className="max-w-md mx-auto px-4 sm:px-6 pb-20">
                
                {/* Utility Bar */}
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)} 
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
                        <span className="text-[10px] font-bold uppercase tracking-widest">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>

                {/* Main Header */}
                <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 rounded-xl shadow-lg mb-4 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg shrink-0">
                        <CalculatorIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Rocephin Calculator</h1>
                        <p className="text-blue-100 dark:text-blue-200 text-xs">IM Draw-Up Assistant</p>
                    </div>
                </div>

                {/* Persistent Bookmark Note */}
                <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50 rounded-lg p-3 mb-6 flex items-start gap-3 transition-colors">
                    <InfoIcon size={18} className="text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-sky-800 dark:text-sky-200 leading-tight">
                        <strong> Notice:</strong> It is recommended to bookmark the new permanent address for future access:<br/> 
                        <a href="https://ctxcalc.jcoleman.us" className="font-bold underline hover:text-sky-600 dark:hover:text-sky-300 mt-1 inline-block">ctxcalc.jcoleman.us</a>
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4 transition-colors">
                        <h2 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <InfoIcon size={18} /> Medication Details
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Dose Ordered (mg)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={doseOrdered}
                                    onChange={handleDoseChange}
                                    placeholder="e.g. 500"
                                    className={`w-full pl-3 pr-12 py-3 border rounded-lg outline-none transition-all text-lg font-medium 
                                        ${isDoseOverLimit 
                                            ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                                            : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white'}`}
                                />
                                <span className="absolute right-4 top-3.5 text-slate-400 dark:text-slate-500 font-medium">mg</span>
                            </div>
                            {isDoseOverLimit && (
                                <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400">
                                    <AlertCircleIcon size={14} />
                                    <p className="text-xs font-bold uppercase tracking-tight">Error: Dose exceeds 1000mg maximum limit.</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Vial Size Used</label>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                {Object.keys(VIAL_DATA).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setVialSize(size)}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                            vialSize === size
                                            ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 shadow-sm'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {size} mg
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 transition-colors">
                                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-1">Reconstitution Instructions</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Add <strong>{VIAL_DATA[vialSize].diluent} mL</strong> of 1% Lidocaine.</li>
                                    <li className="text-slate-400 dark:text-slate-500 italic">Expected standard yield: {VIAL_DATA[vialSize].totalVolume} mL.</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-colors">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-2">
                                    <FlaskIcon size={16} /> Total Reconstituted Volume (mL)
                                </label>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-tight">
                                    Enter the actual total fluid volume observed in the vial.
                                </p>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={reconstitutedVol}
                                            onChange={(e) => {
                                                setReconstitutedVol(e.target.value);
                                                setIsConfirmed(false);
                                            }}
                                            className={`w-full pl-3 pr-10 py-3 border rounded-lg focus:ring-2 outline-none font-bold transition-all ${
                                                isConfirmed 
                                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 dark:border-emerald-400 text-emerald-800 dark:text-emerald-300' 
                                                : 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-600 focus:ring-blue-500 text-blue-800 dark:text-blue-300'
                                            }`}
                                        />
                                        <span className="absolute right-3 top-3.5 text-slate-400 dark:text-slate-500 text-sm">mL</span>
                                    </div>

                                    <button
                                        onClick={() => setIsConfirmed(true)}
                                        disabled={!reconstitutedVol || isConfirmed || isDoseOverLimit}
                                        className={`px-4 rounded-lg font-bold flex items-center gap-2 transition-all ${
                                            isConfirmed 
                                            ? 'bg-emerald-500 text-white shadow-sm' 
                                            : isDoseOverLimit 
                                                ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                                                : 'bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md active:scale-95'
                                        }`}
                                    >
                                        {isConfirmed ? <CheckIcon size={20} /> : 'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Patient Age Group</label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(AGE_GUIDELINES).map(([key, data]) => {
                                    let IconToRender = UserIcon;
                                    if (key === 'infant') IconToRender = BabyIcon;
                                    if (key === 'toddler') IconToRender = ToddlerIcon;

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setAgeGroup(key)}
                                            className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center justify-center text-center h-20 ${
                                                ageGroup === key
                                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 shadow-sm'
                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            <IconToRender size={18} className="mb-1" />
                                            {data.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {isConfirmed && result ? (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-t-4 border-blue-500 overflow-hidden transition-colors">
                                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20">
                                    <div className="text-center">
                                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-1 uppercase tracking-wide text-xs">Final Volume to Draw</p>
                                        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
                                            {result.volume}
                                            <span className="text-2xl text-slate-400 dark:text-slate-500 font-medium">mL</span>
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-full uppercase tracking-tight">
                                            Verified Yield: {result.currentYield} mL
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 border-t border-slate-100 dark:border-slate-700 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full mt-1 shrink-0">
                                            <SyringeIcon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Administration Guide</h3>
                                            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 space-y-2">
                                                <p><span className="font-medium text-slate-900 dark:text-white">Total Dose:</span> {doseOrdered} mg</p>

                                                {result.numInjections > 1 ? (
                                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg p-3 mt-2">
                                                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-1">
                                                            <AlertCircleIcon size={16} /> Split Dose Required
                                                        </div>
                                                        <p>Exceeds {result.maxPerSite} mL limit. Split into <span className="font-bold text-amber-800 dark:text-amber-300">{result.numInjections} injections</span>.</p>
                                                        <p className="mt-2 text-amber-800 dark:text-amber-300 font-medium">~{(result.volume / result.numInjections).toFixed(1)} mL per site</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2 mt-2">✓ Safe for single injection site</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setShowWork(!showWork)}
                                    className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <EyeIcon size={16} />
                                    {showWork ? 'Hide Calculations' : 'Show Calculations'}
                                </button>

                                {showWork && (
                                    <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3 text-xs text-slate-600 dark:text-slate-300 animate-in slide-in-from-top-2 duration-300">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
                                            <CalculatorIcon size={14} /> Calculation Breakdown
                                        </h4>
                                        <div className="space-y-3 leading-relaxed">
                                            <div>
                                                <p className="font-semibold text-slate-700 dark:text-slate-200">1. Calculate Concentration:</p>
                                                <p className="pl-3">Vial Content ({vialSize} mg) ÷ Confirmed Yield ({result.currentYield} mL)</p>
                                                <p className="pl-3 text-blue-700 dark:text-blue-400 font-mono font-bold">= {result.concentration} mg/mL</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700 dark:text-slate-200">2. Calculate Draw Volume:</p>
                                                <p className="pl-3">Ordered Dose ({doseOrdered} mg) ÷ Concentration ({result.concentration} mg/mL)</p>
                                                <p className="pl-3 text-blue-700 dark:text-blue-400 font-mono font-bold">= {result.exactVolume} mL → <span className="underline">Rounded to {result.volume} mL</span></p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700 dark:text-slate-200">3. Injection Site Check:</p>
                                                <p className="pl-3">Total Volume ({result.volume} mL) ÷ Site Max for {AGE_GUIDELINES[ageGroup].label} ({result.maxPerSite} mL)</p>
                                                <p className="pl-3 text-blue-700 dark:text-blue-400 font-mono font-bold">= {result.numInjections} Site(s)</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed transition-colors">
                            <p>Verify the Reconstituted Volume above to display final draw-up amount.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                        <strong>Disclaimer:</strong> Educational tool only. Always verify calculations against institutional protocols.
                    </p>
                </div>
            </div>
        </div>
    );
}