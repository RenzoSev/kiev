import fs from 'fs/promises';

export default class CacheFile {
  static async setCacheInFile(file: string, data: any) {
    const path = `${__dirname}/${file}`;

    await fs.writeFile(path, JSON.stringify(data));
  }

  static async getCacheInFile(file: string) {
    const path = `${__dirname}/${file}`;
    const data = await fs.readFile(path, 'utf-8');

    const jsonData = JSON.parse(data);

    return jsonData;
  }
}
