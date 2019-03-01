import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  Users: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();


    this.db.list(`User Data/Users`).snapshotChanges().subscribe(snap => {
      this.Users = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        this.Users.push(temp);
      })
      loading.dismiss();
    })
  }



  delConfirmUser(u) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete User ?',
      message: 'This data cannot be recovered again.',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delUser(u);
          }
        }
      ]
    });
    confirm.present();
  }
  delUser(u) {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.database().ref("Users").child(u.key).remove().then(() => {
      loading.dismiss();
      this.presentToast(u.Name + " " + "deleted");
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
