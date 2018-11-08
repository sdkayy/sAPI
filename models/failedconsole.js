import uuid from "uuid/v1";

export default (sequelize, DataTypes) => {
  const FailedConsole = sequelize.define("failedconsole", {
    id: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return uuid();
      },
      primaryKey: true
    },
    cpuKey: DataTypes.STRING,
    ip: DataTypes.STRING,
    kvData: DataTypes.TEXT,
    num: DataTypes.INTEGER
  });

  FailedConsole.associate = models => {};

  return FailedConsole;
};
