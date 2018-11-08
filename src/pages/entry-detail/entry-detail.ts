import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';


/**
 * Generated class for the EntryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  private entry: Entry;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider) {



    let entryID = this.navParams.get("entryID");
    let entry = this.entryDataService.getEntryByID(entryID);

  if (entryID === undefined) {
    this.entry = new Entry();
    this.entry.title = "";
    this.entry.text = "";
    this.entry.id = -1; // placeholder for 'temporary' entry
  } else {
  this.entry = this.entryDataService.getEntryByID(entryID);
  }
    console.log("retrieved entry:", entry);

  }


// private saveEntry() {
//   let newEntry = new Entry();
//   newEntry.title = this.entryTitle;
//   newEntry.text = this.entryText; 
// }


private saveEntry() {
  if (this.entry.id === -1) { 
    this.entryDataService.addEntry(this.entry);
  } else {
    this.entryDataService.updateEntry(this.entry.id, this.entry);
  }
  this.navCtrl.pop();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

}
