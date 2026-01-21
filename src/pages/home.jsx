import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";

import Banner from "../components/home/Banner";
import CategoryGrid from "../components/home/CategoryGrid";
import HomeVideoSection from "../components/home/HomeVideoSection";
import NewArrivals from "../components/home/NewArrivals";
import Story from "../components/home/Story";
import BrandStatement from "../components/home/BrandStatement";

export default function Home() {
  const newArrivalsRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Clin D’Oeil Store – Fashion & Elegance</title>
        <meta
          name="description"
          content="Discover the latest fashion trends at Clin D’Oeil Store. New arrivals, elegant collections, and premium styles."
        />
        <link rel="canonical" href="https://your-domain.com/" />
      </Helmet>

      <div className="relative">
        <Banner />
        <CategoryGrid />
        <BrandStatement />

        <div className="relative z-0">
          <div className="sticky top-0 z-10">
            <HomeVideoSection
              title="Clin Doeil Store"
              subtitle="A new vision of elegance"
              triggerRef={newArrivalsRef}
            />
          </div>

          <div ref={newArrivalsRef} className="relative z-20">
            <NewArrivals />
          </div>

          <div className="relative z-20">
            <Story />
          </div>
        </div>
      </div>
    </>
  );
}
