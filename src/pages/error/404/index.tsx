import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PageNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center mb-2">
        <h6 className="text-3xl font-semibold">Hey 404 page</h6>
        <p className="text-gray-500">
          Sorry the page you are looking for that is not exist!
        </p>
      </div>
      <Button onClick={() => navigate("/")}>
        Go Home
        <MoveRight />
      </Button>
    </div>
  );
};
