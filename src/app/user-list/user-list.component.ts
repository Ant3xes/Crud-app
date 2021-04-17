import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  users = [
    {
      id: 1,
      email: 'zizou@hotmail.fr'
    }
  ]
  errorMessage = false;
  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  ngOnInit(): void {
    this.getUser()
  }

  registerAction = (action: string, id: number) => {
    if (action === 'NewUser') {
      if (this.userForm.value.password === this.userForm.value.confirmPassword) {
        this.apiService.newUser(this.userForm.value);
      } else {
        this.errorMessage = true;
      }
    } else if (action === 'ModifyUser') {
      this.apiService.modifyUser(this.userForm.value.email, id);
    } else if (action === 'DeleteUser') {
      this.apiService.deleteUser(id);
    }
  }

  getUser() {
    this.apiService.getUser().subscribe((data) => {
      console.log(data)
      // this.user = data;
    })
  }

}
