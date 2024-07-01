import { useState } from "react";
import { QuoteGenerator } from "./components/quote-generator";
import { GeolocalizationRepo } from "./shared/repositories/geolocalization-repo";
import { WorldTimeRepo } from "./shared/repositories/worldtime-repo";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [more, setMore] = useState(false);

  const { data } = useQuery({
    queryKey: ["timezone"],
    queryFn: initializeGeolocalization,
    refetchOnWindowFocus: false,
    
  });

  async function initializeGeolocalization() {
    const { getUserCurrentIPAddress } = new GeolocalizationRepo();
    const { getTimezoneByIPAddress } = new WorldTimeRepo();

    try {
      const IPAddress = await getUserCurrentIPAddress();
      const timezone = await getTimezoneByIPAddress(IPAddress.ip);

      return {
        IPAddress,
        timezone,
      };
    } catch (error) {
      throw new Error("Failed to fetch geolocalization data");
    }
  }

  return (
    <div className="w-full h-full bg-red-400">
      {!more && (
        <header>
          <QuoteGenerator />
        </header>
      )}

      <main></main>

      <footer></footer>
    </div>
  );
}

export default App;
