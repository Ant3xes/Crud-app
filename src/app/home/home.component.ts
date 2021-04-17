import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(private apiService: ApiService, private router: Router) { }

  title = 'CRUD-app';
  actionType = false
  errorMessage = false;
  userForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  onChangeAction = () => {
    this.actionType = !this.actionType
  }

  onClickAction = () => {
    if (!this.actionType) {
      this.apiService.login(this.userForm.value.email, this.userForm.value.password).subscribe((data: any) => {
        if (data) {
          localStorage.setItem('token', JSON.stringify(data))
          this.router.navigate(["user"])
        }
      })
    } else {
      if (this.userForm.value.password === this.userForm.value.confirmPassword) {
        this.apiService.newUser(this.userForm.value).subscribe((data) => {

        })
      } else {
        this.errorMessage = true;
      }
    }
  }

}
