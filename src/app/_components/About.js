import Image from "next/image";

export default function AboutWanderlust() {
  const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1688828792704-4218151b5d97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="bg-[#F9F7F3] py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-5">
          <h2 className="text-4xl font-extrabold text-[#1C160C]">
            About Wanderlust 🌍
          </h2>
          <p className="text-[#5A4B32] text-lg leading-relaxed">
            At Wanderlust, we believe every journey should be memorable,
            immersive, and deeply personal. Whether you&apos;re exploring
            ancient ruins, tasting local cuisines, or chasing sunsets, our
            platform helps you build smart, beautiful itineraries tailored to
            your pace.
          </p>
          <p className="text-[#5A4B32] text-lg">
            With expert insights, real-time planning tools, and AI-powered
            suggestions, Wanderlust is more than just an itinerary maker —
            it&#39;s your adventure co-pilot.
          </p>
          <p className="text-[#5A4B32] text-md italic">
            Let’s make every trip unforgettable.
          </p>
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-2 gap-4 rounded-xl overflow-hidden">
          {images.map((img, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden">
              <Image
                height={400}
                width={400}
                src={img}
                alt={`Travel image ${idx + 1}`}
                className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
