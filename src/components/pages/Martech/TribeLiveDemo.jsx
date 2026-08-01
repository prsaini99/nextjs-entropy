"use client";

import { useRef, useState, useCallback } from "react";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

// Engagement arc for the 05-22 creative, reconstructed from the TRIBE v2
// neural pre-test report: immediate jump, peak at s6, holds high to ~s18,
// gradual decline, self-relevance surge s37–44, trough at s52, small
// final-frame recovery. Duration 56s; one value per second, relative 0–1.
const DURATION = 56;
const CURVE = [
    0.42, 0.58, 0.72, 0.82, 0.9, 0.96, 1.0, 0.98, 0.95, 0.93,
    0.91, 0.9, 0.88, 0.87, 0.86, 0.84, 0.83, 0.82, 0.8, 0.76,
    0.72, 0.69, 0.66, 0.64, 0.62, 0.6, 0.58, 0.57, 0.55, 0.54,
    0.52, 0.51, 0.5, 0.49, 0.48, 0.47, 0.47, 0.52, 0.56, 0.59,
    0.6, 0.58, 0.55, 0.52, 0.48, 0.44, 0.4, 0.36, 0.32, 0.28,
    0.24, 0.2, 0.17, 0.22, 0.28, 0.33, 0.35,
];

const EVENTS = [
    { at: 6, label: "Peak attention" },
    { at: 40, label: "Self-relevance surge (s37–44)" },
    { at: 52, label: "Trough, CTA lands too late" },
];

const HEAD_TO_HEAD = [
    { metric: "Hook (first 3s)", a: "0.139", b: "0.126", edge: "05-22" },
    { metric: "Overall engagement", a: "0.132", b: "0.134", edge: "tie" },
    { metric: "Peak timing", a: "second 6", b: "second 13", edge: "differs" },
    { metric: "Trough timing", a: "second 52", b: "second 21", edge: "differs" },
];

const NETWORKS = [
    { name: "Visual (imagery)", a: 0.204, b: 0.199, note: "strongest" },
    { name: "Dorsal attention", a: 0.139, b: 0.126, note: "" },
    { name: "Default mode (self-relevance)", a: 0.13, b: 0.136, note: "" },
    { name: "Salience / arousal", a: 0.101, b: 0.122, note: "" },
    { name: "Limbic / OFC (value)", a: 0.069, b: 0.072, note: "shared weakness" },
];

const W = 560;
const H = 150;

function phaseFor(t) {
    if (t <= 3) return "Hook window, thumb-stop decision happens here";
    if (t <= 18) return "Peak plateau, strong open, attention held high";
    if (t < 37) return "Gradual decline, mid-roll needs an arousal accent";
    if (t <= 44) return "Self-relevance surge, the 'is this about me' system re-engages";
    if (t <= 52) return "Weak tail, attention bottoms out at s52";
    return "Final-frame recovery";
}

