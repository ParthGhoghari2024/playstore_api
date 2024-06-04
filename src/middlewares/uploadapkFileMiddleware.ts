import multer from "multer";
import { Request, Response, NextFunction, RequestHandler } from "express";
const maxSize: number = 1024 * 1024 * 1024; // 1024MB
import fs from "fs";
import path from "path";
const apkUploadDir: string | undefined = process.env.APK_UPLOAD_PATH;
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    if (!fs.existsSync(apkUploadDir + "/" + req.body.appId)) {
      fs.mkdirSync(apkUploadDir + "/" + req.body.appId, { recursive: true }); //mkdir if not exist
    }
    cb(null, apkUploadDir + "/" + req.body.appId);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const newFileName: string =
      "app_" +
      req.body.appId +
      "_" +
      "version" +
      req.body.versionId +
      "_" +
      Date.now() +
      "_" +
      file.originalname;
    cb(null, newFileName);
  },
});
// const whitelistMimeType: string[] = ["image/jpeg", "image/png"];
const whitelistExtentions: string[] = [".apk"];
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
      // !whitelistMimeType.includes(file.mimetype) ||
      !whitelistExtentions.includes(fileExtention)
    ) {
      req.fileValidationError = "File type Error";
      return cb(null, false);
    }
    cb(null, true);
  },
}).single("apkFile");

const uploadApkMiddleware: RequestHandler = (
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
export { uploadApkMiddleware };
