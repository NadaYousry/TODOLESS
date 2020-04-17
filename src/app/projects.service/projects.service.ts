import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { projects } from '../modals/projects';
import { map } from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectsCollection: AngularFirestoreCollection<projects>;
  projects: Observable<projects[]>;

  //to delete declare 
  projectsDoc: AngularFirestoreDocument<projects>;

  //to edit declare
  private idTranssform =new BehaviorSubject("");
  currentId = this.idTranssform.asObservable();

  constructor(public firestore: AngularFirestore) {
    this.projectsCollection = this.firestore.collection('projects');
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as projects;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  //create-projects
  createProject(item: projects) {
    return this.firestore.collection('projects').add(item);
  }


  //get-projects
  getProject() {
    return this.firestore.collection('projects').valueChanges({idField:'id'});
  }

  //delete-projects
  deleteProject(item:projects) {
    this.projectsDoc = this.firestore.doc(`projects/${item.id}`);
    this.projectsDoc.delete();
  }

  //edit-projects
  editProject(item:any){
    this.idTranssform.next(item);
    // console.log(item)
  }

  //update-Projcts
  updateProject(item:projects){
    this.projectsDoc = this.firestore.doc(`projects/${item.id}`);
    this.projectsDoc.update(item);
    // console.log(item)
  }
}


