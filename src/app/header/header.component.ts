import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated=false;
  private userSub: Subscription;
  fetchData:boolean=true;

  constructor(private store:Store<fromApp.AppState>){}

  ngOnInit() {
    this.userSub=this.store.select('auth')
    .pipe(map(authState=> authState.user))
    .subscribe(user =>{
      this.isAuthenticated= !!user;
    });
  }

  onSaveData(){
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData(){
    this.fetchData=false;
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());

  }
  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
 

 


