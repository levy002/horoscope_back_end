const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      message: "Signup successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUserVerification = async (email, password) => {
  const user = await User.findOne({email});

  if(user) {
     const passwordAuth = await bcrypt.compare(password, user.password);

     if(passwordAuth){
        return user;
     }else {
        throw Error('Invalid password');
     }
  }else {
    throw Error('Invalid email');
  }
};

const login = async(req, res) => {
  const { email, password } = req.body;

  try{
     const user = await loginUserVerification( email, password);
     console.log(user, 'logged in user');
     res.status(200).send({
       user: {
         name: user.name,
         email: user.email,
         birthdate: user.birthdate,
       },
       message: "Login successfully",
     });
  }catch(err){
   console.log(err);
  }
};

module.exports = {
  signup,
  login
};
