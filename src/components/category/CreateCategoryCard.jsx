import React from "react";
import ProductMediaGallery from "../product/ProductMediaGallery";

export default function CreateCategoryCard({
  name,
  setName,
  media,
  selectedMedia,
  setSelectedMedia,
  onAddMedia,
  onDeleteMedia,
  onSubmit,
  loading,
}) {
  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
          Create Category
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Upload an image and define a premium category
        </p>
      </div>

      {/* Media */}
      <div className="px-8">
        <ProductMediaGallery
          media={media}
          selectedMedia={selectedMedia}
          onSelectMedia={setSelectedMedia}
          onAddMedia={onAddMedia}
          onDeleteMedia={onDeleteMedia}
          isEditable
          setSelectedMedia={setSelectedMedia}
          galleryClassName="flex flex-col items-center justify-center w-full h-44 bg-gray-50 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition"
        />
      </div>

      {/* Input */}
      <div className="px-8 pt-6">
        <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
          Category name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Luxury Bags"
          className="w-full border-b border-gray-300 bg-transparent px-1 py-2 text-sm focus:outline-none focus:border-gray-900 transition"
        />
      </div>

      {/* Action */}
      <div className="px-8 py-6 mt-6 border-t border-gray-100">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full py-3 text-sm font-semibold tracking-widest uppercase rounded-full
                     bg-gray-900 text-white
                     hover:bg-black transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Category"}
        </button>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-40" />
    </div>
  );
}
