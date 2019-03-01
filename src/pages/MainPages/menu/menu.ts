import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddCategoriesPage } from '../../Menu/add-categories/add-categories';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemViewPage } from '../../Menu/item-view/item-view';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  cats: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getCats();
  }


  getCats() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Categories...'
    });

    loading.present();

    this.db.list(`Categories`).snapshotChanges().subscribe(snapCat => {
      this.cats = [];
      snapCat.forEach(snap => {
        let temp: any = snap.payload.val();
        temp.key = snap.key;
        this.cats.push(temp);
      })
    })
    loading.dismiss();

  }


  viewItem(c) { this.navCtrl.push(ItemViewPage,{cat : c}) }

  gtCat() { this.navCtrl.push(AddCategoriesPage) }
}
