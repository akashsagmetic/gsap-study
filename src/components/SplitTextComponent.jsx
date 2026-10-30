import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const SplitTextComponent = ({ text, className = "", exitTrigger }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    let exitTween;
    const split = SplitText.create(textRef.current, {
      type: "chars",
      aria: "auto",
      onSplit(self) {
        const getCharacterMotion = (index) => {
          const pattern = index % 3;

          if (pattern === 0) return { x: -95, y: 0 };
          if (pattern === 1) return { x: 0, y: -120 };

          return { x: 0, y: 90 };
        };

        const entranceTween = gsap.from(self.chars, {
          x: (index) => getCharacterMotion(index).x,
          y: (index) => getCharacterMotion(index).y,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            once: true
          }
        });

        exitTween?.scrollTrigger?.kill();
        exitTween?.kill();

      exitTween = gsap.fromTo(
  self.chars,
  {
    x: 0,
    y: 0,
    autoAlpha: 1,
  },
  {
    x: (index) => getCharacterMotion(index).x,
    y: (index) => getCharacterMotion(index).y,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.025,
    ease: "power2.in",
    immediateRender: false,
    scrollTrigger: {
      trigger: exitTrigger?.current || textRef.current,
      start: "top 20%",
      end: "top top",
      toggleActions: "play none none reverse",
      // markers: true,
    },
  }
);
        return entranceTween

      },
    });

    return () => split.revert();
  }, { scope: textRef });

  return <span ref={textRef} className={className}>{text}</span>;
};

export default SplitTextComponent;