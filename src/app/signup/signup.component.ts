import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {signup, TodoService} from '../service/todo.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public errMsg:string = ''
  public passErr:string =''

  createForm:any = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', [Validators.required]),

  })

  

  constructor(private svc:TodoService, private router:Router, private toastr: ToastrService  ){
    
  }

  ngOnInit() {
    
    this.createForm.get('ConfirmPassword')?.valueChanges.subscribe((pass: string) => {
      this.passErr = ''; 
    });

    this.createForm.get('Email')?.valueChanges.subscribe((email: string) => {
      this.errMsg = ''; 
    });
  }


  checkPassword(){
    if(this.createForm.value.Password != this.createForm.value.ConfirmPassword){
        this.passErr = 'password mismatch'
    }
    else{
      this.passErr = ''
    }
  }
  senddata(){
    console.log(this.createForm)
    if (this.createForm.valid) {
      this.checkPassword()
      if(this.passErr== ''){
        const todoData: signup = this.createForm.value; 
      console.log(todoData);
      this.svc.signIn(todoData).subscribe(
        (data) => {
          this.createForm.reset()
          console.log(data);
          this.toastr.success("signIn SucessFully")
          this.router.navigate(['login'])
        },
        (err) => {
          console.log(err.error.message);
          this.errMsg = err.error.message
          
        }
      );
      }
      else{
        console.log(this.passErr)
      }
      
    } else {
      console.log('Form is invalid');
    }
    
  }
  


}
