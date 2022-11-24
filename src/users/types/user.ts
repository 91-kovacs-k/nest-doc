import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  password: string;
  age: number;
  email: string;
}

export class SerializedUser implements User {
  id: number;
  username: string;
  @Exclude()
  password: string;
  age: number;
  email: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
