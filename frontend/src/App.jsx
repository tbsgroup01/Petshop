import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./features/Auth/Login";
import Signup from "./features/Auth/Signup";
import Home from "./features/client/pages/Home";
import Navbar from "./features/client/components/Navbar";
import Footer from "./features/client/components/Footer";
import Blogs from "./features/client/pages/Blogs";
import Breeds from "./features/client/pages/Breeds";
import CatBreeds from "./features/client/pages/CatBreeds";
import CatPage from "./features/client/pages/CatPage";
import DogPage from "./features/client/pages/DogPage";
import SmallPetPage from "./features/client/pages/SmallPetPage";
import SmallBreedsPage from "./features/client/pages/SmallBreedsPage";
import Contact from "./features/client/pages/Contact";
import ForgotPassword from "./features/client/pages/ForgotPassword";
import Register from "./features/client/pages/Register";
import AccountType from "./features/client/pages/AccountType";
import ProfileSetup from "./features/client/pages/ProfileSetup";
import MatingServices from "./features/client/pages/MatingServices";
import PetCarePage from "./features/client/pages/PetCarePage";
import PetCareDetail from "./features/client/pages/PetCareDetail";
import UserProfile from "./features/client/pages/UserProfile";
import AdminDashboard from "./features/Admin/Pages/Dashboard";
import AdminAnalytics from "./features/Admin/Pages/Analytics";
import AdminCarebookings from "./features/Admin/Pages/Carebookings";
import AdminHomeSlider from "./features/Admin/Pages/HomeSlider";
import AdminPetlistings from "./features/Admin/Pages/Petlistings";
import AdminPayments from "./features/Admin/Pages/Payments";
import AdminSettings from "./features/Admin/Pages/Settings";
import AdminSupport from "./features/Admin/Pages/Support";
import AdminUsers from "./features/Admin/Pages/Users";
import VendorVerification from "./features/Admin/Pages/Vendorverification";
import VendorDetails from "./features/Admin/Pages/vendordetail/VendorDetails";
import UserDetails from "./features/Admin/Pages/users/Userdetails";
import AdminLayout from "./features/Admin/Layout/AdminLayout";
import VendorDashboard from "./features/vendor/Pages/Dashboard";
import VendorPets from "./features/vendor/Pages/Pets";
import VendorAddPets from "./features/vendor/Pages/AddPets";
import VendorAddPetdetail from "./features/vendor/Pages/AddPetdetail";
import VendorPetCare from "./features/vendor/Pages/PetCare";
import VendorBookingHistory from "./features/vendor/Pages/BookingHistory";
import VendorProfileSettings from "./features/vendor/Pages/ProfileSettings";
import VendorDashboardSettings from "./features/vendor/Pages/SettingsPage";
import VendorMessagingInterface from "./features/vendor/Pages/MessagingInterface";
import VendorPublishStep from "./features/vendor/Pages/PublishStep";
import VendorHealthInfoStep from "./features/vendor/Pages/HealthInfoStep";
import VendorUploadImagesStep from "./features/vendor/Pages/UploadImagesStep";
import VendorSharedLayout from "./features/vendor/Layout/SharedLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { authService } from "./services";
import { getDashboardPath, saveAuthSession } from "./utils/auth";

const initialSignupData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  accountType: "",
  city: "",
  country: "",
  bio: "",
};

const getSavedSignupData = () => {
  if (typeof window === "undefined") return initialSignupData;

  try {
    const savedData = sessionStorage.getItem("petshop-signup-draft");
    return savedData
      ? { ...initialSignupData, ...JSON.parse(savedData) }
      : initialSignupData;
  } catch {
    return initialSignupData;
  }
};

const SignupStep = ({ step }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getSavedSignupData);

  const updateFields = (fields) => {
    setFormData((current) => {
      const updatedData = { ...current, ...fields };
      sessionStorage.setItem(
        "petshop-signup-draft",
        JSON.stringify(updatedData),
      );
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        city: formData.city,
        state: formData.country,
        role: formData.accountType === "breeder" ? "vendor" : "user",
      };

      const { data } = await authService.register(payload);
      const token = data?.token;
      const user = data?.user;

      if (!token || !user) throw new Error("Registration failed");

      saveAuthSession(token, user);
      sessionStorage.removeItem("petshop-signup-draft");
      navigate(getDashboardPath(user.role), { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      alert(message);
    }
  };

  if (step === "account-type") {
    return (
      <AccountType
        formData={formData}
        updateFields={updateFields}
        onBack={() => navigate("/signup")}
        onNext={() => navigate("/profile-setup")}
      />
    );
  }

  if (step === "profile-setup") {
    return (
      <ProfileSetup
        formData={formData}
        updateFields={updateFields}
        onBack={() => navigate("/account-type")}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <Signup
      formData={formData}
      updateFields={updateFields}
      onNext={() => navigate("/account-type")}
    />
  );
};

const App = () => {
  const location = useLocation();

  const hideNavbarOn = [
    "/login",
    "/signup",
    "/signup-page",
    "/register",
    "/forgot-password",
    "/account-type",
    "/profile-setup",
  ];

  const isAdminOrVendorRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/vendor");

  const shouldShowNavbar =
    !isAdminOrVendorRoute && !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<Home />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupStep />} />
          <Route path="/signup-page" element={<SignupStep />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/register-page" element={<Register />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route
          path="/account-type"
          element={<SignupStep step="account-type" />}
        />
        <Route
          path="/profile-setup"
          element={<SignupStep step="profile-setup" />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/cat-breeds" element={<CatBreeds />} />
        <Route path="/cat" element={<CatPage />} />
        <Route path="/dog" element={<DogPage />} />
        <Route path="/small-pets" element={<SmallPetPage />} />
        <Route path="/small-breeds" element={<SmallBreedsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mating-services" element={<MatingServices />} />
        <Route path="/pet-care" element={<PetCarePage />} />
        <Route path="/pet-care-detail" element={<PetCareDetail />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="carebookings" element={<AdminCarebookings />} />
            <Route path="home-slider" element={<AdminHomeSlider />} />
            <Route path="pet-listings" element={<AdminPetlistings />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<AdminSupport />} />
            <Route
              path="vendor-verification"
              element={<VendorVerification />}
            />
            <Route path="vendor-details" element={<VendorDetails />} />
            <Route path="vendor-details/:id" element={<VendorDetails />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
          <Route path="/vendor" element={<VendorSharedLayout />}>
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="pets" element={<VendorPets />} />
            <Route path="add-pets" element={<VendorAddPets />} />
            <Route path="add-pet-detail" element={<VendorAddPetdetail />} />
            <Route path="pet-care" element={<VendorPetCare />} />
            <Route path="booking-history" element={<VendorBookingHistory />} />
            <Route
              path="profile-settings"
              element={<VendorProfileSettings />}
            />
            <Route path="settings" element={<VendorDashboardSettings />} />
            <Route path="messaging" element={<VendorMessagingInterface />} />
            <Route path="publish" element={<VendorPublishStep />} />
            <Route path="health-info" element={<VendorHealthInfoStep />} />
            <Route path="upload-images" element={<VendorUploadImagesStep />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-center p-6">
              <h1 className="text-3xl font-bold mb-2">Page not found</h1>
              <p className="text-slate-500">
                Use one of the defined routes to view a page.
              </p>
            </div>
          }
        />
      </Routes>
      {shouldShowNavbar && <Footer />}
    </>
  );
};

export default App;
