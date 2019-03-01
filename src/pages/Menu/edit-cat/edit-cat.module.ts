import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCatPage } from './edit-cat';

@NgModule({
  declarations: [
    EditCatPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCatPage),
  ],
})
export class EditCatPageModule {}
