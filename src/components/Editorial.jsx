import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitTextComponent from "./SplitTextComponent";


gsap.registerPlugin(useGSAP)

const Editorial = () => {
    const hero = useRef(null)
    const heroTitleRef = useRef(null);

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            gsap.set(
                [
                    ".hero-eyebrow",
                    // ".hero-title",
                    ".hero-description",
                    ".hero-cta",
                    ".hero-visual",
                ],
                {
                    autoAlpha: 1,
                    clearProps: "opacity,visibility,transform",
                }
            );
            return;

        }


        const intro = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "power3.out",
            },
        });

        intro
            .from(".hero-eyebrow", {
                y: 18,
                autoAlpha: 0,
            })
            .from(
                ".hero-title",
                {
                    x: -70,
                    autoAlpha: 0,
                    duration: 1,
                    ease: "power4.out",
                },
                "-=0.4"
            )
            .from(
                ".hero-description, .hero-cta",
                {
                    y: 24,
                    autoAlpha: 0,
                    stagger: 0.12,
                },
                "-=0.35"
            )
            .from(
                ".hero-visual",
                {
                    y: 40,
                    autoAlpha: 0,
                    scale: 0.97,
                },
                "-=0.65"
            );


    }, { scope: hero })

    return (
        <main className="hero" ref={hero}>
            <div className="hero-topline">
                <p className="hero-eyebrow">Independent creative studio · 2026</p>
                <p className="hero-eyebrow">Available for select projects</p>
            </div>

            <section className="hero-layout">
                <div className="hero-copy">
                    <h1 className="hero-title" ref={heroTitleRef}>
                        <SplitTextComponent
                            text="WE MAKE"
                            exitTrigger={heroTitleRef}
                        />

                        <br />

                        <SplitTextComponent
                            text="IDEAS MOVE"
                            exitTrigger={heroTitleRef}
                        />

                        <span className="hero-period">.</span>
                    </h1>

                    <div className="hero-bottom">
                        <p className="hero-description">
                            We build distinctive digital experiences through
                            strategy, design, and motion.
                        </p>

                        <a className="hero-cta" href="#projects">
                            Explore our work <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>

                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-shape">
                        <span>FORM</span>
                        <span>MEETS</span>
                        <span>MOTION</span>
                    </div>
                    <span className="hero-visual-index">FIG. 001 — EXPERIMENT</span>
                </div>
            </section>
        </main>
    );
}


export default Editorial