
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SplitTextComponent = ({ text, exitTrigger }) => {
    const charsContainerRef = useRef(null);
    const charArray = Array.from(text);


   
useGSAP(() => {
  const chars = gsap.utils.toArray(
    ".split-char",
    charsContainerRef.current
  );

  const getCharacterMotion = (index) => {
    const pattern = index % 3;

    if (pattern === 0) return { x: -95, y: 0 };
    if (pattern === 1) return { x: 0, y: -120 };

    return { x: 0, y: 90 };
  };

  // Entrance: play once and settle.
  gsap.from(chars, {
    x: (index) => getCharacterMotion(index).x,
    y: (index) => getCharacterMotion(index).y,
    autoAlpha: 0,
    duration: 1.2,
    stagger: 0.035,
    ease: "power3.out",
    scrollTrigger: {
      trigger: charsContainerRef.current,
      start: "top 80%",
      once: true,
    },
  });

  // Exit: wait until the complete heading leaves the viewport.
  gsap.to(chars, {
    x: (index) => getCharacterMotion(index).x,
    y: (index) => getCharacterMotion(index).y,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.025,
    ease: "power2.in",
    scrollTrigger: {
      trigger: exitTrigger.current,
      start: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}, { scope: charsContainerRef });






    return (
        <span>
            <span className="sr-only">{text}</span>

            <span aria-hidden="true" ref={charsContainerRef}>
                {charArray.map((char, index) => (
                    <span className="split-char" key={index}>
                        {char}
                    </span>
                ))}
            </span>
        </span>
    );
};

export default SplitTextComponent;
