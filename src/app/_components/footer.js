export default function WanderlustFooter() {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        {/* Call to action */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-3">
            Explore the world with Wanderlust
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Personalized itineraries, pro bookings, expert connections — your
            next trip just got smarter.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg bg-white text-black text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-[#A18249] text-white px-4 py-2 rounded-r-lg text-sm font-semibold"
            >
              Get started
            </button>
          </form>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Quick links</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Destinations</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-lg">Social</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">YouTube</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-lg">Legal</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#">Terms of service</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
            <li>
              <a href="#">Cookie policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
      </div>
    </footer>
  );
}
