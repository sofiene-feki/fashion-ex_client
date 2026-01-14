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
    <section className="mx-auto px-4 md:px-30 pt-2 md:pt-10 bg-white">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
    threshold: 0.6,
    triggerOnce: true,
  });

    const API_BASE_URL_MEDIA = import.meta.env.VITE_API_BASE_URL_MEDIA;


  return (
    <Link ref={ref} to={cat.link} className="block">
      {/* IMAGE CONTAINER */}
      <div className="
        relative w-full
        h-[340px] md:h-[420px]
        overflow-hidden
        bg-black-100
        border border-[#f99e9a]/10
        shadow-[0_10px_30px_rgba(249,158,154,0.18)]
      ">
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

        {/* CENTERED TEXT OVER IMAGE */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3
            className={`
              text-white
              font-heading text-3xl 
              text-center bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] 
              transition-all duration-700 ease-out uppercase
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {cat.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
