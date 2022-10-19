const User = require("../models/User");

const signup = async (req, res) => {
  const { name, email, password, birthdate } = req.body;
  try {
    const user = await User.create({ name, email, password, birthdate });
    res.status(201).send({
      user: {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
      message: "Successfully signup",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
};
