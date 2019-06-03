import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemViewPage } from '../../Menu/item-view/item-view';
import { AddItemPage } from '../../Menu/add-item/add-item';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  items: Array<any> = [];
  splItems: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getItems();
    // this.getSplItems();
  }

  // ionViewDidEnter() {
  // }

  getItems() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Food Items...'
    });

    loading.present();

    this.db.list(`MenuItems`).snapshotChanges().subscribe(snapCat => {
      this.items = [];
      snapCat.forEach(snap => {
        let temp: any = snap.payload.val();
        temp.key = snap.key;
        this.items.push(temp);
      })
    })
    loading.dismiss();

  }

  getSplItems() {
    this.db.list(`SpecialMenu`).snapshotChanges().subscribe(snapCat => {
      this.items = [];
      snapCat.forEach(snap => {
        let temp: any = snap.payload.val();
        temp.key = snap.key;
        this.splItems.push(temp);
      })
    })
  }

  delConfirm(i) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Menu Item ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delItem(i);
          }
        }
      ]
    });
    confirm.present();
  }

  delItem(i) {
    this.db.list(`MenuItems/${i.key}`).remove().then(() => {
      this.presentToast("Item Removed")
    })
  }

  viewItem(i) { this.navCtrl.push(ItemViewPage, { cat: i }) }

  addItem() { this.navCtrl.push(AddItemPage) }



  //Special Menu

  addtoSpl(i) {
    delete i.key;
    this.db.list(`SpecialMenu`).push(i);
  }

  rmSplItem(i) {
    this.db.list(`SpecialMenu/${i.key}`).remove();
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
