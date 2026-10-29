
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StudioStatement() {
    const section = useRef(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) return;

            gsap.from(".statement-line", {
                y: 70,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section.current,
                    start: "top 50%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: section }
    );

    return (
        <section className="statement" ref={section}>
            <div className="statement-topline">
                <p>Our point of view</p>
                <p>02 — The studio</p>
            </div>

            <div className="statement-content">
                <p className="statement-kicker">WE BELIEVE IN</p>

                <h2 className="statement-title">
                    <span className="statement-line">MAKING</span>
                    <span className="statement-line">
                        <span className="statement-accent">DIGITAL</span>
                    </span>
                    <span className="statement-line">FEEL HUMAN.</span>
                </h2>

                <p className="statement-description">
                    The best digital experiences don't just look different.
                    They make people feel something. We bring strategy,
                    design, and motion together to make that happen.
                </p>
            </div>
        </section>
    );
}
