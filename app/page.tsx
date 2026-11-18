import NewURLForm from "@/components/NewURLForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-blue-100 p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-3">
        URL Shortener
      </h1>

      <NewURLForm />
    </main>
  );
}
