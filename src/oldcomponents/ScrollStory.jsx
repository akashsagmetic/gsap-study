import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ScrollStory = () => {
    const container = useRef(null);

    const [panelCounter, setPanelCounter] = useState("1")
    const progressRef = useRef(null)


    useGSAP(() => {
        const panels = gsap.utils.toArray(".fpanel", container.current);

        gsap.set(panels, { yPercent: 100 });
        gsap.set(panels[0], { yPercent: 0 });

        gsap.set(panels[1], { xPercent: -100, yPercent: 0 });

        gsap.set(panels[2], { yPercent: 0, xPercent: 100 });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin : "left center" })


        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=2000",
                scrub: true,
                pin: true,
            },
        });

        gsap.set(progressRef.current, { scaleX: timeline.progress() })

        gsap.from(panels[0].querySelector(".panel-content"), {
            y: 45,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
        });

        timeline
            .to(panels[1], {
                xPercent: 0,
                ease: "none",
            })
            .addLabel("panel2")
            .from(
                panels[1].querySelector(".panel-content"),
                {
                    y: 35,
                    autoAlpha: 0,
                    duration: 0.3,
                },
                "+=0.2"
            )
            .to(panels[2], {
                xPercent: 0,
                ease: "none",
            })
            .addLabel("panel3")
            .from(
                panels[2].querySelector(".panel-content"),
                {
                    y: 35,
                    autoAlpha: 0,
                    duration: 0.3,
                },
                "+=0.2"
            )

        timeline.to(
            progressRef.current,
            {
                scaleX: 1,
                duration: 1,
                ease: "none",
            },
            0
        );


        timeline.eventCallback("onUpdate", () => {
            const time = timeline.time();

            gsap.set(progressRef.current, {
                scaleX: timeline.progress(),
            });

            if (time >= timeline.labels.panel3) {
                setPanelCounter("3");
            } else if (time >= timeline.labels.panel2) {
                setPanelCounter("2");
            } else {
                setPanelCounter("1");
            }
        });

    }, { scope: container });



    return (
        <section
            className="relative w-full h-screen overflow-hidden text-black"
            ref={container}
        >
            <div className={`fixed top-10 left-0 w-full z-20 px-20`}>
                <div className={`w-full`}>
                    <p>01/{panelCounter}</p>
                    <div className="w-full border border-gray-800 mt-3 mb-2">
                        <div
                            ref={progressRef}
                            className="h-1 w-full bg-orange-800"
                        />
                    </div>
                    <p>Discover → Create → Launch</p>
                </div>
            </div>
            <div className="fpanel absolute inset-0 bg-amber-300 text-center ">
                <div className="panel-content absolute bottom-8 left-9">
                    <p className="mb-3 text-sm uppercase tracking-widest">
                        Our approach / 01
                    </p>

                    <h1 className="text-6xl md:text-8xl font-semibold">
                        Discover.
                    </h1>

                    <p className="mt-4 max-w-md text-lg md:text-xl">
                        Find the opportunity. Turn a bold idea into a clear direction.
                    </p>
                </div>
            </div>
            <div className="fpanel absolute inset-0 bg-green-500">
                <div className="panel-content absolute bottom-8 left-9">
                    <p className="mb-3 text-sm uppercase tracking-widest">
                        Our approach / 02
                    </p>

                    <h1 className="text-6xl md:text-8xl font-semibold">
                        CREATE.
                    </h1>

                    <p className="mt-4 max-w-md text-lg md:text-xl">
                        Shape the vision. Build an experience people remember.
                    </p>
                </div>
            </div>
            <div className="fpanel absolute inset-0 bg-blue-400">
                <div className="panel-content absolute bottom-8 left-9">
                    <p className="mb-3 text-sm uppercase tracking-widest">
                        Our approach / 03
                    </p>

                    <h1 className="text-6xl md:text-8xl font-semibold">
                        LAUNCH.
                    </h1>

                    <p className="mt-4 max-w-md text-lg md:text-xl">
                        Make the impact. Bring your vision into the world.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ScrollStory