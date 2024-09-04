import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import About from "./pages/About/About.jsx";
import Account from "./pages/Account/Account.jsx";
import { UserData } from "./Context/UserContext.jsx";
import Loading from "./Components/Loading/Loading.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import CourseDescription from "./pages/CourseDescription/CourseDescription.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CourseStudy from "./pages/CourseStudy/CourseStudy.jsx";
import Lectures from "./pages/Lectures/Lectures.jsx";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard.jsx";
import AdminCourses from "./Admin/Courses/AdminCourses.jsx";
import AdminUsers from "./Admin/Users/AdminUsers.jsx";

const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lectures user={user} /> : <Login />}
            />

            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
