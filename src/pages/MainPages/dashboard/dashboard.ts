import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { CreateMenuPage } from '../../Dashboard/create-menu/create-menu';
import { EdiMenuPage } from '../../Dashboard/edi-menu/edi-menu';
import moment from 'moment';
import { MenuPage } from '../menu/menu';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  users: number = 0;
  menuItems: number = 0;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
    this.getItems();
  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.db.list(`User Data/Users`).snapshotChanges().subscribe(snap => {
      this.users = snap.length;
      loading.dismiss();
    })
  }
  getItems() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.db.list(`MenuItems`).snapshotChanges().subscribe(snap => {
      this.menuItems = snap.length;
      loading.dismiss();
    })
  }


  gtUsers() { this.navCtrl.push(UsersPage); }
  gtMenu() { this.navCtrl.push(MenuPage); }

}
