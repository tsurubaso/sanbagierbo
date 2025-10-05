"use client";
import { motion } from "framer-motion";
import MotionEffects from "@/components/MotionEffects";

const {
  PulseText,
  FadeIn,
  GradientText,
  TypingText,
  HoverZoom,
  HeroSection,
  ScrollColorSection,
  ScrollShiftSection,
  AnimatedText,
  SlideIn,
} = MotionEffects;

export default function Welcome() {
  return (
    <main className="flex min-h-screen items-center justify-center py-2 px-8">
      <div className="w-full max-w-3xl p-8 rounded-lg shadow-md border space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>
            Our objective is to create a new medium — a fresh way to enjoy
            creativity centered on authors. We want this tool to be essentially
            the first space for any author to promote and share their work.
            Avoiding complexity, you can collaborate, exchange views, and share
            easily.
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
        </motion.div>

        <div className="p-8 space-y-16">
          <PulseText text="A New Way to Create" className="text-3xl font-bold" />

          <FadeIn direction="left">
            <p>This text fades in from the left.</p>
          </FadeIn>

          <GradientText
            text="Welcome to SanSuBagier"
            className="text-4xl font-bold"
          />

          <TypingText
            text="Let's build something amazing."
            className="text-xl"
          />

          <HoverZoom>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">Hover me!</div>
          </HoverZoom>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <HeroSection image="/image.jpg" text="Interactive Image" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {"Welcome to SanSuBagier!".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>

        <HeroSection image="/image.jpg" text="Mon texte par-dessus l’image" />
        <HeroSection image="/image2.jpg" text="Autre texte" direction="right" />
        <ScrollColorSection />
        <ScrollShiftSection />
        <AnimatedText
          text="Welcome to the SanSuBagier !"
          duration={6}
          className="text-2xl font-semibold"
        />
        <SlideIn from="left" className="bg-blue-200">
          <h2 className="text-2xl font-bold">Section de gauche</h2>
          <p>Ce bloc arrive depuis la gauche quand on scroll.</p>
        </SlideIn>

        <HeroSection image="/image.jpg" text="Hoverable" hover />
        <HeroSection image="/image2.jpg" text="Static" direction="right" />
      </div>
    </main>
  );
}
