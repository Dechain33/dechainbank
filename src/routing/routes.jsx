import {createBrowserRouter} from "react-router-dom";
import HomePage from "@/pages/homePage.jsx";
import RegisterPage from "@/pages/registerPage.jsx";
import PurchaseDbTokenPage from "@/pages/purchase-db-token-page.jsx";
import AccountsPage from "@/pages/accounts-page.jsx";
import ExchangePage from "@/pages/exchangePage.jsx";
import Layout from "@/components/layout.jsx";
import NotFoundPage from "@/pages/not-found-page.jsx";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "purchase-db-token", element: <PurchaseDbTokenPage/>,},
            {path: "accounts", element: <AccountsPage/>,},
            {path: "exchange", element: <ExchangePage/>,},
        ],
    },
]);

export default route;