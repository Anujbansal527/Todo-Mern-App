const User = require("../Models/UserModel");

const AddUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email: email });

    if (exist) {
      return res.status(400).json({ msg: "user alerady exist" });
    }

    const newUser = await User.create({ username, email, password });

    return res.status(200).json({
      msg: "user created",
      token: await newUser.CreateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(404).json({ msg: "user not exist" });
    }

    const user = await exist.comparePass(password);

    if (!user) {
      return res.status(404).json({ msg: "user or password not match" });
    }

    res.status(200).json({
      msg: "user login sucessfull",
      token: await exist.CreateToken(),
      userId: exist._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const UserAuth = (req, res) => {
  try {
    const userData = req.user;

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json("error while fetching userd data", error);
  }
};

module.exports = { AddUser, LoginUser, UserAuth };
