"use client";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { ChangeEvent } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [shape, setShape] = useState<"round" | "rect">("round");

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <main className="flex flex-col items-center p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">Locket Photo Uploader</h1>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={onSelectFile} 
        className="mb-4 p-2 bg-gray-800 text-white rounded shadow border border-gray-700" 
      />

      {/* Shape Selector Buttons */}
      {image && (
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setShape("round")} 
            className={`px-4 py-2 rounded ${shape === "round" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Circle
          </button>
          <button 
            onClick={() => setShape("rect")} 
            className={`px-4 py-2 rounded ${shape === "rect" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Square
          </button>
        </div>
      )}

      {image ? (
        <div className="relative w-full max-w-md h-96 bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape={shape} 
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
      ) : (
        <p className="text-gray-400 mt-10">Please upload an image to start editing.</p>
      )}

      {image && (
        <button 
          className="mt-6 bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-full font-bold shadow-lg transition"
          onClick={() => alert("Photo saved to queue!")}
        >
          Submit for Keychain
        </button>
      )}
    </main>
  );
}