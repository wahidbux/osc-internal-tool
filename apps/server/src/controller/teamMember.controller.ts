import prisma from "@osc/prisma";
import type { Request, Response } from "express";
/**
 * The teamMember controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */

class teamMemberController {
  async createTeamMember(req: Request, res: Response) {}
  async removeTeamMember(req: Request, res: Response) {}
  async updateTeamMember(req: Request, res: Response) {}
  async getTeamMembersByTeam(req: Request, res: Response) {}
}
export default new teamMemberController();
