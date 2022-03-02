import fs from 'fs/promises';

export default class CacheFile {
  static async setCacheInFile(file: string, data: any) {
    const path = `${__dirname}/${file}`;

    await fs.writeFile(path, JSON.stringify(data));
  }

  static async getCacheInFile(file: string) {
    try {
      const path = `${__dirname}/${file}`;

      await fs.access(path);
      const data = await fs.readFile(path, 'utf-8');

      const jsonData = JSON.parse(data);

      return jsonData;
    } catch (e) {
      return;
    }
  }
}
