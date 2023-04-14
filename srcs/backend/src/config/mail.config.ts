import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerAsyncOptions} from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';

export const mailerConfigAsync: MailerAsyncOptions = {
    imports: [ConfigModule],
    useFactory:  async (configService: ConfigService) => ({
        transport: {
            host: configService.get('EMAIL_HOST'),
            secure: false,
            auth: {
              user: configService.get('EMAIL_USER'),
              pass: configService.get('EMAIL_PASSWORD'),
            },
          },
          defaults: {
            from: '"No Reply" marieamelie.1966@gmail.com',
          },
          template: {
            dir: join(__dirname, '/../mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }
          }
        }),
    inject: [ConfigService]
}