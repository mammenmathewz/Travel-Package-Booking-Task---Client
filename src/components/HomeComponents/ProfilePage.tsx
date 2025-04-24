import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getUserData, updateUserProfile } from "../../Services/Api/userApis";
import { useAuth } from "../../Services/Context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Profile {
  name: string;
  address: string;
  phone: string;
  profilePic: string;
}

export function EditableProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tempProfile, setTempProfile] = useState<Profile | null>(null);
  const { user, setUser } = useAuth(); 
  const userId = user?.id;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;
        const data = await getUserData(userId);
        console.log("User Data:", data);
        setProfile(data);
        setTempProfile(data);
      } catch (err) {
        console.error("Failed to load user profile");
      }
    };
  
    fetchData();
  }, [userId]); 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tempProfile) return;
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!tempProfile || !userId) return;
    try {
      await updateUserProfile(userId, tempProfile);
      setProfile(tempProfile);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save user profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");

    setUser(null); 
    navigate("/login")
    
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="flex-1 w-full space-y-2">
          {editMode && tempProfile ? (
            <>
              <Input
                name="name"
                value={tempProfile.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <Input
                name="address"
                value={tempProfile.address || ""}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <Input
                name="phone"
                value={tempProfile.phone || ""}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </>
          ) : (
            <>
              <h3>{profile.name}</h3>
              {profile.address && <p>{profile.address}</p>}
              {profile.phone && <p>{profile.phone}</p>}
            </>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              onClick={() => setEditMode(!editMode)}
              variant="outline"
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            {editMode && (
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
