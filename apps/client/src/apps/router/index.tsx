import { AuthRoutes } from "@monorepo-setup/client/features/auth/routes/auth.routes";
import Dummy from "@monorepo-setup/client/features/billing/pages/Dummy";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const routes = [...AuthRoutes, { path: "/dummy", element: <Dummy /> }];
  return useRoutes(routes);
};

export default AppRouter;
