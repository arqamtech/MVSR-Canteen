import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  item = this.navParams.get("item");


  name: string;
  price: number;
  des: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.name = this.item.Name;
    this.price = this.item.Price;
    this.des = this.item.Description;
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
      content: 'Updating Item...'
    });

    loading.present();

    firebase.database().ref("Items").push({
      Name: this.name,
      Price: this.price,
      Description: this.des,
      CategoryKey: this.item.CategoryKey,
      CategoryName: this.item.CategoryName,
      TimeStamp: moment().format()
    }).then(() => {
      this.navCtrl.pop();
      this.presentToast("Item Updated");
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
