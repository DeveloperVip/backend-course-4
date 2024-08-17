import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: 'drmeotcu7', 
  api_key: '274666934972348', 
  api_secret: 'KxPCa-zWgtiJ0XTYiSXvyBNZGeE' 
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export {upload,cloudinary};
