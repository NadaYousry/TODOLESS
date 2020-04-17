import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { tasks } from '../modals/tasks';
import { map } from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksCollection: AngularFirestoreCollection<tasks>;
  tasks: Observable<tasks[]>;

  //to delete declare 
  tasksDoc: AngularFirestoreDocument<tasks>;

  //to edit declare
  private idTranssform =new BehaviorSubject("");
  currentId = this.idTranssform.asObservable();

  constructor(public firestore: AngularFirestore) {
    this.tasksCollection = this.firestore.collection('tasks');
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as tasks;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  //create-tasks 
  createTasks(item: tasks) {
    return this.firestore.collection('tasks').add(item);
  }

  //get-tasks
  getTasks() {
    return this.firestore.collection('tasks').valueChanges({idField:'id'});
  }

  //delete-tasks
  deleteTasks(item:tasks) {
    this.tasksDoc = this.firestore.doc(`tasks/${item.id}`);
    this.tasksDoc.delete();
  }

  //edit-tasks
  editTasks(item:any){
    this.idTranssform.next(item);
  }

  //update-Tasks
  updateTasks(item:tasks){
    this.tasksDoc = this.firestore.doc(`tasks/${item.id}`);
    this.tasksDoc.update(item);
    console.log(item)
  }
}