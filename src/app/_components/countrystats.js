export default function CountryStatsTable({ countryinfo }) {
  const stats = [
    { label: "Capital", value: countryinfo.capital },
    {
      label: "Population",
      value: `${countryinfo.population?.toLocaleString() ?? "N/A"} M`,
    },
    { label: "Population Growth", value: `${countryinfo.pop_growth}%` },
    { label: "GDP", value: `$${countryinfo.gdp?.toLocaleString() ?? "N/A"}M` },
    { label: "GDP Growth", value: `${countryinfo.gdp_growth}%` },
    {
      label: "GDP per Capita",
      value: `$${countryinfo.gdp_per_capita?.toLocaleString() ?? "N/A"}`,
    },
    { label: "Unemployment Rate", value: `${countryinfo.unemployment}%` },
    { label: "Urban Population", value: `${countryinfo.urban_population}%` },
    { label: "Urban Growth", value: `${countryinfo.urban_population_growth}%` },
    { label: "CO₂ Emissions", value: `${countryinfo.co2_emissions} MT` },
    { label: "Forested Area", value: `${countryinfo.forested_area}%` },
    {
      label: "Life Expectancy (Male)",
      value: `${countryinfo.life_expectancy_male} yrs`,
    },
    {
      label: "Life Expectancy (Female)",
      value: `${countryinfo.life_expectancy_female} yrs`,
    },
    { label: "Fertility Rate", value: countryinfo.fertility },
    {
      label: "Infant Mortality",
      value: `${countryinfo.infant_mortality} /1000`,
    },
    { label: "Internet Users", value: `${countryinfo.internet_users}%` },
    { label: "Sex Ratio", value: countryinfo.sex_ratio },
    { label: "Threatened Species", value: countryinfo.threatened_species },
    { label: "Refugees Hosted", value: `${countryinfo.refugees}K` },
    {
      label: "Tourists per Year",
      value: `${countryinfo.tourists?.toLocaleString() ?? "N/A"}K`,
    },
    {
      label: "Imports",
      value: `$${countryinfo.imports?.toLocaleString() ?? "N/A"}M`,
    },
    {
      label: "Exports",
      value: `$${countryinfo.exports?.toLocaleString() ?? "N/A"}M`,
    },
    {
      label: "Currency",
      value: countryinfo.currency
        ? `${countryinfo.currency.name} (${countryinfo.currency.code})`
        : "N/A",
    },
  ];

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        📊 Country Stats
      </h2>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <tbody>
            {stats.map((stat, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b last:border-b-0`}
              >
                <td className="px-5 py-3 font-medium text-gray-700 w-1/2">
                  {stat.label}
                </td>
                <td className="px-5 py-3 text-gray-900">{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
