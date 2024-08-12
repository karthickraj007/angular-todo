import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService, login } from '../service/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public errMsg:string= ''

  loginForm:FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  })

  constructor(private svc:TodoService, private router:Router, private toastr: ToastrService, private app:AppComponent){
   
  }

  ngOnInit(){
    this.loginForm.get('Email')?.valueChanges.subscribe((data:string)=>{
      this.errMsg = ''
    })

    this.loginForm.get('Password')?.valueChanges.subscribe((data:string)=>{
      this.errMsg = ''
    })
  }


  senddata(){
    console.log(this.loginForm.get('Email'));
    if(this.loginForm.valid){
      const logindata:login = this.loginForm.value
      this.svc.login(logindata).subscribe((data)=>{
        console.log("//////",data);
        localStorage.setItem("token", data?.Token);
        this.app.localstorage()
        this.toastr.success("login SucessFully")
        this.loginForm.reset()
        this.router.navigate(['todo'])

      },(err)=>{
        this.errMsg = err.error.message
        console.log(err);
      })
    }
  }


  googleauth(){
    console.log("hello")
  }

}
