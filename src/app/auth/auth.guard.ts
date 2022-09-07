import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,  Router,UrlTree,  RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map,tap,take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer'

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{
constructor(private authService:AuthService,private router:Router,private store:Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | UrlTree |Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user;
            }),
            map(user =>{
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}