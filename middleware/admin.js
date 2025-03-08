import jwt from 'jsonwebtoken'

const authAdmin = async(req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            console.log("message")
            return res.json({ msg: "you don't have authorization to access this api" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ token: "you don't have authorization to access this api" })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authAdmin