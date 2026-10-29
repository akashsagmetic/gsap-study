import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react";


gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
    "Digital Experiences",
    "Motion Identity",
    "Future Interfaces",
    "Visual Systems",
];

const HorizontalsProject = () => {

    const container = useRef(null);
    const track = useRef(null);




  
useGSAP(() => {
  const mm = gsap.matchMedia();

  // DESKTOP: pinned horizontal portfolio
  mm.add("(min-width: 768px)", () => {
    const getDistance = () =>
      track.current.scrollWidth -
      track.current.parentElement.clientWidth;

    const horizontalTween = gsap.to(track.current, {
      x: () => -getDistance(),
      ease: "none",

      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    const cards = gsap.utils.toArray(
      ".horizontal-card",
      container.current
    );

    cards.forEach((card) => {
      gsap.from(card, {
        scale: 0.85,
        opacity: 0.5,
        ease: "none",

        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalTween,
          start: "left 85%",
          end: "left 55%",
          scrub: true,
        },
      });
    });
  });

  // MOBILE: vertical card reveal, no horizontal pinning

mm.add("(max-width: 767px)", () => {
  const cards = gsap.utils.toArray(
    ".horizontal-card",
    container.current
  );

  cards.forEach((card) => {
    gsap.from(card, {
      y: 35,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",

      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
});

}, { scope: container });



    return (
        <section className="horizontal-section" ref={container}>
            <div className="horizontal-heading">
                <p>SELECTED WORK / 2026</p>
                <h2>Ideas in motion.</h2>
            </div>

            <div className="horizontal-viewport">
                <div className="horizontal-track" ref={track}>
                    {projects.map((project, index) => (
                        <article className="horizontal-card" key={project}>
                            <span>0{index + 1}</span>
                            <h3>{project}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HorizontalsProject