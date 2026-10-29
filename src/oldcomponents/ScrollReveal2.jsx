import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ScrollReveal2 = () => {

    const container = useRef(null);

    //    useGSAP(() => {
    //   const cards = gsap.utils.toArray(
    //     ".reveal-card",
    //     container.current
    //   );

    //   const revealCard = (card) => {
    //     gsap.from(card, {
    //       y: 60,
    //       autoAlpha: 0,
    //       duration: 0.8,
    //       ease: "power3.out",
    //       scrollTrigger: {
    //         trigger: card,
    //         start: "top 85%",
    //         markers: true,
    //         once: true,
    //       },
    //     });
    //   };

    //   cards.forEach((card) => revealCard(card));
    // }, { scope: container });


    useGSAP(() => {
        const mm = gsap.matchMedia();

        const cards = gsap.utils.toArray(
            ".reveal-card",
            container.current
        );

        // Desktop: one group tween with stagger
        mm.add("(min-width: 768px)", () => {
            gsap.from(cards, {
                y: 80,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current.querySelector(".cards-wrapper"),
                    start: "top 70%",
                    once: true,
                    markers: true,
                },
            });
        });

        // Mobile: an independent tween and trigger for each card
        mm.add("(max-width: 767px)", () => {
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                        once: true,
                        markers: true,
                    },
                });
            });
        });
    }, { scope: container });



    return (
        <section
            ref={container}
            className="min-h-[180vh] px-8 py-16"
        >
            <div className="flex min-h-[70vh] items-center">
                <h1 className="text-5xl font-bold">
                    Scroll to discover.
                </h1>
                <button
                    onClick={() => (ScrollTrigger.refresh())}
                    className="rounded-lg bg-black px-4 py-2 text-white cursor-pointer"
                >
                    Refresh ScrollTrigger
                </button>
            </div>

            <div className="cards-wrapper space-y-6">
                <div className="reveal-card rounded-2xl bg-amber-300 p-12">
                    <p className="text-sm uppercase tracking-widest">
                        Featured project
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold">
                        Built to stand out.
                    </h2>
                </div>
                <div className="reveal-card rounded-2xl bg-blue-300 p-12">
                    <p className="text-sm uppercase tracking-widest">
                        Featured project
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold">
                        Built to stand out.
                    </h2>
                </div>
                <div className="reveal-card rounded-2xl bg-green-300 p-12">
                    <p className="text-sm uppercase tracking-widest">
                        Featured project
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold">
                        Built to stand out.
                    </h2>
                </div>
            </div>

            <div className="flex min-h-screen items-center">
                <h1 className="text-5xl font-bold">
                    Scroll to discover.
                </h1>
            </div>
        </section>
    )
}

export default ScrollReveal2