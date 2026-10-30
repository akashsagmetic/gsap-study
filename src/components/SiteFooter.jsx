import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import React, { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
const SiteFooter = () => {
    const footer = useRef(null);
    const contactLink = useRef(null);
    const arrow = useRef(null);

    const { contextSafe } = useGSAP(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce").matches
        if (prefersReducedMotion) return;

        let split, animation;
        split && split.revert();
        animation && animation.revert();
        split = SplitText.create(".footer-title", { type: "chars,words,lines" })

        gsap.from(".footer-reveal", {
            y: 35,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: footer.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        })

        animation = gsap.from(split.words, {
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 0.7,
            ease: "back",
            stagger: 0.15,
            scrollTrigger : {
                trigger : footer.current,
                start : "top 20%"
            }
        })

    }, { scope: footer })


    const handleEnter = contextSafe(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return
        }

        gsap.to(arrow.current, {
            x: 7,
            y: -7,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
        })

    })

    const handleLeave = contextSafe(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce").matches) {
            return
        }

        gsap.to(arrow.current, {
            x: 0,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
        })

    })


    return (
        <footer className="site-footer" ref={footer}>
            <div className="footer-topline footer-reveal">
                <p>Have a project in mind?</p>
                <p>Available for select projects</p>
            </div>

            <div className="footer-main">
                <h2 className="footer-title footer-reveal">
                    HAVE A GOOD ONE.
                    <br />
                    MAKE A GOOD ONE.
                </h2>

                <a
                    className="footer-contact footer-reveal"
                    href="mailto:hello@example.com"
                    ref={contactLink}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    onFocus={handleEnter}
                    onBlur={handleLeave}
                >
                    <span>Start a project</span>
                    <span className="footer-arrow" ref={arrow} aria-hidden="true">
                        ↗
                    </span>
                </a>
            </div>

            <div className="footer-bottom footer-reveal">
                <a href="mailto:hello@example.com">hello@example.com</a>

                <div className="footer-socials">
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        Instagram ↗
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                        LinkedIn ↗
                    </a>
                </div>

                <p>© {new Date().getFullYear()} — Independent by design.</p>
            </div>
        </footer>
    )
}

export default SiteFooter