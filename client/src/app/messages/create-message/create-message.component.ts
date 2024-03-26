import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MessageModel} from "../message.model";
import {MessageApiClient} from "../message.api-client";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.scss'
})
export class CreateMessageComponent {
  createMessageForm = new FormGroup({
    subject: new FormControl(),
    content: new FormControl()
  });

  constructor(private client: MessageApiClient, private router: Router) { }

  submitCreateMessageForm() {
    let message = new MessageModel(
        this.createMessageForm.value.subject,
        this.createMessageForm.value.content,
        (new Date()).getTime()
    );
    console.log(message);

    this.client.postMessage(message).subscribe(message => {
      this.router.navigate(['/messages']);
    });
  }
}
