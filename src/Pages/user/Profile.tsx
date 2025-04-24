import  { EditableProfile } from "../../components/HomeComponents/ProfilePage"
import UserBasedPackages from "../../components/PackageComponents/UserBasedPackages";


function Profile() {

  return (
    <div className="p-4 space-y-4">
      <EditableProfile  />
      <UserBasedPackages/>
    </div>
  );
}

export default Profile

