import fs from 'fs';
import path from 'path';

export default function writeJSONFile(data: any, filename: string) {
  const dirPath = path.resolve(__dirname, '../../public/data');
  const filePath = path.resolve(dirPath, filename);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
