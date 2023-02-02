import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot ({
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: '"No Reply" marieamelie.1966@gmail.com',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    })
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
