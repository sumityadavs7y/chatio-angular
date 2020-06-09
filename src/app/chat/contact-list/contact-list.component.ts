import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService, NgbModal, NotifierService]
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contactSub: Subscription;
  @ViewChild('f', { static: false }) contactForm: NgForm;

  constructor(private contactService: ContactService, private modalService: NgbModal, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.contactService.fetchContacts().pipe(take(1)).subscribe(contacts => {
      this.contacts = contacts;
    });
    this.contactSub = this.contactService.contactsChanged.subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  onSubmit(f) {
    const email = f.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.notifier.notify('error', 'enter valid email');
      return;
    }
    this.contactService.addContact(email).subscribe(res => {
      // console.log(res);
      this.modalService.dismissAll();
    }, err => {
      this.modalService.dismissAll();
      if (!err.error || !err.error.message) {
        this.notifier.notify('error', 'Unknown Error');
        return;
      }
      this.notifier.notify('error', err.error.message);
    })
    // console.log(form.value.email);
  }


}
