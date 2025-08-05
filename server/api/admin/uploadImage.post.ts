import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export default defineEventHandler(async (event) => {
  try {
    let response: { src: string; alt: string; width: string; height: string } = {
      src: "",
      alt: "",
      width: '800',
      height: ''
    };

    const config = useRuntimeConfig();
    cloudinary.config({
      api_key: config.public.CLD_PUBLIC,
      api_secret: config.CLD_SECRET,
      cloud_name: config.public.CLD_NAME,
    });

    const uploadStreamToCloudinary = (buffer: any) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "rankwithebube/images",
            format: "webp",
            transformation: {
                width: parseInt(response.width) || 500,
                quality: 'auto',
                crop: 'limit',
                ...(response.height !== '' ? { height: parseInt(response.height) } : {})
              },
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    };

    const body = await readMultipartFormData(event);
    if (body) {
      for (const { name, data, filename, type } of body) {
        if (name == "image") {
          if (filename && type?.startsWith("image/")) {
            const result = (await uploadStreamToCloudinary(data)) as {
              secure_url: string;
              public_id: string;
            };
            console.log("result", result);
            response.src = result.secure_url;
          }
        } else {
          response[name as keyof typeof response] = data.toString("utf8");
        }
      }
    }

    return { success: true, data: response };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
