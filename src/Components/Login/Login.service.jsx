import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from '../../Assets/images/logo.a03215d1.png';
import sliderImage from '../../Assets/images/login-v2.75039949.svg'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/userContext';
import toast from 'react-hot-toast';
import { Audio } from 'react-loader-spinner'; 
import * as yup from 'yup';

export default function Login() {
  const { setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Yup schema for validation
  const SignupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password too short').required('Password is required'),
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the formData against the schema
      await SignupSchema.validate(formData, { abortEarly: false });
      setErrors({});  // Clear previous errors

      setLoading(true);

      // API call
      axios.post('https://dev.championsacademy.ca/api/dashboard/login', formData)
        .then((response) => {
          setUserToken(response.data.accessToken);
          toast.success('Login Successfully!');
          navigate('/dashboard');
        })
        .catch((error) => {
          toast.error('Email or password is invalid');
        })
    

    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row h-100">
        {/* Left Section with Image */}
        <div className="MainImg col-md-8 d-flex justify-content-center align-items-center">
          <img src={sliderImage} alt="Illustration" className="img-fluid" />
        </div>

        {/* Right Section with Login Form */}
        <div className="col-md-4 d-flex justify-content-center align-items-center mt-5">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-5">
              <img src={logoImg} alt="Logo" className="w-25" />
              <h2 className="text-center mt-3">Welcome to Champions!</h2>
              <p className="text-center">Please sign in to your account and start the adventure</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? (
                  <Audio height="20" width="20" radius="9" color="white" ariaLabel="loading" />
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
