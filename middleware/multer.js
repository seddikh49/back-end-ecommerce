import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, `sed-${file.originalname}`)
    }
})

const upload = multer({ storage })

export default upload