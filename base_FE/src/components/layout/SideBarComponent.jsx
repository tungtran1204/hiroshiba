import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      navigate(`/contents`);
    } else {
      navigate(`/contents?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="col-md-2 bg-light" style={{ height: "100vh" }}>
      <div className="p-3">
        <h5 className="text-center">CMS</h5>
        {/* Thanh tìm kiếm */}
        <form onSubmit={handleSearchSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        {/* Các tab của sidebar */}
        <ul className="nav flex-column mt-3">
          <li className="nav-item mb-2">
            <Link to="/contents" className="nav-link text-dark">
              <i className="bi bi-file-earmark-text"></i> View Contents
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/contents/new" className="nav-link text-dark">
              <i className="bi bi-pencil-square"></i> Form Content
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;
