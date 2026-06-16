import { useState, useEffect } from 'react'

// =====================================================================
// CLINICAL CONFIGURATION — REVIEW BEFORE USE
// Every calculation is driven by the numbers below. Verify each one
// against your institution's Rocephin (ceftriaxone) IM protocol and the
// current product labeling. This tool does NOT and CANNOT confirm that
// these values are clinically correct — that is a human responsibility.
// =====================================================================
const CONFIG = {
    // Upper safety ceiling for a single ordered dose (mg).
    maxDoseMg: 1000,

    // Per vial: powder strength (mg), diluent volume added (mL),
    // and the expected total reconstituted volume / yield (mL).
    vials: {
        '500':  { mg: 500,  diluentMl: 1.0, expectedYieldMl: 1.4 },
        '1000': { mg: 1000, diluentMl: 2.1, expectedYieldMl: 2.9 },
    },

    // Maximum volume per IM injection site (mL) by age group.
    ageGroups: {
        infant:      { label: 'Infant (< 1 yr)',  maxPerSiteMl: 1.0 },
        toddler:     { label: 'Toddler (1-2 yrs)', maxPerSiteMl: 1.5 },
        child_older: { label: 'Child (> 2 yrs)',   maxPerSiteMl: 2.0 },
    },

    // Warn (do not block) if the entered reconstituted volume deviates
    // from the expected yield by more than this fraction.
    yieldWarnTolerance: 0.25,

    // Flag if the delivered dose (after rounding the draw volume) differs
    // from the ordered dose by more than this fraction.
    deliveredDoseWarnPct: 0.05,

    // Syringe graduation used for rounding the draw volume (mL).
    volumeRoundingMl: 0.1,
}

// --- ICONS ---
const CalculatorIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
)
const SyringeIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 15-6-6"/><path d="m17 10 4-4"/><path d="m12 5 4-4"/><path d="m5 16 6-6"/><path d="m8 20 6-6"/><path d="m1 21 2-2"/><path d="m19 6 3-3"/><path d="m2 18 3 3"/></svg>
)
const AlertCircleIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
)
const InfoIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
)
const BabyIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.8 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.8A9 9 0 0 1 12 3v0a9 9 0 0 1 7 3.3z"/></svg>
)
const UserIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const FlaskIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
)
const CheckIcon = ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
)
const EyeIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
)

// --- VALIDATION (pure helpers, easy to read and review) ---
function validateDose(raw, maxDoseMg) {
    if (raw === '' || raw == null) return { valid: false, level: 'none', message: null }
    const n = parseFloat(raw)
    if (!isFinite(n) || n <= 0) return { valid: false, level: 'error', message: 'Enter a dose greater than 0 mg.' }
    if (n >= maxDoseMg) return { valid: true, level: 'warn', message: `At the ${maxDoseMg} mg safety ceiling.` }
    return { valid: true, level: 'ok', message: null }
}

function validateVolume(raw, vial, tolerance) {
    if (raw === '' || raw == null) return { valid: false, level: 'none', message: 'Enter the observed volume to continue.' }
    const n = parseFloat(raw)
    if (!isFinite(n) || n <= 0) return { valid: false, level: 'error', message: 'Volume must be greater than 0 mL.' }
    if (n < vial.diluentMl) return { valid: false, level: 'error', message: `Total volume cannot be less than the ${vial.diluentMl} mL of diluent added.` }
    if (n > vial.expectedYieldMl * 3) return { valid: false, level: 'error', message: 'Volume is implausibly large — re-check the entry.' }
    const dev = Math.abs(n - vial.expectedYieldMl) / vial.expectedYieldMl
    if (dev > tolerance) {
        return { valid: true, level: 'warn', message: `That is ${Math.round(dev * 100)}% off the expected ${vial.expectedYieldMl} mL — double-check the reading.` }
    }
    return { valid: true, level: 'ok', message: null }
}

