import React from "react";

export default function BrandStatement() {

  return (
    <section
      className={`
        w-full py-12 md:py-32 -mb-6
        transition-colors duration-1000 ease-out bg-white
      `}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div
          className={`
            transition-colors duration-1000 ease-out
          
          `}
        >
          {/* Brand name — luxury heading */}
          <span className="
            block mb-6
            font-heading
            text-xs
          ">
            Clin d’Oeil Store
          </span>

          {/* Main statement — editorial */}
          <p className="
            font-editorial
            text-base md:text-lg
            leading-[1.9]
          ">
            Qualité soignée et styles pensés pour toutes les occasions
          </p>

          {/* Divider */}
          <div
            className={`w-12 h-px mx-auto my-4 transition-colors duration-1000 bg-black/30
           `}
          />

          {/* Features — clean fashion body */}
          <ul className="
            font-body
            space-y-4
            text-xs md:text-sm
            tracking-[0.08em]
            opacity-80
          ">
            <li>Échange simple et rapide (hors articles soldés)</li>
                        <li>Livraison à domicile partout en Tunisie</li>
                        <li>Paiement à la livraison</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
