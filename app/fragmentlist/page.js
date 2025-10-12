import StoriesGrid from "@/components/StoriesGrid";

export default function FragmentListPage() {
  return <StoriesGrid jsonUrl="/stories.json" status="fragment" textDePresentation="Fragments d'histoires ou l'étape entre histoire et brouillon"/>;
}
