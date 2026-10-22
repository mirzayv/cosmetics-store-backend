import { Response, Request } from "express";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import MessageService from "../models/Message.service";
import { MessageInput } from "../libs/types/message";
import { HttpCode } from "../libs/Errors";

const messageService = new MessageService();

const messageController: T = {};

messageController.createMessage = async (req: Request, res: Response) => {
  try {
    console.log("createMessage");
    const input: MessageInput = req.body;

    const result = await messageService.createMessage(input);

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createMessage:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default messageController;
