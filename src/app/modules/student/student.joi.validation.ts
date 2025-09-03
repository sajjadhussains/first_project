import Joi from "joi";

// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const formatted = value.charAt(0).toUpperCase() + value.slice(1);
      if (formatted !== value) {
        return helpers.error("string.capital");
      }
      return value;
    })
    .messages({
      "any.required": "First Name is required",
      "string.max": "First Name can not be more than 20 characters",
      "string.capital": "{#value} is not in capital format",
    }),

  middleName: Joi.string().required().messages({
    "any.required": "Middle Name is required",
  }),

  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "any.required": "Last Name is required",
      "string.pattern.base": "{#value} is not in correct format",
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "Father's Occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "Father's Contact No is required",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "Mother's Name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "any.required": "Mother's Occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "any.required": "Mother's Contact No is required",
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Local Guardian's Name is required",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "Local Guardian's Occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Local Guardian's Contact No is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "Local Guardian's Address is required",
  }),
});

// Student Schema
export const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Student ID is required",
  }),

  name: userNameValidationSchema.required().messages({
    "any.required": "Student Name is required",
  }),

  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "{#value} is not valid. Please provide Male or Female",
    "any.required": "Gender is required",
  }),

  dateOfBirth: Joi.string().required().messages({
    "any.required": "Date of Birth is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email is not correct format",
    "any.required": "Email is required",
  }),

  contactNo: Joi.string().required().messages({
    "any.required": "Contact No is required",
  }),

  emergencyContactNo: Joi.string().required().messages({
    "any.required": "Emergency Contact No is required",
  }),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "{#value} is not a valid Blood Group",
    }),

  presentAddress: Joi.string().required().messages({
    "any.required": "Present Address is required",
  }),

  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent Address is required",
  }),

  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required",
  }),

  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local Guardian information is required",
  }),

  profileImg: Joi.string().uri().optional(),

  active: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
