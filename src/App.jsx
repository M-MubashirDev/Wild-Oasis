import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import ProtectedLogin from "./ui/ProtectedLogin";
import DarkModeToggle from "./ui/DarkModeToggle";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <DarkModeToggle>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedLogin>
                  <AppLayout />
                </ProtectedLogin>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="checkin/:id" element={<CheckinBooking />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route path="cabin" element={<Cabins />} />
              <Route path="setting" element={<Settings />} />
              <Route path="user" element={<Users />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          gutter={12}
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              padding: "1.2rem",
              height: "3.4rem",
              width: "22rem",
              fontSize: "1.4rem",
            },
            success: { duration: 3000 },
          }}
        />
      </QueryClientProvider>
    </DarkModeToggle>
  );
}

export default App;
