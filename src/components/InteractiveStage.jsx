import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the GSAP plugin for React environments safely
gsap.registerPlugin(useGSAP);

export default function InteractiveAvatar() {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  // Sequence of phrases for the speech bubble
  const textSequence = ["Psst.", "Ow!", "Stop it!", "Fine, buy my template!"];
  const [clickCount, setClickCount] = useState(0);

  // 1. Interactive Eyes Tracking Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const pupils = [
        { eye: leftEyeRef.current, pupil: leftPupilRef.current },
        { eye: rightEyeRef.current, pupil: rightPupilRef.current }
      ];

      pupils.forEach(({ eye, pupil }) => {
        if (!eye || !pupil) return;

        // Find the absolute center point of the eye socket in the viewport
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // Calculate the vector angle from the eye center to the cursor
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        
        // Boundaries: maximum distance (pixels) the pupil can slide within the eye
        const maxDistance = 12; 
        const targetX = Math.cos(angle) * maxDistance;
        const targetY = Math.sin(angle) * maxDistance;

        // Smoothly animate the pupils to look toward the cursor
        gsap.to(pupil, {
          x: targetX,
          y: targetY,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Click Handler using useGSAP hook for spring mechanics
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleAvatarClick = contextSafe(() => {
    // Progress through the text speech sequence
    if (clickCount < textSequence.length - 1) {
      setClickCount((prev) => prev + 1);
    }

    // Set origin to the bottom center so it deforms like a bobblehead rooted to the ground
    gsap.set(avatarRef.current, { transformOrigin: "50% 100%" });

    const tl = gsap.timeline();

    // Squish & Squash animation sequence
    tl.to(avatarRef.current, {
      scaleY: 0.82,
      scaleX: 1.1,
      duration: 0.08,
      ease: "power1.out"
    })
    .to(avatarRef.current, {
      scaleY: 1,
      scaleX: 1,
      // Gives it a slight organic random jitter rotation left or right
      rotation: (Math.random() > 0.5 ? 1 : -1) * (4 - clickCount), 
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" // Classic spring bouncy bounce back
    });

    // Simultaneously bounce out the speech bubble
    gsap.fromTo(".speech-bubble", 
      { scale: 0.85, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }
    );
  });

  // Dynamic values adapting to the state changes (expressions)
  const isHurt = clickCount > 0;
  const isAngry = clickCount >= 3;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none p-20 bg-slate-900 rounded-3xl shadow-xl">
      
      {/* Dynamic Speech Bubble */}
      <div className="speech-bubble absolute -top-4 bg-white border border-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-xl shadow-md transition-all after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white">
        {textSequence[clickCount]}
      </div>

      {/* SVG Face Container */}
      <svg 
        ref={avatarRef}
        onClick={handleAvatarClick}
        className="w-48 h-48 cursor-pointer mt-12 drop-shadow-xl"
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://w3.org"
      >
        {/* Base Head Circle */}
        <circle cx="100" cy="100" r="90" fill="#FBBF24" stroke="#D97706" strokeWidth="4"/>

        {/* LEFT EYE CONTAINER */}
        <ellipse ref={leftEyeRef} cx="65" cy="85" rx="18" ry="25" fill="white" stroke="#1E293B" strokeWidth="3"/>
        {/* Left Pupil */}
        <circle ref={leftPupilRef} cx="65" cy="85" r="9" fill="#0F172A"/>

        {/* RIGHT EYE CONTAINER */}
        <ellipse ref={rightEyeRef} cx="135" cy="85" rx="18" ry="25" fill="white" stroke="#1E293B" strokeWidth="3"/>
        {/* Right Pupil */}
        <circle ref={rightPupilRef} cx="135" cy="85" r="9" fill="#0F172A"/>

        {/* DYNAMIC EYEBROWS */}
        {/* Left Eyebrow: Tilts aggressively inward if angry */}
        <path 
          d={isAngry ? "M 45 55 L 75 68" : isHurt ? "M 45 60 L 75 58" : "M 45 58 Q 60 52 75 58"} 
          stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="transparent"
          className="transition-all duration-200"
        />
        {/* Right Eyebrow: Tilts aggressively inward if angry */}
        <path 
          d={isAngry ? "M 155 55 L 125 68" : isHurt ? "M 155 60 L 125 58" : "M 125 58 Q 140 52 155 58"} 
          stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="transparent"
          className="transition-all duration-200"
        />

        {/* DYNAMIC MOUTH */}
        {/* Morphs from a wide smile to an open "O" or a frown depending on click state */}
        <path 
          d={isAngry ? "M 70 145 Q 100 120 130 145" : isHurt ? "M 80 140 Q 100 140 120 140" : "M 70 130 Q 100 165 130 130"} 
          stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="transparent"
          className="transition-all duration-200"
        />
      </svg>
    </div>
  );
}
