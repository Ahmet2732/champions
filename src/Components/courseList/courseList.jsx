
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CourseList = () => {
  const [courses, setCourses] = useState([]); // State to store all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // State to store filtered courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { setUserToken } = useContext(userContext); // Access user context
  const [currentPage, setCurrentPage] = useState([1]); // State for current page
  const [itemsPerPage] = useState(8); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          'https://dev.championsacademy.ca/api/dashboard/courses?paginate=10&page=1',
          {
            headers: {
              Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setCourses(response.data.data.data);
        setUserToken(response.data.accessToken);

        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
        toast.error("fetching failed")
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setUserToken]);

  // Search courses by title
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query) {
      try {
        const response = await axios.get(`https://dev.championsacademy.ca/api/dashboard/courses/title=${query}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setFilteredCourses(response.data.data.data);
      } catch (err) {
        console.error('Error searching courses:', err);
        setError('Failed to search courses');
      }
    } else {
      setFilteredCourses(courses);
    }
  };

  // Function to handle edit
  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`); // Redirect to the edit page with the course ID
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      try {
        await axios.delete(`https://dev.championsacademy.ca/api/dashboard/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setCourses(courses.filter((course) => course.id !== id)); // Remove the deleted course from the state
      } catch (err) {
        console.error('Error deleting course:', err);
        toast.error('course not deleted ');
        setError('Failed to delete course');
      }
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = searchTerm ? filteredCourses.slice(indexOfFirstItem, indexOfLastItem) : courses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((searchTerm ? filteredCourses.length : courses.length) / itemsPerPage);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h4>Course Table</h4>
        <button className="btn btn-primary" onClick={() => navigate("/Course")}>
          Add Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Display all data*/}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <table className=" col-md-12 w-100 m-0 table table-bordered text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title EN</th>
                <th>Title AR</th>
                <th>Provider</th>
                <th>Type</th>
                <th>Dollar Price</th>
                <th>Egyptian Price</th>
                <th>Status</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>
                      <img
                        src={course.img}
                        alt="course"
                        className="w-30 h-25"
                        style={{ borderRadius: '50%' }}
                      />
                    </td>
                    <td>{course.title_en}</td>
                    <td>{course.title_ar}</td>
                    <td>{course.provider_name}</td>
                    <td>{course.type}</td>
                    <td>{course.price}</td>
                    <td>{course.price_egp}</td>
                    <td>
                      <span
                        className={`badge ${course.status === 'Active' ? 'bg-danger' : 'bg-success'}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className='d-flex'>
                      <button className="btn btn-warning btn-sm mx-3 p-2 " onClick={() => handleEdit(course.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm mx-3 p-2 " onClick={() => handleDelete(course.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseList;
