
import { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/Api/adminApis"; 
import UserCard from "./UserCard"; 

type User = {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
};

function UserlistAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {users.map((user) => (
        <UserCard
          key={user._id}
          name={user.name}
          email={user.email}
          image={user.profilePic}
        />
      ))}
    </div>
  );
}

export default UserlistAdmin;
