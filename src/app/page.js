import Header from "./_components/header";
import Image from "next/image";
import ItineraryBuilder from "./_components/itenary";
import MainSlideView from "./_components/mainSlideView";
import Link from "next/link";
import YourTrips from "./_components/YourTrips";
import AboutWanderlust from "./_components/About";
import WanderlustFooter from "./_components/footer";
import DestinationGrid from "./_components/Grid";
import FadeUpWrapper from "./_components/wrapper";

export default function Home() {
  return (
    <>
      <main
        className="relative flex min-h-screen flex-col bg-[#FFFFFF] justify-between overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header />
        </div>

        {/* Hero Section  */}
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src="https://cdn.pixabay.com/photo/2024/11/07/19/33/ai-generated-9181637_1280.png"
            alt="Vacation Destination"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              World&apos;s Smartest Vacation Planner
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Trips, Tales & Trust — Plan smarter. Travel better.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/Create"
                className="bg-gray-900 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg"
              >
                Plan Your Next Vacation
              </Link>
              <button className="bg-white text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-full text-lg">
                Find Tours & Activities
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-md text-center">
            <p className="text-sm font-medium">
              Excellent <strong>4.6</strong> / 5
            </p>
            <span className="text-xs text-gray-500">Trustpilot</span>
          </div>
        </div>

        {/* Top Destinations */}
        <FadeUpWrapper>
          <MainSlideView />
        </FadeUpWrapper>

        <div className="mt-24">
          <DestinationGrid />
        </div>
        {/* Itinerary Builder */}

        <div className="mt-16">
          <ItineraryBuilder />
        </div>

        <FadeUpWrapper>
          <YourTrips />
        </FadeUpWrapper>

        <FadeUpWrapper>
          <AboutWanderlust />
        </FadeUpWrapper>

        <FadeUpWrapper>
          <div>
            <WanderlustFooter />
          </div>
        </FadeUpWrapper>
      </main>
    </>
  );
}
