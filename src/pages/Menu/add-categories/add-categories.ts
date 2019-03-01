import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-categories',
  templateUrl: 'add-categories.html',
})
export class AddCategoriesPage {

  name: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
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
      content: 'Adding Category...'
    });

    loading.present();

    firebase.database().ref("Categories").push({
      Name: this.name,
      TimeStamp: moment().format()
    }).then(() => {
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
