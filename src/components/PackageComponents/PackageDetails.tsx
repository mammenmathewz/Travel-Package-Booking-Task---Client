import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PackageProps } from "../../Types/PackageTypes";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useAuth } from "../../Services/Context/AuthContext";
import { deletePackage } from "../../Services/Api/packageApis";
import { bookPackage } from "../../Services/Api/userApis";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

function PackageDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const data = state?.packageData;
  const navigate = useNavigate();
  const { user } = useAuth();
 
  

  const [pkg, setPkg] = useState<PackageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [foodIncluded, setFoodIncluded] = useState(false);
  const [accommodationIncluded, setAccommodationIncluded] = useState(false);

  useEffect(() => {
    if (data) {
      setPkg(data);
      setFoodIncluded(data.includedServices?.food ?? false);
      setAccommodationIncluded(data.includedServices?.accommodation ?? false);
      setLoading(false);
      return;
    }
  }, [id, data]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!pkg) return <div className="p-4 text-red-500">Package not found</div>;

  const { from, to, startDate, endDate, basePrice, packageDetails, includedServices } = pkg;

  const totalPrice =
    basePrice +
    (foodIncluded ? 500 : 0) +
    (accommodationIncluded ? 1000 : 0);

  const handleDelete = async () => {
    try {
      await deletePackage(pkg._id);
      navigate("/admin/packages");
    } catch (error) {
      console.error("Failed to delete package:", error);
      alert("Error deleting package.");
    }
  };

  const handleBooking = async () => {
    if (!user) {
      alert("You must be logged in to book a package.");
      return;
    }

    try {
      const response = await bookPackage({
        userId: user.id, 
        travelPackageId: pkg._id,
        customizedServices: {
          food: foodIncluded,
          accommodation: accommodationIncluded,
        },
        totalPrice,
      });

        alert(`Booking success!${response.message}`)
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error occurred while booking.");
    }
  };

  return (
    <div className="p-4 max-w-full lg:max-w-4xl mx-auto space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>

      <Card>
        <CardContent className="space-y-4 p-4">
          <img
            src="https://s7ap1.scene7.com/is/image/incredibleindia/solang-nullah-manali-himachal-pradesh-1-attr-hero?qlt=82&ts=1726730690372"
            alt="Package"
            className="w-full h-72 object-cover rounded-xl border"
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:space-x-4">
            <h2 className="text-2xl font-bold">{from} → {to}</h2>
            <p className="text-base font-medium">Base Price: ₹{basePrice}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(startDate).toDateString()} - {new Date(endDate).toDateString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:space-x-4 mt-2">
            <p className="text-sm">{packageDetails}</p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <h3 className="text-lg font-semibold">Customize Your Trip</h3>

            {includedServices && (
              <div className="space-y-2">
                {includedServices.food && (
                  <p className="text-sm text-green-500">Food is Included</p>
                )}
                {includedServices.accommodation && (
                  <p className="text-sm text-green-500">Accommodation is Included</p>
                )}
              </div>
            )}

            {!includedServices?.food && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="food"
                  checked={foodIncluded}
                  onCheckedChange={() => setFoodIncluded((prev) => !prev)}
                />
                <Label htmlFor="food">Include Food (+₹500)</Label>
              </div>
            )}

            {!includedServices?.accommodation && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accommodation"
                  checked={accommodationIncluded}
                  onCheckedChange={() => setAccommodationIncluded((prev) => !prev)}
                />
                <Label htmlFor="accommodation">Include Accommodation (+₹1000)</Label>
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-base font-semibold">Total: ₹{totalPrice}</p>
          </div>

          {user?.role === "user" && (
            <Button className="w-full" onClick={handleBooking}>
              Book Now
            </Button>
          )}

          {user?.role === "admin" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Package
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the package.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PackageDetails;
