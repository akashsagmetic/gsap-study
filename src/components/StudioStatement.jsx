
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitTextComponent from "./SplitTextComponent";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StudioStatement() {
    const section = useRef(null);
    const statementRef = useRef(null);

    const statementCharsRef = useRef([]);

    const collectStatementChars = (chars) => {
        statementCharsRef.current.push(...chars)
    }

    useGSAP(() => {
        // statementCharsRef.current = [];
        const chars = statementCharsRef.current;

        const getCharacterMotion = (index) => {
            const pattern = index % 3;

            if (pattern === 0) return { x: -95, y: 0 };
            if (pattern === 1) return { x: 0, y: -120 };

            return { x: 0, y: 90 };
        };

        gsap.fromTo(
            chars,
            {
                x: 0,
                y: 0,
                autoAlpha: 1,
            },
            {
                x: (index) => getCharacterMotion(index).x,
                y: (index) => getCharacterMotion(index).y,
                autoAlpha: 0,
                duration: 0.7,
                stagger: 0.025,
                ease: "power2.in",
                immediateRender: false,
                scrollTrigger: {
                    trigger: statementRef.current,
                    start: "top 50%",
                    end: "bottom top",
                    toggleActions: "play none reverse none",
                    // markers: true,
                },
            }
        );
    }, { scope: statementRef });

    // useGSAP(
    //     () => {
    //         const prefersReducedMotion = window.matchMedia(
    //             "(prefers-reduced-motion: reduce)"
    //         ).matches;

    //         if (prefersReducedMotion) return;

    //         gsap.from(".statement-line", {
    //             y: 70,
    //             autoAlpha: 0,
    //             duration: 0.9,
    //             stagger: 0.15,
    //             ease: "power3.out",
    //             scrollTrigger: {
    //                 trigger: section.current,
    //                 start: "top 50%",
    //                 toggleActions: "play none none none",
    //             },
    //         });
    //     },
    //     { scope: section }
    // );

    return (
        <section className="statement" ref={section}>
            <div className="statement-topline">
                <p>Our point of view</p>
                <p>02 — The studio</p>
            </div>

            <div className="statement-content" >
                <p className="statement-kicker">WE BELIEVE IN</p>

                <h2 className="statement-title" ref={statementRef}>
                    <span className="statement-line">
                        <SplitTextComponent text={"MAKING"}  />
                    </span>
                    <span className="statement-line">
                        <span className="statement-accent">
                            <SplitTextComponent text={"DIGITAL"}  />
                        </span>
                    </span>
                    <span className="statement-line">
                        <SplitTextComponent text={"FEEL HUMAN."}  />

                    </span>
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
