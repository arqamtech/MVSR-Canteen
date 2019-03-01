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

  cat = this.navParams.get("cat");


  name: string;
  price: number;
  des: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.cat);
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

    firebase.database().ref("Items").push({
      Name: this.name,
      Price: this.price,
      Description: this.des,
      CategoryKey : this.cat.key,
      CategoryName : this.cat.Name,
      TimeStamp: moment().format()
    }).then((res) => {
      firebase.database().ref("CatWiseItems").child(this.cat.key).child(res.key).set(true).then(() => {
        this.navCtrl.pop();
        this.presentToast("Item Added");
        loading.dismiss();
      })
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
