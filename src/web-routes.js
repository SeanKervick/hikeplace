import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { hiketrailController } from "./controllers/hiketrail-controller.js";



export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addhiketrail", config: dashboardController.addHiketrail },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/hiketrail/{id}", config: hiketrailController.index },
  { method: "POST", path: "/hiketrail/{id}/addhike", config: hiketrailController.addHike },
];