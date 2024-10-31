import React, { useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsCart3, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  let navigate = useNavigate();
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleNavigate = () => {
    navigate('/Course');
  };

  const handleNavigateCourseList = () => {
    navigate('/CourseList');
  };

  const handleNavigateRecorded = () => {
    navigate('/MentorSlider');
  };
  const handleNavigatequiz = () => {
    navigate('/QuizForm');
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Sidebar Component */}
        <div className={`col-md-3 bg-dark text-light p-3 ${openSidebarToggle ? "d-block" : "d-none d-md-block"}`}>
          <div className='d-flex justify-content-between align-items-center mb-3 mt-4'>
            <h4><BsCart3 className='me-2' /> SHOP</h4>
            <button className='btn btn-light d-md-none' onClick={OpenSidebar}>X</button>
          </div>

          <ul className='nav flex-column mt-4'>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light'><BsGrid1X2Fill className='me-2' /> Dashboard</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light' onClick={handleNavigate}><BsFillArchiveFill className='me-2' /> Courses</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light' onClick={handleNavigateCourseList}><BsGrid1X2Fill className='me-2' /> Course List</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light' onClick={handleNavigateRecorded}><BsPeopleFill className='me-2' /> Recorded Courses</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light' onClick={handleNavigatequiz}><BsListCheck className='me-2' /> quiz</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light'><BsMenuButtonWideFill className='me-2' /> Reports</NavLink>
            </li>
            <li className='nav-item mb-2'>
              <NavLink to="#" className='nav-link text-light'><BsFillGearFill className='me-2' /> Settings</NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <main className='col-md-9 px-4'>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <nav className="navbar navbar-dark">
              <button className='bg-info text-black navbar-toggler d-md-none' onClick={OpenSidebar} type="button">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </div>

          <div className="main-content d-flex flex-wrap mx-n2">
            {/* Dashboard Cards */}
            {[
              { title: 'Products', icon: <BsFillArchiveFill size={30} />, count: 300 },
              { title: 'Categories', icon: <BsFillGrid3X3GapFill size={30} />, count: 12 },
              { title: 'Customers', icon: <BsPeopleFill size={30} />, count: 33 },
              { title: 'Alerts', icon: <BsFillBellFill size={30} />, count: 42 },
            ].map((card, index) => (
              <div key={index} className='col-6 col-md-3 p-2'>
                <div className='card text-center mb-3 bg-primary'>
                  <div className='card-body'>
                    <h5 className='card-title'>{card.title}</h5>
                    <div className='card-icon mb-2'>{card.icon}</div>
                    <p className='card-text display-4'>{card.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='row'>
            <div className='col-12 col-md-6'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
