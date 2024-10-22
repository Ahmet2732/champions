import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import { BsCart3, BsFillArchiveFill, BsFillGearFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Courses = () => {
  const [formValues, setFormValues] = useState({
    level: '',
    category_id: '',
    approved: '',
    published: '',
    status: '',
    free: '',
    requirements: '',
    lang: '',
    title_en: '',
    is_limited: '',
    limited_number: '',
    image: null, 
    thumbnail: null, 
    preview: null, 
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Handle text and select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files[0],  // Only handle the first file if single file upload
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const formData = new FormData();

    // Append all form values to formData
    for (const [key, value] of Object.entries(formValues)) {
      formData.append(key, value);
    }

    const token = localStorage.getItem('accessToken');

    try {
      // Axios POST request to upload data
      const response = await axios.post('https://dev.championsacademy.ca/api/dashboard/courses', formData, {
        headers: {
          Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5jaGFtcGlvbnNhY2FkZW15LmNhL2FwaS9kYXNoYm9hcmQvbG9naW4iLCJpYXQiOjE3Mjk1OTQ2NTQsIm5iZiI6MTcyOTU5NDY1NCwianRpIjoiUWhPdEhTRHUyVjdoYTRFZiIsInN1YiI6IjgxMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v_uTzRyLA_pQa_aCgbp5f4NMQDpchECrAnmaY2G65QQ"}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response
      if (response.status === 200) {
        toast.success('Course added successfully',response.status.msg);
      } else {
        toast.error('Error adding course');
      }
    } catch (error) {
      console.error('Error submitting form:', error.msg);
      toast.error('Failed to submit the form');
    }
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="container-fluid gx-3">
        <div className="row w-100">
          {/* Sidebar */}
          <div className={`col-md-3 bg-dark text-light p-3 ${openSidebarToggle ? 'd-block' : 'd-none d-md-block'}`}>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
              <h4><BsCart3 className="me-2" /> SHOP</h4>
              <button className="btn btn-light d-md-none" onClick={OpenSidebar}>X</button>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsGrid1X2Fill className="me-2" /> Dashboard</NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsFillArchiveFill className="me-2" /> Courses</NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsPeopleFill className="me-2" /> Customers</NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsListCheck className="me-2" /> Inventory</NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsMenuButtonWideFill className="me-2" /> Reports</NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink className="nav-link text-light" to="#"><BsFillGearFill className="me-2" /> Settings</NavLink>
              </li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="col-md-9">
            <div className="container bg-light p-4 rounded shadow-sm">
              <form onSubmit={handleSubmit}>

                {/* Level */}
                <div className="mb-3">
                  <label htmlFor="level" className="form-label">Course Level</label>
                  <select
                    className="form-select"
                    name="level"
                    onChange={handleChange}
                    id="level"
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category_id" className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category_id"
                    onChange={handleChange}
                    id="category_id"
                  />
                </div>

                {/* Approved */}
                <div className="mb-3">
                  <label className="form-label">Is Approved?</label>
                  <div>
                    <label className="form-check-label me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="approved"
                        value="1"
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="approved"
                        value="0"
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Published */}
                <div className="mb-3">
                  <label className="form-label">Is Published?</label>
                  <div>
                    <label className="form-check-label me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="published"
                        value="1"
                        onChange={handleChange}
                      />
                      Published
                    </label>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="published"
                        value="0"
                        onChange={handleChange}
                      />
                      Not Published
                    </label>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <div>
                    <label className="form-check-label me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="status"
                        value="1"
                        onChange={handleChange}
                      />
                      Active
                    </label>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="status"
                        value="0"
                        onChange={handleChange}
                      />
                      Inactive
                    </label>
                  </div>
                </div>

                {/* Free */}
                <div className="mb-3">
                  <label className="form-label">Is Free?</label>
                  <div>
                    <label className="form-check-label me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="free"
                        value="1"
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="free"
                        value="0"
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">Requirements</label>
                  <textarea
                    className="form-control"
                    name="requirements"
                    onChange={handleChange}
                    id="requirements"
                  />
                </div>

                {/* Language */}
                <div className="mb-3">
                  <label htmlFor="lang" className="form-label">Course Language</label>
                  <select
                    className="form-select"
                    name="lang"
                    onChange={handleChange}
                    id="lang"
                  >
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    {/* Add more languages as needed */}
                  </select>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title_en" className="form-label">Course Title (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title_en"
                    onChange={handleChange}
                    id="title_en"
                  />
                </div>

                {/* Limited */}
                <div className="mb-3">
                  <label className="form-label">Is Limited?</label>
                  <div>
                    <label className="form-check-label me-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="is_limited"
                        value="1"
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="is_limited"
                        value="0"
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Limited Number */}
                {formValues.is_limited === '1' && (
                  <div className="mb-3">
                    <label htmlFor="limited_number" className="form-label">Limited Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="limited_number"
                      onChange={handleChange}
                      id="limited_number"
                    />
                  </div>
                )}

                {/* File input for image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Course Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleFileChange}
                    id="image"
                  />
                </div>

                {/* File input for thumbnail */}
                <div className="mb-3">
                  <label htmlFor="thumbnail" className="form-label">Course Thumbnail</label>
                  <input
                    type="file"
                    className="form-control"
                    name="thumbnail"
                    onChange={handleFileChange}
                    id="thumbnail"
                  />
                </div>

                {/* File input for preview */}
                <div className="mb-3">
                  <label htmlFor="preview" className="form-label">Course Preview</label>
                  <input
                    type="file"
                    className="form-control"
                    name="preview"
                    onChange={handleFileChange}
                    id="preview"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Save & Next</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
