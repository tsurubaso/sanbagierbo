import ClientWrapper from "@/components/ClientWrapper";

export default function ReaderLayout({ children }) {
  return (
    <ClientWrapper navItemsTop>
      {children}
    </ClientWrapper>
  );
}
