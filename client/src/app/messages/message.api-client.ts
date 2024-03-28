import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MessageModel} from "./message.model";

@Injectable({
    providedIn: 'root'
})
export class MessageApiClient {
    host: string = 'https://pwa-proef.bloemkoolsaus.nl';

    constructor(private http: HttpClient) { }

    getMessages() {
        return this.http.get<MessageModel[]>(this.host + '/messages');
    }

    postMessage(message: MessageModel) {
        console.log('post message: '+this.host + '/message');
        const headers = {"Content-Type":"application/json"};
        const body = { message: message };

        return this.http.post<MessageModel>(this.host + '/message', body, { "headers": headers });
    }
}
