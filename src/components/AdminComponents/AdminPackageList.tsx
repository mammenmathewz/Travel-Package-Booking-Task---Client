import { useState, useEffect } from "react";
import { PackageProps } from "../../Types/PackageTypes";
import { getAllPackages } from "../../Services/Api/packageApis";
import PackageCard from "../PackageComponents/packageCard";
import { Button } from "../ui/button";

function AdminPackageList() {
  const [packages, setPackages] = useState<PackageProps[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "upcoming">("active");
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

  const today = new Date();

  const filteredPackages = packages.filter((pkg) => {
    const startDate = new Date(pkg.startDate);
    const endDate = new Date(pkg.endDate);

    if (activeTab === "completed") {
      return endDate < today;
    } else if (activeTab === "active") {
      return startDate <= today && today <= endDate;
    } else if (activeTab === "upcoming") {
      return startDate > today;
    }
    return true;
  });

  const tabClasses = (tab: string) =>
    `px-4 py-2 text-sm rounded-md ${
      activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
    }`;

  return (
    <div className="p-4">
      <div className="flex justify-center gap-2 mb-6 ">
        <Button className={tabClasses("active")} onClick={() => setActiveTab("active")}>
          Active
        </Button>
        <Button className={tabClasses("completed")} onClick={() => setActiveTab("completed")}>
          Completed
        </Button>
        <Button className={tabClasses("upcoming")} onClick={() => setActiveTab("upcoming")}>
          Upcoming
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-sm">Loading packages...</div>
      ) : filteredPackages.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">No packages in this category.</div>
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

export default AdminPackageList;
