import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

import { useRef } from 'react'

gsap.registerPlugin(useGSAP)

const HeroCard = () => {
    const container = useRef(null);
  const card = useRef(null);
  const eyebrow = useRef(null);
  const title = useRef(null);
  const description = useRef(null);
  const button = useRef(null)
  const glowOne = useRef(null)
  const glowTwo = useRef(null)
  const buttonContent = useRef(null);


useGSAP(() => {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .fromTo(
      card.current,
      { autoAlpha: 0, y: 50, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .from(
      eyebrow.current,
      { y: 12, autoAlpha: 0, duration: 0.4 },
      "-=0.4"
    )
    .from(
      title.current,
      { y: 24, autoAlpha: 0, duration: 0.8 },
      "-=0.2"
    )
    .from(
      description.current,
      { y: 16, autoAlpha: 0, duration: 0.5 },
      "-=0.25"
    )
    .from(
      button.current,
      { y: 12, autoAlpha: 0, duration: 0.4 },
      "-=0.2"
    )
    .from(
      buttonContent.current,
      { x: 12, duration: 0.3 },
      "+=0.2"
    )
    .from(
      button.current.querySelector(".arrow"),
      { x: 8, rotate: 45, duration: 0.3 },
      "+=0.2"
    )
    .from(
      glowOne.current,
      { y: 40, opacity: 0, duration: 1 },
      0
    )
    .from(
      glowTwo.current,
      { y: -40, opacity: 0, duration: 1 },
      0
    );
}, { scope: container });

  return (
    <div className='hero' ref={container}>
      <div className='glow glow-one' ref={glowOne} />
      <div className='glow glow-two' ref={glowTwo} />

      <section className='hero-card' ref={card}>
        <span className='eyebrow' ref={eyebrow}>YOUR NEXT CHAPTER</span>

        <h1 ref={title}>
          Make digital
          <br />
          feel <span>alive.</span>
        </h1>
        <p ref={description}>
          Thoughtful design. Precise motion.
          Experiences people remember.
        </p>
        <button ref={button} className="hero-button">
          <span ref={buttonContent}>Explore the experience <span className='arrow'>↗</span></span>
        </button>
      </section>


    </div>
  )
}

export default HeroCard