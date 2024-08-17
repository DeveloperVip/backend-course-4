import { cloudinary } from "../../cloudinary.config";

export const fileDestroy = (publicId)=>{
    cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Result:', result);
        }
      });
}