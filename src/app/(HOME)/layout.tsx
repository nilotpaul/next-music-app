import Sidebar from "@/components/sidebar/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen">
      <div className="mx-auto flex h-full w-full md:gap-x-4 md:px-3 md:py-2 ">
        <section>
          <Sidebar />
        </section>
        {children}
      </div>
    </main>
  );
}
