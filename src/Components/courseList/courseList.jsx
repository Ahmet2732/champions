import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from '../Context/userContext';

const CourseList = () => {
  // State to store the list of courses, loading state, error state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUserToken } = useContext(userContext);

  // Effect to fetch courses from the API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses...');

        // Retrieve token from localStorage
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token);

        // Make the GET request with authorization headers
        const response = await axios.get('https://dev.championsacademy.ca/api/dashboard/courses?paginate=10&page=1', {
          headers: {
            Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
          'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response data:', response.data.data.data);

        // Set the courses data in state
        setCourses(response.data.data.data ); // Assuming response.data contains the array of courses
        setUserToken(response.data.accessToken); // Update the context with the token if needed

        // Store token in localStorage if it's part of the response
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setUserToken]);

  // // Function to delete a course by its id
  // const handleDelete = async (id) => {
  //   try {
  //     // Retrieve token from localStorage
  //     const token = localStorage.getItem('accessToken');

  //     // Make a DELETE request to the API to delete the course
  //     await axios.delete(`https://testing.nualim.com/api/dashboard/courses/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` }, // Add the authorization header
  //     });

  //     // Update the local state after successful deletion
  //     const updatedCourses = courses.filter(course => course.id !== id);
  //     setCourses(updatedCourses);
  //   } catch (error) {
  //     console.error('Error deleting the course:', error);
  //   }
  // };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h4>Course Table</h4>
        <button className="btn btn-primary">Add Course</button>
      </div>

      {/* Display loading, error, or the table */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table px-3 mx-2 text-center ">
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
      
            </tr>
          </thead>
          <tbody>
            <div className="data"></div>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} >
                  <td>{course.id}</td>
                  <td>
                    <img src={course.img} alt="course" className="w-30 h-25" style={{ borderRadius: '50%' }} />
                  </td>
                  <td>{course.title_en}</td>
                  <td>{course.title_ar}</td>
                  <td>{course.provider_name}</td>
                  <td>{course.type}</td>
                  <td>{course.price}</td>
                  <td>{course.price_egp}</td>
                  <td>
                    <span className={`badge ${course.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;
