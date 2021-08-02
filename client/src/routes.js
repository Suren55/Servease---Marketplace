import JobsList from "./views/JobsList";
import App from "./views/AppWrapper";
import ProfileSettings from "./views/ProfileSetings";
import SubmitOffer from "./views/SubmitOffer";
import Customer from "./views/Customer";

const routes = [
  {
    route: "/app",
    name: "Home",
    icon: App,
    component: JobsList,
  },
  {
    route: "/submit-offer",
    name: "Jobs list",
    component: SubmitOffer,
  },
  {
    route: "/profile",
    name: "Profile",
    component: ProfileSettings,
  },
  {
    route: "/customer",
    name: "Customer",
    component: Customer,
  },
];

export default routes;
