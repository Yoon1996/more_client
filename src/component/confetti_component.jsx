import React, { useEffect, useRef } from "react";
import canvasConfetti from "canvas-confetti";

const ConfettiComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const addConfetti = () => {
      const duration = 3000;
      const { innerWidth, innerHeight } = window;
      const canvas = canvasRef.current;

      canvasConfetti.create(canvas, {
        resize: true,
        useWorker: true,
      })({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      });

      setTimeout(() => canvasConfetti.reset(), duration);
    };

    addConfetti();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ConfettiComponent;
