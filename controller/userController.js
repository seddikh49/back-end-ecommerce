import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await userModel.findOne({ email })
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);
        if (!existUser) {
            res.json({ succes: false, msg: "This user doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (isMatch) {
            const token = createToken(userModel._id)
            res.json({ success: true, msg: token })
        } else {
            res.json({ success: false, msg: "invalid crendtials" })

        }
    } catch (error) {
        res.json({ err: error })
    }
};

////////////////user register ////////////////////////

const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const existEmail = await userModel.findOne({ email });
        if (existEmail) {
            return res.json({ success: false, msg: `this email  is already exists` });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: true, msg: "Please enter a valid email " });
        }
        if (password.length < 8) {
            return res.json({
                success: true,
                msg: "Password length must be greater than 8 ",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassowrd,
        });
        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({ token: token })

    } catch (error) {
        res.json({ err: error });
    }
};




const adminLogin = async(req, res) => {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET)
        res.status(201).json({ success: true, token: token })
    } else {
        res.json({ success: false, msg: 'wrong email or password' })
    }
};

export { loginUser, registerUser, adminLogin };