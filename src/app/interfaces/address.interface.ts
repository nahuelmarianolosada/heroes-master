import {Timestamp} from "rxjs/Rx";
/**
 * Created by nlosada on 30/10/18.
 */

export interface Address {
  addressId: number,
  address: String,
  address2: String,
  district: String,
  cityId: number,
  postalCode: String,
  phone: String,
  lastUpdate : Timestamp<number>
}