// --- MAIN APP COMPONENT ---
export default function RocephinCalculator() {
    const [doseOrdered, setDoseOrdered] = useState('')
    const [vialSize, setVialSize] = useState('1000')
    const [ageGroup, setAgeGroup] = useState('child_older')
    const [reconstitutedVol, setReconstitutedVol] = useState('2.9')
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [showWork, setShowWork] = useState(false)
    const [result, setResult] = useState(null)

    const MAX_DOSE = CONFIG.maxDoseMg
    const vials = CONFIG.vials
    const ageGroups = CONFIG.ageGroups
    const vial = vials[vialSize]

    const doseCheck = validateDose(doseOrdered, MAX_DOSE)
    const volCheck = validateVolume(reconstitutedVol, vial, CONFIG.yieldWarnTolerance)

    useEffect(() => {
        setReconstitutedVol(vials[vialSize].expectedYieldMl.toString())
        setIsConfirmed(false)
    }, [vialSize])

    useEffect(() => {
        setIsConfirmed(false)
    }, [doseOrdered])

    useEffect(() => {
        if (isConfirmed) {
            calculate()
        } else {
            setResult(null)
        }
    }, [doseOrdered, vialSize, ageGroup, reconstitutedVol, isConfirmed])

    const handleDoseChange = (e) => {
        let val = e.target.value
        if (parseFloat(val) > MAX_DOSE) {
            val = MAX_DOSE.toString()
        }
        setDoseOrdered(val)
    }

    const calculate = () => {
        if (!doseCheck.valid || !volCheck.valid) {
            setResult(null)
            return
        }

        const dose = parseFloat(doseOrdered)
        const actualYield = parseFloat(reconstitutedVol)

        const concentration = vial.mg / actualYield // actualYield > 0 guaranteed by validation
        const calculatedVolume = dose / concentration
        const step = CONFIG.volumeRoundingMl
        const roundedVolume = Math.round(calculatedVolume / step) * step
        const roundedVolumeFixed = Number(roundedVolume.toFixed(2))

        const deliveredDose = roundedVolumeFixed * concentration
        const doseDelta = deliveredDose - dose
        const doseDeltaPct = (doseDelta / dose) * 100

        const guideline = ageGroups[ageGroup]
        const tooSmall = roundedVolumeFixed < step
        const numInjections = tooSmall ? 1 : Math.max(1, Math.ceil(roundedVolumeFixed / guideline.maxPerSiteMl))

        setResult({
            volume: roundedVolumeFixed,
            exactVolume: calculatedVolume.toFixed(2),
            concentration: concentration.toFixed(1),
            deliveredDose: Math.round(deliveredDose),
            doseDelta,
            doseDeltaPct,
            doseDeltaFlag: Math.abs(doseDeltaPct) > CONFIG.deliveredDoseWarnPct * 100,
            numInjections,
            tooSmall,
            maxPerSite: guideline.maxPerSiteMl,
            currentYield: actualYield,
        })
    }

    const confirmDisabled = !volCheck.valid || isConfirmed

    return (
        <div className="max-w-md mx-auto min-h-screen p-4 sm:p-6 pb-20">

            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                    <CalculatorIcon size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold">Rocephin Calculator</h1>
                    <p className="text-blue-100 text-xs">IM Draw-Up Assistant</p>
                </div>
            </div>

            <div className="space-y-6">

                {/* Input Section */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                        <InfoIcon size={18} /> Medication Details
                    </h2>

                    {/* Dose Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Dose Ordered (mg)</label>
                        <div className="relative">
                            <input
                                type="number"
                                inputMode="decimal"
                                min="0"
                                value={doseOrdered}
                                onChange={handleDoseChange}
                                max={MAX_DOSE}
                                placeholder="e.g. 500"
                                className={`w-full pl-3 pr-12 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-medium ${doseCheck.level === 'error' || doseCheck.level === 'warn' ? 'border-red-300' : 'border-slate-300'}`}
                            />
                            <span className="absolute right-4 top-3.5 text-slate-400 font-medium">mg</span>
                        </div>
                        {doseCheck.message && (
                            <p className={`text-[11px] font-bold mt-1 ${doseCheck.level === 'error' ? 'text-red-500' : 'text-amber-600'}`}>{doseCheck.message}</p>
                        )}
                    </div>

                    {/* Vial Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Vial Size Used</label>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {Object.keys(vials).map((size) => (
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

                    {/* Preparation Reference and Yield Confirmation */}
                    <div className="space-y-3 pt-2">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                            <h4 className="font-bold text-slate-700 mb-1">Reconstitution Instructions</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Add <strong>{vial.diluentMl} mL</strong> of 1% Lidocaine.</li>
                                <li className="text-slate-400 italic">Expected standard yield: {vial.expectedYieldMl} mL.</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm">
                            <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                                <FlaskIcon size={16} /> Total Reconstituted Volume (mL)
                            </label>
                            <p className="text-[11px] text-slate-500 mb-3 leading-tight">
                                Enter the actual total fluid volume observed in the vial.
                            </p>

                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        inputMode="decimal"
                                        value={reconstitutedVol}
                                        onChange={(e) => {
                                            setReconstitutedVol(e.target.value)
                                            setIsConfirmed(false)
                                        }}
                                        className={`w-full pl-3 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold transition-all ${isConfirmed ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : (volCheck.level === 'error' ? 'bg-white border-red-400 text-red-700' : 'bg-white border-blue-300 text-blue-800')}`}
                                    />
                                    <span className="absolute right-3 top-3.5 text-slate-400 text-sm">mL</span>
                                </div>

                                <button
                                    onClick={() => setIsConfirmed(true)}
                                    disabled={confirmDisabled}
                                    className={`px-4 rounded-lg font-bold flex items-center gap-2 transition-all ${isConfirmed ? 'bg-emerald-500 text-white shadow-sm' : (confirmDisabled ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95')}`}
                                >
                                    {isConfirmed ? <CheckIcon size={20} /> : 'Confirm'}
                                </button>
                            </div>

                            {volCheck.message && (
                                <p className={`text-[11px] font-medium mt-2 leading-tight ${volCheck.level === 'error' ? 'text-red-500' : 'text-amber-600'}`}>{volCheck.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Age Group Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Patient Age Group</label>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(ageGroups).map(([key, data]) => (
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

                {/* Results Section */}
                {isConfirmed && result ? (
                    <div className="space-y-4">
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
                                            <p><span className="font-medium text-slate-900">Ordered Dose:</span> {doseOrdered} mg</p>
                                            <p>
                                                <span className="font-medium text-slate-900">Delivers ~{result.deliveredDose} mg</span>
                                                <span className={result.doseDeltaFlag ? 'text-amber-600 font-medium' : 'text-slate-400'}>
                                                    {' '}({result.doseDelta >= 0 ? '+' : ''}{result.doseDelta.toFixed(0)} mg after rounding to {CONFIG.volumeRoundingMl} mL)
                                                </span>
                                            </p>

                                            {result.tooSmall && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 text-red-700">
                                                    <div className="flex items-center gap-2 font-bold mb-1">
                                                        <AlertCircleIcon size={16} /> Volume too small to measure
                                                    </div>
                                                    <p>The draw rounds to 0 mL at {CONFIG.volumeRoundingMl} mL graduations. Re-check the dose, vial size, and yield.</p>
                                                </div>
                                            )}

                                            {!result.tooSmall && result.numInjections > 1 ? (
                                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                                                    <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                                                        <AlertCircleIcon size={16} /> Split Dose Required
                                                    </div>
                                                    <p>Exceeds {result.maxPerSite} mL limit. Split into <span className="font-bold">{result.numInjections} injections</span>.</p>
                                                    <p className="mt-2 text-amber-800 font-medium">~{(result.volume / result.numInjections).toFixed(1)} mL per site</p>
                                                </div>
                                            ) : (!result.tooSmall && (
                                                <p className="text-emerald-700 font-medium flex items-center gap-2 mt-2">✓ Safe for single injection site</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Show Work Toggle */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setShowWork(!showWork)}
                                className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-300 transition-colors"
                            >
                                <EyeIcon size={16} />
                                {showWork ? 'Hide Calculations' : 'Show Calculations'}
                            </button>

                            {showWork && (
                                <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-600">
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
                                            <p className="font-semibold text-slate-700">3. Delivered Dose After Rounding:</p>
                                            <p className="pl-3">Drawn Volume ({result.volume} mL) × Concentration ({result.concentration} mg/mL)</p>
                                            <p className="pl-3 text-blue-700 font-mono font-bold">= ~{result.deliveredDose} mg ({result.doseDelta >= 0 ? '+' : ''}{result.doseDelta.toFixed(0)} mg)</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-700">4. Injection Site Check:</p>
                                            <p className="pl-3">Total Volume ({result.volume} mL) ÷ Site Max for {ageGroups[ageGroup].label} ({result.maxPerSite} mL)</p>
                                            <p className="pl-3 text-blue-700 font-mono font-bold">= {result.numInjections} Site(s)</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-8 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
                        <p>{volCheck.level === 'error' ? 'Correct the volume entry above to continue.' : 'Verify the Reconstituted Volume above to display final draw-up amount.'}</p>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center px-4">
                <p className="text-[10px] text-slate-400 leading-tight">
                    <strong>Disclaimer:</strong> Educational tool only. The vial yields, per-site limits, and dose ceiling
                    it uses must be verified against current product labeling and your institutional protocol by a
                    qualified clinician before any clinical use. Always independently confirm every calculation.
                </p>
            </div>
        </div>
    )
}
