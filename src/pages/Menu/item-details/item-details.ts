import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemViewPage } from '../item-view/item-view';
import { EditItemPage } from '../edit-item/edit-item';


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  item = this.navParams.get("item");


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }
  editItem(){this.navCtrl.push(EditItemPage,{item : this.item})}
}
