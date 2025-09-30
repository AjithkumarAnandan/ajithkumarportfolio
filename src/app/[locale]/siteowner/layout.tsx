import FooterSection from "@/components/footer/FooterSection";
import HeaderSection from "@/components/header/HeaderSection";
import React from "react";

interface PageProps {
  params: { locale: string } | Promise<{ locale: string }>;
  children: React.ReactNode;
}
const LocaleLayout = async ({ params, children }: PageProps) => {
  const { locale } = await params;
  return (
    <div className="  ">
      {/* MainSection Section */}
      <section className=" col-span-full md:col-span-6">{children}</section>
      {/* Footer */}
      <footer className=" border-t border-border py-2 col-span-full md:col-span-6 bg-amber-100  dark:bg-gray-500 w-full">
        <FooterSection />
      </footer>
    </div>
  );
};

export default LocaleLayout;
