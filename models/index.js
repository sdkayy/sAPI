import Sequelize from "sequelize";

const sequelize = new Sequelize("DBNAME", "DBUSERNAME", "DBPASSWORD", {
  host: "HOST",
  // PORT
  port: 1337,
  dialect: "postgres"
});

const db = {
  User: sequelize.import("./user"),
  License: sequelize.import("./license"),
  ServerSettings: sequelize.import("./serversetting"),
  FailedConsole: sequelize.import("./failedconsole")
};

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
