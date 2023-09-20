export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[1120px] px-4 md:max-w-[1280px] md:px-10">
      {children}
    </main>
  );
}
