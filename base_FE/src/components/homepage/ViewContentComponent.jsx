import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate và useLocation

const ViewContentComponent = () => {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // State cho từ khóa tìm kiếm
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin URL hiện tại

  // Lấy userId từ token
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

  // Lấy dữ liệu nội dung
  const fetchContent = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Không tìm thấy userId từ token.");
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams(location.search); // Lấy query string từ URL
      const searchQuery = params.get("search") || ""; // Lấy giá trị của 'search'
      setSearch(searchQuery); // Cập nhật giá trị từ URL vào state

      const response = await axios.get(
        `http://localhost:8080/api/members/${userId}/contents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { search: searchQuery }, // Gửi từ khóa tìm kiếm qua query parameter
        }
      );
      setContentData(response.data);
    } catch (err) {
      setError("Không thể lấy dữ liệu từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(); // Gọi hàm fetchContent mỗi khi URL thay đổi
  }, [location.search]); // Theo dõi thay đổi của query string

  // Hàm xử lý xóa nội dung
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa nội dung này không?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/contents/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContentData(contentData.filter((content) => content.id !== id));
      } catch (err) {
        console.error("Không thể xóa nội dung", err);
      }
    }
  };

  // Hàm xử lý sửa nội dung
  const handleEdit = (id) => {
    navigate(`/contents/${id}`);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = search.trim();
    if (searchQuery) {
      navigate(`/contents?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/contents`); // Nếu ô tìm kiếm trống, xóa query string
    }
  };

  return (
    <div className="container p-4">
      <h4>View Content</h4>
      <br />
      <div className="card">
        <div className="card-header">View Content List</div>
        <div className="card-body">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : contentData.length === 0 ? (
            <p>Không có nội dung nào được đăng.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Brief</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentData.map((content, index) => (
                  <tr key={content.id}>
                    <td>{index + 1}</td>
                    <td>{content.title}</td>
                    <td>{content.brief}</td>
                    <td>
                      {new Date(content.createdDate).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(content.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(content.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewContentComponent;
