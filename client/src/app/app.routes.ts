import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";
import {CreateMessageComponent} from "./messages/create-message/create-message.component";

const routeConfig: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'messages',
  component: MessageListComponent
}, {
  path: 'messages/create',
  component: CreateMessageComponent
}];

export default routeConfig;
