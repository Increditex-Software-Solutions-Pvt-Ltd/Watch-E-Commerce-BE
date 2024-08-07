// import the express Router
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/User");

const userController = {
  register: async (req, res) => {
    try {
      const {firstName, lastName, email, phoneNumber,password, address=null,city=null,flatno=null,pincode=null,state=null } =
        req.body;

      const existingUser = await User.findOne({ emailId: email });

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
          firstName,
          lastName,
          emailId: email,
          address,
          phoneNumber,
          password: hashedPassword,
          address,
          flatno,
          state,
          pincode,
          city
        });

        const savedUser = await user.save();
        res
          .status(201)
          .json({ message: "Successful Registeration", user: savedUser });
      }
    } catch (error) {
      res.status(504).json({ message: "Internal server Error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ emailId: email });

      if (!user) {
        res.status(400).send({ message: "Invalid Credentials" });
      } else {
        const storedPassword = user.password;
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        if (isPasswordMatch) {
          const token = jwt.sign({ id: user._id }, config.SECRET_KEY,{expiresIn:'1h'});
          res.header({ "x-auth-token": token });
          res.send({ message: "Successful Login", token: token, userId:user._id });
        } else {
          res.send({ message: "Invalid Credentials" });
        }
      }
    } catch (error) {
      console.error("Error signing In");
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  logout: async (req, res) => {
    try {
      // Clear the token on the client-side (assuming you're using JWT for authentication)
      res.header("x-auth-token", ""); // Clear the token by setting an empty string
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getUserbyId: async (req, res) => {
    try {
      const id = request.params.id;
      const user = await User.findById(id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: "Server Error", error });
    }
  },
  editUserbyId: async (req, res) => {
    const id = request.params.id;
    const userToPatch = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
       const updateduser = User.findByIdAndUpdate(id,userToPatch, { new: true, runValidators: true });
       if (!updateduser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Update Successful", user: updateduser });
  
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    
  },
  deleteUserbyId: async (req, res) => {
    async (req, res) => {
      try {
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await user.remove();

        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  },
  getAllUsers: async (req, res) => {
    try {
      User.find({}).then((users) => {
        res.status(200).json({ "Users Count": users.length, users: users });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = userController;
