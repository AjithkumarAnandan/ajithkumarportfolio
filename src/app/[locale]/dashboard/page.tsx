import React from "react";
import MainSection from "./_internal/MainSection";
import HeaderSection from "./_internal/HeaderSection";
import FooterSection from "./_internal/FooterSection";

interface PageProps {
  params: { locale: string } | Promise<{ locale: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { locale } = await params;
  return (
    <div className="bg-background text-foreground grid grid-cols-3 md:grid-cols-6 auto-rows-auto gap-4 items-center justify-items-center  mt-18">
      {/* Header */}
      <header className="z-50 w-full fixed top-0 bg-amber-100 dark:bg-gray-500 h-18">
        <HeaderSection locale={locale} />
      </header>
      {/* MainSection Section */}
      <section className="py-4 col-span-full md:col-span-6">
        <MainSection locale={locale} />
      </section>
      {/* Footer */}
      <footer className="border-t border-border py-2 col-span-full md:col-span-6 bg-amber-100  dark:bg-gray-500 w-full">
        <FooterSection />
      </footer>
    </div>
  );
};

export default Page;
