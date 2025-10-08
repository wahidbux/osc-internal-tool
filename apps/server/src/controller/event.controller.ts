import prisma from "@osc/prisma";
import type { Request, Response } from "express";
import type { Event } from "../utils/types";
/**
 * The event controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */

class eventController {
  async createEvent(req: Request, res: Response) {
    try {
      const { data }: { data: Event } = req.body;
      const dbEvent = await prisma.event.findFirst({
        where: { name: data.name, eventStartDate: data.eventStartDate },
      });

      if (dbEvent) throw new Error("Event Already Exists");

      const createdEvent = await prisma.event.create({
        data: {
          ...data,
        },
      });
      if (!createdEvent) throw new Error("Couldn't Create Event");
      return res.json({
        data: createdEvent,
        message: "Event created successfully",
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: null,
        message: (error as Error).message,
        error: error,
      });
    }
  }
  async removeEvent(req: Request, res: Response) {
    const { id }: { id: string } = req.body;
    const existingEvent = await prisma.event.findUnique({
      where: { id: id },
    });
    if (!existingEvent) throw new Error("No Such Event Exists");
    const deletedEvent = await prisma.event.delete({
      where: { id: id },
    });
    if (!deletedEvent) throw new Error("Couldn't Delete Event");
    return res.json({
      data: deletedEvent,
      message: "Event Deleted Successfully",
      error: null,
    });
  }
  async updateEvent(req: Request, res: Response) {
    try {
      const { id }: { id: string } = req.body;
      const existingEvent = await prisma.event.findUnique({
        where: { id: id },
      });
      if (!existingEvent) throw new Error("No Such Event Exists");
      const updatedEvent = await prisma.event.update({
        where: { id: id },
        data: { ...req.body.data },
      });
      if (!updatedEvent) throw new Error("Couldn't Update Event");
      return res.json({
        data: updatedEvent,
        message: "Event Updated Successfully",
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      return res.json({
        data: null,
        message: error.message,
        error: error,
      });
    }
  }
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({});
      if (Array.isArray(events)) {
        res.json({
          data: events,
          message: "Events found Successfully",
          error: null,
        });
      }
      if (Array.isArray(events) && events.length === 0) {
        return res.json({
          data: [],
          message: "No Events found",
          error: null,
        });
      }
    } catch (error: any) {
      return res.json({
        data: null,
        message: error.message,
        error: error,
      });
    }
  }
  async getEventsById(req: Request, res: Response) {
    try {
      const { id }: { id: string } = req.body;
      const checkId = await prisma.event.findUnique({
        where: { id: id },
      });
      if (!checkId) {
        throw new Error("Event doesn't exist");
      }
     return res.json({
      data:checkId,
      message:"Event found Successfully",
      error:null
     })
    } catch (error:any) {
      return res.json({
        data: null,
        message: error.message,
        error: error,
      });
    }
    
  }
}
export default new eventController();
