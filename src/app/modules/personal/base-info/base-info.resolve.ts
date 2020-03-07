import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { H_Http } from '@core';

@Injectable()
export class UserBaseInfoResolve implements Resolve<any> {

    constructor(private http: H_Http) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.http.get(`User/Current`).toPromise().then(d => {
            return d;
        });
    }
}