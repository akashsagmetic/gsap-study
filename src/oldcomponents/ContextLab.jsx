
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function ContextLab() {
  const container = useRef(null);
  const timeline = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.from(".heading", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      tl.from(".card", {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      timeline.current = tl;

      // Play the timeline on initial mount.
      tl.play();
    },
    { scope: container }
  );

  const replayAnimation = () => {
    timeline.current?.restart();
  };

  const reverseAnimation = () => {
    timeline.current?.reverse();
  };

  const handleCardClick = contextSafe((event) => {
    const getCardById = event.currentTarget;
    gsap.to(getCardById, {
      rotation: "+=180",
      duration: 0.6,
      ease : "power2.out",
      overwrite : "auto"
    })
  })

  return (
    <section ref={container} className="space-y-6 p-8">
      <h1 className="heading text-3xl font-bold">
        Our Projects
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <article
            key={id}
            onClick={handleCardClick}
            className="card rounded-xl bg-indigo-600 p-8 text-white"
          >
            Project {id}
          </article>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={replayAnimation}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          Replay
        </button>

        <button
          onClick={reverseAnimation}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white"
        >
          Reverse
        </button>
      </div>
    </section>
  );
}
