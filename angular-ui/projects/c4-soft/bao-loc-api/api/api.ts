export * from './solutions.service';
import { SolutionsApi } from './solutions.service';
export * from './solutions.serviceInterface';
export * from './users.service';
import { UsersApi } from './users.service';
export * from './users.serviceInterface';
export const APIS = [SolutionsApi, UsersApi];
