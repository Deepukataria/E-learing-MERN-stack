import { useNavigate, useParams } from "react-router-dom";
import "./CourseDescription.css";
import { CourseData } from "../../Context/CourseContext.jsx";
import { useEffect } from "react";
import { server } from "../../main.jsx";

const CourseDescription = ({ user }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { fetchCourse, course, enrollInCourse, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    enrollInCourse(user._id, course._id);
    fetchMyCourse();
  };
  return (
    <>
      {course && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={`${server}/${course.image}`}
              className="course-image"
              alt=""
            />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>By {course.createdBy}</p>
              <p>Duration: {course.duration}</p>
            </div>
            {user && user.subscription.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Learn
              </button>
            ) : (
              <button onClick={handleEnroll} className="common-btn">
                Enroll
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDescription;
