import "./styles/master.scss";

import { useRef, useState, useEffect, startTransition } from "react";

export default function App() {
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);
  const blockRef = useRef(null);

  const startingTranslationRef = useRef({ x: 0, y: 0 }); // the translation that is applied at present when mouse is pressed down
  const translationRef = useRef({ x: 0, y: 0 }); // the current translation in real time
  const mouseStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const block = blockRef.current;
    function handleMouseDown(e) {
      mouseStartRef.current = { x: e.pageX, y: e.pageY };
      console.log(mouseStartRef.current);
      startingTranslationRef.current = translationRef.current;
      console.log(startingTranslationRef.current);
      setDragging(true);
    }
    function handleMouseUp() {
      setDragging(false);
    }

    if (block) {
      block.addEventListener("mousedown", handleMouseDown);
      block.addEventListener("mouseup", handleMouseUp);

      return () => {
        block.removeEventListener("mousedown", handleMouseDown);
        block.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    function handleMouseMove(e) {
      if (dragging) {
        const delta = {
          x: e.pageX - mouseStartRef.current.x,
          y: e.pageY - mouseStartRef.current.y,
        };

        const newTranslation = {
          x: startingTranslationRef.current.x + delta.x,
          y: startingTranslationRef.current.y + delta.y,
        };
        translationRef.current = newTranslation;
        blockRef.current.style.transform = `translateX(${translationRef.current.x}px) translateY(${translationRef.current.y}px)`;
      } else {
        console.log("not dragging");
        return;
      }
    }

    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [dragging]);

  return (
    <div className="canvas" ref={canvasRef}>
      <span className={`block ${dragging ? "dragging" : null}`} ref={blockRef}>
        <p>Move me!</p>
      </span>
    </div>
  );
}
