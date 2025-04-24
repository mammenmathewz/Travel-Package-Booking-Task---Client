import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { getUserBookings } from "../../Services/Api/adminApis";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "../ui/table";

interface TravelPackage {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  basePrice: number;
}

interface Booking {
  bookingId: string;
  totalPrice: number;
  travelPackage: TravelPackage;
  customizedServices?: Record<string, any>; 
  createdAt: string;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

const getStatus = (startDate: string, endDate: string): string => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < today) return "Completed";
  if (start <= today && end >= today) return "Active";
  return "Upcoming";
};

const UserBasedPackages = () => {
  const { id } = useParams<{ id: string }>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!id) return;
        const response = await getUserBookings(id);
        setBookings(response || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  return (
    <div className="w-screen overflow-x-auto px-8 py-4">
  <h2 className="text-2xl font-semibold mb-4">User Travel Bookings</h2>
  {loading ? (
    <p>Loading bookings...</p>
  ) : bookings.length === 0 ? (
    <p className="text-gray-500">No bookings found for this user.</p>
  ) : (
    <div className="min-w-full">
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map(({ bookingId, totalPrice, travelPackage }) => {
            const { from, to, startDate, endDate, basePrice } = travelPackage;

            return (
              <TableRow
                key={bookingId}
                className="hover:bg-muted/50 transition cursor-pointer"
              >
                <TableCell>{from || "-"}</TableCell>
                <TableCell>{to || "-"}</TableCell>
                <TableCell>{format(new Date(startDate), "yyyy-MM-dd")}</TableCell>
                <TableCell>{format(new Date(endDate), "yyyy-MM-dd")}</TableCell>
                <TableCell>{formatCurrency(basePrice)}</TableCell>
                <TableCell>{formatCurrency(totalPrice)}</TableCell>
                <TableCell>{getStatus(startDate, endDate)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )}
</div>

  );
};

export default UserBasedPackages;
