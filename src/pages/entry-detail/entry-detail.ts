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

  private entryTitle: string;
  private entryText: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public entryDataService: EntryDataServiceProvider) {
  }


// private saveEntry() {
//   let newEntry = new Entry();
//   newEntry.title = this.entryTitle;
//   newEntry.text = this.entryText; 
// }

public saveEntry() {
 
  let newEntry = new Entry();
  newEntry.title = this.entryTitle;
  newEntry.text = this.entryText;
 this.entryDataService.addEntry(newEntry);
 this.navCtrl.pop();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

}
