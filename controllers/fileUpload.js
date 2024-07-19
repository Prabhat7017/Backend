const File = require("../models/File");
const cloudinary = require('cloudinary').v2;
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File->", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);
        file.mv(path, (err) => {
            console.log(err);
        });

        res.status(200).json({
            success: true,
            message: "Local File Uploaded",
        })
    } catch (error) {
        console.log(error);
    }
}


function isFileSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder, resource_type: "auto" };
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)
      .then((result) => {
        console.log("Upload success:", JSON.stringify(result, null, 2));
        return result;
      })
      .catch((error) => {
        console.log("Upload error:", JSON.stringify(error, null, 2));
        throw error;
      });
  }
  
  exports.imageUpload = async (req, res) => {
    try {
      const { name, tags, email } = req.body;
      console.log(name, tags, email);
      const file = req.files.imageFile;
      console.log(file);
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }
  
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: "File format not supported",
        });
      }
  
      const response = await uploadFileToCloudinary(file, "random");
      console.log(response);
  
      res.json({
        success: true,
        message: "Image successfully uploaded",
        data: response,
      });
  
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;
        console.log(file);


        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        console.log("Printing response");
        const response = await uploadFileToCloudinary(file, "Prabhat");
        console.log(response);


        res.json({
            success: true,
            message: "Image successfully uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}


exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        console.log("file Type", fileType);

        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }


        console.log("Uploading image to cloudinary");
        const response = await uploadFileToCloudinary(file, "random");
        console.log(response);


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}