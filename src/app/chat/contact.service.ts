import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ContactService {
    contactsChanged = new Subject<Contact[]>();
    private contacts: Contact[] = [];

    constructor(private http: HttpClient) {
    }

    fetchContacts() {
        return this.http.get<{ contacts: Contact[] }>(environment.baseApi + 'chat/contacts')
            .pipe(
                map(resData => {
                    return resData.contacts;
                }),
                tap(contacts => {
                    this.contacts = contacts;
                    this.contactsChanged.next(this.contacts);
                })
            );
    }

    getContacts() {
        return this.contacts.slice();
    }

    addContact(email: String) {
        return this.http.post<Contact>(environment.baseApi + 'chat/contact',
            {
                email: email
            }).pipe(map(contact => {
                this.contacts.push(contact);
                this.contactsChanged.next(this.contacts);
            }));
    }

}