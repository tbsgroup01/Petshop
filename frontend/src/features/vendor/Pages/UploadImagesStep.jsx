import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  X,
  Plus
} from 'lucide-react';

const UploadImagesStep = ({ isEmbedded = false, images: externalImages = [], onImagesChange }) => {
  const [internalImages, setInternalImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const isControlled = typeof onImagesChange === 'function';
  const images = isControlled ? externalImages : internalImages;
  const setImages = isControlled ? onImagesChange : setInternalImages;

  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Files process function
  const processFiles = (files) => {
    if (!files?.length) return;

    const validFiles = [];
    const rejected = [];

    files.forEach((file) => {
      const isValidType =
        file.type?.startsWith('image/') ||
        /\.(jpe?g|png|webp|gif|heic|heif|avif)$/i.test(file.name);

      const isValidSize =
        file.size <= 5 * 1024 * 1024;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      } else {
        rejected.push(file.name);
      }
    });

    if (images.length + validFiles.length > 3) {
      alert('You Can Only maximum 3 images upload .');
      return;
    }

    if (rejected.length) {
      alert(`Some files could not be uploaded: ${rejected.join(', ')}`);
    }

    const readFile = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            url: URL.createObjectURL(file),
            dataUrl: reader.result,
          });
        };
        reader.onerror = () => {
          resolve({
            file,
            url: URL.createObjectURL(file),
            dataUrl: '',
          });
        };
        reader.readAsDataURL(file);
      });

    Promise.all(validFiles.map(readFile)).then((newImages) => {
      if (newImages.length) {
        setImages((prev) => [
          ...prev,
          ...newImages,
        ]);
      }
    });
  };

  // File input change
  const handleFileSelect = (event) => {
    const files = event.target.files
      ? Array.from(event.target.files)
      : [];

    processFiles(files);

    event.target.value = null;
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = Array.from(
      e.dataTransfer.files
    );

    if (files.length > 0) {
      processFiles(files);
    }
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index]?.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Upload UI
  const uploadWidget = (
    <>
      {/* Single Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*"
        className="hidden"
      />

      <div className="w-full">

        {/* Upload Box */}
        <div
          className={`border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 mb-6 sm:mb-8 md:mb-10 flex flex-col items-center justify-center cursor-pointer transition-all
          ${
            dragging
              ? 'bg-indigo-50 border-indigo-500 scale-[1.01]'
              : 'border-indigo-100 hover:bg-indigo-50/30'
          }`}
          onClick={openFileDialog}
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl  flex items-center justify-center mb-3 sm:mb-4">
            <UploadCloud
              className="text-indigo-500"
              size={30}
            />
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1 text-center px-2">
            Drag & drop images here, or click to browse
          </p>

          <p className="text-[10px] sm:text-[11px] text-gray-400 text-center px-2">
            Up to 8 high-quality images (Max 5MB each)
          </p>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">

          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-lg sm:rounded-2xl overflow-hidden aspect-square border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <img
                src={img.url}
                alt="upload-preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/90 p-1 sm:p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 transition shadow-sm"
              >
                <X size={12} className="sm:w-3.5 sm:h-3.5" />
              </button>

              {/* Cover Photo */}
              {index === 0 && (
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-indigo-600 text-[7px] sm:text-[9px] font-bold text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-md uppercase">
                  Cover
                </div>
              )}
            </div>
          ))}

          {/* Add More */}
          {images.length < 8 && (
            <div
              onClick={openFileDialog}
              className="border-2 border-dashed border-gray-200 rounded-lg sm:rounded-2xl flex items-center justify-center aspect-square cursor-pointer hover:border-indigo-300 hover:bg-gray-50 transition"
            >
              <Plus
                className="text-gray-300"
                size={24}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );

  return isEmbedded ? (
    uploadWidget
  ) : (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
        {uploadWidget}
      </div>
    </div>
  );
};

export default UploadImagesStep;