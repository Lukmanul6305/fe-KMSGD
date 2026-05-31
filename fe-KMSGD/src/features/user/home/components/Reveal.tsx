import type { ReactNode } from "react";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";

type RevealDirection = "bottom" | "left" | "right" | "fade";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
    from?: RevealDirection;
}

const hiddenClasses: Record<RevealDirection, string> = {
    bottom: "opacity-0 translate-y-10",
    left: "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
    fade: "opacity-0 scale-[0.97]",
};

const delayClasses: Record<number, string> = {
    0: "",
    100: "delay-100",
    120: "delay-[120ms]",
    150: "delay-150",
    200: "delay-200",
    240: "delay-[240ms]",
    300: "delay-300",
};

export default function Reveal({ children, delay = 0, className = "", from = "bottom" }: Props) {
    const [ref, visible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out will-change-transform ${delayClasses[delay] ?? ""} ${visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenClasses[from]
                }`}
        >
            {children}
        </div>
    );
}