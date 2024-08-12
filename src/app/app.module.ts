import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoService } from './service/todo.service';
import { AuthInterceptor } from './auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide:'SocialAuthServiceConfig',
      useValue:{
        autoLogin:false,
        providers:[
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '497531990828-mi3psnoqg9cakuqrinpnis07v2cr6cnq.apps.googleusercontent.com'
            )
          }
        ],
        onError:(err) =>{
          console.error(err)
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
