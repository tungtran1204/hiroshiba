import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import SidebarComponent from "./components/layout/SideBarComponent";
import HeaderComponent from "./components/layout/HeaderComponent";
import EditProfileComponent from "./components/homepage/EditProfileComponent";
import ViewContentComponent from "./components/homepage/ViewContentComponent";
import AddContentComponent from "./components/homepage/AddContentComponent";
import EditContentComponent from "./components/homepage/EditContentComponent";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
const Layout = ({ children }) => (
  <div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="col-md-10 p-0">
        <HeaderComponent />
        {children}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <EditProfileComponent />
            </Layout>
          }
        />
        <Route
          path="/contents/new"
          element={
            <Layout>
              <AddContentComponent />
            </Layout>
          }
        />
        <Route
          path="/contents"
          element={
            <Layout>
              <ViewContentComponent />
            </Layout>
          }
        />
        <Route
          path="/contents/:contentId"
          element={
            <Layout>
              <EditContentComponent />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
