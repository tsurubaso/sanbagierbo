"use client";
import StoriesGrid from "@/components/StoriesGrid";

export default function DraftListPage() {
  return (
    <StoriesGrid
      status="draft"
      textDePresentation="Les Brouillons, essentiellement des enregistrements de speech-to-text, beaucoup de fautes à prévoir."
    />
  );
}
