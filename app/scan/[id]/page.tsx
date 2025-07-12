import { use } from "react";

type ScanPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
};

export default function Page({ params }: ScanPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Since this is now a server component, we need to handle data fetching differently
  // You might want to use React Suspense or move this to a client component
  // For now, let's keep it as a client component but update the params handling

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Scan Result</h1>
        <p className="text-gray-300">Product ID: {productId}</p>
        {/* You'll need to implement the product fetching logic here */}
      </div>
    </div>
  );
}
