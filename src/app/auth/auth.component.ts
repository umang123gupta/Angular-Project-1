import { Store } from '@ngrx/store';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Subscription } from 'rxjs';

import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error:string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub:Subscription;
  private storeSub:Subscription;

  constructor(private componentFactoryResolver:ComponentFactoryResolver,
    private store :Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading;
      this.error = authState.authError;
      if (this.error){
        this.showErrorAlert(this.error);
      }

    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //..this is login logic
      // authObs = this.authService.login(email,password);
      this.store.dispatch(
        new AuthActions.LoginStart({email:email,password:password})
        );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({email:email,password:password}) 
        );
    }

    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
  
  private showErrorAlert(message:string){
   // const alertCmp = new AlertComponent();
   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

 const componentRef = hostViewContainerRef.createComponent(alertCmpFactory); 

  componentRef.instance.message=message;
  this.closeSub = componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
  });    
  }

  
}
