import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AddContentComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    brief: "",
    content: "",
  });

  // Lấy user ID từ token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        return decodedToken?.sub || null;
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return null;
      }
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (userId) {
      const contentData = { ...formData, memberId: userId }; // Đổi 'userId' thành 'memberId' để khớp DTO
      console.log(
        "Sending data to backend:",
        JSON.stringify(contentData, null, 2)
      );

      // Gửi dữ liệu đến backend
      axios
        .post("http://localhost:8080/api/contents", contentData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Content added successfully:", response.data);
          alert("Content added successfully!");
          setFormData({ title: "", brief: "", content: "" }); // Reset form
        })
        .catch((error) => {
          if (error.response) {
            console.error("Response error:");
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
          } else if (error.request) {
            console.error(
              "Request error, no response received:",
              error.request
            );
          } else {
            console.error("Unexpected error:", error.message);
          }
          alert("Failed to add content. Please try again.");
        });
    } else {
      console.error("Không tìm thấy userId từ token.");
      alert("Failed to add content. User ID is missing.");
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      brief: "",
      content: "",
    });
    console.log("Form đã được reset");
  };

  return (
    <div className="container p-4">
      <h4>Add content</h4>
      <br />
      <div className="card">
        <div className="card-header">Content Form Elements</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter content title"
              />
            </div>

            {/* Brief */}
            <div className="mb-3">
              <label htmlFor="brief" className="form-label">
                Brief
              </label>
              <textarea
                className="form-control"
                id="brief"
                name="brief"
                value={formData.brief}
                onChange={handleChange}
                rows="3"
                placeholder="Enter a brief description"
              ></textarea>
            </div>

            {/* Submit and Reset Buttons */}
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

export default AddContentComponent;
