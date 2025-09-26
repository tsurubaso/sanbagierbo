"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
//import { useRef } from "react";

export default function Welcome() {
  /*
  const ref = useRef(null);

  // on observe la progression du scroll par rapport à la div ref
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // élément qui part de la gauche et se centre
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  // élément qui part de la droite et se centre
  const xRight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
*/

  function SlideIn({ from = "left", duration = 1, children }) {
    const initialX = from === "left" ? -200 : 200;
    return (
      <motion.div
        initial={{ x: initialX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration }}
        viewport={{ once: true }}
        className="p-6 rounded-lg shadow-lg bg-blue-200"
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
      <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
        {/* Image slides in */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/image.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Text slides in separately, slightly slower */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Mon texte par-dessus l’image
          </h1>
        </motion.div>
      </div>

      {/* Second hero section */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
        {/* Background slides in */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image2.jpg')" }}
        />

        {/* Text slides in separately */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Mon texte par-dessus l’image
          </h1>
        </motion.div>
      </div>

    </div>

        <div className="space-y-16">

      {/* First hero section */}
      <motion.div
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
        className="relative w-full h-64 md:h-96 lg:h-[500px] cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ backgroundImage: "url('/image2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <motion.div
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

        
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          Welcome to the SanSuBagier !
        </h1>

        <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
          {/* Image en arrière-plan */}
          <Image
            src="/image.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />

          {/* Texte par-dessus */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Mon texte par-dessus l’image
            </h1>
          </div>
        </div>

        <div
          className="relative w-full h-64 md:h-96 lg:h-[500px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/image2.jpg')" }}
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Mon texte par-dessus l’image
          </h1>
        </div>

        {/* Animation d’entrée au scroll */}

        <SlideIn from="left" duration={6}>
          <h2>Section de gauche (2s)</h2>
        </SlideIn>
        <SlideIn from="right" duration={6}>
          <h2>Section de gauche (2s)</h2>
        </SlideIn>
        <div className="space-y-32 p-8">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de gauche</h2>
            <p>Ce bloc arrive depuis la gauche quand on scroll.</p>
          </motion.div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-green-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de droite</h2>
            <p>Ce bloc arrive depuis la droite quand on scroll.</p>
          </motion.div>
        </div>

      <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          Welcome to the SanSuBagier !
        </motion.span>

        

        {/* Versions ralenties */}
        <div className="space-y-32 p-8">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="bg-blue-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de gauche (2s)</h2>
          </motion.div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="bg-green-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de droite (2s)</h2>
          </motion.div>
        </div>

        <div className="space-y-32 p-8">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 4 }}
            viewport={{ once: true }}
            className="bg-blue-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de gauche (4s)</h2>
          </motion.div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-green-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Section de droite (4s)</h2>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
