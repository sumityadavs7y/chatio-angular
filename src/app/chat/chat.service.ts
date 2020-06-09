import { ChatMessage } from '../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ResData {
    name: String,
    email: String,
    messages: ChatMessage[]
}

@Injectable({ providedIn: 'root' })
export class ChatService {
    contactInfoChanged = new Subject<ResData>();

    private contactInfo: ResData = {
        name: '',
        email: '',
        messages: []
    };

    constructor(private http: HttpClient) { }

    fetchMessages(contactId) {
        console.log(contactId);
        return this.http.get<ResData>(environment.baseApi + 'chat/messages/' + contactId)
            .pipe(map(resData => {
                this.contactInfo = resData;
                this.contactInfoChanged.next(this.contactInfo);
                return resData;
            }));
    }

    getMessages() {
        return this.contactInfo;
    }

    addMessage(message: ChatMessage) {
        this.contactInfo.messages.push(message);
        this.contactInfoChanged.next(this.contactInfo);
    }

    sendMessage(message: String) {
        const contact = this.contactInfo.email;
        return this.http.post(environment.baseApi + 'chat/message',
            {
                message: message,
                contact: contact
            }).pipe(map(resData => {
                const message = new ChatMessage(resData['data']['message'], new Date(resData['data']['createdAt']), true);
                this.addMessage(message);
                return message;
            }));
    }
}