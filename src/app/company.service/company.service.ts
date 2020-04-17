import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { company } from '../modals/company';
import { map } from "rxjs/operators";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyCollection: AngularFirestoreCollection<company>;
  company: Observable<company[]>;

  //to delete declare 
  companyDoc: AngularFirestoreDocument<company>;

  //to edit declare
  private idTranssform =new BehaviorSubject("");
  currentId = this.idTranssform.asObservable();

  constructor(public firestore: AngularFirestore) {
    this.companyCollection = this.firestore.collection('company');
    this.company = this.companyCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as company;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  //create-company 
  createCompany(item: company) {
    console.log({...item,role:"Admin"})
    return this.firestore.collection('company').add(item);
  }

  //get-company
  getCompay() {
    return this.firestore.collection('company').valueChanges({idField:'id'});
  }

  //delete-company
  deleteCompany(item:company) {
    this.companyDoc = this.firestore.doc(`company/${item.id}`);
    this.companyDoc.delete();
  }

  //edit-company
  editCompany(item:any){
    this.idTranssform.next(item);
  }

}


