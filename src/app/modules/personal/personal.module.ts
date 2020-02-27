import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { PersonalRouteModule } from './personal.route';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BaseInfoComponent } from './base-info/base-info.component';
import { SafeInfoComponent } from './safe-info/safe-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PersonalComponent, BaseInfoComponent, SafeInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PersonalRouteModule
  ]
})
export class PersonalModule { }
