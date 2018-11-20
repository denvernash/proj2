import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';

import { Camera, CameraOptions } from '@ionic-native/camera';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public entries: Entry[] = [];

  private image = PLACEHOLDER_IMAGE;

  
  constructor(public navCtrl: NavController,
    public entryDataService: EntryDataServiceProvider, private camera: Camera) {

      this.entryDataService.getObservable().subscribe(update => {
        this.entries = entryDataService.getEntries();


        for (let e of this.entries) {
          if (typeof e.timestamp === 'string') {
          
            e.timestamp = new Date(e.timestamp);
          }
        }

      this.entries.sort((a: Entry, b: Entry) => {
        return a.timestamp.getTime() - b.timestamp.getTime()
      }).reverse();
      console.log(this.entries);
    });

    
      }

  
  private addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }


private editEntry(entryID: number) {
  console.log("editing entry ", entryID);
  this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
}

private deleteEntry(entryID: number) {
  this.entryDataService.removeEntry(entryID)
  console.log('deleting entry', entryID)
}


}

