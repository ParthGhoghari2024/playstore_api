import path from "path";
import fs from "fs";
import { logger } from "./pino";
const run = (): void => {
  const srcDir: string = "./src/public";
  const distDir: string = "./dist/public";

  const srcDirViews: string = "./src/views";
  const distDirViews: string = "./dist/views";
  const filter = (file: string): boolean => {
    // get the file extension
    const ext: string = path.extname(file);

    // return true if the file is not a .txt or .xml file
    return ext !== ".ts";
  };

  function copyFiles(src: string, dest: string): void {
    fs.cpSync(src, dest, { recursive: true, filter });
  }
  try {
    copyFiles(srcDir, distDir);
    copyFiles(srcDirViews, distDirViews);
    console.log("copied");
  } catch (error) {
    logger.error(error);
    logger.info("copy failed");
  }
};
run();
export default run;
