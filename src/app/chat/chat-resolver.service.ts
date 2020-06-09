import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat.model';
import { ChatService, ResData } from './chat.service';

@Injectable({ providedIn: 'root' })
export class ChatResolverService implements Resolve<ResData>{
    constructor(private chatService: ChatService) { }
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): ResData | import("rxjs").Observable<ResData> | Promise<ResData> {
        const contactId = route.params['id'];
        return this.chatService.fetchMessages(contactId);
    }
}