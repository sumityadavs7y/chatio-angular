import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService, ResData } from '../chat.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact-chat',
  templateUrl: './contact-chat.component.html',
  styleUrls: ['./contact-chat.component.css'],
  providers: [ChatService]
})
export class ContactChatComponent implements OnInit, OnDestroy {
  messageSub: Subscription;
  contactInfo: ResData = {
    name: '',
    email: '',
    messages: []
  };
  @ViewChild('messageEl') messageEl: ElementRef;

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const contactId = params['id'];
      this.chatService.fetchMessages(contactId).pipe(take(1)).subscribe(resData => {
        this.contactInfo = resData;
      });
    });
    this.messageSub = this.chatService.contactInfoChanged.subscribe(info => {
      this.contactInfo = info;
    });
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  sendMessage() {
    const message: String = this.messageEl.nativeElement.value.trim();
    if (message.length < 1) {
      console.log('not sent');
      return;
    }
    console.log('sent: <' + message + '>');
    this.chatService.sendMessage(message).pipe(take(1)).subscribe(resdata => {
      console.log('sent successful');
      this.messageEl.nativeElement.value = '';
    });
  }
}
