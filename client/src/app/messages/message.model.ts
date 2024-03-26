export class MessageModel {
    subject: string;
    message: string;
    date: number;

    constructor(subject: string, message: string, date: number) {
        this.subject = subject;
        this.message = message;
        this.date = date;
    }

    getDate() {
      return new Date(this.date);
    }

    showDate() {
        return this.getDate().toLocaleDateString();
    }
}
