const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { tb_user } = require("../../models");

exports.register = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    // we generate salt (random value) with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await tb_user.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: tb_user.id }, process.env.ACCESS_TOKEN);

    const user = ({
        fullname: newUser.fullname,
        token
    })
    
    res.status(200).send({
      status: "Success...",
      data: {user},
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        status: "failed",
        message: "Server Error",
        });
    }
};

exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
    });
  
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);
  
    // if error exist send validation error message
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const userExist = await tb_user.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
  
      if (!userExist) {
        return res.status(400).send({
          status: "Failed",
          message: "Email is not registered",
        })
      }
  
      // compare password between entered from client and from database
      const isValid = await bcrypt.compare(req.body.password, userExist.password);
  
      // check if not valid then return response with status 400 (bad request)
      if (!isValid) {
        return res.status(400).send({
          status: "Failed",
          message: "Password Incorrect",
        });
      }

      const token = jwt.sign({ id: userExist.id }, process.env.ACCESS_TOKEN);

      const user = ({
        fullname: userExist.fullname,
        email: userExist.email,
        token
      })
  
      res.status(200).send({
        status: "success...",
        data: {user},
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Failed",
        message: "Server Error",
      });
    }
};