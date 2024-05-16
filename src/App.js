import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Account";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import Booking from "./pages/Booking";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/add-place" element={<PlacesFormPage />} />
          <Route path="/update-place/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
