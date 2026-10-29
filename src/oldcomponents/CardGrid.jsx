import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react';



gsap.registerPlugin(useGSAP);

const items = ["card1", "card2", "card3", "card4", "card5", "card6"];

const CardGrid = () => {
    const container = useRef(null);


  const {contextSafe}=  useGSAP(() => {
        gsap.from(".card", {
            y: 40,
            autoAlpha: 0,
            duration: 0.25,
            stagger: 0.08,
            overwrite : "auto",
            ease: "power2.out",

        })

    }, { scope: container })

const handleMouseEnter = contextSafe((e) => {
  gsap.to(e.currentTarget, {
    y: -10,
    scale : 1.04,
    rotate : 1,
    duration: 0.5,
    overwrite : "auto",
    ease: "power2.out",
  });
});

const handleMouseLeave = contextSafe((e) => {
  gsap.to(e.currentTarget, {
    rotate: 0,
    y: 0,
    scale : 1,
    duration: 0.5,
    overwrite : "auto",
    ease: "power2.out",
  });
});

    return (
        <section ref={container} className='card-grid'>
            {items.map((card) => (
                <article className="card" key={card} onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e)=>handleMouseLeave(e)}>
                    <div className="card-inner">
                        <h2>{card}</h2>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default CardGrid