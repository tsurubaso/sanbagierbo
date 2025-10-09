"use client";

export default function RulePage() {
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
        <h1 className="text-3xl font-extrabold text-center mb-4">
          📖 Les règles
        </h1>

        <h2 className="text-2xl font-bold mb-4">📝 Nommage</h2>
        <ol className="list-decimal list-inside text-lg mb-6 space-y-2">
          <li>
            <strong>Nom de la série en premier</strong> — Le titre de la série
            apparaît en premier, suivi du rang de l’histoire sous forme de
            lettre (A, B, C...) au lieu d’un chiffre.
          </li>
          <li>
            <strong>Les lettres manquantes sont autorisées</strong> — Les trous
            dans l’alphabet sont intentionnels.
          </li>
          <li>
            <strong>Univers partagé</strong> — Toutes les histoires se déroulent
            dans le même univers fictif.
          </li>
          <li>
            <strong>Liens souples</strong> — Les connexions entre histoires sont
            légères ; des éléments récurrents peuvent apparaître sans continuité
            stricte.
          </li>
        </ol>

        <hr className="my-8 border-gray-500" />

        <h2 className="text-2xl font-bold mb-4">📂 Répartition des histoires</h2>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>
            <strong>Brouillons 📝</strong> — Histoires fraîchement ajoutées,
            souvent issues de la reconnaissance vocale, avec beaucoup de fautes.
            C’est principalement l’espace de travail de l’auteur.
          </li>
          <li>
            <strong>Fragments ✂️</strong> — Parties incomplètes ou extraits,
            parfois placés ici avant de rejoindre la section{" "}
            <em>histoires</em>.
          </li>
          <li>
            <strong>Histoires 📚</strong> — Les œuvres terminées, ou du moins ce
            que je souhaite qu’elles soient.
          </li>
          <li>
            <strong>Autres 🗂️</strong> — Textes anciens. Parce que les vieilles
            choses sont aussi agréables à lire.
          </li>
        </ul>

        <hr className="my-8 border-gray-500" />
      </div>
    </div>
  );
}
