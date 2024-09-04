import CourseCard from "../../Components/CourseCard/CourseCard.jsx";
import { CourseData } from "../../Context/CourseContext.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const { myCourse } = CourseData();
  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {myCourse && myCourse.length > 0 ? (
          myCourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
