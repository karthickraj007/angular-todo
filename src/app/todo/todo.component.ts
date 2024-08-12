import { Component } from '@angular/core';
import { TodoService, tododata } from '../service/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  providers: [DatePipe]
})
export class TodoComponent {

  todoItems:any

   editingItemId: any

  viewData:any

 
  todoForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    createdat: new FormControl('', [Validators.required])
  })

  constructor(private svc:TodoService, private toastr: ToastrService, private datePipe: DatePipe){
    this.getTodoUser()
  }

  ngOnit(){
    this.getTodoUser()
  }

 

  getTodoUser() {
    this.svc.getuser().subscribe((data) => {
      this.todoItems = data.map((data)=>{
        if(data.createdat){
          data.createdat = format(new Date(data.createdat), 'dd/MM/yyyy, HH:mm:ss' )
        }
        return data
      })
      console.log(this.todoItems);
    }, (err) => {
      console.log(err);
    });
  }

  senddata(){
    if (this.todoForm.valid) {
      const data: tododata = this.todoForm.value;
      if (this.editingItemId) {
        console.log("coming inside", this.editingItemId)
        this.svc.edituser(data, this.editingItemId, ).subscribe((response) => {
          this.toastr.success("Item updated successfully");
          this.getTodoUser();
          this.todoForm.reset();
          this.editingItemId = null;
        }, (err) => {
          console.error(err);
        });
      } else {
        console.log(this.todoForm.value)
        this.svc.addItem(data).subscribe((response) => {
          this.toastr.success("Item added successfully");
          this.getTodoUser();
          this.todoForm.reset();
        }, (err) => {
          console.error(err);
        });
      }
    }
  }

  edit(k:any){
    console.log(k._id)
    this.editingItemId = k._id;
    const formattedDate = k.date ? new Date(k.date).toISOString().substring(0, 10) : '';
    this.todoForm.patchValue({
      ...k,
      
    });
    
  }

  delete(id:any){
    console.log(id)
    this.svc.deleteuser(id).subscribe((data)=>{
      console.log(data)
      this.getTodoUser()
      this.toastr.success("Item deleted successfully");
    },(err)=>{
      console.log(err)
    })
  }


 sort(value:any){
  const data = value?.target.value
  this.svc.sortdata(data).subscribe((data)=>{
    this.todoItems = data.map((data)=>{
      if(data.createdat){
        data.createdat = format(new Date(data.createdat), 'dd/MM/yyyy, HH:mm:ss' )
      }
      return data
    })
  },(err)=>{
    console.log(err)
  })
 }


 search(value:any){
  const data = value?.target.value
  if(value.code === 'Enter'){
    this.svc.searchdata(data).subscribe((data)=>{
      this.todoItems = data
    },(err)=>{
      console.log(err)
    })
  }
 }

 view(k:any){
  this.viewData = k
 }
  

}
