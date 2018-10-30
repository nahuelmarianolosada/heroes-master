import {Component, OnInit} from '@angular/core';
import {Staff} from "../../../interfaces/staff.interface";
import {StaffService} from "../../../../services/staff.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesService} from "../../../../services/roles.service";
import {Role} from "../../../interfaces/role.interface";

@Component({
  selector: 'app-user-staff',
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent implements OnInit {

  staff: Staff;
  id: String;
  pass: string = "";
  repassword: string = "";
  editPass: boolean;
  rolesDisponibles: Role[];

  constructor(private _staffService: StaffService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _rolesService: RolesService) {
    this.activatedRoute.params.subscribe(parametros => {
      console.log(parametros);

      debugger;
      this.id = parametros['id'];
      this.editPass = parametros['changepass'] ? parametros['changepass'] : false;
      this.staff = this._staffService.initNewStaff();

      if (this.id != "nuevo") {
        var staffId = +this.id;
        this._staffService.getInfoById(staffId).subscribe(data => {
          this.staff = data;
        });
      }
      this.obtenerRoles();
    })
  };

  obtenerRoles() {
    this._rolesService.getRoles().subscribe(roles => {
      this.rolesDisponibles = roles;
      /*if (this.id == "nuevo"){
        this.staff.roles.push(this.rolesDisponibles[0]);
      }*/
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.staff.password = this.pass;
    if (this.id == "nuevo") {
      this.staff.staffId = null;
      this._staffService.newStaff(this.staff).subscribe((res: Response) => {
        this.router.navigate(['staff']);
      }, error => {
        console.log(error)
      });
    } else {
      this._staffService.updateStaff(this.staff).subscribe((res: Response) => {
        this.router.navigate(['staff']);
      }, error => {
        console.log(error);
      });
    }
  }

  getValidationMessage(array, type) {
    return array.find(function (obj) { return obj.type === type; }).message;
  }


  account_validation_messages = {
    'confirm_password': [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'areEqual', message: 'Passwords should be equals'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 5 characters long'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
    ]
  }




  onNotify(newRole: Role): void {
    debugger;
    this.staff.roles[0] = newRole;
  }

}
