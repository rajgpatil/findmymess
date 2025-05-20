import multer from "multer"

// The filename function takes three arguments:
// req: The request object.
// file: The uploaded file's details.
// callback: A function used to set the file name.
// Inside the filename function, the code tells Multer to use the file’s original name (file.originalname) when saving it.
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload;