import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

export default {
  User: {
    tokens: ({ id }, args, { models }) =>
      models.License.findAll({
        where: {
          user: id
        }
      })
  },
  Query: {
    serverSettings: (parent, args, { models, user }) => {
      return models.ServerSettings.findOne({ where: { id: "1" } });
    },
    user: (parent, { input }, { models }) => {
      return models.User.findOne({
        where: input
      });
    },
    license: (parent, { input }, { models }) => {
      return models.License.findOne({
        where: {
          input
        }
      });
    },
    allUsers: (parent, args, { models }) => models.User.findAll(),
    me: (parent, args, { models, user }) => {
      if (user) {
        return models.User.findOne({
          where: {
            id: user.id
          }
        });
      }
      return null;
    },
    licenses: (parent, { input }, { models }) => {
      return models.License.findAll({
        where: {
          input
        }
      });
    }
  },

  Mutation: {
    insertFailedConsole: (parent, { input }, { models }) => {
      return models.FailedConsole.create(input);
    },
    updateServerSettings: (parent, { input }, { models }) => {
      return models.ServerSettings.update(input, { where: { id: "1" } });
    },
    redeemLicense: async (parent, { input }, { models }) => {
      let user = "";
      if (input.cpuKey)
        user = await models.User.findOne({
          where: { cpuKey: input.cpukey }
        }).id;
      else user = input.user;
      const license = await models.License.findOne({
        where: { id: input.license }
      });
      if (license.user === null) {
        const license = await models.License.update(
          { user: user },
          {
            where: { id: input.license }
          }
        );
        if (license) return true;
        else return false;
      } else return false;
    },
    createLicense: (parent, { input }, { models }) =>
      models.License.create(input),
    updateUser: (parent, { input }, { models }) => {
      if (input.qCPU)
        return models.User.update(input, { where: { cpuKey: input.cpuKey } });
      else return models.User.update(input, { where: { id: input.id } });
    },
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    register: async (parent, args, { models, SECRET }) => {
      console.log(args);
      const user = args.input;
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      user.isAdmin = false;
      user.isBanned = false;
      const regUser = await models.User.create(user);
      return regUser ? true : false;
    },
    login: async (parent, { input }, { models, SECRET }) => {
      const { username, password } = input;
      const user = await models.User.findOne({ where: { username } });
      if (!user) {
        throw new Error("No user with that username");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign(
        {
          user: _.pick(user, [
            "id",
            "username",
            "email",
            "color",
            "xbname",
            "reserveDays",
            "cpuKey",
            "expires",
            "isAdmin",
            "isBanned",
            "isEnabled"
          ])
        },
        SECRET,
        {
          expiresIn: "31d"
        }
      );
      return {
        user: _.pick(user, [
          "id",
          "username",
          "email",
          "color",
          "xbname",
          "reserveDays",
          "cpuKey",
          "expires",
          "isAdmin",
          "isBanned",
          "isEnabled"
        ]),
        token
      };
    }
  }
};
