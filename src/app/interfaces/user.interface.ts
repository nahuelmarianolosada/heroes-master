
import {Role} from './role.interface';
import {Store} from './store.interface';
import {Timestamp} from 'rxjs/Rx';
export interface User {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  username: string;
  active: boolean;
  lastUpdate: Timestamp<number>;
  picture: string;
  roles: Role[];
  store: Store;
}
