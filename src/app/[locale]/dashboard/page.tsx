import MainSection from "./_internal/MainSection";
interface PageProps {
  params: { locale: string } | Promise<{ locale: string }>;
}
export default async function page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div>
      <MainSection locale={locale} />
    </div>
  );
}
