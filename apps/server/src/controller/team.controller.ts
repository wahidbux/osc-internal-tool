import prisma from "@osc/prisma";
import type { Request, Response } from "express";
import type { Team } from "../utils/types";
/**
 * The team controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */

class teamController {
  async createTeam(req: Request, res: Response) {
    try {
      const { data }: { data: Team } = req.body;
      if (!data) throw new Error("error in team data");
      /**
       * TODO: Check for admin authentication here
       */
      const dbTeam = await prisma.team.findFirst({
        where: {
          name: data.name,
        },
      });

      if (dbTeam) throw new Error("a team by this name exists");

      const createdTeam = await prisma.team.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      if (!createdTeam) throw new Error("Couldn't store inside the database");

      res.status(200).json({
        team: createdTeam,
      });
    } catch (error: any) {
      console.log(error);
      return res.json({
        message: error.message || "something went wrong",
        error: true,
        data: null,
      });
    }
  }
  async removeTeam(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) throw new Error("teamname required");

      /**
       * TODO: Add admin user check here
       */
      const dbTeam = await prisma.team.findFirst({
        where: {
          name: name,
        },
      });

      if (!dbTeam) throw new Error("no such team found");

      const deletedTeam = await prisma.team.deleteMany({
        where: {
          name,
        },
      });

      if (!deletedTeam) throw new Error("failed to remove team");

      return res.status(200).json({
        data: deletedTeam,
        message: "team removed successfully",
        error: false,
      });
    } catch (error: any) {
      console.log(error);
      return res.json({
        data: null,
        message: error.message || "something went wrong",
        error: true,
      });
    }
  }
  async updateTeam(req: Request, res: Response) {
    /**
     * implement update team and add admin check
     */
  }
  async getAllTeams(req: Request, res: Response) {
    try {
      const dbTeams = await prisma.team.findMany({});
      if (dbTeams.length == 0)
        return res.status(200).json({
          data: [],
          message: "no team found",
          error: false,
        });

      return res.status(200).json({
        data: dbTeams,
        message: "teams fetched successfully",
        error: false,
      });
    } catch (error: any) {
      console.log(error);
      return res.json({
        data: null,
        message: error.message || "something went wrong",
        error: true,
      });
    }
  }
}
export default new teamController();
