import { User } from './User';

export type Category = {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
  owner: User | null,
};
