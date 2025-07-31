import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

// import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/Signuppage';
import ForgetPassword from './Pages/ForgetPassword';
import DashboardLayout from './layouts/DashboardLayout';

import D1DashboardHome from './Pages/dashboard/D1DashboardHome';
import D2BasicDetails from './Pages/dashboard/D2BasicDetails';
import D3Product from './Pages/dashboard/D3Product';
import D4ProductList from './Pages/dashboard/D4ProductList';
import D4StockList from "./Pages/dashboard/D4StockList"
import D5StaffRole from './Pages/dashboard/D5StaffRole';
import D5StaffDetails from './Pages/dashboard/D5StaffDetails';
import D6AddCustomer from './Pages/dashboard/D6AddCustomer';
import D6CustomerDetails from './Pages/dashboard/D6CustomerDetails';
import D7CreateInvoice from './Pages/dashboard/D7CreateInvoice';
import D8PaymentCollection from './Pages/dashboard/D8PaymentCollection';
import D8PaymentCollectionList from './Pages/dashboard/D8PaymentCollectionList';
import D9CreditScore from './Pages/dashboard/D9CreditScore';
import D10Expenses from './Pages/dashboard/D10Expenses';
import D10ExpensesList from './Pages/dashboard/D10ExprenseList';
import D11StatementDownload from './Pages/dashboard/D11StatementDownload';
import D12Setting from './Pages/dashboard/D12Setting';
import D13Notification from './Pages/dashboard/D13Notification';
import D14GstCalculator from './Pages/dashboard/D14GstCalculator';
import D14GstCalReceipt from './Pages/dashboard/D14GstCalReceipt';
import D15Reward from './Pages/dashboard/D15Reward';
import D16Commingsoon from './Pages/dashboard/D16Commingsoon';
import D17Updates from './Pages/dashboard/D17Updates';
import D18Supports from './Pages/dashboard/D18Supports';
import A1AmountCollection from './Pages/dashboard/A1AmountCollection';
import A2AverageCreditScore from './Pages/dashboard/A2AverageCreditScore';


import A1AdminList from './Pages/dashboard/adminroles/A1AdminList';
import A2RolePermissions from './Pages/dashboard/adminroles/A2RolePermissions';
import A3ActivityHistory from './Pages/dashboard/adminroles/A3ActivityHistory';
import A4SessionManagement from './Pages/dashboard/adminroles/A4SessionManagement';
import N1NotificationList from './Pages/dashboard/notification/N1NotificationList';
import N2NotificationSettings from './Pages/dashboard/notification/N2NotificationSettings';

import R1ManageRewards from './Pages/dashboard/rewards/R1ManageRewards';
import R2RewardAnalytics from './Pages/dashboard/rewards/R2RewardAnalytics';

import S1Profile from './Pages/dashboard/setting/S1Profile';
import S2PlatformSetting from './Pages/dashboard/setting/S2PlatformSettings';
import S3RoleSetting from './Pages/dashboard/setting/S3RoleSettings';
import S4SecuritySetting from './Pages/dashboard/setting/S4SecuritySettings';
import S5CustomBranding from './Pages/dashboard/setting/S5CustomBranding';

import S1SupportTickets from './Pages/dashboard/support/S1SupportTickets';
import S2LiveChat from "./Pages/dashboard/support/S2LiveChat"
import S3knowledgeBase from "./Pages/dashboard/support/S3knowledgeBase"

 

import T1TotalSales from './Pages/dashboard/transaction/T1TotalSales'
import T2TotalPaid from './Pages/dashboard/transaction/T2TotalPaid'
import T3TotalPending from './Pages/dashboard/transaction/T3TotalPending'
import T4TotalBusiness from './Pages/dashboard/transaction/T4TotalBusiness'
import T5TotalInvoice from './Pages/dashboard/transaction/T5TotalInvoice'
import T6TotalPackage from './Pages/dashboard/transaction/T6TotalPackage'




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // adjust as per your logic

  return (
    <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<D1DashboardHome />} />
          <Route path="basic-details" element={<D2BasicDetails />} />

          <Route path="product" element={<D3Product />} />
          <Route path="product-list" element={<D4ProductList />} />
          <Route path="stock-list" element={<D4StockList />} />
          
          <Route path="staff-role" element={<D5StaffRole />} />
          <Route path="staff-details" element={<D5StaffDetails />} />
          
          <Route path="add-customer" element={<D6AddCustomer />} />
          <Route path="customer-details" element={<D6CustomerDetails />} />
          
          <Route path="create-invoice" element={<D7CreateInvoice />} />
          <Route path="payment-collection" element={<D8PaymentCollection />} />
          <Route path="payment-collectionList" element={<D8PaymentCollectionList />} />

          <Route path="credit-score" element={<D9CreditScore />} />
          <Route path="expenses" element={<D10Expenses />} />
          <Route path="expenses-list" element={<D10ExpensesList />} />
          <Route path="statement-download" element={<D11StatementDownload />} />
          <Route path="setting" element={<D12Setting />} />
          <Route path="notification" element={<D13Notification />} />
          <Route path="gst-calculator" element={<D14GstCalculator />} />
          <Route path="gstreceipt" element={<D14GstCalReceipt />} />
          <Route path="reward" element={<D15Reward />} />
          <Route path="commingsoon" element={<D16Commingsoon />} />
          <Route path="updates" element={<D17Updates />} />
          <Route path="supports" element={<D18Supports />} />
          <Route path="amount-collection" element={<A1AmountCollection />} />
          <Route path="average-credit-score" element={<A2AverageCreditScore />} />



{/* new routes */}

          <Route path="admin-list" element={<A1AdminList />} />
          <Route path="Role-permisson" element={<A2RolePermissions />} />
          <Route path="activity-history" element={<A3ActivityHistory />} />
          <Route path="session-management" element={<A4SessionManagement />} />
          
          <Route path="notification-list" element={<N1NotificationList />} />
          <Route path="notification-settings" element={<N2NotificationSettings />} />

          <Route path="manage-reward" element={<R1ManageRewards />} />
          <Route path="rewards-analytics" element={<R2RewardAnalytics />} />


          <Route path="profile" element={<S1Profile />} />
          <Route path="platform-Setting" element={<S2PlatformSetting />} />
          <Route path="role-Setting" element={<S3RoleSetting />} />
          <Route path="security-Setting" element={<S4SecuritySetting />} />
          <Route path="custom-Branding" element={<S5CustomBranding />} />



          <Route path="supportTickets" element={<S1SupportTickets />} />
          <Route path="live-Chat" element={<S2LiveChat />} />
          <Route path="knowledge-Base" element={<S3knowledgeBase />} />




          <Route path="total-Sales" element={<T1TotalSales />} />
          <Route path="total-Paid" element={<T2TotalPaid />} />
          <Route path="total-Pending" element={<T3TotalPending />} />
          <Route path="total-Business" element={<T4TotalBusiness />} />
          <Route path="total-Invoice" element={<T5TotalInvoice />} />
          <Route path="total-Package" element={<T6TotalPackage />} />


        </Route>

        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
