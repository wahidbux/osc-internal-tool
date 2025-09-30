import prisma from "@osc/prisma";
import type { Request, Response } from "express";
/**
 * The event controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */

class eventController {
  async createEvent(req: Request, res: Response) {}
  async removeEvent(req: Request, res: Response) {}
  async updateEvent(req: Request, res: Response) {}
  async getAllEvents(req: Request, res: Response) {}
  async getEventsById(req: Request, res: Response) {}
}
export default new eventController();
