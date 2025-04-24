import React, { useState } from "react";
import { addPackage } from "../../Services/Api/packageApis";
import { useNavigate } from "react-router-dom";

function NewPackage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    basePrice: "",
    packageDetails: "",
    food: false,
    accommodation: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
      };
      const response = await addPackage(payload);
      console.log("Package added:", response);
      navigate("/admin/packages"); 
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="From"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="To"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="Base Price"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="packageDetails"
          value={formData.packageDetails}
          onChange={handleChange}
          placeholder="Package Details"
          className="w-full p-2 border rounded"
          required
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="food" checked={formData.food} onChange={handleChange} />
          <span>Food Included</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="accommodation"
            checked={formData.accommodation}
            onChange={handleChange}
          />
          <span>Accommodation Included</span>
        </label>

        <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-blue-950 transition">
          Add Package
        </button>
      </form>
    </div>
  );
}

export default NewPackage;
