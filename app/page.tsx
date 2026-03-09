"use client";
import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

export default function Home() {
  const canvasRef = useRef<any>(null);
  const [brushColor, setBrushColor] = useState("#000000");

  const handleClear = () => canvasRef.current?.clear();
  const handleUndo = () => canvasRef.current?.undo();

  const handleSubmit = () => {
    if (canvasRef.current) {
      const drawingData = canvasRef.current.getDataURL(); 
      console.log(drawingData);
      alert("Doodle sent to the Keychain Queue!");
    }
  };

  return (
    <main className="flex flex-col items-center p-6 min-h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-3xl font-black mb-2 text-blue-400">POCKET LOCKET</h1>
      <p className="text-gray-400 mb-6 italic text-center">Draw your design below for your shrink-plastic keychain!</p>

      {/* Drawing Controls */}
      <div className="flex gap-4 mb-4">
        <input 
          type="color" 
          value={brushColor} 
          onChange={(e) => setBrushColor(e.target.value)}
          className="w-10 h-10 border-none bg-transparent cursor-pointer"
        />
        <button onClick={handleUndo} className="bg-gray-700 px-4 py-2 rounded">Undo</button>
        <button onClick={handleClear} className="bg-red-900 px-4 py-2 rounded">Clear</button>
      </div>

      {/* The Canvas - Sized for mobile/tablet festival use */}
      <div className="border-4 border-blue-500 rounded-xl overflow-hidden bg-white shadow-2xl">
        <CanvasDraw
          ref={canvasRef}
          brushColor={brushColor}
          canvasWidth={350}
          canvasHeight={350}
          brushRadius={4}
          lazyRadius={0} 
        />
      </div>

      <button 
        onClick={handleSubmit}
        className="mt-8 bg-blue-600 hover:bg-blue-500 text-white w-full max-w-xs py-4 rounded-full font-bold text-xl shadow-lg transition-transform active:scale-95"
      >
        SUBMIT DOODLE
      </button>

      <p className="mt-4 text-xs text-gray-500">Note: Designs will shrink and darken once baked!</p>
    </main>
  );
}