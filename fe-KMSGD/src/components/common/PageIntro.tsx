import { useEffect, useState } from "react";


interface Done {
    onDone: () => void
}

function PageIntro({ onDone }: Done) {
    const [phase, setPhase] = useState("show");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("fadeout"), 1400);
        const t2 = setTimeout(() => onDone(), 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onDone]);

    if (phase === "done") return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "#131313",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
                opacity: phase === "fadeout" ? 0 : 1,
                transition: "opacity 0.6s ease",
                pointerEvents: phase === "fadeout" ? "none" : "all",
            }}
        >
            {/* Logo animasi masuk */}
            <div
                style={{
                    animation: "introScale 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
            >
                <div style={{
                    width: 64, height: 64,
                    background: "#FFD700",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800, fontSize: 18, color: "#1A1A1A",
                    letterSpacing: 1,
                }}>KMS</div>
            </div>
            <div
                style={{
                    color: "#FFD700",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: 4,
                    animation: "introFadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both",
                }}
            >
                KMSGD
            </div>
            <div
                style={{
                    color: "#d0c6ab",
                    fontSize: 11,
                    letterSpacing: 6,
                    textTransform: "uppercase",
                    animation: "introFadeUp 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both",
                }}
            >
                Jabodetabek
            </div>
            {/* Progress bar */}
            <div
                style={{
                    marginTop: 24,
                    width: 120, height: 2,
                    background: "#2D2D2D",
                    borderRadius: 99,
                    overflow: "hidden",
                }}
            >
                <div style={{
                    height: "100%",
                    background: "#FFD700",
                    animation: "introBar 1.2s ease forwards",
                }} />
            </div>

            <style>{`
                @keyframes introScale {
                    from { opacity: 0; transform: scale(0.6); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes introFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes introBar {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </div>
    );
}
export default PageIntro