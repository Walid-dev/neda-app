import { User } from "@/types/types";
import { resolve } from "path";

const users: User[] = [
  {
    id: 77,
    email: "ug@fesumtij.tn",
    name: "Laura Rowe",
    phone: "353860170",
    country: "Guinea",
    age: 69,
    status: "",
    creation_date: "12/18/2119",
  },
  {
    id: 95,
    email: "sa@niuz.hu",
    name: "Nathan McKenzie",
    phone: "123995462",
    country: "Samoa",
    age: 40,
    status: "",
    creation_date: "3/13/2122",
  },
  {
    id: 5,
    email: "ri@coikdeb.ad",
    name: "Thomas Griffin",
    phone: "249905829",
    country: "Luxembourg",
    age: 14,
    status: "",
    creation_date: "8/20/2080",
  },
  {
    id: 93,
    email: "herala@cij.cl",
    name: "Connor Vargas",
    phone: "79370932",
    country: "Micronesia",
    age: 5,
    status: "",
    creation_date: "3/1/2089",
  },
];

export function fetchUserById(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(new Error("No product with the given id exists."));
    }
  });
}
