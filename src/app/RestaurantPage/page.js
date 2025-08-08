export default function FoodInVietnamPage() {
  return (
    <div className="flex gap-6 px-8 py-10 w-full bg-white text-gray-800">
      {/* Sidebar Filters */}
      <aside className="w-64 space-y-6">
        <FilterSection
          title="Establishment Type"
          options={["Restaurants", "Coffee & Tea", "Bars & Pubs"]}
        />
        <FilterSection
          title="Meals"
          options={["Breakfast", "Brunch", "Lunch", "Dinner"]}
        />
        <FilterSection title="Online Options" options={["Online Bookings"]} />
        <FilterSection
          title="Cuisines"
          options={["Asian", "Indonesian", "Italian", "European"]}
        />
        <FilterSection
          title="Dishes"
          options={["Fish", "Burger", "Juice & Smoothies", "Salad"]}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Food in Vietnam</h1>
          <button className="text-sm text-blue-600 hover:underline">
            See All
          </button>
        </div>

        {/* Top Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRestaurants.map((r, idx) => (
            <div
              key={idx}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{r.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{r.city}</p>
                <p className="text-yellow-500 text-sm font-medium">
                  From ${r.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detailedRestaurants.map((r, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg flex gap-4 hover:shadow-md transition"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-md mb-1">{r.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{r.city}</p>
                <p className="text-yellow-500 text-sm font-medium">
                  From ${r.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function FilterSection({ title, options }) {
  return (
    <div>
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        {options.map((opt, i) => (
          <li key={i}>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

const topRestaurants = [
  {
    name: "Nha Trang Hotel & Spa",
    city: "Nha Trang",
    price: 10,
    image: "https://images.pexels.com/photos/4666756/pexels-photo-4666756.jpeg",
  },
  {
    name: "The Golden Dragon Restaurant",
    city: "Da Nang",
    price: 21,
    image: "https://images.pexels.com/photos/5409028/pexels-photo-5409028.jpeg",
  },
  {
    name: "InterContinental Saigon",
    city: "Ho Chi Minh City",
    price: 8.77,
    image: "https://images.pexels.com/photos/6740779/pexels-photo-6740779.jpeg",
  },
];

const detailedRestaurants = [
  ...topRestaurants,
  {
    name: "Veranda Vietnamese Restaurant",
    city: "Ho Chi Minh City",
    price: 10,
    image: "https://images.pexels.com/photos/6646931/pexels-photo-6646931.jpeg",
  },
  {
    name: "JP Marriott Phu Quoc",
    city: "Phu Quoc",
    price: 40,
    image: "https://images.pexels.com/photos/6740744/pexels-photo-6740744.jpeg",
  },
  {
    name: "Oven D'or Restaurant",
    city: "Nha Trang",
    price: 10,
    image: "https://images.pexels.com/photos/8530069/pexels-photo-8530069.jpeg",
  },
];
