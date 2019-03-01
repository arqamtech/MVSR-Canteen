import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-edi-menu',
  templateUrl: 'edi-menu.html',
})
export class EdiMenuPage {

  items: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getItems();
  }
  getItems() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Categories...'
    });

    loading.present();

    this.db.list(`Items`).snapshotChanges().subscribe(snapCat => {
      this.items = [];
      snapCat.forEach(snap => {

        let temp: any = snap.payload.val();
        temp.key = snap.key;
        this.items.push(temp);

      })
    })
    loading.dismiss();

  }


}
