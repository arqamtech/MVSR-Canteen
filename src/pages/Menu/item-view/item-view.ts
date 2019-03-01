import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemDetailsPage } from '../item-details/item-details';
import { EditCatPage } from '../edit-cat/edit-cat';


@IonicPage()
@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})
export class ItemViewPage {

  cat = this.navParams.get("cat");

  items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    console.log(this.cat);
    this.getItems();
  }


  getItems() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Items...'
    });

    loading.present();

    this.db.list(`CatWiseItems/${this.cat.key}`).snapshotChanges().subscribe(snapCat => {
      this.items = [];
      snapCat.forEach(snap => {
        this.db.object(`Items/${snap.key}`).snapshotChanges().subscribe(siip => {

          let temp: any = siip.payload.val();
          temp.key = siip.key;
          this.items.push(temp);

        })
      })
    })
    loading.dismiss();

  }

  editCat() { this.navCtrl.push(EditCatPage, { cat: this.cat }); }

  addItem() { this.navCtrl.push(AddItemPage, { cat: this.cat }); }
  gtItem(i) { this.navCtrl.push(ItemDetailsPage, { item: i }); }
}
