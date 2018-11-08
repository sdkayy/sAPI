import uuid from "uuid/v1";

export default (sequelize, DataTypes) => {
  const ServerSettings = sequelize.define("serversettings", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: function() {
        return "1";
      }
    },
    isFreeMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return false;
      }
    },
    isOffline: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return false;
      }
    }
  });

  ServerSettings.associate = models => {};

  return ServerSettings;
};
