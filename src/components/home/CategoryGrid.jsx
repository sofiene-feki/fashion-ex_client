import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { getCategories } from "../../functions/Categories";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      // Map categories to include an image fallback
      const mapped = data.map((cat) => ({
        title: cat.name,
        link: `/category/${cat.slug}`,
        image: cat.image || "/placeholder.png", // fallback if no image
      }));
      setCategories(mapped);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  return (
    <section className="mx-auto px-4 md:px-30 pt-6 md:pt-10 bg-white">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} />
        ))}
      </div>
    </section>
  );
}

/* ========================= */
/* CATEGORY CARD */
/* ========================= */
function CategoryCard({ cat }) {
  const { ref, inView } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  const API_BASE_URL_MEDIA = import.meta.env.VITE_API_BASE_URL_MEDIA;

  return (
    <Link ref={ref} to={cat.link} className="block group">
      {/* IMAGE CONTAINER */}
      <div
        className="
          relative w-full
          h-[320px] md:h-[420px]
          overflow-hidden
          bg-black-100
          border border-[#f99e9a]/10
          shadow-[0_10px_30px_rgba(249,158,154,0.18)]
        "
      >
        {/* IMAGE */}
        <img
          src={`${API_BASE_URL_MEDIA}${cat.image}`}
          alt={cat.title}
          className={`
            w-full h-full object-cover
            transition-transform duration-[1000ms] ease-out
            ${inView ? "scale-100" : "scale-[1.2]"}
          `}
        />
      </div>

      {/* TITLE UNDER IMAGE */}
      <h3
        className={`
          mt-2 text-gray-900
          font-category 
          text-center text-md font-semibold leading-tight
          transition-all duration-700 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {cat.title}
      </h3>
    </Link>
  );
}
