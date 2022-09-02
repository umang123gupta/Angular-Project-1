import { CoreModule } from './core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list-reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer}),

  ],
  providers: [  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
