import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { PackageProps } from "../../Types/PackageTypes";
import PackageCard from "../PackageComponents/packageCard";
import { getAllPackages } from "../../Services/Api/packageApis";
import { Button } from "../ui/button";

function PackageList() {
  const [packages, setPackages] = useState<PackageProps[]>([]);
  const [search, setSearch] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
  });
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await getAllPackages();
        const packagesData = response.data || response;
        if (Array.isArray(packagesData)) {
          setPackages(packagesData);
        } else {
          console.error("Expected an array of packages, but received:", packagesData);
          setPackages([]);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPackages = packages
    .filter(
      (pkg) =>
        (!search.from || pkg.from.toLowerCase().includes(search.from.toLowerCase())) &&
        (!search.to || pkg.to.toLowerCase().includes(search.to.toLowerCase())) &&
        (!search.startDate || new Date(pkg.startDate) >= new Date(search.startDate)) &&
        (!search.endDate || new Date(pkg.endDate) <= new Date(search.endDate))
    )
    .sort((a, b) =>
      sortBy === "price"
        ? a.basePrice - b.basePrice
        : sortBy === "priceHighToLow"
        ? b.basePrice - a.basePrice
        : 0
    );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow p-3 mb-4 border border-gray-200">
        <h2 className="text-base font-semibold mb-2">Search Packages:</h2>
        <div className="flex flex-wrap gap-2 mb-3 items-center">
          <Input
            placeholder="From"
            value={search.from}
            onChange={(e) => setSearch({ ...search, from: e.target.value })}
            className="text-s py-1 px-2 w-36"
          />
          <Input
            placeholder="To"
            value={search.to}
            onChange={(e) => setSearch({ ...search, to: e.target.value })}
            className="text-s py-1 px-2 w-36"
          />
          <Input
            type="date"
            value={search.startDate}
            onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
            className="text-xs py-1 px-2 w-36"
          />
          <Input
            type="date"
            value={search.endDate}
            onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
            className="text-s py-1 px-2 w-36"
          />
          <div className="flex items-center gap-2">
            <label className="text-s font-medium">Sort by:</label>
            <select
              className="border rounded px-2 py-1 text-s"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => console.log("Search triggered")}
            variant={"default"}
          >
            Search
          </Button>
        </div>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="text-sm text-gray-500">
          No packages found matching your search criteria.
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 cursor-pointer">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} {...pkg} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PackageList;
