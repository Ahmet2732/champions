
import React, { useContext,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from '../../Assets/images/logo.a03215d1.png';
import sliderImage from '../../Assets/images/login-v2.75039949.svg'; 
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/userContext';
import toast from 'react-hot-toast';
import { Audio } from 'react-loader-spinner'; 


export default function Login() {
  const { setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] =useState(false)

  function loginSubmit(values) {
    const { data } = axios.post('https://dev.championsacademy.ca/api/dashboard/login', values)
      .then(response => {
       
        setUserToken(response.data.accessToken);
        console.log(response.data.accessToken);
  
        toast.success('Login Successfully!');
        navigate('/home'); 
      })
      .catch(error => {
        toast.error('email or password is invalied', error.message);
        console.error('Login failed:', error);
        // Handle error (e.g., show error message)
      });
  }
  

  

  

  // Validation schema for formik
  const SignupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password too short').required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
     onSubmit:loginSubmit
  });

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
            <div className="titleData text-center mb-5">
              <img src={logoImg} alt="Logo" className="w-25" />
              <h2 className="text-center mt-3">Welcome to Champions!</h2>
              <p className="text-center fs-6 fw-5">Please sign in to your account and start the adventure</p>
            </div>
       
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
       

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Enter password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
              
              </div>
             <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    {isLoading ? (
                        <Audio
                            height="20"
                            width="20"
                            radius="9"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                    ) : (
                        'Submit'
                    )}
                </button>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  )};

