import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PackageProps } from "../../Types/PackageTypes";
import { editPackage } from "../../Services/Api/packageApis"; // adjust path if needed

function EditPackageForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const packageData: PackageProps = state?.packageData;

  const [formData, setFormData] = useState({
    from: packageData?.from || "",
    to: packageData?.to || "",
    startDate: packageData?.startDate?.split("T")[0] || "",
    endDate: packageData?.endDate?.split("T")[0] || "",
    basePrice: packageData?.basePrice || 0,
    packageDetails: packageData?.packageDetails || "",
    food: packageData?.includedServices?.food || false,
    accommodation: packageData?.includedServices?.accommodation || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData?._id) {
      alert("Package ID is missing");
      return;
    }
    try {
      const updatedData = {
        from: formData.from,
        to: formData.to,
        startDate: formData.startDate,
        endDate: formData.endDate,
        basePrice: Number(formData.basePrice),
        packageDetails: formData.packageDetails,
        includedServices: {
          food: formData.food,
          accommodation: formData.accommodation,
        },
      };

      await editPackage(packageData._id, updatedData);
      alert("Package updated successfully!");
      navigate("/admin/packages");
    } catch (err) {
      console.error(err);
      alert("Failed to update the package.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="From" className="w-full p-2 border rounded" />
        <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="To" className="w-full p-2 border rounded" />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="basePrice" value={formData.basePrice} onChange={handleChange} placeholder="Base Price" className="w-full p-2 border rounded" />
        <textarea name="packageDetails" value={formData.packageDetails} onChange={handleChange} placeholder="Package Details" className="w-full p-2 border rounded" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="food" checked={formData.food} onChange={handleChange} />
          <span>Food Included</span>
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleChange} />
          <span>Accommodation Included</span>
        </label>

        <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-blue-950 transition">Update Package</button>
      </form>
    </div>
  );
}

export default EditPackageForm;
