const Sequelize = require("sequelize");
const sequelize = new Sequelize("license_web", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
