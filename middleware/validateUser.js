import { body } from "express-validator";
import { isUniqueUsername } from "../controllers/usersController.js";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must only contain letters."),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must only contain letters."),
  body("username")
    .trim()
    .custom(async (username) => {
      const isUnique = await isUniqueUsername(username);
      if (!isUnique) {
        throw new Error();
      }
    })
    .withMessage("Username already in use."),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 char long and contain at least one lower case char, upper case char, number and symbol.",
    ),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => confirmPassword === req.body.password)
    .withMessage("Passwords do not match."),
];

export { validateUser };
