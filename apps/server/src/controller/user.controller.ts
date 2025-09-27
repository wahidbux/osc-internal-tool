import prisma from "@osc/prisma";
import type { Request, Response } from "express";
/**
 * The user controller class which will be working around and executing the main
 * functionalities realted to user functions that are defined below.
 */

interface jwtInformation {
  id: string;
  email: string;
  rollNumber: string;
}

class userController {
  /**
   * The function checks for existing user and if not add them into our database
   * along with the email sending workflow
   */
  async handleEmailSignup(req: Request, res: Response) {}
  /**
   * The function checks for existing user and returns the JWT if valid
   */
  async handleEmailLogin(req: Request, res: Response) {}
  /**
   * Signup VIA google/github OAuth
   */
  async handleOAuthSignup(req: Request, res: Response) {}
  /**
   * Login VIA google/github OAuth
   */
  async handleOAuthLogin(req: Request, res: Response) {}
  /**
   * Helper function inorder to generate a JWT for the user
   */
  async generateJWT(data: jwtInformation) {}
}
export default new userController();
