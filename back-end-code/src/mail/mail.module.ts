import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';
import { config } from 'process';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { mailerConfigAsync } from 'src/config/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync(mailerConfigAsync),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
