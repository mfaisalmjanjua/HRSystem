import { Role } from './role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  token?: string;
  role: Role;
}
