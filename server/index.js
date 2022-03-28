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
  imageURL: {
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
    imgURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Sanders_theater_2009y.JPG/440px-Sanders_theater_2009y.JPG",
    address: "199 Foo BLVD, Fooville, USA",
    description: "super good school",
  });
  const BarS = await Campuses.create({
    name: "Bar State",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Old_campus.jpg/1600px-Old_campus.jpg",
    address: "236 Bar Road, Somewhere, USA",
    description: "super awesome school",
  });
  const BazT = await Campuses.create({
    name: "Baz Tech",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Universal-Islands-of-Adventure-Harry-Potter-Castle-9182.jpg/440px-Universal-Islands-of-Adventure-Harry-Potter-Castle-9182.jpg",
    address: "9892 Baz Square, Nowhere, USA",
    description: "honestly mediocre school",
  });
  const Phil = await Students.create({
    firstName: "Phil",
    lastName: "Jackson",
    email: "pj@gmail.com",
    gpa: 3.4,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png",
    campusId: 3,
  });
  const Jason = await Students.create({
    firstName: "Jason",
    lastName: "Murphy",
    email: "jm@gmail.com",
    gpa: 3.2,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/5/52/Ned_Stark-Sean_Bean.jpg",
    campusId: 3,
  });
  const Lauren = await Students.create({
    firstName: "Lauren",
    lastName: "Jones",
    email: "lj@gmail.com",
    gpa: 3.7,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg",
    campusId: 2,
  });
  const Carol = await Students.create({
    firstName: "Carol",
    lastName: "Hines",
    email: "ch@gmail.com",
    gpa: 2.7,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/7/74/SophieTurnerasSansaStark.jpg",
    campusId: 1,
  });
  const Anthony = await Students.create({
    firstName: "Anthony",
    lastName: "Bai",
    email: "ab@gmail.com",
    gpa: 3.9,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/06/Robert_Baratheon_Profile_Mark_Addy.jpg",
    campusId: 1,
  });
  const Erin = await Students.create({
    firstName: "Erin",
    lastName: "Jacobs",
    email: "ej@gmail.com",
    gpa: 3.5,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg",
    campusId: 2,
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
app.get("/api/campus", async (req, res, next) => {
  try {
    res.send(await Campuses.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/campus", async (req, res, next) => {
  console.log("app.post req.body", req.body);
  const name = req.body.name;
  const address = req.body.address;
  try {
    const newCampus = await Campuses.create({
      name,
      address,
    });
    console.log("app.post req.body", req.body);
    res.status(201).send(newCampus);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/students", async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  try {
    const newStudent = await Students.create({
      firstName,
      lastName,
      email,
    });
    res.status(201).send(newStudent);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/campus/:id", async (req, res, next) => {
  try {
    const target = await Campuses.findByPk(req.params.id);
    target.destroy();
    res.send(204);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const target = await Students.findByPk(req.params.id);
    target.destroy();
    res.send(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/campus/:id", async (req, res, next) => {
  try {
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    const updated = await Campuses.findByPk(req.params.id * 1);
    res.send(await updated.update(req.body));
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
