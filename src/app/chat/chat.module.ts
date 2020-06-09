import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactChatComponent } from './contact-chat/contact-chat.component';
import { ContactItemComponent } from './contact-list/contact-item/contact-item.component';
import { ChatRoutingModule } from './chat-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifierService, NotifierModule } from 'angular-notifier';

@NgModule({
    declarations: [
        ChatComponent,
        ContactListComponent,
        ContactChatComponent,
        ContactItemComponent
    ],
    imports: [
        NotifierModule,
        CommonModule,
        FormsModule,
        ChatRoutingModule
    ]
})
export class ChatModule {

}