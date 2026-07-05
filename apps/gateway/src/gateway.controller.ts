import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  USER_PATTERNS,
  MATCH_PATTERNS,
  MESSAGE_PATTERNS,
} from '@app/common/patterns';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USUARIOS_SERVICE')
    private readonly usuariosClient: ClientProxy,

    @Inject('MATCHES_SERVICE')
    private readonly matchesClient: ClientProxy,

    @Inject('MENSAJERIA_SERVICE')
    private readonly mensajeriaClient: ClientProxy,
  ) { }

  // USUARIOS / AUTH

  @Post('auth/login')
  login(@Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.LOGIN, body),
    );
  }

  @Post('users')
  createUser(@Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.REGISTER, body),
    );
  }

  @Get('users')
  findAllUsers() {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.FIND_ALL, {}),
    );
  }

  @Get('users/:id')
  findUser(@Param('id') id: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.FIND_ONE, Number(id)),
    );
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.UPDATE, {
        id: Number(id),
        body,
      }),
    );
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.DELETE, Number(id)),
    );
  }

  @Put('users/:id')
  replaceUser(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.REPLACE, {
        id: Number(id),
        body,
      }),
    );
  }

  // PHOTOS
  @Post('photos')
  createPhoto(@Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.CREATE_PHOTO, body),
    );
  }

  @Get('photos/user/:userId')
  findPhotosByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.FIND_PHOTOS_BY_USER, Number(userId)),
    );
  }

  @Put('photos/:id')
  replacePhoto(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.REPLACE_PHOTO, {
        id: Number(id),
        body,
      }),
    );
  }

  @Delete('photos/:id')
  deletePhoto(@Param('id') id: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.DELETE_PHOTO, Number(id)),
    );
  }

  // MATCHES / INTERACTIONS

  @Post('interactions')
  createInteraction(@Body() body: any) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.CREATE_INTERACTION, body),
    );
  }

  @Get('interactions/user/:userId')
  findInteractionsByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.matchesClient.send(
        MATCH_PATTERNS.FIND_INTERACTIONS_BY_USER,
        Number(userId),
      ),
    );
  }

  @Get('matches/user/:userId')
  findMatchesByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.matchesClient.send(
        MATCH_PATTERNS.FIND_MATCHES_BY_USER,
        Number(userId),
      ),
    );
  }

  @Get('matches/:id')
  findMatchById(@Param('id') id: string) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.FIND_MATCH_BY_ID, Number(id)),
    );
  }

  @Put('interactions/:id')
  replaceInteraction(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.REPLACE_INTERACTION, {
        id: Number(id),
        body,
      }),
    );
  }

  @Put('matches/:id')
  replaceMatch(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.REPLACE_MATCH, {
        id: Number(id),
        body,
      }),
    );
  }

  // MENSAJERÍA

  @Post('chats')
  createChat(@Body() body: any) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.CREATE_CHAT, body),
    );
  }

  @Get('chats/:id')
  findChatById(@Param('id') id: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(
        MESSAGE_PATTERNS.FIND_CHAT_BY_ID,
        Number(id),
      ),
    );
  }

  @Post('messages')
  sendMessage(@Body() body: any) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.SEND_MESSAGE, body),
    );
  }

  @Get('messages/chat/:chatId')
  getMessagesByChat(@Param('chatId') chatId: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(
        MESSAGE_PATTERNS.GET_MESSAGES_BY_CHAT,
        Number(chatId),
      ),
    );
  }

  @Put('chats/:id')
  replaceChat(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.REPLACE_CHAT, {
        id: Number(id),
        body,
      }),
    );
  }

  @Put('messages/:id')
  replaceMessage(@Param('id') id: string, @Body() body: any) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.REPLACE_MESSAGE, {
        id: Number(id),
        body,
      }),
    );
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.DELETE_MESSAGE, Number(id)),
    );
  }
}