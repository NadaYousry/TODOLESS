import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup, FormBuilder, Validators} from '@angular/forms';
import { tasks } from '../modals/tasks';
import { TasksService } from '../tasks.service/tasks.service';
import { users } from '../modals/users';
import { usersService } from '../users.service/users.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
export interface User {
  name: string;
}
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
// !!!!!!!!!!!!!!--------------- Declartion && Intialization ---------------!!!!!!!!!!!!!!!!!
item: any = {
  name: '',
  description: '',
  totalTime: '',
  personId: '',
  startDate: '',
  endDate: '',
  status:'',
  assignTo:'',
  attachment:'',
  
}
//all arrays and vars
editState:boolean=false;
itemtoEdit:tasks;
fileData: any;
projectForm: FormGroup;
todo: tasks[];
currentProjectID;
workingOn = [

];

finished = [];
taskForm: FormGroup;
usersLength;
filedate: any;
fileSrc: string | ArrayBuffer;
file: any;
assignTo=[];
users:users[];


myControl = new FormControl();
assign: users[] = [];
filteredOptions: Observable<users[]>;
  constructor(private f: FormBuilder, private TasksService: TasksService, private usersService:usersService) { }

  onSubmit(form:FormGroup) {
    if (form.valid){
      // this.taskForm.value.attachment = this.file;
      this.assignTo.push(this.taskForm.value.assignTo);
      this.taskForm.value.assignTo = this.assignTo;  
      this.taskForm.value.status = 'pending'
      this.taskForm.value.projectId = JSON.parse(localStorage.getItem('currentProject')).id
      this.taskForm.value.personId = JSON.parse(localStorage.getItem('currentUser')).id
      console.log("valid");
      console.log(this.taskForm.value);
      this.TasksService.createTasks(this.taskForm.value);
    }
  }

 
  selectUser(event, item) {
    this.assignTo.push(item.id);
    console.log(this.assignTo)
  }

  deleteTask(event,item) {
    this.TasksService.deleteTasks(item);
  }
  
  editTask(event,item) {
    this.editState = true;
    this.itemtoEdit =  item;
    this.TasksService.editTasks(item);
    this.deleteTask(event,item);
  }


  ngOnInit(): void {
    this.taskForm = this.f.group({
      name: ['',[Validators.required]],
      description: '',
      totalTime: '',
      personId: '',
      startDate: '',
      endDate: '', 
      status:'',
      assignTo:'',
      attachment:'',
      projectId:'',
    });

   
    // !!!!!!!!!!!!!!--------------- Get Users from firebase ---------------!!!!!!!!!!!!!!!!!

    this.usersService.getUser().subscribe(items=>{
      items.map((data: any)=>{
        this.assign.push(data);
      })
      console.log(this.assign) 
    })  

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.email),
      map(email => email ? this._filter(email) : this.assign.slice())
    );

  }
  displayFn(user: users): string {
    return user && user.email ? user.email : '';
  }

  private _filter(email: string): users[] {
    const filterValue = email.toLowerCase();

    return this.assign.filter(option => option.email.toLowerCase().indexOf(filterValue) === 0);
  }


  // !!!!!!!!!!!!!!--------------- Select Id of UserInvited ---------------!!!!!!!!!!!!!!!!!


  // !!!!!!!!!!!!!!--------------- Attachment image or text to string---------------!!!!!!!!!!!!!!!!!

  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    console.log(this.fileData);
    this.preview();
  }
  preview() {
    let mimeType = this.fileData.type;
    if (mimeType.match(/image||text\/*/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = event => {
      this.fileSrc = reader.result;
      this.file = reader.result;
      this.projectForm.value.attachment = this.file;
      // console.log(this.projectForm.value.attachment) ;
    };
  }

  

}
