import uuid from "uuid/v1";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return uuid();
      },
      primaryKey: true
    },
    xbname: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    salt: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    ip: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    titleid: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    expires: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    reserveDays: {
      type: DataTypes.FLOAT,
      defaultValue: function() {
        return 0.0;
      }
    },
    discordId: {
      type: DataTypes.INTEGER,
      defaultValue: function() {
        return 0;
      }
    },
    days: {
      type: DataTypes.INTEGER,
      defaultValue: function() {
        return 0;
      }
    },
    color: {
      type: DataTypes.INTEGER,
      defaultValue: function() {
        return 13018623;
      }
    },
    welcomeMessage: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "Welcome to xbNova!";
      }
    },
    cpuKey: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return "";
      }
    },
    kvData: {
      type: DataTypes.TEXT,
      defaultValue: function() {
        return "";
      }
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return false;
      }
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return false;
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: function() {
        return false;
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.License, {
      as: "tokens",
      foreignKey: "user"
    });
  };

  return User;
};
