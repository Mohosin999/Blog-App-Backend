const fs = require("fs/promises");
const path = require("path");

console.log(process.env.DB_URL);
console.log(path.resolve(process.env.DB_URL));

class DatabaseConnection {
  constructor() {
    this.db = null;
    this.dbURL = path.resolve(process.env.DB_URL);
  }

  async read() {
    const dbStr = await fs.readFile(this.dbURL, { encoding: "utf-8" });
    this.db = JSON.parse(dbStr);
  }

  async write() {
    if (this.db) {
      await fs.writeFile(this.dbURL, JSON.stringify(this.db));
    }
  }

  async getDB() {
    if (this.db) {
      return this.db;
    }
    await this.read();
    return this.db;
  }
}

const main = async () => {
  const dbConnection = new DatabaseConnection();
  const db = await dbConnection.getDB();

  db.comments.push("That was a great article.");
  dbConnection.write();
};

main();
