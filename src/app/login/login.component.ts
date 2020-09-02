import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import * as JSEncryptModule from 'jsencrypt';
import { H_Http } from '@core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  form: FormGroup;

  type = 0;
  count = 0;

  publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnVVB8ECm9XgSAgQ10Gn2dyhFCVissWi2guj62999e/gOaUVjYxKmyEtZoZOKGhRIxgzvh3gD8OGm+cpjp8oTGlvIj2q788miw8GMKcgVa4bmF4eIkSksDI7SyHvr6maVt5Cdnpe/S7fqi9XoDf4hJXshQ7TXrO1EQ8F2/9MAeRiS5+AYNtnyxSLoXtkTGYKWqCYyuqqPPCn5LrXKATrbzZhigrrzptUdGvaRpTmEnQc7hyrGKDAfRwqOG/FIx9BlKiG61pBxqfBmwcoZVm3pJYdulLZ9Nq95Q8J/SGuJ1uFMwQdSq1BcbCUDV5v4wZOeIORwJj98J+FiHvizEA1DrwIDAQAB';

  loginLoading = false;
  constructor(
    private fb: FormBuilder,
    public msg: NzMessageService,
    private http: H_Http,
    private router: Router) {

    this.form = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, Validators.required],
      remember: [true],
    });

  }

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get remember() {
    return this.form.controls.remember;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }



  // endregion

  submit() {

    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }


    const jsencrypt = new JSEncryptModule.JSEncrypt();

    jsencrypt.setPublicKey(this.publicKey);
    let  pwd = jsencrypt.encrypt(this.password.value);

    pwd = btoa(atob(pwd).padStart(256, '\0')); //https://stackoverflow.com/questions/60727404/rsa-decryption-exception-the-length-of-the-data-to-decrypt-is-not-valid-for-the
    this.loginLoading = true;
    this.http.post('Login', {
      LoginName: this.userName.value,
      Password: pwd,
      IsRememberLogin: this.remember.value
    }).subscribe(d => {
      this.loginLoading = false;
      if (!d) return;
      localStorage.setItem(environment.token_key, d.Jwt);
      // localStorage.removeItem(environment.user_key);
      localStorage.setItem(environment.user_key, JSON.stringify(d));

      // Core.authNums = d.AuthNums;
      // location.reload();
      location.href = location.href.split('/')[0] + '/main/dashboard';
      // this.router.navigateByUrl('main/dashboard');
      // location.reload();
    }, e => {
      this.loginLoading = false;
    }
      // () => {  //顺利完成后调用 
      //   console.log('complete');
      // }
    );
  }
}
