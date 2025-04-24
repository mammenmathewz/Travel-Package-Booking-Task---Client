import { useAuth } from "../../Services/Context/AuthContext"; 
import { format } from "date-fns";
import { Card } from "../ui/card"; 
import { getStatus } from "../../Services/Helper/Helper";
import { PackageProps } from "../../Types/PackageTypes";
import { useNavigate } from "react-router-dom";

function PackageCard({_id, from, to, startDate, endDate, basePrice, bookingCount, packageDetails, includedServices }: PackageProps) {
  const { user } = useAuth();
  const status = getStatus(startDate, endDate);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/package/${_id}`, {
      state: {
        packageData: {
          _id,
          from,
          to,
          startDate,
          endDate,
          basePrice,
          bookingCount,
          packageDetails,
          includedServices
        }
      }
    });
  };
  const handleCardClickEdit = () => {
    navigate(`/admin/packages/edit/${_id}`, {
      state: {
        packageData: {
          _id,
          from,
          to,
          startDate,
          endDate,
          basePrice,
          bookingCount,
          packageDetails,
          includedServices
        }
      }
    });
  };

  return (
    <Card  className="max-w-md mx-auto border rounded-xl shadow-md p-4 space-y-4 ">
      <div className="text-lg font-semibold">{from} → {to}</div>
      <div className="text-sm text-gray-500">
        {format(new Date(startDate), "PPP")} - {format(new Date(endDate), "PPP")}
      </div>
      <div className="text-sm">Price: ₹{basePrice}</div>
      <div className={`text-sm font-medium ${status === "Completed" ? "text-red-500" : status === "Active" ? "text-green-600" : "text-blue-500"}`}>
        Status: {status}
      </div>
      <button
            className="mt-1 px-4 py-1 text-sm bg-black text-white rounded hover:bg-blue-950 transition"
            onClick={handleCardClick}
          >
            Details
          </button>

      {user?.role === "admin" && (
        <>
     

          {/* Edit Button */}
          <button
            className="mt-1 px-4 py-1 text-sm bg-black text-white rounded hover:bg-blue-950 transition"
          onClick={handleCardClickEdit}>
            Edit Package
          </button>
        </>
      )}
    </Card>
  );
}

export default PackageCard;
