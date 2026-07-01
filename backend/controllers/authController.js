
// controllers/authController.js
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken");
const { User } = require("../models/Usermodel");

// login user
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user by name
    if(name===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
            return res.status(201).json({message:"admin login successfull",role:"admin"});
        }
    
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(user.role==="mentor" && !user.isVerified){
      return res.status(400).json({error:"request not approved yet"});
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isProfile: user.isProfileCreated,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
