import StoriesGrid from "@/components/StoriesGrid";

export default function StoryListPage() {
  return <StoriesGrid jsonUrl="/stories.json" status="story" textDePresentation="Les histoires toutes centrées sur un univers, la collonisation de la Lune"/>;
}
