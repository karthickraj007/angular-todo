import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface signup {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

export interface login {
  Email: string;
  Password: string;
}

export interface tododata{
  map(arg0: (item: any) => any): any;
  name:string;
  description:string;
  createdat:Date
}
 


@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private http:HttpClient) {
    console.log("service called")
   }

   private apiUrl = 'http://localhost:7000/product';

  signIn(data:signup):Observable<signup>{
    return this.http.post<signup>(`${this.apiUrl}/signin`, data)
  }

  login(logdata:login):Observable<any>{
    console.log("hello")
    return this.http.post<any>(`${this.apiUrl}/login`, logdata)
  }

  addItem(data:tododata):Observable<any>{
    return this.http.post(`${this.apiUrl}/addItem`, data)
  }

  getuser() :Observable<tododata>{
    return this.http.get<tododata>(`${this.apiUrl}/allusers`)
  }

  edituser(data:tododata, id:any) :Observable<any>{
    return this.http.put(`${this.apiUrl}/updateItem/${id}`, data);

  }

  deleteuser(id:any) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteItem/${id}`)
  }

  sortdata(data:string){
    const params = new HttpParams().set('name', data)
    console.log(params)
    return this.http.get<tododata>(`${this.apiUrl}/sort`, {params})
  }


  searchdata(data:string){
    const params = new HttpParams().set('name', data)
    console.log(params)
    return this.http.get<tododata>(`${this.apiUrl}/search`, {params})
  }

  
  

 

}
