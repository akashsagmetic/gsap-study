import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const DynamicReveal = () => {

    const container = useRef(null);
    const card = useRef(null);
    const [showDetails, setShowDetails] = useState(false);

    useGSAP(() => {
        gsap.from(card.current, {
            y: 50,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card.current,
                start: "top 70%",
                once: true,
                markers: true
            }
        })
    }, { scope: container })

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        ScrollTrigger.refresh();
    }, [showDetails]);

    return (
        <section ref={container} className="mx-auto max-w-2xl p-8">
            <button
                type="button"
                onClick={() => setShowDetails((previous) => !previous)}
                className="mb-8 rounded-lg bg-black px-5 py-3 text-white"
            >
                {showDetails ? "Hide details" : "Show details"}
            </button>

            {showDetails && (
                <div className="mb-8 rounded-lg bg-gray-700 p-8">
                    <h2 className="text-xl font-bold">Additional content</h2>
                    <p>This content changes the layout above the animated card.</p>
                </div>
            )}

            <div className="h-100">

            </div>

            <article
                ref={card}
                className="rounded-xl bg-indigo-600 p-10 text-white"
            >
                <h2 className="text-2xl font-bold">Animated card</h2>
                <p>Scroll down to see the reveal animation.</p>
            </article>
            <div className="h-screen"></div>

        </section>
    )
}

export default DynamicReveal