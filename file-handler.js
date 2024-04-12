import https from "https";
import fs from "fs";
import { join } from "path";

export async function downloadFiles(fileUrls) {
  const downloadFolder = "./blocklist";

  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
  } else {
    // Clear all files in the directory
    const files = fs.readdirSync(downloadFolder);
    files.forEach((file) => {
      const filePath = join(downloadFolder, file);
      fs.unlinkSync(filePath);
      console.log(`File ${file} deleted.`);
    });
  }

  for (const fileUrl of fileUrls) {
    const filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    const downloadPath = join(downloadFolder, filename);

    const file = fs.createWriteStream(downloadPath);

    await new Promise((resolve, reject) => {
      https
        .get(fileUrl, (response) => {
          response.pipe(file);

          file.on("finish", () => {
            file.close();
            console.log(`File ${filename} downloaded successfully.`);
            resolve();
          });
        })
        .on("error", (error) => {
          fs.unlink(downloadPath, () => {
            console.error(`Error downloading file ${filename}:`, error);
            reject(error);
          });
        });
    });
  }
}

export function parseFile() {
  const fileNames = getAllFilesInDirectory("./blocklist");

  const domains = [];
  fileNames.forEach((fileName) => {
    const content = fs.readFileSync(`./blocklist/${fileName}`, "utf8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith("#")) {
        continue;
      }

      domains.push(line.trim());
    }
  });

  return domains;
}

function getAllFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  const fileNames = files.filter((file) => {
    const filePath = join(directoryPath, file);
    return fs.statSync(filePath).isFile();
  });

  return fileNames;
}
