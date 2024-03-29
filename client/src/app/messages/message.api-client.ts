import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MessageModel} from "./message.model";

@Injectable({
    providedIn: 'root'
})
export class MessageApiClient {
    //host: string = 'https://pwa-proef.bloemkoolsaus.nl';
    host: string = 'http://localhost:3000';
    readonly VAPID_PUBLIC_KEY = 'BAruQj-_e911eeANHd12pVboOxcFC59AX1QHZp-vzUbAcOWO4GRYtYhhmsvagulIPcKh-6kCy0wk_1eJEHm_QTc';

    constructor(private http: HttpClient) { }

    subscribeToNotifications(sub: PushSubscription) {
        const headers = {"headers": { "Content-Type":"application/json" }};
        const body = { subscription: sub };

        return this.http.post(this.host+'/service-subscribe', body, headers);
    }

    getMessages() {
        return this.http.get<MessageModel[]>(this.host + '/messages');
    }

    postMessage(message: MessageModel) {
        console.log('post message: '+this.host + '/message');
      const headers = {"headers": { "Content-Type":"application/json" }};
        const body = { message: message };

        return this.http.post<MessageModel>(this.host + '/message', body, headers);
    }
}
