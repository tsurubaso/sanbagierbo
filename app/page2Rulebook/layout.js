import ClientWrapper from "@/components/ClientWrapper";

export default function ReaderLayout({ children }) {
  const navItemsTop = [
    { href: "/reader", label: "📖 Reader" },
    { href: "/writer", label: "✍️ Writer" },
  ];

  const navItems = [
    { href: "/", label: "🏠 Home" },
    { href: "/library", label: "📚 Library" },
  ];

  return (
    <ClientWrapper navItemsTop={navItemsTop} navItems={navItems}>
      {children}
    </ClientWrapper>
  );
}
