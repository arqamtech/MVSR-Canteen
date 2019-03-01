import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-edit-cat',
  templateUrl: 'edit-cat.html',
})
export class EditCatPage {

  cat = this.navParams.get("cat");
  name: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.name = this.cat.Name;
  }

  checkData() {
    if (this.name) {
      this.addCategory();
    } else {
      this.presentToast("Enter a Category Name !!");
    }
  }

  addCategory() {
    let loading = this.loadingCtrl.create({
      content: 'Updating Category...'
    });

    loading.present();

    firebase.database().ref("Categories").child(this.cat.key).set({
      Name: this.name,
      TimeStamp: moment().format()
    }).then(() => {
      this.navCtrl.pop();
      this.presentToast("Updating Added");
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
