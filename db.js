const fs = require("fs/promises");
const path = require("path");

console.log(process.env.DB_URL);
console.log(path.resolve(process.env.DB_URL));

class DatabaseConnection {
  constructor() {
    this.db = null;
    this.dbURL = path.resolve(process.env.DB_URL);
  }

  async readDB() {
    this.db = await fs.readFile(this.dbURL, { encoding: "utf-8" });
  }

  writeDB() {}
}
