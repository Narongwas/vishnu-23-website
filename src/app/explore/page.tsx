import NavBar from "@/components/NavBar";

export default function ExplorePage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <p>Explore content goes here.</p>
      </main>
      <NavBar />
    </div>
  );
}
