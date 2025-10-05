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
        {/* Objectif */}

        <HeroSection direction = "right" duration="3" text="Full Moon" image="/image.jpg" hover >
        <MotionEffects.GradientText
    text="🚀 Notre objectif 🚀"
    className="text-3xl font-bold text-center"
  />
        </HeroSection >

         <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">Créer un nouveau médium pour aider la créativité de nos auteurs. Chacun d&apos;eux pourra partager et promouvoir son travail facilement, collaborer et échanger sans complications.</h2>
        </SlideIn>

        {/* Lecteur */}
        <MotionEffects.GradientText
          text="📖 Lecteur 📖"
          className="text-2xl font-bold text-center"
        />
        <MotionEffects.FadeIn direction="left">
          <p className="text-center">
            Simplicité et accès direct au contenu avant tout. Profitez de la lecture sans effort.
          </p>
        </MotionEffects.FadeIn>

        {/* Éditeur */}
        <MotionEffects.GradientText
          text="✍️ Éditeur ✍️"
          className="text-2xl font-bold text-center"
        />
        <MotionEffects.FadeIn direction="right">
          <p className="text-center">
            Travaillez main dans la main avec vos collaborateurs, partagez et corrigez sans jamais toucher à l’original.
          </p>
        </MotionEffects.FadeIn>

        {/* Fusionneur */}
        <MotionEffects.GradientText
          text="🔀 Fusionneur 🔀"
          className="text-2xl font-bold text-center"
        />
        <MotionEffects.FadeIn direction="up">
          <p className="text-center">
            Pour l’instant sur ordinateur uniquement, cette app permet de relire, comparer et fusionner les corrections pour créer une version finale harmonisée.
          </p>
        </MotionEffects.FadeIn>

        {/* Évolutions futures */}
        <MotionEffects.GradientText
          text="🌈 Évolutions futures 🌈"
          className="text-2xl font-bold text-center"
        />
        <MotionEffects.PulseText
          text="Bientôt : Ajouter images, photos, dessins et modèles 3D, partager sur réseaux sociaux, nouvelles options de collaboration créative."
          className="text-lg text-center"
        />


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
