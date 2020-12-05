import multer from "multer";
import path from "path";
import crypto from "crypto";

const storageTypes = {
    local: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads"),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(13).toString("hex");

            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName);
        }
    }),
}

const STORAGE_TYPE = "local";

export default {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    storage: storageTypes[STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif"
        ];
    
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
    }
}