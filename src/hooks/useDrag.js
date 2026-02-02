import { useState, useEffect, useRef } from "react";

export function useDrag(canvasRef, elementRef) {
  const [dragging, setDragging] = useState(false);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const prevTranslation = useRef({ x: 0, y: 0 });
  const totalTranslation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const myElement = elementRef.current;

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

    if (myElement) {
      myElement.addEventListener("mousedown", handleDragStart);
      myElement.addEventListener("mouseup", handleDragEnd);

      return () => {
        myElement.removeEventListener("mousedown", handleDragStart);
        myElement.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [elementRef]);

  useEffect(() => {
    const myCanvas = canvasRef.current;
    const myBlock = elementRef.current;

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
            myCanvas.getBoundingClientRect().width -
            myBlock.getBoundingClientRect().width,
          y:
            myCanvas.getBoundingClientRect().height -
            myBlock.getBoundingClientRect().height,
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

        myBlock.style.left = `${translation.x}px`;
        myBlock.style.top = `${translation.y}px`;
      }
    }

    if (myCanvas && myBlock) {
      myCanvas.style.position = "relative";
      myBlock.style.position = "absolute";
      window.addEventListener("mousemove", handleDrag);

      return () => {
        window.removeEventListener("mousemove", handleDrag);
      };
    }
  }, [dragging, canvasRef, elementRef]);
}
