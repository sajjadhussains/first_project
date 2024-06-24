const Joi = require("joi");
// import default from './../../config/index';

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "id should be unique",
  }),
  name: Joi.object({
    firstName: Joi.string()
      .max(20)
      .required()
      .pattern(/^[A-Z][a-z]*$/)
      .messages({
        "string.max": "first name cannot contain more than 10 characters",
        "any.required": "Name is Required",
        "string.pattern.base": "firstName must be in capitalize format",
      }),
    middleName: Joi.string().required().messages({
      "any.required": "Name is Required",
    }),
    lastName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "any.required": "Name is Required",
        "string.pattern.base": "lastName must contain only letters",
      }),
  }).required(),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.required": "Gender is Required",
    "any.only": 'Gender must be either "male" or "female"',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    "any.required": "Email is Required",
    "string.email": "Email must be a valid email address",
  }),
  contactNumber: Joi.string().required().messages({
    "any.required": "Contact number is Required",
  }),
  emergencyContactNumber: Joi.string().required().messages({
    "any.required": "Emergency contact number is Required",
  }),
  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is Required",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is Required",
  }),
  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      "any.required": "Father name is Required",
    }),
    fatherOccupation: Joi.string().required().messages({
      "any.required": "Father occupation is Required",
    }),
    fatherContactNumber: Joi.string().required().messages({
      "any.required": "Father contact number is Required",
    }),
    motherName: Joi.string().required().messages({
      "any.required": "Mother name is Required",
    }),
    motherOccupation: Joi.string().required().messages({
      "any.required": "Mother occupation is Required",
    }),
    motherContactNumber: Joi.string().required().messages({
      "any.required": "Mother contact number is Required",
    }),
  }).required(),
  localGuardian: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Local guardian name is Required",
    }),
    occupation: Joi.string().required().messages({
      "any.required": "Local guardian occupation is Required",
    }),
    contactNumber: Joi.string().required().messages({
      "any.required": "Local guardian contact number is Required",
    }),
  }).required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
  isDeleted: Joi.boolean().default(false),
});

export default studentValidationSchema;
