import React, { useState, useEffect } from 'react';
import axios from 'axios';


const fetchData = async (url, setData, transformData) => {
    try {
        const response = await axios.get(url);
        const transformedData = transformData(response.data);
        setData(transformedData);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    }
};


const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

// Mentor Card Component
const MentorCard = ({ mentor }) => (
    <div className="col-md-4">
        <div className="card mentor-card mx-2 bg-light">
            <div className="card-body text-center">
                <div className="badge-container mb-2">
                    <span className={`badge ${mentor.sessionsAvailable > 0 ? 'bg-warning' : 'bg-danger'}`}>
                        {mentor.sessionsAvailable > 0 ? `${mentor.sessionsAvailable} available` : '0 available'}
                    </span>
                    {mentor.firstSessionFree && (
                        <span className="badge bg-danger ms-2">First Session Free</span>
                    )}
                </div>
                <img
                    src={mentor.image || 'https://via.placeholder.com/150'}
                    alt={mentor.name}
                    className="rounded-circle mb-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5 className="card-title">{mentor.name}</h5>
                <p className="card-text">{mentor.specialty}</p>
                <p className="text-danger">{mentor.languages.join(', ')}</p>
            </div>
        </div>
    </div>
);

// Course Card Component
const CourseCard = ({ course }) => (
    <div className="col-md-4">
        <div className="card course-card mx-2 bg-light">
            <img
                src={course.image || 'https://via.placeholder.com/150'}
                alt={course.title}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="text-muted">Provider: {course.provider}</p>
                <span className={`badge ${course.price === "Free" ? 'bg-success' : 'bg-primary'}`}>
                    {course.price}
                </span>
            </div>
        </div>
    </div>
);

//manage carousel  for mentors and courses
const Carousel = ({ items, renderItem, carouselId }) => {
    const itemGroups = chunkArray(items, 3); //  sets of 3 

    return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {itemGroups.map((group, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <div className="row justify-content-center">
                            {group.map(item => renderItem(item))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev " type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon  rounded-circle bg-danger p-3 " aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon rounded-circle bg-danger p-3" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

// MentorSlider Component
const MentorSlider = () => {
    const [mentors, setMentors] = useState([]);
    const mentorApiUrl = 'https://dev.championsacademy.ca/api/getHomeModules?lang=en&time_zone=Africa/Cairo';

    useEffect(() => {
        fetchData(mentorApiUrl, setMentors, data => 
            data.data.teachers.data.map(mentor => ({
                id: mentor.id,
                name: mentor.username,
                image: mentor.avatar,
                sessionsAvailable: mentor.available_sessions,
                specialty: mentor.fields_names,
                languages: mentor.languages_names.split(', '),
                firstSessionFree: mentor.first_session_free
            }))
        );
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Mentors</h2>
            <Carousel items={mentors} renderItem={mentor => <MentorCard mentor={mentor} />} carouselId="mentorCarousel" />
        </div>
    );
};

// CourseSlider Component
const CourseSlider = () => {
    const [courses, setCourses] = useState([]);
    const courseApiUrl = 'https://dev.championsacademy.ca/api/getHomeModules?lang=en&time_zone=Africa/Cairo';

    useEffect(() => {
        fetchData(courseApiUrl, setCourses, data =>
            data.data.live_courses.data.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                image: course.image,
                provider: course.provider_name,
                price: course.free ? "Free" : `${course.price} ${course.user_currency}`
            }))
        );
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Live Courses</h2>
            <Carousel items={courses} renderItem={course => <CourseCard course={course} />} carouselId="courseCarousel" />
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div>
            <MentorSlider />
            <CourseSlider />
        </div>
    );
};

export default App;
