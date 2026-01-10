import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function CategoryCard({ category, onDelete, onEdit }) {
  const image = category.media?.[0]?.url;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-sm tracking-wide">
            NO IMAGE
          </div>
        )}

        {/* Luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Content */}
      <div className="px-6 py-5 flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
          {category.name}
        </h4>

        {/* Actions */}
        <div className="flex gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={onEdit}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onDelete}
            className="p-2 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}
