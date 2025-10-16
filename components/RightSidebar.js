export default function RightSidebar({ description, content }) {
  return (
    <aside className="w-64 bg-black text-white transition-all duration-700 p-4 border-r flex flex-col justify-between">
      <nav className="space-y-4">
        <h2 className="font-semibold mb-2">Infos</h2>{" "}
        {/* Description dynamique */}
        <div className="text-sm text-gray-300">
          {description || "Zone pour afficher des détails, stats, ou options."}
        </div>
        {/* Contenu additionnel */}
        <div className="mt-6 border-t border-gray-700 pt-4">{content}</div>
      </nav>
    </aside>
  );
}
//GitHubSideBar.js
