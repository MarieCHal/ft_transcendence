import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}

    async sendUserConfirmation(user: string, email: string, rdmNumber: number) {
        console.log(email)
        await this.mailerService.sendMail({
            to: email,
            subject: 'This is a Test',
            template: './confirmation',
            context: {
                name: user,
                code: rdmNumber
            },
        })
    };
}
