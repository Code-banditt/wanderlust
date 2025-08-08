export async function getUserCurrency() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.currency || "USD";
  } catch (error) {
    console.error("Failed to get currency, defaulting to USD");
    return "USD";
  }
}
