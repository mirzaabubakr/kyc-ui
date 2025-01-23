import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Button onClick={handleLogout} variant={"secondary"}>
      Logout
    </Button>
  );
}
