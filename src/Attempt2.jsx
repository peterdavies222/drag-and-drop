import { useState, useEffect, useRef } from "react";

export function App() {
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);
  const blockRef = useRef(null);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const prevTranslation = useRef({ x: 0, y: 0 });
  const totalTranslation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const block = blockRef.current;

    function handleDragStart(e) {
      dragStartPos.current = { x: e.pageX, y: e.pageY };
      setDragging(true);
    }

    function handleDragEnd() {
      prevTranslation.current = {
        x: totalTranslation.current.x,
        y: totalTranslation.current.y,
      };
      setDragging(false);
    }

    if (block) {
      block.addEventListener("mousedown", handleDragStart);
      block.addEventListener("mouseup", handleDragEnd);

      return () => {
        block.removeEventListener("mousedown", handleDragStart);
        block.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const block = blockRef.current;

    function handleDrag(e) {
      if (dragging) {
        const delta = {
          x: e.pageX - dragStartPos.current.x,
          y: e.pageY - dragStartPos.current.y,
        };
        totalTranslation.current = {
          x: prevTranslation.current.x + delta.x,
          y: prevTranslation.current.y + delta.y,
        };
        const minTranslation = {
          x: 0,
          y: 0,
        };
        const maxTranslation = {
          x:
            canvas.getBoundingClientRect().width -
            block.getBoundingClientRect().width,
          y:
            canvas.getBoundingClientRect().height -
            block.getBoundingClientRect().height,
        };
        const translation = {
          x:
            totalTranslation.current.x < minTranslation.x
              ? minTranslation.x
              : totalTranslation.current.x > maxTranslation.x
                ? maxTranslation.x
                : totalTranslation.current.x,
          y:
            totalTranslation.current.y < minTranslation.y
              ? minTranslation.y
              : totalTranslation.current.y > maxTranslation.y
                ? maxTranslation.y
                : totalTranslation.current.y,
        };

        block.style.left = `${translation.x}px`;
        block.style.top = `${translation.y}px`;
      }
    }

    if (canvas) {
      canvas.addEventListener("mousemove", handleDrag);

      return () => {
        canvas.removeEventListener("mousemove", handleDrag);
      };
    }
  }, [dragging]);

  return (
    <div className="canvas" ref={canvasRef}>
      <div className="block" ref={blockRef}>
        <p>Move me!</p>
      </div>
    </div>
  );
}
