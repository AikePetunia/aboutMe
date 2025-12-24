import { Router } from "express";
import { fetchJson } from "./core";
import { ok, err } from "./helpers";

const router = Router();
const provider = "spotify" as const;

interface SpotifyPlaylistsRawResponse {}

const token =
  "BQBd5cx6wiLvL16DuvW6z0KwHlnp3R29x4517u9mkxeRNxh7oQSfwZMs04Ub6zIs6bxGmiiD2mFOwqYJYOixcz8dPP5Af6V-0Dln3CgTcbWu-tQa0X2KTCTQ4I_tmieETE4-iAQ1nHUHNSTX2sYgrwp1Ey86V6PlUiDXD6yElYISakbZYadXVXj-cJy-_-qDnBhqtwvSTmG4FYhEQkkcs7FYiLeqcAuFzorXynzLu6uU88dAwMytEfLEMbdip0M97rH_4Yh4it3jvLod_-XyZeOQcvTjdIFQlRcyy1F8soNlingvWvH9Ni3qsDuyuCwSxz1egWd4";
