import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { NotifierModule } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        NotifierModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: RegisterComponent }
        ])
    ]
})
export class RegisterModule {

}