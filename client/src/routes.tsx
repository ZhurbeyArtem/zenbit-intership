import Home from "./pages/home";
import {
    CREATE_JOB_ROUTE,
    GOOGLE_ROUTE,
    HOME_ROUTE,
    JOB_ROURE,
    REGISTRATION_ROUTE,
    SETTINGS_ROUTE,
    SIGNIN_ROUTE,
    BID_ROUTE
} from "./utils/consts";
import Settings from "./pages/settings";
import SignIn from "./pages/signIn";
import Registration from "./pages/registration";
import {googleSuccess} from "./components/auth/google/googleHooks";
import createJobPage from "./pages/createJob";
import jobPage from "./pages/job";
import BidsPage from "./pages/bids";

// ADMIN_ROUTE,


export const authRoutes = [
    {
        path: SETTINGS_ROUTE,
        Element: Settings
    },
    {
        path: CREATE_JOB_ROUTE,
        Element: createJobPage
    },
    {
        path: BID_ROUTE ,
        Element: BidsPage
    }
    // {
    //     path: ADMIN_ROUTE,
    //     Element: Admin
    // }
]
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Element: Home
    },
    {
        path: SIGNIN_ROUTE,
        Element: SignIn
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Registration
    },
    {
        path: GOOGLE_ROUTE,
        Element: googleSuccess
    },
    {
        path: JOB_ROURE + '/:id',
        Element: jobPage
    },
]

