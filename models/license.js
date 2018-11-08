import uuid from "uuid/v1";

export default (sequelize, DataTypes) => {
  const License = sequelize.define("license", {
    id: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return uuid();
      },
      primaryKey: true
    },
    time: DataTypes.INTEGER
  });

  License.associate = models => {};

  return License;
};
