import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return (
    <RouterProvider onError={(props) => console.log(props)} router={router} />
  );
};

export default App;
