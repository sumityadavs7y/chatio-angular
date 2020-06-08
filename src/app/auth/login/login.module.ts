import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        NotifierModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent }
        ])
    ]
})
export class LoginModule {

}