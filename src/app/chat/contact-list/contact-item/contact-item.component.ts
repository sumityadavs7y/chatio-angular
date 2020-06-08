import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input('contact') contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
