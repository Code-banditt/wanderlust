import Image from "next/image";

export default function ItineraryBuilder() {
  const features = [
    {
      title: "Flight, Train, Bus",
      description: "Search and add transportation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M235.58,128.84..." />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1524592714635-d77511a4834d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Plane
    },
    {
      title: "Destinations, Hotels, Restaurants",
      description: "Find and save places of interest",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,64a40,40..." />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", // Map
    },
    {
      title: "Dates, Times, Duration",
      description: "Set travel dates and times",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104..." />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", // Clock
    },
    {
      title: "Web, iOS, Android",
      description: "Access your trip anywhere, anytime",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M192,24H64A24,24..." />
        </svg>
      ),
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", // Device
    },
  ];

  return (
    <section className="py-12">
      <div className="px-4 max-w-6xl mx-auto">
        <h2 className="text-[#1C160C] text-[22px] font-bold tracking-tight mb-2">
          Smart itinerary builder
        </h2>

        <h1 className="text-[#1C160C] text-4xl sm:text-3xl font-black max-w-3xl mb-10">
          Create a detailed itinerary for your trip
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden min-h-[260px] shadow-lg group transition-transform hover:scale-[1.015]"
            >
              <Image
                width={400}
                height={400}
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="relative z-10 p-5 flex flex-col justify-end h-full text-white">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
