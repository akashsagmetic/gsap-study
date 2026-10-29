import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger)

const projects = [
    { id: "01", name: "Beyond the Ordinary", category: "Art Direction" },
    { id: "02", name: "Objects of Tomorrow", category: "Digital Experience" },
    { id: "03", name: "A Different Perspective", category: "Brand Identity" },
    { id: "04", name: "The New Ritual", category: "Campaign" },
];

const CinematicGallery = () => {
    const section = useRef(null);
    const track = useRef(null)

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        if (prefersReducedMotion) return;

        const trackDistance = () =>
            track.current.scrollWidth - window.innerWidth;

        const artLayers = gsap.utils.toArray(
            ".cinema-art-layer",
            section.current
        );

        const captionArray = gsap.utils.toArray(".cinema-caption", section.current);

        const master = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: () => `+=${trackDistance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        master.to(
            track.current,
            {
                x: () => -trackDistance(),
                ease: "none",
                duration: projects.length - 1,
            },
            0
        );

        master.to(
            artLayers,
            {
                xPercent: 13,
                ease: "none",
                duration: projects.length - 1,
            },
            0
        );

        captionArray.forEach((caption, index) => {
            const position = index;
            const previousIndex = index - 1;
            const previousCaption = captionArray[previousIndex];


            if (previousCaption) {
                master.to(
                    previousCaption,
                    {
                        autoAlpha: 0,
                        y: -20,
                        duration: 0.3,
                        ease: "power2.in",
                    },
                    position - 0.9
                );
            }

            master.fromTo(
                caption,
                {
                    y: 30,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: "power3.out",
                },
                position - 0.2
            );
        });

        const cinemaIndexArray = gsap.utils.toArray(".cinema-index", section.current)
        cinemaIndexArray.forEach((cinemaIndex, index) => {
            const position = index;
            const previousIndex = index - 1;
            const previousCinemaIndex = cinemaIndexArray[previousIndex]

            if (previousCinemaIndex) {
                master.to(previousCinemaIndex, {
                    autoAlpha: 0,
                    x: 30,
                    duration: 0.3,
                    ease: "power2.in"
                }, position - 0.7)
            }

            master.fromTo(cinemaIndex, {
                x: -30,
                autoAlpha: 0,
            },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: "power3.out"
                },
                position - 0.2

            )

        })


        const artwords = gsap.utils.toArray(
            ".cinema-art-word",
            section.current
        );

        artwords.forEach((artword, index) => {
            const position = index;

            master.fromTo(
                artword,
                {
                    scale: 0.8,
                    y: 30,
                    autoAlpha: 0,
                },
                {
                    scale: 1,
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power3.out",
                },
                position - 0.01
            );

            if (index < artwords.length - 1) {
                master.to(
                    artword,
                    {
                        scale: 0.8,
                        y: -20,
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: "power2.in",
                    },
                    position + 1 - 0.5
                );
            }
        });



        return () => {
            master.scrollTrigger?.kill();
            master.kill();
        };

    }, { scope: section })


    return (
        <section className="cinema" ref={section} aria-label="Selected projects">
            <div className="cinema-track" ref={track}>
                {projects.map((project, index) => (
                    <article className="cinema-panel" key={project.id}>

                        <div className={`cinema-art cinema-art--${index + 1}`}>
                            <span className="cinema-index">
                                {project.id} / 04
                            </span>

                            <div className="cinema-art-layer">
                                <span className="cinema-art-word" aria-hidden="true">
                                    {["FORM", "OBJECT", "VISION", "RITUAL"][index]}
                                </span>
                            </div>
                        </div>
                    

                        <div className="cinema-caption">
                            <div>
                                <p>{project.category}</p>
                                <h2>{project.name}</h2>
                            </div>
                            <span aria-hidden="true">↗</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>

    )
}

export default CinematicGallery