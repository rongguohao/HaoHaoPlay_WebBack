import { Component } from '@angular/core';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router, NavigationError, NavigationCancel, NavigationStart } from '@angular/router';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { environment } from '@env/environment';
// import { Subscription } from 'rxjs';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  // private router$: Subscription;
  // constructor(
  //     private router: Router,
  //     private location: Location,
  //     public msg: NzMessageService) {
  // }
  // ngOnInit() {
  //     this.routerHandle();
  // }
  // ngOnDestroy(): void {
  //     this.router$.unsubscribe();
  // }
  // private routerHandle() {
  //     this.router$ = this.router.events.subscribe(evt => {
  //         if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
  //             // if (evt instanceof NavigationError) {
  //             //     this.msg.error(`${evt.url}地址无效`, { nzDuration: 1000 * 3 });
  //             // }
  //             if (this.getToken()) {
  //                 this.location.back();
  //             } else {
  //                 this.router.navigateByUrl('login');
  //             }
  //             return;
  //         }
  //         if (evt instanceof NavigationStart) {
  //             if (this.getToken()) {
  //                 // console.log(evt.url); '/login';
  //                 if (evt.url === '/' || evt.url === '/login') {
  //                     this.router.navigateByUrl('main/dashboard');
  //                 }
  //             } else {
  //                 if (evt.url !== '/' && evt.url !== '/login') {
  //                     // this.msg.error('请先登录系统');
  //                     this.router.navigateByUrl('login');
  //                 }
  //             }
  //             return;
  //         }
  //     });
  // }
  // private getToken(): string {
  //     return localStorage.getItem(environment.token_key);
  // }
}
