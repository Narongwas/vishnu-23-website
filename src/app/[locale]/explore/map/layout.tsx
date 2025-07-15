import BackgroundWithNoise from "@/components/BackgroundWithNoise";

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
          <div className="relative mx-auto min-h-screen max-w-200 px-4">
            {children}
          </div>
        </BackgroundWithNoise>
      </body>
    </html>
  );
}
