
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.model.js";

import { generateToken } from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    
    const payload = ticket.getPayload();

    const { sub: googleId, email, name,  } = payload;

     if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account email not available",
      });
    }
  
    let user = await User.findOne({ email });

    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        // picture,
      });
    }else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

  
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Google login successful",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

export default googleLogin;
