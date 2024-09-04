import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/TryCatch.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User Already exists",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
      name,
      email,
      password: hashPassword,
    };

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const activationToken = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Registered successfully",
      activationToken,
    });
  } catch (err) {
    res.status(500).json({ message: "error registering user" });
  }
};

// //verification
// export const verifyUser = TryCatch(async (req, res) => {
//   const { activationToken } = req.body;

//   const verify = jwt.verify(activationToken, process.env.JWT_SECRET);

//   if (!verify)
//     return res.status(400).json({
//       message: "not verified",
//     });

//   await User.create({
//     name: verify.user.name,
//     email: verify.user.email,
//     password: verify.user.password,
//   });

//   res.json({
//     message: "User Registered",
//   });
// });

//Login user
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

//User profile
export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ user });
});
