import multer from "multer";
import { Request, Response, NextFunction, RequestHandler } from "express";
const maxSize: number = 10 * 1024 * 1024; // 1MB
import fs from "fs";
import path from "path";
const appImageDir: string | undefined = process.env.APP_IMG_UPLOAD_PATH;
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    if (!fs.existsSync(appImageDir + "/" + req.body.appId)) {
      fs.mkdirSync(appImageDir + "/" + req.body.appId, { recursive: true }); //mkdir if not exist
    }
    cb(null, appImageDir + "/" + req.body.appId);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const newFileName: string =
      "app_" + req.body.appId + "_" + Date.now() + "_" + file.originalname;

    cb(null, newFileName);
  },
});
const whitelistMimeType: string[] = ["image/jpeg", "image/png"];
const whitelistExtentions: string[] = [".jpg", ".jpeg", ".png"];
const upload: RequestHandler = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null, acceptFile: boolean) => void
  ) {
    const fileExtention: string = path.extname(file.originalname).toLowerCase();
    if (
      !whitelistMimeType.includes(file.mimetype) ||
      !whitelistExtentions.includes(fileExtention)
    ) {
      req.fileValidationError = "File type Error";
      return cb(null, false);
    }
    cb(null, true);
  },
}).array("appImage");

const uploadAppImageMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.json({
          success: 0,
          message: "File limit error",
          fileLimitError: 1,
        });
      }
    }
    next();
  });
};
export { uploadAppImageMiddleware };
