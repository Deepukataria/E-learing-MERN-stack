import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courses.model.js";
import { User } from "../models/user.model.js";
import { Lecture } from "../models/lectures.model.js";

//Get all courses
export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

//Get single course by id
export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

//fetch lectures
export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

//fetch lecture by id
export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You are not enrolled in this course",
    });

  res.json({ lecture });
});

//get enrolled courses
export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

//Enroll in course
export const enrollCourse = TryCatch(async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await User.findById(userId);
  const course = await Courses.findById(courseId);
  if (user.subscription && user.subscription.includes(courseId)) {
    return res
      .status(400)
      .json({ message: "User already enrolled in this course" });
  }
  user.subscription.push(courseId);
  await user.save();
  course.enrolledUsers.push(userId);
  await course.save();
  res.status(200).json({ message: "Successfully enrolled in the course" });
});
