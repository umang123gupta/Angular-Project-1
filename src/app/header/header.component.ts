import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated=false;
  private userSub: Subscription;
  
  
  fetchData:boolean=true;


  constructor(private dataStorageService : DataStorageService,private authService:AuthService){}

  ngOnInit() {
    this.userSub=this.authService.user.subscribe(user =>{
      this.isAuthenticated= !!user;
    });
    
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.fetchData=false;
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
 

 


