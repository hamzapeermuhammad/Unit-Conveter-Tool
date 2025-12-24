import UnitConverter from '@/components/unit-converter';

export default function Home() {
  return (
    <main 
      className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="z-10">
        <UnitConverter />
      </div>
    </main>
  );
}
