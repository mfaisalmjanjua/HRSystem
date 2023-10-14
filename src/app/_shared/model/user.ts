import { Role } from './role';

export interface User {
  id: number;
  fname: string;
  lname: string;
  username: string;
  password: string;
  token?: string;
  role: Role;
}
