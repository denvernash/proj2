import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public entries: Entry[] = [];
  
  
  constructor(public navCtrl: NavController,
    public entryDataService: EntryDataServiceProvider) {

      this.entryDataService.getObservable().subscribe(update => {
        this.entries = entryDataService.getEntries();

        });

        this.entries = entryDataService.getEntries();
      }


  
// public ionViewWillEnter() {
//   this.entries = this.entryDataService.getEntries();
// }

  
  private addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }



}
