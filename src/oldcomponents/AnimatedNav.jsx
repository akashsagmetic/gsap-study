
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const links = ["Home", "Work", "About", "Contact"];

export default function AnimatedNav() {
    const container = useRef(null);
    const menu = useRef(null);
    const linksRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const timelineRef = useRef(null)


    const { contextSafe } = useGSAP(
        () => {
            gsap.set(menu.current, {
                autoAlpha: 0,
                yPercent: -3,
                pointerEvents: "none",
            });

            gsap.set(linksRef.current, {
                y: 35,
                autoAlpha: 0,
            });

            // Create ONE timeline.
            const tl = gsap.timeline({ paused: true });

            // Step 1: Reveal the menu overlay.
            tl.to(menu.current, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.4,
                ease: "power2.out",
            });

            // Step 2: Reveal the links, one after another.
            tl.to(
                linksRef.current,
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.1"
            );

            // Store the timeline so clicks can reuse it.
            timelineRef.current = tl;

            // Disable interaction when the menu finishes closing.
            tl.eventCallback("onReverseComplete", () => {
                gsap.set(menu.current, { pointerEvents: "none" });
            });
        },
        { scope: container }
    );


    const toggleMenu = () => {
        const timeline = timelineRef.current;

        if (!timeline) return;

        const shouldOpen = !isOpen;

        setIsOpen(shouldOpen);

        if (shouldOpen) {
            gsap.set(menu.current, {
                pointerEvents: "auto",
            });

            timeline.play();
        } else {
            timeline.reverse();
        }
    };



    return (
        <div className="nav-shell" ref={container}>
            <nav className="nav-bar">
                <a className="nav-logo" href="#home">
                    STUDIO<span>®</span>
                </a>


                <button
                    className={`menu-toggle ${isOpen ? "is-open" : ""}`}
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span className="menu-icon" aria-hidden="true">
                        <span />
                        <span />
                    </span>
                    <span>{isOpen ? "CLOSE" : "MENU"}</span>
                </button>

            </nav>

            <div className="menu-overlay" ref={menu} aria-hidden={!isOpen}>
                <div className="menu-content">
                    <p className="menu-label">EXPLORE</p>

                    <div className="menu-links">
                        {links.map((link, index) => (
                            <a
                                href={`#${link.toLowerCase()}`}
                                className="menu-link"
                                key={link}
                                ref={(el) => {
                                    linksRef.current[index] = el;
                                }}
                                tabIndex={isOpen ? 0 : -1}
                            >
                                <span className="menu-number">
                                    0{index + 1}
                                </span>
                                {link}
                            </a>
                        ))}
                    </div>

                    <p className="menu-footer">
                        Independent digital experiences.
                    </p>
                </div>
            </div>
        </div>
    );
}
