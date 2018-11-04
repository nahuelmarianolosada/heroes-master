import { Timestamp } from "rxjs/Rx";
import { Staff } from "./staff.interface";
import {Address} from "./address.interface";
export interface Store {
  storeId: number;
  managerStaff: Staff;
  address: Address;
  lastUpdate : Timestamp<number>;
}
