"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Welcome() {
  const ref = useRef(null);

  // track scroll inside the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    // start when section enters viewport, end when leaves
  });

  // map scroll progress (0 → 1) to horizontal shift (-50px → +50px)
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-50px", "0px", "50px"]
  );

  const colorRef = useRef(null);

  const { scrollYProgress: colorProgress } = useScroll({
    target: colorRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(colorProgress, [0, 1], ["#1e3a8a", "#facc15"]);

  // ---------- COMPONENTS ----------
  function HeroSection({
    image,
    text,
    duration = 1.5,
    direction = "left",
    hover = false,
  }) {
    const initialX = direction === "left" ? -200 : 200;

    return (
      <motion.div
        className="relative w-full h-64 md:h-96 lg:h-[500px] cursor-pointer overflow-hidden"
        initial={{ x: initialX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration, ease: "easeOut" }}
        whileHover={hover ? { scale: 1.05 } : {}}
      >
        {/* Background */}
        <Image src={image} alt={text} fill className="object-cover" priority />

        {/* Text overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={hover ? { y: -10 } : {}}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {text}
          </h1>
        </motion.div>
      </motion.div>
    );
  }

  function SlideIn({ from = "left", duration = 1, children, className }) {
    const initialX = from === "left" ? -200 : 200;
    return (
      <motion.div
        viewport={{ amount: 0.3, once: false }}
        initial={{ x: initialX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration }}
        className={`p-6 rounded-lg shadow-lg ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-8">
      <div
        className="w-full max-w-3xl p-8 rounded-lg shadow-md border"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "#444",
        }}
      >
        <div className="space-y-16">
          {/* First hero section */}
          <div className="space-y-8">
            <p>
              Our objective is to create a new medium — a fresh way to enjoy
              creativity centered on authors. We want this tool to be
              essentially the first space for any author to promote and share
              their work. Avoiding complexity, you can collaborate, exchange
              views, and share easily.
            </p>

            <h1>Reader</h1>
            <p>We prioritize simplicity and easy access.</p>

            <h1>Editor</h1>
            <p>
              A tool to collaborate with others, work hand in hand with
              collaborators, share, and correct without altering the original
              draft.
            </p>

            <h1>Merger</h1>
            <p>
              This app, for now only accessible on your PC, will be reserved for
              authors and editors-in-chief for reviewing corrections and merging
              them into the final version.
            </p>
          </div>
          <HeroSection
            image="/image.jpg"
            text="Mon texte par-dessus l’image"
            duration={1.2}
            direction="left"
          />
          <HeroSection
            image="/image2.jpg"
            text="Autre texte"
            duration={2}
            direction="right"
          />
          <motion.section
            ref={colorRef}
            style={{ backgroundColor: bgColor }}
            className="flex min-h-screen items-center justify-center"
          >
            <motion.h1 className="text-5xl font-bold">
              Colorful Scroll ✨
            </motion.h1>
          </motion.section>

          <section
            ref={ref}
            className="h-screen flex items-center justify-center bg-gray-100"
          >
            <motion.div
              viewport={{ amount: 0.3, once: false }} // 👈 controls when effect starts
              style={{ x }}
              className="p-10 bg-white shadow-xl rounded-xl text-xl font-bold"
            >
              I move slightly left and right when you scroll 🚀
            </motion.div>
          </section>
        </div>

        <div className="space-y-16">
          {/* First hero section */}
          <motion.div
            viewport={{ amount: 0.3, once: false }} // 👈 controls when effect starts
            className="relative w-full h-64 md:h-96 lg:h-[500px] cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Image */}
            <Image
              src="/image.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />

            {/* Text overlay */}
            <motion.div
              viewport={{ amount: 0.3, once: false }} // 👈 controls when effect starts
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ x: 10 }} // moves text slightly on hover
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Mon texte par-dessus l’image
              </h1>
            </motion.div>
          </motion.div>

          {/* Second hero section */}
          <motion.div
            viewport={{ amount: 0.3, once: false }} // 👈 controls when effect starts
            className="relative w-full h-64 md:h-96 lg:h-[500px] cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              backgroundImage: "url('/image2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <motion.div
              viewport={{ amount: 0.3, once: false }} // 👈 controls when effect starts
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ y: -10, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Mon texte par-dessus l’image
              </h1>
            </motion.div>
          </motion.div>
        </div>

        {/* Animation d’entrée au scroll */}

        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          Welcome to the SanSuBagier !
        </motion.span>

        {/* Slide-in blocks */}
        <SlideIn from="left" duration={1} className="bg-blue-200">
          <h2 className="text-2xl font-bold">Section de gauche</h2>
          <p>Ce bloc arrive depuis la gauche quand on scroll.</p>
        </SlideIn>

        <SlideIn from="right" duration={1} className="bg-green-200">
          <h2 className="text-2xl font-bold">Section de droite</h2>
          <p>Ce bloc arrive depuis la droite quand on scroll.</p>
        </SlideIn>

        {/* Hero sections */}
        <HeroSection image="/image.jpg" text="Hoverable" hover />
        <HeroSection image="/image2.jpg" text="Static" direction="right" />

        {/* Slow versions */}
        <SlideIn from="left" duration={1} className="bg-blue-200">
          <h2>Fast Left</h2>
        </SlideIn>

        <SlideIn from="right" duration={4} className="bg-green-200">
          <h2>Slow Right</h2>
        </SlideIn>
      </div>
    </main>
  );
}
