export interface User {
    _id: string;
    name: string;
    email: string;
    role: "member" | "admin" | "trainer";
  }