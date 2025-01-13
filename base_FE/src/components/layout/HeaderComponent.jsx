import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <div className="d-flex align-items-center p-3 border-bottom bg-light">
      <div className="ms-auto dropdown">
        <i
          className="bi bi-person-circle fs-4 dropdown-toggle"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        ></i>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              <i className="bi bi-person"></i> User Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
