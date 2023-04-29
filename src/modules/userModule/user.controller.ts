import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Firestore } from 'firebase/firestore';

@Controller('users')
export class UserController {
  private firestore: Firestore;

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    try {
      const docSnapshot = await this.firestore
        .collection('Detail')
        .doc(email)
        .get();
      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        return userData;
      } else {
        throw { error: 'User not found' };
      }
    } catch (error) {
      console.error('Error : ', error);
      throw { error: 'Failed to retrieve user information' };
    }
  }

  @Post()
  async createUser(@Body() userData: any) {
    const customId = userData.id;
    try {
      await this.firestore.collection('Detail').doc(customId).set(userData);
      console.log('id: ', customId);
      return { msg: 'User information added' };
    } catch (error) {
      console.error('Error adding document: ', error);
      throw { error: 'Failed to add user information' };
    }
  }
}
