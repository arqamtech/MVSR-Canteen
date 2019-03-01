import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdiMenuPage } from './edi-menu';

@NgModule({
  declarations: [
    EdiMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EdiMenuPage),
  ],
})
export class EdiMenuPageModule {}
