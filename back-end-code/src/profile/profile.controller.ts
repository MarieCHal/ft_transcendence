import { Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/public';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor (private readonly profileService: ProfileService) {}

    /*@Public()
    @Post('modify/nickname')
    modifyNickanme(nickname: string) {
       return this.profileService.changeNickname(nickname, 1);
    }

    // function to upload an avatar ( after login and before main page)
    @Public() //remove
    @Post('uplaoad/avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
        console.log(avatar) //remove
        return this.profileService.uploadAvatar(avatar.buffer, 'coucou');
    }*/
    
}
