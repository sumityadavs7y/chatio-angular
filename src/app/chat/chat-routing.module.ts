import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { SelectChatComponent } from './select-chat/select-chat.component';
import { ContactChatComponent } from './contact-chat/contact-chat.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: ChatComponent, canActivate: [AuthGuard], children: [
            { path: '', component: SelectChatComponent },
            { path: ':id', component: ContactChatComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {

}