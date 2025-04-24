import { useState } from "react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function UserProfileDashboard() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main Street, City, Country",
    profilePic: "https://via.placeholder.com/100",
  });

  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState("upcoming");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const bookings = {
    upcoming: ["Trip to Bali", "Trip to Goa"],
    active: ["Trip to Maldives"],
    completed: ["Trip to Manali", "Trip to Paris"]
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="flex-1 w-full space-y-2">
            {editMode ? (
              <>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <Input
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </>
            ) : (
              <>
                <CardTitle>{profile.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.address}</p>
              </>
            )}
            <Button
              size="sm"
              onClick={() => setEditMode((prev) => !prev)}
              variant={editMode ? "secondary" : "outline"}
            >
              {editMode ? "Save" : "Edit"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <Tabs value={tab} onValueChange={setTab} className="mt-2">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {bookings.upcoming.map((b, i) => (
                  <Card key={i} className="p-4">{b}</Card>
                ))}
              </CardContent>
            </TabsContent>
            <TabsContent value="active">
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {bookings.active.map((b, i) => (
                  <Card key={i} className="p-4">{b}</Card>
                ))}
              </CardContent>
            </TabsContent>
            <TabsContent value="completed">
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {bookings.completed.map((b, i) => (
                  <Card key={i} className="p-4">{b}</Card>
                ))}
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
