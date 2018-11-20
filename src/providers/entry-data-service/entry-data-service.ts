import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from '../../models/fire';
import firebase from 'firebase';


/*
  Generated class for the EntryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class EntryDataServiceProvider {


  private db: any;
  private nextID: number = 0;
  private entries:Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;

  constructor(private storage: Storage) { 

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    this.storage.get('myDiaryEntries').then(data => {
      if (data != undefined && data != null) {
        this.entries = JSON.parse(data);
        this.notifySubscribers();
     
      }

    }, err =>{
      console.log(err)
    });
    this.storage.get('nextID').then(data => {
      if(data != undefined && data != null) {
        this.nextID = data;
      }
    }, err =>{
      console.log(err)

    });

    

  }

  private getUniqueID(): number {
    let uniqueID = this.nextID++;
    this.storage.set('nextID', this.nextID);
    return uniqueID;
  }


public addEntry(entry:Entry) {
  entry.id = this.getUniqueID();
  entry.timestamp = new Date();
  this.entries.push(entry);
  this.notifySubscribers();
  this.saveData();
  // console.log('added an entry, the list is now: ', entry.timestamp)
}

  
 public getEntries():Entry[] {  
  let entriesClone = JSON.parse(JSON.stringify(this.entries));
  return entriesClone;
}

public getObservable(): Observable<Entry[]> {
  return this.clientObservable;
}


private notifySubscribers(): void {
  this.serviceObserver.next(undefined);
}

private saveData(): void {
  let key = 'myDiaryEntries';
  this.storage.set(key, JSON.stringify(this.entries));
}



public getEntryByID(id: number): Entry {
  for (let e of this.entries) {
    if (e.id === id) {
      let clone = JSON.parse(JSON.stringify(e));
      return clone;
    }
  }
  return undefined;
}

public updateEntry(id: number, newEntry: Entry): void {
  let entryToUpdate: Entry = this.findEntryByID(id);
  entryToUpdate.title = newEntry.title;
  entryToUpdate.text = newEntry.text;
  entryToUpdate.timestamp = new Date();
  this.notifySubscribers();
  this.saveData();
}

private findEntryByID(id: number): Entry {
  for (let e of this.entries) {
    if (e.id === id) {
      return e;
    }
  }
  return undefined;
}

public removeEntry(id: number): void {
  for (let i=0; i < this.entries.length; i++) {
    let iID = this.entries[i].id;
    if (iID === id) {
      this.entries.splice(i, 1);
      break;
    }
  }
  this.notifySubscribers();
  this.saveData();
}




}

