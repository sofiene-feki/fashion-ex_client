import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import { getStorySlides } from "../../functions/storySlide";
import { NextArrow, PrevArrow } from "../ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const API_BASE_URL_MEDIA = import.meta.env.VITE_API_BASE_URL_MEDIA;

export default function Story() {
  const { userInfo } = useSelector((s) => s.user);
  const [slides, setSlides] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const videoRefs = useRef([]);
  const observerRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(null);
  const [muted, setMuted] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    (async () => {
      const res = await getStorySlides();
      const data = res.data.map((s) => ({
        ...s,
        videoUrl: `${API_BASE_URL_MEDIA}/${s.videoUrl.replace(/\\/g, "/")}`,
      }));
      setSlides(data);
    })();
  }, []);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= AUTOPLAY (DESKTOP + MOBILE IN VIEW) ================= */
  useEffect(() => {
    if (fullscreen) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = videoRefs.current[index];
          if (!video) return;

          if (entry.isIntersecting) {
            setActiveVideo(index);
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && observerRef.current.observe(v));

    return () => observerRef.current?.disconnect();
  }, [slides, fullscreen]);

  /* ================= SLIDER SETTINGS ================= */
  const desktopSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const mobileSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <div className="bg-white py-10">
      <div className="mx-auto md:mx-30 py-6 md:py-16 bg-white">
        <div className="text-center mb-4">
          <h2
            className="
        font-heading
        text-lg md:text-3xl
        tracking-[0.22em]
        uppercase
        text-neutral-900
        mb-3
      "
          >
            Clin d’Oeil Store Services{" "}
          </h2>

          <p
            className="
        font-editorial
        text-sm md:text-base
        text-neutral-600
        leading-relaxed
        px-8
        text-center
      "
          >
            Clin d’Oeil Store offers services including Client Advisor support,
            signature gift wrapping, and exclusive personalization options.{" "}
          </p>
        </div>

        <Slider {...(isMobile ? mobileSettings : desktopSettings)}>
          {slides.map((s, i) => (
            <div
              key={s._id}
              className="px-2 relative cursor-pointer "
              onClick={() => {
                setStartIndex(i);
                setFullscreen(true);
              }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                data-index={i}
                src={s.videoUrl}
                muted={muted}
                playsInline
                preload="metadata"
                loop
                className="h-[350px] w-full object-cover border border-[#f99e9a]/10
shadow-[0_12px_40px_rgba(249,158,154,0.18)]
transition-all duration-500 ease-out
group-hover:shadow-[0_20px_60px_rgba(249,158,154,0.22)]
 transition"
              />

              {/* RIGHT CONTROLS */}
              <div className="absolute right-3 top-3 flex flex-col gap-2 z-20">
                {/* PLAY / PAUSE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = videoRefs.current[i];
                    if (!video) return;

                    if (video.paused) {
                      setActiveVideo(i);
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                  className="bg-black/50 p-2 rounded-full text-white"
                >
                  {activeVideo === i && !videoRefs.current[i]?.paused ? (
                    <PauseIcon className="w-4 h-4" />
                  ) : (
                    <PlayIcon className="w-4 h-4" />
                  )}
                </button>

                {/* MUTE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMuted((m) => !m);
                  }}
                  className="bg-black/50 p-2 rounded-full text-white"
                >
                  {muted ? (
                    <SpeakerXMarkIcon className="w-4 h-4" />
                  ) : (
                    <SpeakerWaveIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-center mt-2">{s.title}</p>
            </div>
          ))}
        </Slider>
      </div>

      {fullscreen && (
        <FullscreenReels
          slides={slides}
          startIndex={startIndex}
          onClose={() => setFullscreen(false)}
        />
      )}
    </div>
  );
}

/* ================= FULLSCREEN (UNCHANGED LOGIC, CLEAN) ================= */
function FullscreenReels({ slides, startIndex, onClose }) {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const [muted, setMuted] = useState(true);

  const current = slides[index];
  const isMobile = window.innerWidth < 768;

  /* ================= PLAY ================= */
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [index]);

  /* ================= KEYBOARD (DESKTOP) ================= */
  useEffect(() => {
    if (isMobile) return;

    const onKey = (e) => {
      if (e.key === "ArrowDown") next();
      if (e.key === "ArrowUp") prev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, isMobile]);

  const next = () => {
    setIndex((i) => Math.min(i + 1, slides.length - 1));
  };

  const prev = () => {
    setIndex((i) => Math.max(i - 1, 0));
  };

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-100 p-0  md:pt-20 md:pb-6 bg-black flex items-center justify-center">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-20   right-4 text-white z-50"
      >
        <XMarkIcon className="w-7 h-7" />
      </button>

      {/* VIDEO WRAPPER */}
      <div
        className={`
      relative h-full w-full
      ${isMobile ? "" : "max-w-[450px]"}
      flex items-center justify-center
    `}
      >
        {/* VIDEO */}
        <video
          key={current._id}
          ref={videoRef}
          src={current.videoUrl}
          muted={muted}
          playsInline
          loop
          className={`
        w-full h-full bg-black
        ${isMobile ? "object-cover" : "object-cover rounded-2xl"}
      `}
          onClick={() => setMuted((m) => !m)}
        />

        {/* BOTTOM BAR */}
        <div
          className={`
        absolute w-full bottom-0
        flex item-center justify-between 
        bg-black/10 
        px-4 py-2 rounded-xl
      `}
        >
          {/* TEXT */}
          <div className="text-white">
            <h2 className="text-base md:text-lg mt-2 font-semibold leading-tight">
              {current.title}
            </h2>
            <p className="text-xs md:text-sm opacity-80">
              {current.description}
            </p>
          </div>

          {/* MUTE */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="shrink-0 bg-black/60 p-2 rounded-full text-white"
          >
            {muted ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP ARROWS */}
      {!isMobile && (
        <div className="absolute right-6 flex flex-col gap-3 z-30">
          <button
            onClick={prev}
            disabled={index === 0}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white disabled:opacity-30"
          >
            <ChevronUpIcon className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            disabled={index === slides.length - 1}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white disabled:opacity-30"
          >
            <ChevronDownIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
