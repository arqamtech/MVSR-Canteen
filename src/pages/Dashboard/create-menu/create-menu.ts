import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-create-menu',
  templateUrl: 'create-menu.html',
})
export class CreateMenuPage {

  items: Array<any> = [];

  selArray: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getItems();
  }

  addToArr(a) {
    switch (a.Checked) {
      case true: this.selArray.push(a.key);
        break;
      case false: this.rmFrmArray(a.key);
        break;
    }

  }

  rmFrmArray(key) {
    var ind = this.selArray.indexOf(key);
    this.selArray.splice(ind, 1)
  }


  getItems() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Items...'
    });

    loading.present();

    this.db.list(`Items`).snapshotChanges().subscribe(snapCat => {
      this.items = [];
      snapCat.forEach(snap => {

        let temp: any = snap.payload.val();
        temp.key = snap.key;
        this.items.push(temp);
        console.log(temp);

      })
    })
    loading.dismiss();

  }

  selectAll() {
    this.items.forEach(iie => {
      this.selArray.push(iie.key);
      iie.Checked = true;
    });
    console.log(this.selArray.length);
  }
  unselectAll() {
    this.items.forEach(iie => {
      this.selArray = [];
      iie.Checked = false;
    });
    console.log(this.selArray.length);
  }

  createMenu() {
    let loading = this.loadingCtrl.create({
      content: 'Creating Menu...'
    });

    loading.present();
    firebase.database().ref("Menus").child(moment().format("DDMMYY")).child("Items").set(this.selArray).then(() => {
      this.navCtrl.pop();
      this.presentToast("Category Added");
      loading.dismiss();
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
