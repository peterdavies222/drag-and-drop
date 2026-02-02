import "./styles/master.scss";

import { useRef, useState, useEffect } from "react";

export default function App() {
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);
  const blockRef = useRef(null);

  const startingTranslationRef = useRef({ x: 0, y: 0 }); // the translation that is applied at present when mouse is pressed down
  const translationRef = useRef({ x: 0, y: 0 }); // the current translation

  useEffect(() => {
    const block = blockRef.current;

    function handleStartDragging(e) {
      setMouseStart({ x: e.pageX, y: e.pageY });
      setDragging(true);
    }
    function handleEndDragging() {
      setStartTranslation(translationRef.current);
      setDragging(false);
    }

    if (block) {
      block.addEventListener("mousedown", handleStartDragging);
      block.addEventListener("mouseup", handleEndDragging);

      return () => {
        block.removeEventListener("mousedown", handleStartDragging);
        block.removeEventListener("mouseup", handleEndDragging);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    function moveBlock(e) {
      if (dragging) {
        let xTranslation = e.pageX - mouseStart.x - startTranslation.x;
        let yTranslation = e.pageY - mouseStart.y - startTranslation.y;
        translationRef.current = { x: xTranslation, y: yTranslation };
        if (blockRef.current) {
          blockRef.current.style.transform = `translateX(${translationRef.current.x}px) translateY(${translationRef.current.y}px)`;
        }
        console.log("you are dragging");
      } else {
        console.log("you are not dragging");
      }
    }

    if (canvas) {
      canvas.addEventListener("mousemove", moveBlock);

      return () => {
        canvas.removeEventListener("mousemove", moveBlock);
      };
    }
  }, [dragging]);

  useEffect(() => {
    console.log(
      "startTranslation: ",
      startTranslation,
      "mouseStart: ",
      mouseStart,
    );
  }, [startTranslation, mouseStart]);

  return (
    <div className="canvas" ref={canvasRef}>
      <span className="block" ref={blockRef}>
        <p>Move me!</p>
      </span>
    </div>
  );
}

/**
 * 1. mouse down
 *    setDragging(true)
 *    setStartLocation(current location)
 * 2. move mouse
 *    set translation to the difference between the current mouse location and the starting mouse location
 *        translation = mouseCurrent - mouseStart
 * 3. mouse up
 *    setDragging(false)
 * 4. mouse down
 *    setDragging(true)
 *    setStartLocation(currentLocation)
 * 5. move mouse
 *    set translation to the current translation plus the difference between the current page location and the new starting location
 */
