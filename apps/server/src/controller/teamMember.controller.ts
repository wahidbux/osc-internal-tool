import prisma from "@osc/prisma";
import type { Request, Response } from "express";
import type { Role } from "../utils/types";

/**
 * The teamMember controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */
export const ALLOWED_ROLES: Role[] = ["LEAD", "ADMIN", "SUBHEAD"];

class teamMemberController {
  private async authorization(
    req: Request,
    res: Response,
    allowedRoles: Role[],
    action: () => Promise<Response>,
  ): Promise<Response> {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: missing user ID" });
      }

      // Fetch the user details from DB
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!allowedRoles.includes(user.role as Role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      // Execute the actual controller logic
      return await action();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createTeamMember(req: Request, res: Response) {
    return this.authorization(req, res, ALLOWED_ROLES, async () => {
      const { userId, teamId } = req.body;

      const member = await prisma.teamMember.create({
        data: { userId, teamId },
        include: { user: true, team: true },
      });

      return res.status(201).json(member);
    });
  }

  async removeTeamMember(req: Request, res: Response) {
    return this.authorization(req, res, ALLOWED_ROLES, async () => {
      const { memberId } = req.params;

      await prisma.teamMember.delete({
        where: { id: memberId },
      });

      return res
        .status(200)
        .json({ message: "Team member removed successfully" });
    });
  }

  async updateTeamMember(req: Request, res: Response) {
    return this.authorization(req, res, ALLOWED_ROLES, async () => {
      const { memberId } = req.params;
      const { userId, teamId } = req.body;

      const updatedMember = await prisma.teamMember.update({
        where: { id: memberId },
        data: {
          ...(userId && { userId }),
          ...(teamId && { teamId }),
        },
        include: { user: true, team: true },
      });

      return res.status(200).json(updatedMember);
    });
  }

  async getTeamMembersByTeam(req: Request, res: Response) {
    try {
      const { teamId } = req.params;

      const members = await prisma.teamMember.findMany({
        where: { teamId },
        include: { user: true, team: true },
      });

      return res.status(200).json(members);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new teamMemberController();
