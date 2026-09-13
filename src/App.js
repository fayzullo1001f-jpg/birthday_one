import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/asal.m4a";

import play from "./img/circle-play-regular-full.svg";
import pause from "./img/circle-pause-regular-full.svg";

import one from "./img/birthday.png";
import birthdayPhoto from "./img/three.jpg";

import cake from "./img/gifts.jpg";
import footerPhoto from "./img/cake_image.png";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [sealOpened, setSealOpened] = useState(false);

  const audioRef = useRef(null);

  /*
   ============================================================
   TUG'ILGAN KUN SANASI
   15.09.2026 — 18:00
   ============================================================
  */

  const eventDate = useMemo(() => {
    return new Date(2026, 8, 15, 18, 0, 0).getTime();
  }, []);

  /*
   ============================================================
   COUNTDOWN
   ============================================================
  */

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = eventDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
            (distance / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
            (distance / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  /*
   ============================================================
   MUSIC
   ============================================================
  */

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
    }
  };

  /*
   ============================================================
   TAKLIFNOMANI OCHISH
   ============================================================
  */

  const openInvitation = () => {
    if (sealOpened) return;

    setSealOpened(true);

    setTimeout(() => {
      setShowIntro(false);

      const audio = audioRef.current;

      if (audio) {
        audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
      }
    }, 1100);
  };

  /*
   ============================================================
   SENTABR 2026 KALENDAR
   ============================================================
  */

  const calendarDays = useMemo(() => {
    const year = 2026;
    const month = 8; // September

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    // Dushanbadan boshlash
    const mondayStart =
        firstDay === 0 ? 6 : firstDay - 1;

    const emptyDays = Array.from({
      length: mondayStart,
    });

    const days = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    return [...emptyDays, ...days];
  }, []);

  /*
   ============================================================
   ANIMATION
   ============================================================
  */

  const imgVariant = {
    hidden: {
      opacity: 0,
      scale: 0.92,
    },

    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.8,
      },
    },
  };

  return (
      <>
        {/* AUDIO */}

        <audio
            ref={audioRef}
            loop
            preload="auto"
        >
          <source
              src={musicFile}
              type="audio/mpeg"
          />
        </audio>

        <AnimatePresence>
          {showIntro ? (
              /*
               =====================================================
               INTRO
               =====================================================
              */

              <motion.div
                  className={`intro ${
                      sealOpened ? "intro_opening" : ""
                  }`}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                <motion.img
                    src={one}
                    alt="Birthday invitation"
                    className="intro_image"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: sealOpened ? 1.04 : 1,
                    }}
                    transition={{ duration: 1 }}
                />

                <button
                    className="seal_button"
                    onClick={openInvitation}
                    aria-label="Taklifnomani ochish"
                >
                  <span />
                </button>

                <div
                    className={`opening_light ${
                        sealOpened ? "light_active" : ""
                    }`}
                />
              </motion.div>
          ) : (
              /*
               =====================================================
               MAIN APP
               =====================================================
              */

              <div className="app">

                {/* ==================================================
                HERO
            ================================================== */}

                <section className="hero">

                  <div className="hero_overlay" />

                  <div className="hero_glow" />

                  <div className="hero_content">

                    {/* MUSIC */}

                    <motion.div
                        className={`music_btn ${
                            isPlaying ? "playing" : ""
                        }`}
                        onClick={toggleMusic}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                    >
                      <img
                          src={isPlaying ? pause : play}
                          alt="Musiqa"
                      />
                    </motion.div>

                  </div>
                </section>

                {/* ==================================================
                TAKLIF
            ================================================== */}

                <motion.section
                    className="section invitation_section"
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                >

                  <div className="section_number">
                    01
                  </div>

                  <div className="section_label">
                    TAKLIF
                  </div>

                  <h2>
                    Sizni kutamiz
                  </h2>

                  <div className="gold_divider">
                    <span />
                    <b>✦</b>
                    <span />
                  </div>

                  <p>
                    Assalomu alaykum!
                    <br />
                    <br />

                    Hurmatli mehmonimiz!
                    <br />
                    <br />

                    Sizni Nargiza opa tug‘ilgan kunlari
                    munosabati bilan
                    <strong> 15 sentabr 2026 </strong>
                    kuni
                    <br />

                    <strong>Crystal Garden</strong>
                    restoraniga
                    <br />

                    samimiy davramizga taklif qilamiz.
                  </p>

                  <motion.div
                      className="image_card"
                      variants={imgVariant}
                      initial="hidden"
                      whileInView="visible"
                  >
                    <img
                        src={birthdayPhoto}
                        alt="Birthday"
                    />
                  </motion.div>

                </motion.section>

                {/* ==================================================
                COUNTDOWN
            ================================================== */}

                <motion.section
                    className="countdown_section"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                >

                  <div className="section_number">
                    02
                  </div>

                  <div className="section_label">
                    KUTILGAN ONLAR
                  </div>

                  <h2>
                    Bayramgacha
                  </h2>

                  <div className="gold_divider">
                    <span />
                    <b>♥</b>
                    <span />
                  </div>

                  <div className="countdown">

                    <div className="count_box">
                      <strong>
                        {String(timeLeft.days).padStart(2, "0")}
                      </strong>
                      <span>kun</span>
                    </div>

                    <div className="count_box">
                      <strong>
                        {String(timeLeft.hours).padStart(2, "0")}
                      </strong>
                      <span>soat</span>
                    </div>

                    <div className="count_box">
                      <strong>
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </strong>
                      <span>min</span>
                    </div>

                    <div className="count_box">
                      <strong>
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </strong>
                      <span>sek</span>
                    </div>

                  </div>

                  <div className="countdown_date">
                    15 SENTABR 2026 · 18:00
                  </div>

                </motion.section>

                {/* ==================================================
                KALENDAR
            ================================================== */}

                <motion.section
                    className="calendar_section"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                >

                  <div className="section_number">
                    03
                  </div>

                  <div className="section_label">
                    SANA
                  </div>

                  <h2>
                    Sentabr
                  </h2>

                  <div className="calendar_year">
                    2026
                  </div>

                  <div className="mini_calendar">

                    {[
                      "DU",
                      "SE",
                      "CH",
                      "PA",
                      "JU",
                      "SH",
                      "YA",
                    ].map((day) => (
                        <div
                            key={day}
                            className="weekday"
                        >
                          {day}
                        </div>
                    ))}

                    {calendarDays.map(
                        (day, index) => (
                            <div
                                key={index}
                                className={`calendar_day ${
                                    day === 15
                                        ? "active_day"
                                        : ""
                                }`}
                            >
                              {day}
                            </div>
                        )
                    )}

                  </div>

                  <div className="selected_date">

                    <div className="date_circle">
                      15
                    </div>

                    <div>
                      <strong>
                        15 sentabr 2026
                      </strong>

                      <span>
                    Seshanba · 18:00
                  </span>
                    </div>

                  </div>

                </motion.section>

                {/* ==================================================
                LOKATSIYA
            ================================================== */}

                <motion.section
                    className="location_section"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                >

                  <div className="section_number">
                    04
                  </div>

                  <div className="section_label">
                    MANZIL
                  </div>

                  <h2>
                    Crystal Garden
                  </h2>

                  <div className="gold_divider">
                    <span />
                    <b>⌖</b>
                    <span />
                  </div>

                  <div className="location_card">

                    <div className="location_icon">
                      ♧
                    </div>

                    <div className="location_info">

                      <strong>
                        Crystal Garden Restaurant
                      </strong>

                      <span>
                    Amir Temur shoh ko‘chasi, 15-uy
                  </span>

                      <small>
                        Toshkent, O‘zbekiston
                      </small>

                    </div>

                  </div>

                  <iframe
                      title="Crystal Garden xaritasi"
                      src="https://www.google.com/maps?q=Crystal%20Garden%20Restaurant%2C%20Amir%20Temur%20Avenue%2015%2C%20Tashkent&output=embed"
                      className="map"
                      loading="lazy"
                  />

                  <a
                      className="route_button"
                      href="https://www.google.com/maps/search/?api=1&query=Crystal%20Garden%20Restaurant%2C%20Amir%20Temur%20Avenue%2015%2C%20Tashkent"
                      target="_blank"
                      rel="noreferrer"
                  >
                    📍 Yo‘nalishni ko‘rish
                  </a>

                </motion.section>

                {/* ==================================================
                DASTUR
            ================================================== */}

                <motion.section
                    className="program_section"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                >

                  <div className="section_number">
                    05
                  </div>

                  <div className="section_label">
                    BAYRAM
                  </div>

                  <h2>
                    Tug‘ilgan kun dasturi
                  </h2>

                  <div className="program">

                    <div className="program_item">
                      <span>18:00</span>

                      <div>
                        <strong>
                          Mehmonlarni kutib olish
                        </strong>

                        <small>
                          Samimiy kutib olish
                        </small>
                      </div>
                    </div>

                    <div className="program_item">
                      <span>19:00</span>

                      <div>
                        <strong>
                          Bayram boshlanishi
                        </strong>

                        <small>
                          Musiqa va yaxshi kayfiyat
                        </small>
                      </div>
                    </div>

                    <div className="program_item">
                      <span>20:00</span>

                      <div>
                        <strong>
                          Shirin lahzalar
                        </strong>

                        <small>
                          Suratlar va sovg‘alar
                        </small>
                      </div>
                    </div>

                    <div className="program_item">
                      <span>22:00</span>

                      <div>
                        <strong>
                          Tug‘ilgan kun torti 🎂
                        </strong>

                        <small>
                          Tilaklar va bayramona kayfiyat
                        </small>
                      </div>
                    </div>

                  </div>

                  <img
                      src={cake}
                      className="cake_image"
                      alt="Birthday cake"
                  />

                </motion.section>

                {/* ==================================================
                FOOTER
            ================================================== */}

                <section className="footer">

                  <div className="footer_flower">
                    ✦
                  </div>

                  <h2>
                    Sizni kutamiz
                  </h2>

                  <p>
                    Ushbu go‘zal kunimizni
                    siz bilan birga nishonlashdan
                    mamnun bo‘lamiz.
                  </p>

                  <img
                      src={footerPhoto}
                      className="footer_img"
                      alt="Birthday celebration"
                  />

                  <div className="footer_date">
                    15 · 09 · 2026
                  </div>

                  <p className="footer_heart">
                    ♥
                  </p>

                </section>

              </div>
          )}
        </AnimatePresence>
      </>
  );
}

export default App;