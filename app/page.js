"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Welcome() {
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

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="p-8 rounded-lg shadow-md max-w-3xl mx-auto"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid #444",
        }}
      >
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
        <p className="text-lg mb-6">
          You always have been reading wonderful stories...
          <br />
          Great Authors, Great Adventures.
          <br />
          But what good is a story without an illustration?
        </p>
        <p className="text-lg mb-6">
          Think about{" "}
          <strong>
            <a
              href="https://en.wikipedia.org/wiki/Jules_Verne"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jules Verne
            </a>
          </strong>{" "}
          without{" "}
          <em>
            <a
              href="https://fr.wikipedia.org/wiki/%C3%89douard_Riou"
              target="_blank"
              rel="noopener noreferrer"
            >
              Édouard Riou
            </a>
            ,{" "}
            <a
              href="https://fr.wikipedia.org/wiki/Alphonse_de_Neuville"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alphonse de Neuville
            </a>
            ,{" "}
            <a
              href="https://fr.wikipedia.org/wiki/L%C3%A9on_Benett"
              target="_blank"
              rel="noopener noreferrer"
            >
              Léon Benett
            </a>
          </em>
          , and{" "}
          <em>
            <a
              href="https://fr.wikipedia.org/wiki/Jules_F%C3%A9rat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jules Férat
            </a>
          </em>
          .<br />
          Or{" "}
          <em>
            <a
              href="https://en.wikipedia.org/wiki/%C3%89mile_Bayard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Émile-Antoine Bayard
            </a>
          </em>
          !
        </p>

        <p className="text-lg mb-6">
          Yes, you see, in your mind, and for generations, those stories had
          always been illustrated.
          <br />
          The art of the Editor has always been to combine text and image.
          <br />
          For Jules it was{" "}
          <strong>
            <a
              href="https://en.wikipedia.org/wiki/Pierre-Jules_Hetzel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pierre-Jules Hetzel
            </a>
          </strong>
          .
        </p>

        <hr className="my-8 border-gray-500" />

        <h2 className="text-2xl font-bold mb-4">✏️ What is this project?</h2>
        <p className="text-lg mb-6">
          Here, content creators can create illustrated stories and share their
          work.
          <br />
          The goal is to{" "}
          <strong>promote and, in the future, remunerate creators</strong>:
        </p>
        <ul className="list-disc list-inside text-lg mb-6">
          <li>Illustrators</li>
          <li>Graphic designers</li>
          <li>Painters</li>
          <li>Photographers</li>
          <li>3D artists</li>
        </ul>
        <p className="text-lg mb-6">... it&apos;s open bar!</p>

        <div ref={ref} className="space-y-64 p-8 min-h-[200vh]">
          <motion.div
            style={{ x: xLeft }}
            className="bg-blue-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Bloc lié au scroll (gauche)</h2>
            <p>
              Se rapproche du centre en scrollant, repart à gauche si on
              remonte.
            </p>
          </motion.div>

          <motion.div
            style={{ x: xRight }}
            className="bg-green-200 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold">Bloc lié au scroll (droite)</h2>
            <p>
              Se rapproche du centre en scrollant, repart à droite si on
              remonte.
            </p>
          </motion.div>
        </div>

                <div className="space-y-32 p-8">
          {/* Élément qui rentre de la gauche */}
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

          {/* Élément qui rentre de la droite */}
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

        <div className="space-y-32 p-8">
  {/* Élément qui rentre de la gauche */}
  <motion.div
    initial={{ x: -200, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 2 }}   // ⏱️ plus lent
    viewport={{ once: true }}
    className="bg-blue-200 p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold">Section de gauche</h2>
    <p>Ce bloc arrive depuis la gauche quand on scroll.</p>
  </motion.div>

  {/* Élément qui rentre de la droite */}
  <motion.div
    initial={{ x: 200, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 2 }}   // ⏱️ plus lent
    viewport={{ once: true }}
    className="bg-green-200 p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold">Section de droite</h2>
    <p>Ce bloc arrive depuis la droite quand on scroll.</p>
  </motion.div>
</div>

<div className="space-y-32 p-8">
  {/* Élément qui rentre de la gauche */}
  <motion.div
    initial={{ x: -200, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 4 }}   // ⏱️ plus lent
    viewport={{ once: true }}
    className="bg-blue-200 p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold">Section de gauche</h2>
    <p>Ce bloc arrive depuis la gauche quand on scroll.</p>
  </motion.div>

  {/* Élément qui rentre de la droite */}
  <motion.div
    initial={{ x: 200, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 4, ease: "easeOut" }}
    viewport={{ once: true }}
    className="bg-green-200 p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold">Section de droite</h2>
    <p>Ce bloc arrive depuis la droite quand on scroll.</p>
  </motion.div>
</div>


        <hr className="my-8 border-gray-500" />

        <h2 className="text-2xl font-bold mb-4">🔧 What&apos;s next?</h2>
        <ul className="list-disc list-inside text-lg mb-6">
          <li>
            I will share with creators another app to simplify the process.
          </li>
          <li>You will have more control and autonomy.</li>
          <li>Later, I will open this space to writers — but not yet.</li>
          <li>For now, just share your link — we will not host it.</li>
        </ul>

        <hr className="my-8 border-gray-500" />

        <h2 className="text-2xl font-bold mb-4">📚 How to contribute</h2>
        <p className="text-lg mb-6">
          I invite you to <strong>read the stories</strong>, see where
          illustrations can fit, and we will take care of the rest.
        </p>
        <p className="text-lg mb-6">
          This software is hosted on GitHub — feel free to{" "}
          <strong>clone it</strong>.
          <br />I will add rules later on, but the first one is:
        </p>
        <blockquote
          className="border-l-4 pl-4 italic mb-6"
          style={{ borderColor: "#777", color: "var(--foreground)" }}
        >
          🧾 <strong>Respect the work of others.</strong>
        </blockquote>
        <p className="text-lg">
          This implies that, in the future, I will better organize the{" "}
          <code>/public</code> folder.
          <br />
          For now you have only one big group of related stories and novels.
        </p>
      </div>
    </div>
  );
}
