import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { validateCPF } from "../utils";

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidCPF",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: "$property must be a valid CPF",
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validateCPF(value);
        },
      },
    });
  };
}
