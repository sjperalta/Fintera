import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HomeTwo from "./pages/homeTwo";
import Statistics from "./pages/statistics";
import Analytics from "./pages/analytics";
import Transaction from "./pages/Transaction";
import MyWallet from "./pages/myWallet";
import Projects from "./pages/projects";
import Users from "./pages/users";
import Calender from "./pages/calender";
import History from "./pages/history";
import Support from "./pages/supportTicket";
import Settings from "./pages/settings";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ComingSoon from "./pages/commingSoon";
import Error from "./pages/error";
import Layout from "./component/layout";
import PersonalInfo from "./pages/settings/personal-info";
import Security from "./pages/settings/security";
import TermsAndCondition from "./pages/settings/Terms&condition";
import HomeFive from "./pages/homeFive";
import CreateProject from "./src/pages/projects/create";
import LotsList from "./src/pages/projects/lots";
import Reserve from "./src/pages/projects/reserve";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home-2",
        element: <HomeTwo />,
      },
      {
        path: "/home-3",
        element: <Statistics />,
      },
      {
        path: "/home-4",
        element: <Analytics />,
      },

      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/create",
        element: <CreateProject />,
      },
      {
        path: "/projects/:id/lots",
        element: <LotsList />,
      },
      {
        path: "/projects/:id/lots/:lot_id/contracts/create",
        element: <Reserve />,
      },
      {
        path: "/calender",
        element: <Calender />,
      },
      {
        path: "/settings/user/:userId",
        Component: Settings,
        children: [
          {
            index: true,
            element: <PersonalInfo />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "terms&conditions",
            element: <TermsAndCondition />,
          },
        ],
      },
      {
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/support-ticket",
        element: <Support />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/home-5",
    element: <HomeFive />,
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
