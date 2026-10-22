import Errors, { HttpCode, Message as ErrorMessage } from "../libs/Errors";
import { Message, MessageInput } from "../libs/types/message";
import MessageModel from "../schema/Message.model";

class MessageService {
  private readonly messageModel;

  constructor() {
    this.messageModel = MessageModel;
  }

  public async createMessage(input: MessageInput): Promise<Message> {
    try {
      return await this.messageModel.create(input);
    } catch (err) {
      console.log(err);
      throw new Errors(HttpCode.BAD_REQUEST, ErrorMessage.CREATE_FAILED);
    }
  }
}

export default MessageService;
