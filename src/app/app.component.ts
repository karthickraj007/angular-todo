import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './service/token.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-project';

  retrievedUserData:any

  

  constructor(private router:Router, private toastr: ToastrService, private token:TokenService,private authService: SocialAuthService){
    
  }

  localstorage(){
    if (typeof window !== 'undefined' && window.localStorage) {
        
      this.retrievedUserData = localStorage.getItem("token");
      this.token.setToken(this.retrievedUserData);
    }
  }

  ngOnInit() {
    this.localstorage()
      this.authService.authState.subscribe((user) => {
        console.log(user)
        localStorage.setItem("token", user?.idToken)
        if(this.retrievedUserData === null){
          this.localstorage()
          this.router.navigate(['todo'])
          this.toastr.success("Login sucessfully")
        }
        
         
      
        
  
        })
      
    
  }


  logout(){
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem("token");
      this.token.setToken(null);
      this.localstorage()
      this.toastr.success("logout sucessfully")
      this.router.navigate(['login'])
    }
    else{
      console.log("err")
    }
    

  }
}
