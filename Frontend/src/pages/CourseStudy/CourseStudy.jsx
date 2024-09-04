import { Link, useNavigate, useParams } from "react-router-dom";
import "./CourseStudy.css";
import { CourseData } from "../../Context/CourseContext.jsx";
import { useEffect } from "react";
import { server } from "../../main.jsx";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }
  return (
    <>
      <>
        {course && (
          <div className="course-study-page">
            <div className="card">
              <img src={`${server}/${course.image}`} alt="" width={350} />
              <div>
                <h1>{course.title}</h1>
                <h4>{course.description}</h4>
                <h5>by - {course.createdBy}</h5>
                <h5>Duration - {course.duration} weeks</h5>
              </div>
              <Link to={`/lectures/${course._id}`}>
                <h2 className="common-btn">Lectures</h2>
              </Link>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default CourseStudy;
