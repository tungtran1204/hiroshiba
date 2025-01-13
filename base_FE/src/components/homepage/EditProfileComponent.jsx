import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const EditProfileComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    console.log("Token từ localStorage:", token);
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken);
        if (decodedToken && decodedToken.sub) {
          console.log("Member ID từ JWT:", decodedToken.sub);
          return decodedToken.sub;
        } else {
          console.error("Không tìm thấy 'sub' trong decoded token");
          return null;
        }
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return null;
      }
    }
    console.error("Không có token trong localStorage");
    return null;
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      console.log(
        "Đang gửi yêu cầu lấy thông tin thành viên với userId:",
        userId
      );
      axios
        .get(`http://localhost:8080/api/members/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Dữ liệu trả về từ backend:", response.data);
          setFormData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            description: response.data.description,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin thành viên từ backend:", error);
          setLoading(false);
        });
    } else {
      console.error("Không có userId, không thể gửi yêu cầu API.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, email: formData.email };

    console.log("Form submitted với dữ liệu:", updatedFormData);

    const userId = getUserIdFromToken();
    if (userId) {
      axios
        .put(`http://localhost:8080/api/members/${userId}`, updatedFormData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Cập nhật thành công:", response.data);
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thông tin:", error);
          alert("Failed to update profile. Please try again.");
        });
    } else {
      console.error("Không tìm thấy userId để gửi dữ liệu cập nhật.");
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      description: "",
    });
    console.log("Form đã được reset");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h4>Edit Profile</h4>
      <br />
      <div className="card">
        <div className="card-header">Profile Form Elements</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter the first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter the last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="your_email@example.com"
                value={formData.email}
                readOnly
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponent;
