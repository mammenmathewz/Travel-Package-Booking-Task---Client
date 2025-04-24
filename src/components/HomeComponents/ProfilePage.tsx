import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Profile {
  name: string;
  address: string;
  phone: string;
  profilePic: string;
}

interface EditableProfileProps {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
}

export function EditableProfile({ profile, onSave }: EditableProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(tempProfile);
    setEditMode(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
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
                value={tempProfile.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <Input
                name="address"
                value={tempProfile.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <Input
                name="phone"
                value={tempProfile.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </>
          ) : (
            <>
              <h3>{profile.name}</h3>
              <p>{profile.address}</p>
              <p>{profile.phone}</p>
            </>
          )}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setEditMode(!editMode)} variant="outline">
              {editMode ? "Save" : "Edit"}
            </Button>
            {editMode && (
              <Button size="sm" onClick={handleSave} variant={"default"}>
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
