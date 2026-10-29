import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

const CleanupLab = () => {

    const killCard = useRef(null);
    const revertCard = useRef(null);
    const killTween = useRef(null);
    const revertTween = useRef(null);

    const animateKillCard = () => {
        killTween.current?.kill();
        killTween.current = gsap.to(killCard.current, {
            x: 180,
            rotation: 15,
            opacity: 0.5,
            duration: 2,
            ease: "power2.inOut"
        });


    }

    const stopWithKill = () => {
        killTween.current?.kill()
    }


    const animateRevertCard = () => {
        revertTween.current?.revert();
        revertTween.current = gsap.to(revertCard.current, {
            x: 180,
            rotation: 15,
            opacity: 0.5,
            duration: 2,
            ease: "power2.inOut"
        })
    }

    const undoWithRevert = () => {
        revertTween.current?.revert();
        revertTween.current = null
    }


    return (
        <section className="space-y-8 p-6">
            <div>
                <h2 className="mb-3 font-bold">Card A — kill()</h2>
                <div className="relative h-24 overflow-hidden rounded-lg bg-slate-100 p-3">
                    <div
                        ref={killCard}
                        className="h-16 w-16 rounded-lg bg-indigo-600"
                    />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={animateKillCard}>
                        Animate A
                    </button>
                    <button onClick={stopWithKill}>
                        Kill A
                    </button>
                </div>
            </div>

            <div>
                <h2 className="mb-3 font-bold">Card B — revert()</h2>
                <div className="relative h-24 overflow-hidden rounded-lg bg-slate-100 p-3">
                    <div
                        ref={revertCard}
                        className="h-16 w-16 rounded-lg bg-emerald-600"
                    />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={animateRevertCard}>
                        Animate B
                    </button>
                    <button onClick={undoWithRevert}>
                        Revert B
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CleanupLab