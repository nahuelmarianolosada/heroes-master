import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "../../../interfaces/store.interface";
import {StoreService} from "../../../../services/store.service";

@Component({
  selector: 'cmb-store',
  templateUrl: './cmb-store.component.html',
  styleUrls: ['./cmb-store.component.css']
})
export class CmbStoreComponent implements OnInit {

  @Input()
  stores:any;

  @Input()
  selectedStore: Store;

  @Output() notify: EventEmitter<Store> = new EventEmitter<Store>();

  constructor(private _storeService: StoreService) {
  }


  ngOnInit() {
    debugger;
    this.getAll();
    this.selectedStore = this._storeService.initNewStore();
    console.log(this.selectedStore);
  }

  getAll(){
    this._storeService.getStores()
      .subscribe( data => {
        this.stores = data as Store[];
        debugger;
      }, error => {
        console.error(error);
      });
  }

  selectionChanged(event){
    debugger;
    this.selectedStore = event;
    this.notify.emit(this.selectedStore);
    console.log(this.selectedStore);
  }

}
