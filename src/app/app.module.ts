import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseCred } from './firebaseCred';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { UsersPage } from '../pages/MainPages/users/users';
import { LoaderPage } from '../pages/Support/loader/loader';
import { ProfilePage } from '../pages/Profile/profile/profile';
import { EditProfilePage } from '../pages/Profile/edit-profile/edit-profile';
import { ChangePassPage } from '../pages/Auth/change-pass/change-pass';
import { MenuPage } from '../pages/MainPages/menu/menu';
import { AddCategoriesPage } from '../pages/Menu/add-categories/add-categories';
import { AddItemPage } from '../pages/Menu/add-item/add-item';
import { ItemViewPage } from '../pages/Menu/item-view/item-view';
import { EditCatPage } from '../pages/Menu/edit-cat/edit-cat';
import { EditItemPage } from '../pages/Menu/edit-item/edit-item';
import { ItemDetailsPage } from '../pages/Menu/item-details/item-details';
import { CreateMenuPage } from '../pages/Dashboard/create-menu/create-menu';
import { EdiMenuPage } from '../pages/Dashboard/edi-menu/edi-menu';
import { ViewMenuPage } from '../pages/MainPages/view-menu/view-menu';


firebase.initializeApp(firebaseCred);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    ChangePassPage,
    MenuPage,
    AddCategoriesPage,
    AddItemPage,
    ItemViewPage,
    EditCatPage,
    EditItemPage,
    ItemDetailsPage,
    CreateMenuPage,
    EdiMenuPage,
    ViewMenuPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    ChangePassPage,
    MenuPage,
    AddCategoriesPage,
    AddItemPage,
    ItemViewPage,
    EditCatPage,
    EditItemPage,
    ItemDetailsPage,
    CreateMenuPage,
    EdiMenuPage,
    ViewMenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
