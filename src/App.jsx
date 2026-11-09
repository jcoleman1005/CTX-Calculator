import { useState, useEffect, useRef } from 'react';

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

export default function App() {
    const [doseOrdered, setDoseOrdered] = useState('');
    const [vialSize, setVialSize] = useState('1000');
    const [ageGroup, setAgeGroup] = useState('child_older');
    const [reconstitutedVol, setReconstitutedVol] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showWork, setShowWork] = useState(false);
    const [result, setResult] = useState(null);

    const resultRef = useRef(null);
    const scrollToResult = useRef(false);

    const MAX_DOSE = 1000;

    const VIAL_DATA = {
        '500': { mg: 500, diluent: 1.0, totalVolume: 1.4 },
        '1000': { mg: 1000, diluent: 2.1, totalVolume: 2.9 }
    };

    // --- INPUT VALIDATION ---
    const doseNum = parseFloat(doseOrdered);
    const volNum = parseFloat(reconstitutedVol);
    const expectedVol = VIAL_DATA[vialSize].totalVolume;

    let doseError = null;
    if (doseOrdered !== '') {
        if (!(doseNum > 0)) doseError = 'Dose must be greater than 0 mg.';
        else if (doseNum > MAX_DOSE) doseError = `Dose exceeds ${MAX_DOSE} mg maximum limit.`;
        else if (doseNum > VIAL_DATA[vialSize].mg) doseError = `Dose exceeds the ${VIAL_DATA[vialSize].mg} mg in the selected vial. Check the vial size.`;
    }

    // Hard block for implausible readings (e.g. typo "29" for "2.9"); soft warning for small differences.
    let volError = null;
    let volWarning = null;
    if (reconstitutedVol !== '') {
        if (!(volNum > 0)) volError = 'Volume must be greater than 0 mL.';
        else if (volNum < expectedVol * 0.5 || volNum > expectedVol * 1.5) volError = `${reconstitutedVol} mL is far from the expected ${expectedVol} mL. Re-check the vial and re-enter.`;
        else if (Math.abs(volNum - expectedVol) > 0.3) volWarning = `Differs from the expected ${expectedVol} mL. Confirm this is what you see in the vial.`;
    }

    const canConfirm = doseNum > 0 && !doseError && volNum > 0 && !volError;

    const AGE_GUIDELINES = {
        'infant': { label: 'Infant (< 1 yr)', maxPerSite: 1.0 },
        'toddler': { label: 'Toddler (1-2 yrs)', maxPerSite: 1.5 },
        'child_older': { label: 'Child (> 2 yrs)', maxPerSite: 2.0 }
    };

    useEffect(() => {
        // Never pre-fill: the nurse must enter the volume actually observed in the vial.
        setReconstitutedVol('');
        setIsConfirmed(false);
    }, [vialSize]);

    useEffect(() => {
        if (isConfirmed && canConfirm) {
            calculate();
        } else {
            setResult(null);
        }
    }, [doseOrdered, vialSize, ageGroup, reconstitutedVol, isConfirmed, canConfirm]);

    // After Confirm, bring the result into view (it sits below the fold on phones).
    useEffect(() => {
        if (result && scrollToResult.current) {
            scrollToResult.current = false;
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [result]);

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
        <div className="bg-slate-50 text-slate-800 min-h-screen">
            <div className="max-w-md mx-auto p-4 sm:p-6 pb-20">
                
                <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <CalculatorIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Rocephin Calculator</h1>
                        <p className="text-blue-100 text-xs">IM Draw-Up Assistant</p>
                    </div>
                </div>

                <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl shadow-sm mb-6">
                    <div className="flex gap-3">
                        <InfoIcon size={20} className="text-sky-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-sky-900 text-sm">System Update</h3>
                            <p className="text-sky-800 text-sm mt-1">
                                Please <strong>refresh your browser</strong> to ensure you have the latest updates.
                            </p>
                            <p className="text-sky-800 text-sm mt-2">
                                Bookmark the permanent address: <a href="https://ctxcalc.jcoleman.us" className="font-bold underline hover:text-sky-900">ctxcalc.jcoleman.us</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                        <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                            <InfoIcon size={18} /> Medication Details
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Dose Ordered (mg)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={doseOrdered}
                                    onChange={handleDoseChange}
                                    placeholder="e.g. 500"
                                    className={`w-full pl-3 pr-12 py-3 bg-slate-50 border rounded-lg focus:ring-2 outline-none transition-all text-lg font-medium ${doseError ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}
                                />
                                <span className="absolute right-4 top-3.5 text-slate-400 font-medium">mg</span>
                            </div>
                            {doseError && (
                                <div className="flex items-center gap-1 mt-2 text-red-600" role="alert">
                                    <AlertCircleIcon size={14} className="shrink-0" />
                                    <p className="text-xs font-bold">Error: {doseError}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Vial Size Used</label>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                {Object.keys(VIAL_DATA).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setVialSize(size)}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                            vialSize === size
                                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {size} mg
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-300 text-base text-slate-700">
                                <h4 className="font-bold text-slate-800 text-lg mb-2">Reconstitution Instructions</h4>
                                <ol className="space-y-3">
                                    {[
                                        <>Add <strong className="text-xl">{VIAL_DATA[vialSize].diluent} mL</strong> of 1% Lidocaine to the vial.</>,
                                        <>Shake well until the powder is fully dissolved.</>,
                                        <>Expected total volume in vial: <strong className="text-xl">{VIAL_DATA[vialSize].totalVolume} mL</strong></>
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">{i + 1}</span>
                                            <span className="pt-0.5">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                                <div className="mt-3 p-3 bg-amber-100 border-2 border-amber-400 rounded-lg text-amber-950 font-extrabold text-sm sm:text-base leading-snug">
                                    ⚠️ This is the expected total NOT the draw volume
                                </div>
                            </div>

                            <div className="p-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                                    <FlaskIcon size={16} /> Total Reconstituted Volume (mL)
                                </label>
                                <p className="text-[11px] text-slate-500 mb-3 leading-tight">
                                    Enter the total fluid volume you observe in the vial. Expected: about {expectedVol} mL.
                                </p>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Enter volume"
                                            value={reconstitutedVol}
                                            onChange={(e) => {
                                                setReconstitutedVol(e.target.value);
                                                setIsConfirmed(false);
                                            }}
                                            className={`w-full pl-3 pr-10 py-3 border rounded-lg focus:ring-2 outline-none font-bold transition-all ${isConfirmed ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : volError ? 'bg-red-50 border-red-500 focus:ring-red-500 text-red-800' : 'bg-white border-blue-300 focus:ring-blue-500 text-blue-800'}`}
                                        />
                                        <span className="absolute right-3 top-3.5 text-slate-400 text-sm">mL</span>
                                    </div>

                                    <button
                                        onClick={() => { scrollToResult.current = true; setIsConfirmed(true); }}
                                        disabled={!canConfirm || isConfirmed}
                                        className={`px-4 rounded-lg font-bold flex items-center gap-2 transition-all ${
                                            isConfirmed 
                                            ? 'bg-emerald-500 text-white shadow-sm' 
                                            : !canConfirm 
                                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
                                        }`}
                                    >
                                        {isConfirmed ? <><CheckIcon size={20} /> Confirmed</> : 'Confirm'}
                                    </button>
                                </div>

                                {volError && (
                                    <div className="flex items-start gap-1 mt-2 text-red-600" role="alert">
                                        <AlertCircleIcon size={14} className="shrink-0 mt-0.5" />
                                        <p className="text-xs font-bold">Error: {volError}</p>
                                    </div>
                                )}
                                {volWarning && !volError && (
                                    <div className="flex items-start gap-1 mt-2 text-amber-700" role="status">
                                        <AlertCircleIcon size={14} className="shrink-0 mt-0.5" />
                                        <p className="text-xs font-semibold">{volWarning}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Patient Age Group</label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(AGE_GUIDELINES).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => setAgeGroup(key)}
                                        className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center justify-center text-center h-20 ${
                                            ageGroup === key
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {key === 'infant' ? <BabyIcon size={18} className="mb-1"/> : <UserIcon size={18} className="mb-1"/>}
                                        {data.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isConfirmed && result ? (
                        <div ref={resultRef} aria-live="polite" className="space-y-4 scroll-mt-4">
                            <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-500 overflow-hidden">
                                <div className="p-6 bg-blue-50/50">
                                    <div className="text-center">
                                        <p className="text-slate-500 font-medium mb-1 uppercase tracking-wide text-xs">Final Volume to Draw</p>
                                        <div className="text-5xl font-bold text-blue-600 flex items-center justify-center gap-2">
                                            {result.volume}
                                            <span className="text-2xl text-slate-400 font-medium">mL</span>
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-tight">
                                            Verified Yield: {result.currentYield} mL
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 border-t border-slate-100 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full mt-1">
                                            <SyringeIcon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800">Administration Guide</h3>
                                            <div className="text-sm text-slate-600 mt-1 space-y-2">
                                                <p><span className="font-medium text-slate-900">Total Dose:</span> {doseOrdered} mg</p>

                                                {result.numInjections > 1 ? (
                                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                                                        <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                                                            <AlertCircleIcon size={16} /> Split Dose Required
                                                        </div>
                                                        <p>Exceeds {result.maxPerSite} mL limit. Split into <span className="font-bold">{result.numInjections} injections</span>.</p>
                                                        <p className="mt-2 text-amber-800 font-medium">~{(result.volume / result.numInjections).toFixed(1)} mL per site</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-emerald-700 font-medium flex items-center gap-2 mt-2">✓ Safe for single injection site</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setShowWork(!showWork)}
                                    className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-300 transition-colors"
                                >
                                    <EyeIcon size={16} />
                                    {showWork ? 'Hide Calculations' : 'Show Calculations'}
                                </button>

                                {showWork && (
                                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-600 animate-in slide-in-from-top-2 duration-300">
                                        <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                                            <CalculatorIcon size={14} /> Calculation Breakdown
                                        </h4>
                                        <div className="space-y-3 leading-relaxed">
                                            <div>
                                                <p className="font-semibold text-slate-700">1. Calculate Concentration:</p>
                                                <p className="pl-3">Vial Content ({vialSize} mg) ÷ Confirmed Yield ({result.currentYield} mL)</p>
                                                <p className="pl-3 text-blue-700 font-mono font-bold">= {result.concentration} mg/mL</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700">2. Calculate Draw Volume:</p>
                                                <p className="pl-3">Ordered Dose ({doseOrdered} mg) ÷ Concentration ({result.concentration} mg/mL)</p>
                                                <p className="pl-3 text-blue-700 font-mono font-bold">= {result.exactVolume} mL → <span className="underline">Rounded to {result.volume} mL</span></p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700">3. Injection Site Check:</p>
                                                <p className="pl-3">Total Volume ({result.volume} mL) ÷ Site Max for {AGE_GUIDELINES[ageGroup].label} ({result.maxPerSite} mL)</p>
                                                <p className="pl-3 text-blue-700 font-mono font-bold">= {result.numInjections} Site(s)</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
                            <p>Enter the dose and the observed volume, then tap Confirm to see the draw-up amount.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-[10px] text-slate-400 leading-tight">
                        <strong>Disclaimer:</strong> Educational tool only. Always verify calculations against institutional protocols.
                    </p>
                </div>
            </div>
        </div>
    );
}