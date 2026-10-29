import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger)

const projects = [
    { number: "01", title: "Digital Experiences", category: "Design & Development" },
    { number: "02", title: "Motion Identity", category: "Art Direction" },
    { number: "03", title: "Future Interfaces", category: "Creative Technology" },
    { number: "04", title: "Visual Systems", category: "Brand Experience" },
];

const ScrollReveal = () => {
    const container = useRef(null)
    useGSAP(() => {
        gsap.from(".reveal-card", {
            y: 70,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.65,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".cards-section",
                start: "top 90%",
                toggleActions: "play none none reverse",
                
            }
        })

        gsap.from(".section-heading h2", {
            x: -100,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".cards-section",
                start: "top 80%",
                end: "top 30%",
                scrub: true
            }
        })

    }, { scope: container })
    return (
        <main className="scroll-page" ref={container}>
            <section className="scroll-intro">
                <p className="scroll-eyebrow">SELECTED WORK / 2026</p>
                <h1>Good design<br />moves <span>you.</span></h1>
                <p className="scroll-hint">SCROLL TO EXPLORE ↓</p>
            </section>

            <section className="cards-section">
                <div className="section-heading">
                    <p>OUR EXPERTISE</p>
                    <h2>Ideas into experiences.</h2>
                </div>

                <div className="reveal-grid">
                    {projects.map((project) => (
                        <article className="reveal-card" key={project.number}>
                            <span className="project-number">
                                {project.number}
                            </span>
                            <div>
                                <p>{project.category}</p>
                                <h3>{project.title}</h3>
                            </div>
                            <span className="project-arrow">↗</span>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ScrollReveal