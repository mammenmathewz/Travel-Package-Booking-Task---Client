import { useState } from "react";
import  { EditableProfile } from "../../components/HomeComponents/ProfilePage"
import UserBasedPackages from "../../components/PackageComponents/UserBasedPackages";


function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main Street, City, Country",
    phone: "123-456-7890",
    profilePic: "https://via.placeholder.com/100",
  });

 
  const handleSaveProfile = (updatedProfile: any) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="p-4 space-y-4">
      <EditableProfile profile={profile} onSave={handleSaveProfile} />
      <UserBasedPackages/>
    </div>
  );
}

export default Profile

