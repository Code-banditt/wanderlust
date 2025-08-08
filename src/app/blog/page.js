import React from "react";
import ExploreLayout from "../CountryList/page";
import HeaderMinimal from "../_components/HeaderMinimal";

const blogPosts = [
  {
    id: 1,
    title: "Exploring the Wonders of Paris",
    date: "2024-06-01",
    excerpt:
      "Discover the magic of Paris, from the Eiffel Tower to cozy cafes.",
    content:
      "Paris is a city that captivates visitors with its charm, history, and culture. Whether you're strolling along the Seine or enjoying a croissant in a local bakery, there's always something new to experience.",
  },
  {
    id: 2,
    title: "A Guide to Backpacking in Thailand",
    date: "2024-05-20",
    excerpt:
      "Tips and tricks for an unforgettable backpacking adventure in Thailand.",
    content:
      "Thailand offers stunning beaches, vibrant cities, and delicious street food. This guide covers the best places to visit, how to get around, and what to pack for your journey.",
  },
];

const travelGuides = [
  {
    id: 1,
    destination: "Rome",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
    tips: "Buy tickets online to skip the lines at major attractions.",
  },
  {
    id: 2,
    destination: "Tokyo",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market"],
    tips: "Get a prepaid Suica card for easy travel on public transport.",
  },
];

const sectionStyle = {
  marginBottom: "3rem",
};

const cardStyle = {
  backgroundColor: "#f9f9f9",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  marginBottom: "2rem",
};

const headingStyle = {
  color: "#222",
  fontSize: "2rem",
  marginBottom: "1rem",
};

const subHeadingStyle = {
  color: "#555",
  fontSize: "1.5rem",
  marginBottom: "0.5rem",
};

export default function BlogPage() {
  return (
    <main
      style={{
        padding: "3rem 5vw",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <HeaderMinimal />
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#1e1e1e" }}>
        🌍 Wanderlust Blog
      </h1>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>📝 Latest Blog Posts</h2>
        {blogPosts.map((post) => (
          <article key={post.id} style={cardStyle}>
            <h3 style={subHeadingStyle}>{post.title}</h3>
            <small style={{ color: "#888" }}>
              {new Date(post.date).toDateString()}
            </small>
            <p style={{ fontWeight: "600", marginTop: "1rem" }}>
              {post.excerpt}
            </p>
            <p
              style={{ lineHeight: "1.6", marginTop: "0.5rem", color: "#444" }}
            >
              {post.content}
            </p>
          </article>
        ))}
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>📌 Travel Guides</h2>
        {travelGuides.map((guide) => (
          <div key={guide.id} style={cardStyle}>
            <h3 style={subHeadingStyle}>{guide.destination}</h3>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
              {guide.highlights.map((item, idx) => (
                <li key={idx} style={{ lineHeight: "1.5" }}>
                  ✅ {item}
                </li>
              ))}
            </ul>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              <strong>Tip:</strong> {guide.tips}
            </p>
          </div>
        ))}
      </section>

      <ExploreLayout />
    </main>
  );
}
