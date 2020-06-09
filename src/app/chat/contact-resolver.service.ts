import { Resolve } from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactListResolverService implements Resolve<Contact[]>{
    constructor(private contactSevice: ContactService) { }

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Contact[] | import("rxjs").Observable<Contact[]> | Promise<Contact[]> {
        const contacts = this.contactSevice.getContacts();
        if (contacts.length === 0)
            return this.contactSevice.fetchContacts();
        else
            return contacts;
    }
}