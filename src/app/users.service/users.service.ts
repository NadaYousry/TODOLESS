import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { users } from '../modals/users';
import { map } from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class usersService {
  usersCollection: AngularFirestoreCollection<users>;
  users: Observable<users[]>;

  //to delete declare 
  usersDoc: AngularFirestoreDocument<users>;

  //to edit declare
  private idTranssform =new BehaviorSubject("");
  currentId = this.idTranssform.asObservable();

/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */

  constructor(public firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as users;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  //create-users 
  createUser(item: users) {
    return this.firestore.collection('users').add(item);
  }

  //get-users 
  getUser() {
    return this.firestore.collection('users').valueChanges({idField:'id'});
  }

  //delete-users 
  deleteUser(item:users) {
    this.usersDoc = this.firestore.doc(`users/${item.id}`);
    this.usersDoc.delete();
  }

  //edit-users 
  editUser(item:any){
    this.idTranssform.next(item);  
  }

  //update-users
  updateUser(item:users){
    console.log(item);
    console.log(item.id)
    this.usersDoc = this.firestore.doc(`users/${item.id}`);
    this.usersDoc.update(item);
    console.log(item)
  }

}
