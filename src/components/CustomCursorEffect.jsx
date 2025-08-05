import React, { useEffect, useRef } from 'react';

const CustomCursorEffect = () => {
  const cursorRef = useRef(null);
  const innerDotRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const innerDotPosition = useRef({ x: 0, y: 0 });
  const animationId = useRef(null);

  // Track when movement started for timing
  const lastMovementTime = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const innerDot = innerDotRef.current;
    if (!cursor || !innerDot) return;

    const animateCursor = () => {
      const currentTime = performance.now();
      const timeSinceMovement = currentTime - lastMovementTime.current;

      // Main cursor - slower for first 80%, then speed boost
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;
      let ease = 0.08; // Slower base movement

      // Speed up in final 200ms to ensure 1 second completion
      if (timeSinceMovement > 800) {
        const timeProgress = (timeSinceMovement - 800) / 200;
        const speedBoost = timeProgress * 0.12; // Gradual speed increase
        ease += speedBoost;
      }

      cursorPosition.current.x += dx * ease;
      cursorPosition.current.y += dy * ease;

      cursor.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;

      // Inner dot - mostly your original code with tiny end boost
      const innerDx = cursorPosition.current.x - innerDotPosition.current.x;
      const innerDy = cursorPosition.current.y - innerDotPosition.current.y;
      const distance = Math.sqrt(innerDx * innerDx + innerDy * innerDy);

      // Only animate inner dot if there's actual movement or if we're still catching up
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || distance > 1) {
        // Almost same speed as main cursor - minimal lag
        const baseEase = 0.078; // Almost identical to main cursor
        const catchUpBoost = Math.min(distance * 0.002, 0.05);
        let innerEase = baseEase + catchUpBoost;

        // Gentle acceleration in final 200ms
        if (timeSinceMovement > 800 && timeSinceMovement < 1000) {
          const timeProgress = (timeSinceMovement - 800) / 200;
          const speedBoost = timeProgress * 0.08; // Smaller boost since it's already closer
          innerEase += speedBoost;
        }

        innerDotPosition.current.x += innerDx * innerEase;
        innerDotPosition.current.y += innerDy * innerEase;

        innerDot.style.transform = `translate3d(${innerDotPosition.current.x}px, ${innerDotPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId.current = requestAnimationFrame(animateCursor);
    };

    // Mouse move handler - exactly as your original
    const handleMouseMove = e => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      // Reset movement timer
      lastMovementTime.current = performance.now();

      if (!animationId.current) {
        animateCursor();
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className='pointer-events-none fixed top-0 left-0 z-50'
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          mixBlendMode: 'exclusion',
          transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerDotRef}
        className='pointer-events-none fixed top-0 left-0 z-50'
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'white',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursorEffect;
