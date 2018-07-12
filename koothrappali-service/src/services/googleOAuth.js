import Boom from 'boom';
import { google } from 'googleapis';

import CONST from '../constants';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL } = CONST;

export const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL);

const scopes = ['https://www.googleapis.com/auth/plus.me'];

export function getGoogleRedirectUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
}

export async function getTokens(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);

    return tokens;
  } catch (err) {
    throw Boom.badRequest();
  }
}
