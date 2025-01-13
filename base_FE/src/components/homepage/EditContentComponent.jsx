import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditContentComponent = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    brief: "",
    createdDate: "",
  });

  useEffect(() => {
    console.log("Fetching content for ID:", contentId);

    axios
      .get(`http://localhost:8080/api/contents/${contentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        const { title, brief, createdDate } = response.data;

        // Kiểm tra và chuyển đổi createdDate nếu cần thiết
        const validCreatedDate = createdDate
          ? new Date(createdDate).toISOString().split("T")[0] // ISO format yyyy-MM-dd
          : "";

        setFormData({
          title: title || "",
          brief: brief || "",
          createdDate: validCreatedDate, // Đảm bảo giá trị hợp lệ
        });
      })
      .catch((error) => {
        console.error("Failed to fetch content details:", error);
        alert("Could not fetch content details. Please try again.");
      });
  }, [contentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    axios
      .put(`http://localhost:8080/api/contents/${contentId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Content updated successfully:", response.data);
        alert("Content updated successfully!");

        navigate("/contents");
      })
      .catch((error) => {
        console.error("Failed to update content:", error);
        alert("Failed to update content. Please try again.");
      });
  };

  const handleReset = () => {
    console.log("Resetting form for content ID:", contentId);

    axios
      .get(`http://localhost:8080/api/contents/${contentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Reset Data:", response.data);
        const { title, brief } = response.data;
        setFormData({
          title: title || "",
          brief: brief || "",
          createdDate: "",
        });
      })
      .catch((error) => {
        console.error("Failed to reset form data:", error);
        alert("Could not reset form data. Please try again.");
      });
  };

  return (
    <div className="container p-4">
      <h4>Edit Content</h4>
      <br />
      <div className="card">
        <div className="card-header">Edit Content Form</div>
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
                Update
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

export default EditContentComponent;
