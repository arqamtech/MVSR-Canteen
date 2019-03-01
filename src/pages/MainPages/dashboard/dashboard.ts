import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { CreateMenuPage } from '../../Dashboard/create-menu/create-menu';
import { EdiMenuPage } from '../../Dashboard/edi-menu/edi-menu';
import moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  ll: string = null;
  users: number = 0;

  isMenu: boolean;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
    this.checkMenu();
    this.getUsers();
  }

  checkMenu() {
    this.db.object(`Menus/${moment().format("DDMMYY")}`).snapshotChanges().subscribe(snap => {
      if (snap.payload.exists()) {
        this.isMenu = true;
      } else {
        this.isMenu = false;
      }
    })
  }
  createMenu() { this.navCtrl.push(CreateMenuPage) };
  editMenu() { this.navCtrl.push(EdiMenuPage) };
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

  gtUsers() { this.navCtrl.push(UsersPage); }
}
