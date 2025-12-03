import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthGuard } from "./auth.guard";
import type { RequestWithUser } from "./types/request-with-user.type";
import express from "express";
import { randomBytes } from "crypto";
import { HashService } from "src/common/hash/hash.service";
import type { RequestWithCookies } from "src/common/types/express";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private hashService: HashService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const signInObject = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    // Best flow is probably to have the access token to live in memory and send it with
    // each request in authorization header, and then have refresh token in a cookie
    // that is used for verification when the app is opened and when the access token
    // is expired
    const refreshToken = randomBytes(64).toString("hex");
    const hashed = this.hashService.hashValue(refreshToken);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true, data: signInObject };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestWithUser) {
    console.log(req);
    return req.user;
  }

  @Get("refresh")
  renewRefreshToken(@Request() req: RequestWithCookies) {
    if (!req.cookies.refresh_token) return null;

    console.log("Method:", req.method);
    console.log("Headers:", req.headers.cookie);
    console.log("Parsed cookies:", req.cookies);
    return { token: req.cookies.refresh_token || "test" };
  }
}
