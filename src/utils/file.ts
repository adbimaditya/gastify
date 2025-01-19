import fs from 'fs';
import path from 'path';

export function readJSONFile(filePath: string) {
  const absolutePath = path.resolve(__dirname, `../..${filePath}`);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  return JSON.parse(fileContent);
}

export function writeJSONFile(data: any, filename: string) {
  const dirPath = path.resolve(__dirname, '../../public/data');
  const filePath = path.resolve(dirPath, filename);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
