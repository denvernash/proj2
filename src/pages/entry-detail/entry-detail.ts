import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  private entry: Entry;
  private createDate: Date;
  private image = PLACEHOLDER_IMAGE;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public entryDataService: EntryDataServiceProvider, private camera: Camera) {

    let entryID = this.navParams.get("entryID");
    let entry = this.entryDataService.getEntryByID(entryID);

  if (entryID === undefined) {
    this.entry = new Entry();
    this.entry.title = "";
    this.entry.text = "";
    this.entry.id = -1; // placeholder for 'temporary' entry
    this.entry.image = PLACEHOLDER_IMAGE;
  } else {
  this.entry = this.entryDataService.getEntryByID(entryID);
  if (typeof this.entry.timestamp === 'string') {
    this.createDate = new Date(this.entry.timestamp);
  } else { this.createDate = this.entry.timestamp }
  
}
    console.log("retrieved entry:", entry);

  }

private saveEntry() {
  if (this.entry.id === -1) { 
    this.entryDataService.addEntry(this.entry);
  } else {
    this.entryDataService.updateEntry(this.entry.id, this.entry);
  }
  this.navCtrl.pop();
}

public cancelEntry() {
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  private takePic() {
    let img = this.entry.image;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.entry.image = 'data:image/jpeg;base64,' + imageData;        
      } else {
        this.entry.image = img;
      }
     }, (err) => {
        this.entry.image = img;
     });
    this.entry.image = SPINNER_IMAGE;
  }

}
