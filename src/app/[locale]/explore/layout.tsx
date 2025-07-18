import BackgroundWithNoise from "@/components/BackgroundWithNoise";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="relative mx-auto min-h-screen max-w-200 px-4">
        {children}
      </div>
    </BackgroundWithNoise>
  );
}
