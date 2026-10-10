import { AuthRoutes } from "@monorepo-setup/client/features/auth/routes/auth.routes";

import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const routes = [...AuthRoutes];
  return useRoutes(routes);
};

export default AppRouter;
