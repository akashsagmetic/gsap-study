import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import projects from "../data/projects";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectGrid() {
    const section = useRef(null);
    const arrowRefs = useRef([])
    const artRefs = useRef([]);



   
const { contextSafe } = useGSAP(
  () => {
    const cards = gsap.utils.toArray(
      ".project-card",
      section.current
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(cards, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
      });

      return;
    }

    gsap.from(cards, {
      y: 90,
      autoAlpha: 0,
      scale: 0.96,
      duration: 1.1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section.current,
        start: "top 35%",
        toggleActions: "play none none none",
      },
    });
  },
  { scope: section }
);



    const handleMouseEnter = contextSafe((index) => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        gsap.to(arrowRefs.current[index], {
            x: 5,
            y: -5,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
        })
    })

    const handleMouseLeave = contextSafe((index) => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        gsap.to(arrowRefs.current[index], {
            x: 0,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
        })
    })

    const handleArtEnter = contextSafe((index) => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        gsap.to(artRefs.current[index], {
            scale: 0.985,
            y: -4,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
        })
    })

    const handleArtLeave = contextSafe((index) => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        gsap.to(artRefs.current[index], {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
        })
    })




    return (
        <section className="projects" id="projects" ref={section}>
            <div className="projects-heading">
                <p className="projects-eyebrow">Selected work — 2025/26</p>
                <h2 className="projects-title">A FEW THINGS WE'VE MADE.</h2>
            </div>

            <div className="project-grid">
                {projects.map((project, index) => (
                    <article className="project-card" key={project.id} onMouseEnter={() => { handleMouseEnter(index), handleArtEnter(index) }} onMouseLeave={() => { handleMouseLeave(index), handleArtLeave(index) }}>
                        <div
                            className="project-art"
                            ref={(el) => artRefs.current[index] = el}
                            style={{ "--project-color": project.color }}
                        >
                            <span className="project-number">{project.id}</span>

                            <div
                                className={`project-shape project-shape--${project.shape}`}
                                aria-hidden="true"
                            />

                            <span className="project-year">{project.year}</span>
                        </div>

                        <div className="project-meta">
                            <div>
                                <h3 className="project-name">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                            </div>

                            <span className="project-arrow" aria-hidden="true" ref={(el) => { arrowRefs.current[index] = el }}>
                                ↗
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}