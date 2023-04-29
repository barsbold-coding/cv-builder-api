import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'

@Injectable()
export class GptService {
    configuration: Configuration;
    openai: OpenAIApi;

    constructor() {
        dotenv.config();
        this.configuration = new Configuration({
            apiKey: process.env.GPT_KEY as string
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    getMbtiInfo(mbti: string): string {
        const result: any = this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: mbti
            }]
        }).catch(err => {
            //TO-DO error handler
        });

        return result.data.choices[0].message;
    }

}
