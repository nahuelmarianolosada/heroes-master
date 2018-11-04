
import { Role } from "./role.interface" ;
import {Timestamp} from "rxjs/Rx";
import {Store} from "./store.interface";
export interface Staff{

  /*StaffId:number;
  firstName: string;
  lastName: string;
  email:string;
  password: string;
  roles: Role[];*/
  staffId: number;
   firstName :  string;
   lastName :  string;
   email :  string;
   store : Store;
   active : boolean;
   username :  string;
   password :  string;
   lastUpdate : Timestamp<number>;
   picture : string;
   roles : Role[];


}
