import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruiterLogin from "./components/RecruiterLogin";
import UserLogin from "./components/UserLogin";
import Profile from "./pages/Profile";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import ScrollToTop from "./components/ScrollToTop";
import AddJob from "./pages/AddJob";
import ManageJob from "./pages/ManageJob";
import ViewApplications from "./pages/ViewApplications";
import DashboardStats from "./components/DashboardStats";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";

// Job seeker ke login ke bina protected pages ko access hone se rokne ke liye

const UserProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const savedUser = sessionStorage.getItem("userData");

  useEffect(() => {
    if (!user && !savedUser && !toast.isActive("profile-login-error")) {
      toast.error("Login with valid credentials first", {
        toastId: "profile-login-error",
      });
    }
  }, [user, savedUser]);

  if (!user && savedUser) {
    return null;
  }

  if (!user) {
    return <Home />;
  }

  return children;
};

// Recruiter ke login ke bina dashboard aur uske saare protected pages ko access hone se rokne ke liye
const RecruiterProtectedRoute = ({ children }) => {
  const companyToken = sessionStorage.getItem("companyToken");

  useEffect(() => {
    if (!companyToken && !toast.isActive("recruiter-login-error")) {
      toast.error("Recruiter login required", {
        toastId: "recruiter-login-error",
      });
    }
  }, [companyToken]);

  if (!companyToken) {
    return <Home />;
  }

  return children;
};

function App() {
  const { showRecruiterLogin, showUserLogin } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black">
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserLogin && <UserLogin />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/apply-job/:id" element={<ApplyJob />} />

        <Route path="/applications" element={<Applications />} />

        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RecruiterProtectedRoute>
              <DashBoard />
            </RecruiterProtectedRoute>
          }
        >
          <Route index element={<DashboardStats />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJob />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ScrollToTop />
    </div>
  );
}

export default App;
