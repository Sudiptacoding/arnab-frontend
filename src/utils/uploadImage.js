// import axios from "axios";
// import { message } from "antd";

// const IMGBB_API_KEY = "9d5e814c7c5f4867978ca6169e144b8b";

// export const uploadToImgBB = async (file) => {
//   if (!file) return null;

//   const isImage = file.type.startsWith("image/");

//   if (!isImage) {
//     message.error("You can only upload JPG/PNG/WEBP files!");
//     return null;
//   }

//   const isLt5M = file.size / 1024 / 1024 < 5;

//   if (!isLt5M) {
//     message.error("Image must be smaller than 5MB!");
//     return null;
//   }

//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const response = await axios.post(
//       "https://api.imgbb.com/1/upload",
//       formData,
//       {
//         params: {
//           key: IMGBB_API_KEY,
//         },
//       }
//     );

//     return response.data.data.display_url;
//   } catch (error) {
//     console.error("ImgBB upload error:", error);

//     message.error("Image upload failed! Please try again.");

//     return null;
//   }
// };


import axios from "axios";
import { message } from "antd";
import imageCompression from "browser-image-compression";

// আপনার API Key (নিরাপত্তার জন্য এটি .env ফাইলে রাখা ভালো)
const IMGBB_API_KEY = "9d5e814c7c5f4867978ca6169e144b8b";

export const uploadToImgBB = async (file) => {
  if (!file) return null;

  // ১. ইমেজ ফাইল টাইপ ভ্যালিডেশন
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("You can only upload JPG, PNG, or WEBP files!");
    return null;
  }

  let fileToUpload = file;
  const fileSizeInMB = file.size / 1024 / 1024;

  // ২. যদি ইমেজ ২ MB-এর চেয়ে বড় হয়, তবে সেটি কম্প্রেস করা হবে
  if (fileSizeInMB > 2) {
    message.loading({ content: "Compressing large image, please wait...", key: "upload" });

    const options = {
      maxSizeMB: 2,           // যত বড় ফাইলই হোক, কম্প্রেস হয়ে ২ MB-এর নিচে নেমে আসবে
      maxWidthOrHeight: 1920, // রেজোলিউশন Full HD লিমিটে রাখবে (সাইজ দ্রুত কমে)
      useWebWorker: true,     // ব্রাউজার যাতে হ্যাং না করে
      maxIteration: 10,       // নির্দিষ্ট সাইজে না পৌঁছানো পর্যন্ত সর্বোচ্চ ১০ বার ট্রাই করবে
      initialQuality: 0.8,    // ছবির কোয়ালিটি চমৎকার রাখবে
    };

    try {
      fileToUpload = await imageCompression(file, options);
    } catch (compressionError) {
      console.error("Compression error:", compressionError);
      message.error({ content: "Failed to compress image.", key: "upload" });
      return null;
    }
  }

  // ৩. ImgBB-তে আপলোড করা
  const formData = new FormData();
  // কম্প্রেস করা ফাইলটির সাথে মূল ফাইলের নাম ও এক্সটেনশন যুক্ত করে পাঠানো হচ্ছে
  formData.append("image", fileToUpload, file.name);

  try {
    message.loading({ content: "Uploading image to ImgBB...", key: "upload" });

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: IMGBB_API_KEY,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // বড় ফাইলের ক্ষেত্রে ১ মিনিট পর্যন্ত অপেক্ষা করবে
      }
    );

    message.success({ content: "Image uploaded successfully!", key: "upload" });
    return response.data?.data?.display_url;
  } catch (error) {
    console.error("ImgBB upload error:", error);
    message.error({ content: "Image upload failed! Please try again.", key: "upload" });
    return null;
  }
};