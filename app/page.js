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
        <GradientText
          text="Welcome to SanBagierBo"
          className="text-4xl font-bold"
        />
        {/* Objectif */}

        <HeroSection
          direction="right"
          duration="3"
          text="Full Moon"
          image="/image.jpg"
          hover
        >
          <GradientText
            text="🚀 Notre objectif 🚀"
            className="text-3xl font-bold text-center"
          />
        </HeroSection>

        <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">
            Un nouveau médium pour aider la créativité de nos auteurs. Chacun
            d&apos;eux pourra partager et promouvoir son travail facilement,
            collaborer et échanger sans complications.
          </h2>
        </SlideIn>

        {/* Lecteur */}
        <HeroSection
          direction="right"
          duration="3"
          text="screenshot lecteur"
          image="/screenShotLecteur.jpg"
          hover
        >
          <GradientText
            text="📖 Lecteur 📖"
            className="text-2xl font-bold text-center"
          />
        </HeroSection>

        <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">
            Simplicité et accès direct au contenu avant tout. Profitez de la
            lecture sans effort.
          </h2>
        </SlideIn>

        {/* Éditeur */}
        <HeroSection
          direction="right"
          duration="3"
          text="screenshot éditeur"
          image="/screenShotEditor.jpg"
          hover
        >
          <GradientText
            text="✍️ Éditeur ✍️"
            className="text-2xl font-bold text-center"
          />
        </HeroSection>
        <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">
            Travaillez main dans la main avec vos collaborateurs, partagez et
            corrigez sans jamais toucher à l’original.
          </h2>
        </SlideIn>

        {/* Fusionneur */}
        <HeroSection
          direction="right"
          duration="3"
          text="Screenshot mergeur"
          image="/screenShotMerger.jpg"
          hover
        >
          <GradientText
            text="🔀 Mergeur 🔀"
            className="text-2xl font-bold text-center"
          />
        </HeroSection>
        <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">
            Cette partie de l&apos;app permet de relire, comparer et fusionner
            les corrections pour créer une version finale harmonisée.
          </h2>
        </SlideIn>

        {/* Évolutions futures */}
        <HeroSection
          direction="right"
          duration="3"
          text="Full Moon"
          image="/image4.jpg"
          hover
        >
          <GradientText
            text="🌈 Évolutions futures 🌈"
            className="text-2xl font-bold text-center"
          />
        </HeroSection>

        <SlideIn duration="3" from="left" className="bg-gray-600">
          <h2 className="text-2xl font-bold">
            Bientôt : Ajouter images, photos, dessins et modèles 3D, partager
            sur réseaux sociaux, nouvelles options de collaboration créative.
          </h2>
        </SlideIn>

        <div className="p-8 space-y-16">
          <p className="text-lg mb-6">
            Vous avez toujours lu de merveilleuses histoires...
            <br />
            De grands auteurs, de grandes aventures.
            <br />
            Mais à quoi bon une histoire sans illustration ?
          </p>

          <p className="text-lg mb-6">
            Pensez à{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Jules_Verne"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jules Verne
              </a>
            </strong>{" "}
            sans{" "}
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
            , et{" "}
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
            Ou encore{" "}
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
            Oui, vous voyez, dans votre esprit — et pour des générations
            entières — ces histoires ont toujours été illustrées.
            <br />
            L’art de l’éditeur a toujours été de marier le texte et l’image.
            <br />
            Pour Jules, c’était{" "}
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

          <TypingText
            text="Let's build something amazing."
            className="text-xl"
          />

          <HoverZoom>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              Hover me!
            </div>
          </HoverZoom>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <HeroSection image="/image.jpg" text="Interactive Image" />
        </motion.div>

        <HeroSection image="/image.jpg" text="Mon texte par-dessus l’image" />
        <HeroSection image="/image2.jpg" text="Autre texte" direction="right" />
        <ScrollColorSection
          text="Tu as toujours lu de merveilleuses histoires…
De grands auteurs, de grandes aventures.
Mais à quoi sert une histoire sans illustration ?

Pense à Jules Verne sans Édouard Riou, Alphonse de Neuville, Léon Benett et Jules Férat.
Ou encore Émile-Antoine Bayard !

Oui, tu vois, dans ton esprit — et pour des générations — ces histoires ont toujours été illustrées.
L’art de l’éditeur a toujours été de combiner le texte et l’image.
Pour Jules, c’était Pierre-Jules Hetzel."
        />
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
