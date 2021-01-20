import bcryptjs from "bcryptjs";
export const users = [
  {
    name: "ravi",
    email: "ravi@gmail.com",
    password: bcryptjs.hashSync("admin123", 10),
  },
  {
    name: "samir",
    email: "samir@gmail.com",
    password: bcryptjs.hashSync("admin123", 10),
  },
  {
    name: "sanskar",
    email: "sanskar@gmail.com",
    password: bcryptjs.hashSync("admin123", 10),
  },
  {
    name: "amir",
    email: "amir@gmail.com",
    password: bcryptjs.hashSync("admin123", 10),
  },
];
