
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const initialCards = [
  { id: 1, title: "Project 1" },
  { id: 2, title: "Project 2" },
  { id: 3, title: "Project 3" },
];

export default function DynamicCards() {
  const container = useRef(null);
  const animations = useRef(new Map());
  const nextId = useRef(4);

  const [cards, setCards] = useState(initialCards);


const loadMore = () => {
  const firstNewId = nextId.current;

  // Reserve three new, unique IDs.
  nextId.current += 3;

  setCards((previous) => [
    ...previous,
    {
      id: firstNewId,
      title: `Project ${firstNewId}`,
    },
    {
      id: firstNewId + 1,
      title: `Project ${firstNewId + 1}`,
    },
    {
      id: firstNewId + 2,
      title: `Project ${firstNewId + 2}`,
    },
  ]);
};

  const handleRemoveCards = () => {
    setCards(prev => prev.slice(0, -3))
  }

 useGSAP(
  () => {
    const cardElements = gsap.utils.toArray(
      ".dynamic-card",
      container.current
    );

    // 1. Get the IDs of cards that currently exist in the DOM.
    const currentIds = new Set(
      cardElements.map((element) =>
        Number(element.dataset.cardId)
      )
    );

    // 2. Clean up animations belonging to removed cards.
    for (const [id, tween] of animations.current) {
      if (!currentIds.has(id)) {
        tween.scrollTrigger?.kill();
        tween.kill();
        animations.current.delete(id);
      }
    }

    // 3. Find cards that don't have a registered animation.
    const newCards = cardElements.filter((element) => {
      const id = Number(element.dataset.cardId);
      return !animations.current.has(id);
    });

    // 4. Animate only those new cards.
    newCards.forEach((element) => {
      const id = Number(element.dataset.cardId);

      const tween = gsap.from(element, {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          once: true,
          // markers: true,
        },
      });

      animations.current.set(id, tween);
    });
  },
  {
    scope: container,
    dependencies: [cards],
  }
);

  useEffect(() => {
    // Refresh after React adds or removes cards.
    ScrollTrigger.refresh();
  }, [cards]);

  return (
    <section ref={container} className="mx-auto max-w-4xl p-8">
      <div className="h-[400px]" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            data-card-id={card.id}
            className="dynamic-card rounded-xl bg-indigo-600 p-8 text-white"
          >
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="mt-2">Scroll to reveal this project.</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={loadMore}
        className="mt-8 rounded-lg bg-black px-5 py-3 text-white"
      >
        Load more
      </button>
      <button
        type="button"
        onClick={handleRemoveCards}
        className="mt-8 rounded-lg bg-black px-5 py-3 text-white"
      >
        Remove card
      </button>

      <div className="h-screen" />
    </section>
  );
}
