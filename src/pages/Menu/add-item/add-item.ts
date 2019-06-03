import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {



  name: string;
  price: number;
  des: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
  }

  checkData() {
    if (this.name) {
      if (this.price) {
        this.addItem();
      } else { this.presentToast("Enter Item's Price !!"); }
    } else { this.presentToast("Enter Item Name !!"); }
  }

  addItem() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Item...'
    });

    loading.present();

    firebase.database().ref("MenuItems").push({
      Name: this.name,
      Price: this.price,
      Description: this.des,
      TimeStamp: moment().format()
    }).catch((err) => {
      this.presentToast(err.message); 0
      this.navCtrl.pop();
      loading.dismiss();
    }).then(() => {
      this.navCtrl.pop();
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
