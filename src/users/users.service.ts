import Joi, { ValidationResult } from "joi";
import { IUserAttrs } from "../storage/mongodb/interfaces/interface.common";
//User Input Validation.
const validateUser = (user: IUserAttrs): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    age: Joi.number().required(),
    address: Joi.string().required(),
  });
  const result: ValidationResult = schema.validate(user);
  return result;
};

export { validateUser };
