import { useState, useEffect, useRef } from "react";
import { useDrag } from "./hooks/useDrag";

export function App() {
  const canvasRef = useRef(null);
  const blockRef = useRef(null);

  const newCanvasRef = useRef(null);
  const newBlockRef = useRef(null);

  useDrag(canvasRef, blockRef);
  useDrag(newCanvasRef, newBlockRef);

  return (
    <>
      <div className="canvas" ref={canvasRef}>
        <div className="block" ref={blockRef}>
          <p>Move me!</p>
        </div>
      </div>
      <div className="canvas-2" ref={newCanvasRef}>
        <div className="block-2" ref={newBlockRef}>
          <p>Move me!</p>
        </div>
      </div>
    </>
  );
}
