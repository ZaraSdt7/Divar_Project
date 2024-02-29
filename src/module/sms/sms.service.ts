import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/constants/response-messages.constant';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // send otp sms
  async sendOtp(mobile: string, code: string) {
    const apiKey = this.configService.get('IPPANEL_API_KEY');
    const baseUrl = this.configService.get('IPPANEL_BASE_URL');
    const pattern_code = this.configService.get(
      'IPPANEL_SEND_OTP_CODE_PATTERN',
    );
    const senderNumber = this.configService.get('SENDER_NUMBER');

    const data = {
      pattern_code,
      originator: senderNumber,
      recipient: mobile,
      values: {
        'verification-code': code,
      },
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `AccessKey ${apiKey}`,
      },
    };

    const result = await firstValueFrom(
      this.httpService.post<any>(baseUrl, data, config).pipe(
        catchError((err: AxiosError) => {
          console.log(err);
          throw new InternalServerErrorException(
            ResponseMessages.FAILED_SEND_OTP_SMS,
          );
        }),
      ),
    );
    return result.data;
  }
}
