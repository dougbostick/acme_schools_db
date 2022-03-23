const port = process.env.PORT || 3000;
const app = require("./app");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_students"
);

//model creation and associations
const Students = sequelize.define("students", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageURl: {
    type: Sequelize.STRING,
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 4,
    },
  },
});

const Campuses = sequelize.define("campuses", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
  },
});

Campuses.hasMany(Students);
Students.belongsTo(Campuses);

//seed
const seed = async () => {
  const FooU = await Campuses.create({
    name: "Foo University",
    imgURL: null,
    address: "199 Foo BLVD, Fooville, USA",
    description: "super good school",
  });
  const BarS = await Campuses.create({
    name: "Bar State",
    imgURL: null,
    address: "236 Bar Road, Somewhere, USA",
    description: "super awesome school",
  });
  const BazT = await Campuses.create({
    name: "Baz Tech",
    imgURL: null,
    address: "9892 Baz Square, Nowhere, USA",
    description: "honestly mediocre school",
  });
  const Phil = await Students.create({
    firstName: "Phil",
    lastName: "Jackson",
    email: "pj@gmail.com",
    gpa: 3.4,
  });
  const Jason = await Students.create({
    firstName: "Jason",
    lastName: "Murphy",
    email: "jm@gmail.com",
    gpa: 3.2,
  });
  const Lauren = await Students.create({
    firstName: "Lauren",
    lastName: "Jones",
    email: "lj@gmail.com",
    gpa: 3.7,
  });
  const Carol = await Students.create({
    firstName: "Carol",
    lastName: "Hines",
    email: "ch@gmail.com",
    gpa: 2.7,
  });
  const Anthony = await Students.create({
    firstName: "Anthony",
    lastName: "Bai",
    email: "ab@gmail.com",
    gpa: 3.9,
  });
  const Erin = await Students.create({
    firstName: "Erinn",
    lastName: "Jacobs",
    email: "ej@gmail.com",
    gpa: 3.5,
  });
};

//routes
app.get("/api/students", async (req, res, next) => {
  try {
    res.send(await Students.findAll());
  } catch (ex) {
    next(ex);
  }
});
app.get("/api/campuses", async (req, res, next) => {
  try {
    res.send(await Campuses.findAll());
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  seed();
  console.log("seeded");
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