export default function TribeLiveDemo() {
    const videoRef = useRef(null);
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);

    const onTimeUpdate = useCallback(() => {
        const v = videoRef.current;
        if (v) setTime(v.currentTime);
    }, []);

    const t = Math.min(time, DURATION);
    const idx = Math.min(Math.floor(t), CURVE.length - 1);
    const frac = t - Math.floor(t);
    const next = CURVE[Math.min(idx + 1, CURVE.length - 1)];
    const attention = CURVE[idx] + (next - CURVE[idx]) * frac;

    const step = W / (CURVE.length - 1);
    const points = CURVE.map(
        (v, i) => `${(i * step).toFixed(1)},${(H - v * H * 0.92).toFixed(1)}`
    );
    const path = `M${points.join(" L")}`;
    const area = `${path} L${W},${H} L0,${H} Z`;
    const px = (t / DURATION) * W;
    const py = H - attention * H * 0.92;

    // Fires once per session. Someone who plays the demo or scrubs to a scored
    // moment is evaluating the product, not skimming the page — that's the
    // strongest engagement signal on this page, and it was previously invisible.
    const interacted = useRef(false);
    const trackInteract = (action) => {
        if (interacted.current) return;
        interacted.current = true;
        trackEvent(ANALYTICS_EVENTS.DEMO_INTERACT, {
            demo_name: "TRIBE v2 Live Lab",
            demo_action: action,
            demo_location: "creative-analysis",
        });
    };

    const seekTo = (seconds) => {
        trackInteract("seek");
        const v = videoRef.current;
        if (v) {
            v.currentTime = seconds;
            setTime(seconds);
        }
    };

    return (
        <section id="tribe-live-demo">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <div className="text-size-small text-weight-bold text-[#ed5145] uppercase tracking-wider mb-4">
                                    Live Example · A Real Ad We Scored
                                </div>
                                <h2 className="heading-4 text-weight-medium">
                                    Watch the Ad. Watch Its Brain Response, In Real Time.
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            This is one of two real creatives from our neural
                                            pre-test (the &ldquo;05-22&rdquo; ad, the one with the
                                            winning hook). Press play: the marker sweeps the
                                            predicted-attention curve as the video runs, so you can
                                            see exactly where the brain leans in and where it
                                            drifts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 w-full items-stretch">
                            <AnimatedInViewDiv className="border border-white/10 rounded-lg overflow-hidden bg-black flex flex-col">
                                <div className="flex-1 flex items-center justify-center min-h-0">
                                    <video
                                        ref={videoRef}
                                        src="/videos/tribe-ad-0522.mp4"
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="w-auto h-full max-h-[480px] lg:max-h-[560px] object-contain"
                                        onTimeUpdate={onTimeUpdate}
                                        onPlay={() => {
                                            trackInteract("play");
                                            setPlaying(true);
                                        }}
                                        onPause={() => setPlaying(false)}
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between gap-3 text-size-small border-t border-white/10">
                                    <span className="opacity-50">
                                        Ad &ldquo;05-22&rdquo; · 56s · full trimodal analysis
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full border text-weight-bold ${
                                            playing
                                                ? "border-[#ed5145] text-[#ed5145]"
                                                : "border-white/20 opacity-50"
                                        }`}
                                    >
                                        {playing ? "ANALYZING" : "PAUSED"}
                                    </span>
                                </div>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv
                                delay={0.15}
                                className="border border-white/10 rounded-lg p-6 lg:p-8 bg-white/[0.03] flex flex-col gap-5"
                            >
                                <div className="flex items-baseline justify-between gap-4">
                                    <div className="text-size-small opacity-50">
                                        Predicted cortical attention · per second
                                    </div>
                                    <div className="text-size-small opacity-50">
                                        t = {t.toFixed(1)}s
                                    </div>
                                </div>

                                <svg viewBox={`0 0 ${W} ${H + 26}`} className="w-full h-auto">
                                    <defs>
                                        <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ed5145" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#ed5145" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="0" y="0" width={(3 / DURATION) * W} height={H} fill="#ffffff" opacity="0.07" />
                                    <path d={area} fill="url(#liveFill)" />
                                    <path d={path} fill="none" stroke="#ed5145" strokeWidth="2.5" strokeLinejoin="round" />
                                    {EVENTS.map((e) => (
                                        <circle
                                            key={e.at}
                                            cx={(e.at / DURATION) * W}
                                            cy={H - CURVE[e.at] * H * 0.92}
                                            r="4"
                                            fill="#ffffff"
                                            opacity="0.5"
                                            className="cursor-pointer"
                                            onClick={() => seekTo(e.at)}
                                        />
                                    ))}
                                    {/* playhead */}
                                    <line x1={px} y1="0" x2={px} y2={H} stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                                    <circle cx={px} cy={py} r="6" fill="#ed5145" stroke="#ffffff" strokeWidth="2" />
                                    <text x="6" y={H + 18} fill="#ffffff" opacity="0.5" fontSize="11">
                                        hook (0–3s)
                                    </text>
                                    <text x={W - 4} y={H + 18} fill="#ffffff" opacity="0.5" fontSize="11" textAnchor="end">
                                        56s
                                    </text>
                                </svg>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border border-white/10 rounded-lg p-4">
                                        <div className="text-size-small opacity-50">
                                            Attention now
                                        </div>
                                        <div className="heading-5 text-weight-bold text-[#ed5145]">
                                            {Math.round(attention * 100)}
                                            <span className="text-size-small opacity-50">/100</span>
                                        </div>
                                    </div>
                                    <div className="border border-white/10 rounded-lg p-4">
                                        <div className="text-size-small opacity-50">Phase</div>
                                        <div className="text-size-small text-weight-medium mt-1">
                                            {phaseFor(t)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {EVENTS.map((e) => (
                                        <button
                                            key={e.at}
                                            onClick={() => seekTo(e.at)}
                                            className="text-size-small border border-white/15 rounded-full px-3 py-1 opacity-60 hover:opacity-100 hover:border-[#ed5145] transition-all"
                                        >
                                            s{e.at} · {e.label}
                                        </button>
                                    ))}
                                </div>
                            </AnimatedInViewDiv>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                            <AnimatedInViewDiv className="border border-white/10 rounded-lg p-8 bg-white/[0.02]">
                                <h3 className="text-weight-medium mb-4">
                                    Head-to-head: 05-22 vs the prior creative
                                </h3>
                                <div className="overflow-hidden rounded-lg border border-white/10">
                                    <div className="grid grid-cols-4 bg-white/[0.06] text-size-small text-weight-bold">
                                        <div className="p-3">Metric</div>
                                        <div className="p-3 text-[#ed5145]">05-22 (this ad)</div>
                                        <div className="p-3">05-02 (prior)</div>
                                        <div className="p-3">Edge</div>
                                    </div>
                                    {HEAD_TO_HEAD.map((r) => (
                                        <div
                                            key={r.metric}
                                            className="grid grid-cols-4 border-t border-white/10 text-size-small"
                                        >
                                            <div className="p-3 opacity-70">{r.metric}</div>
                                            <div className="p-3 text-weight-medium">{r.a}</div>
                                            <div className="p-3 opacity-60">{r.b}</div>
                                            <div className={`p-3 ${r.edge === "05-22" ? "text-[#ed5145] text-weight-bold" : "opacity-50"}`}>
                                                {r.edge}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-size-small opacity-50 mt-4">
                                    Verdict from the report: near-tied on total engagement,
                                    opposite in shape, and for feed/reels, where the first three
                                    seconds decide thumb-stop, the 05-22 hook wins the first
                                    dollars of spend.
                                </p>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv delay={0.1} className="border border-white/10 rounded-lg p-8 bg-white/[0.02]">
                                <h3 className="text-weight-medium mb-4">
                                    Network-by-network activation (Yeo-7 atlas)
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {NETWORKS.map((n) => (
                                        <div key={n.name} className="flex flex-col gap-1">
                                            <div className="flex justify-between text-size-small">
                                                <span className="opacity-70">
                                                    {n.name}
                                                    {n.note && (
                                                        <span className="text-[#ed5145] opacity-90"> · {n.note}</span>
                                                    )}
                                                </span>
                                                <span className="opacity-50">
                                                    {n.a.toFixed(3)} vs {n.b.toFixed(3)}
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                <div
                                                    className="h-full bg-[#ed5145]"
                                                    style={{ width: `${(n.a / 0.204) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-size-small opacity-50 mt-4">
                                    The diagnostic both ads shared: the value network (Limbic/OFC)
                                    fires only at the open and fades, the clearest fix to move
                                    from &ldquo;engaging&rdquo; to &ldquo;persuasive.&rdquo; That
                                    is the kind of insight raw CTR can&apos;t give you.
                                </p>
                            </AnimatedInViewDiv>
                        </div>

                        <AnimatedInViewDiv className="text-size-small opacity-40 max-w-4xl">
                            Method: whole-cortex brain-response prediction from an award-winning
                            neural encoding model, using the full video + audio + narration
                            signal. Scores are relative within the test set and directional
                            pre-calibration; the attention curve shown is reconstructed from the
                            report&apos;s per-second arc.
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
