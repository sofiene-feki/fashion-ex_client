import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import coat from "../../assets/coat.webp";
import dress from "../../assets/dress.png";
import shoes from "../../assets/shoes.webp";
import sac from "../../assets/sac.webp";
import bag from "../../assets/bag.webp";
import cachkole from "../../assets/cachkole.webp";

const categories = [
  { title: "Women Coats", image: dress, link: "/category/coats" },
  { title: "Women Dresses", image: bag, link: "/category/dresses" },
  { title: "Women Shoes", image: cachkole, link: "/category/shoes" },
  { title: "Women Bags", image: sac, link: "/category/bags" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto px-4 md:px-30 pt-2 md:pt-10 bg-white">
      {/* SECTION TITLE */}
      {/* <h2
        className="
         text-xl md:text-3xl tracking-tight text-gray-900 mb-8 px-14 text-center
        "
      >
        Explore a Selection of the SKANDS Creations
      </h2> */}

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

  return (
    <Link ref={ref} to="/shop" className="block">
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
          src={cat.image}
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
font-heading    text-xl md:text-2xl
   text-center
    transition-all duration-700 ease-out uppercase
    ${inView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4"}
  `}
>
  {cat.title}
</h3>

        </div>

      </div>
    </Link>
  );
}
