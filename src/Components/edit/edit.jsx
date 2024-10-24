
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  
  
  const [course, setCourse] = useState({
    title_en: '',
    title_ar: '',
    provider_name: '',
    type: '',
    price: '',
    price_egp: '',
    
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://dev.championsacademy.ca/api/dashboard/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setCourse(response.data.data); // Populate 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course data',err);
        console.log(err)
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://dev.championsacademy.ca/api/dashboard/courses/${id}`,
        course,
        {
          headers: {
              Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
            'Content-Type': 'multipart/form-data',          },
        }
      );
      alert('Course updated successfully');
      navigate('/course-list'); // Redirect back to the course list
    } catch (err) {
      setError('Failed to update course');
    }
  };

  return (
    <div className="container mt-5">
      <h4>Edit Course</h4>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title (English)</label>
            <input
              type="text"
              className="form-control"
              name="title_en"
              value={course.title_en}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Title (Arabic)</label>
            <input
              type="text"
              className="form-control"
              name="title_ar"
              value={course.title_ar}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Provider</label>
            <input
              type="text"
              className="form-control"
              name="provider_name"
              // value={course.provider_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={course.type}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (USD)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (EGP)</label>
            <input
              type="number"
              className="form-control"
              name="price_egp"
              value={course.price_egp}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={course.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Update Course</button>
        </form>
      )}
    </div>
  );
};

export default EditCourse;
