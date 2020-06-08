import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contactSubscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.fetchContacts().subscribe(contacts => {
      this.contacts = contacts;
      console.log('IN subscribe');
      console.log(contacts);
    });
    console.log('ON INIT');
    console.log(this.contacts);
  }

  ngOnDestroy() {

  }

}
