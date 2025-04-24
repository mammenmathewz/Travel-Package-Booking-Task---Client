import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  _id: string;
  name: string;
  email: string;
  image?: string;
};

function UserCard({_id, name, email, image }: UserCardProps) {
  const navigate = useNavigate()
  return (
    <Card className="w-full max-w-md shadow-lg cursor-pointer p-4" onClick={()=> navigate(`/admin/user/${_id}`)}>
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
