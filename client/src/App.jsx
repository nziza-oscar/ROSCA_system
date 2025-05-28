import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense }  from "react";
import Loader from  "./lib/Loader";
import LayoutDash from "./dashboard/components/Layout"
import Layout from   "./components/layout/Layout";
import HomePage  from "./pages/HomePage";
import LoginPage  from "./pages/LoginPage";
import NotFoundPage from  "./pages/NotFoundPage";
import { Terms } from  "./pages/Terms";
import FaqsPage  from  "./pages/FaqsPage";

// import Dashboard  
 
const Settings = lazy(()=>import("./dashboard/pages/Settings"))  

const Users = lazy(()=>import("./dashboard/pages/Users"))  
const Dashboard = lazy(()=>import("./dashboard/pages/Dashboard"))
const Delaying = ({children})=> <Suspense fallback={<Loader/>}>{children}</Suspense>
import ProtectedRoutes from "./lib/ProtectedRoutes"
import {ProtectedPage} from "./lib/ProtectedRoutes"
const Debtors =  lazy(()=> import("./dashboard/pages/Debtors")) 
const Debts =  lazy(()=> import("./dashboard/pages/Debts")) 
const Reports = lazy(()=>import("./dashboard/pages/Reports"))
const Balance = lazy(()=>import("./dashboard/pages/Balance"))
const RegisterPage = lazy(()=>import("./pages/RegisterPage"))
const Savings = lazy(()=>import("./dashboard/pages/Savings"))
const DepositRequest = lazy(()=>import("./dashboard/pages/DepositRequest"))
const Withdrawal = lazy(()=>import("./dashboard/pages/Withdrawals"))
const TransactionsPage = lazy(()=>import("./dashboard/pages/TransactionsPage"))
import ErrorBoundary from "./hooks/ErrorBoundary";

// ___________end dashboard___________
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes without main layout */}
      <Route path="dashboard" element={<ProtectedRoutes/>} errorElement={ErrorBoundary}>
        <Route index element={<Delaying><Dashboard/></Delaying>}/>
        <Route path="home" element={<Delaying><Dashboard/></Delaying>}/>
        <Route path="users" element={<Delaying><Users/></Delaying>}/>
        <Route path="debtors" element={<Delaying><Debtors/></Delaying>}/>
        <Route path="debts" element={<Delaying><Debts/></Delaying>}/>
        <Route path="reports" element={<Delaying><Reports/></Delaying>}/>
        <Route path="settings" element={<Settings />} />
        <Route path="balance" element={<Delaying><Balance/></Delaying>} />
        <Route path="savings" element={<Delaying><Savings/></Delaying>} />
        <Route path="transactions/:client_id/details" element={<Delaying><TransactionsPage/></Delaying>} />
        <Route path="withdrawal" element={<Delaying><Withdrawal/></Delaying>} />
        <Route path="deposit-request" element={<Delaying><DepositRequest/></Delaying>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

  
      <Route path="/" element={<Layout />} errorElement={ErrorBoundary}>
        <Route index element={<HomePage/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="terms" element={<Terms/>}/> 
        <Route path="faqs" element={<FaqsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
