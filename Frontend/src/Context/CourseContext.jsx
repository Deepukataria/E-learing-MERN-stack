import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);

      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  // Enroll user in course
  const enrollInCourse = async (userId, courseId) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const { data } = await axios.post(
        `${server}/api/course/enroll`,
        {
          userId,
          courseId,
        },
        {
          headers: {
            token,
          },
        }
      );
      console.log(data.message);
      toast.success("Enrolled Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMyCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CourseContext.Provider
      value={{
        fetchCourses,
        courses,
        fetchCourse,
        course,
        enrollInCourse,
        myCourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
