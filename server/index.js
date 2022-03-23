const port = process.env.PORT || 3000;
const app = require("./app");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_students"
);

const Students = sequelize.define("students", {
  firstName: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
});

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
