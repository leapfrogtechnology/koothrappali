import { getGoogleRedirectUrl } from '../services/googleOAuth';

export async function authenticate(req, res, next) {
  const loggedInDuration = Math.abs(new Date() - new Date(req.session.loggedInDate)) / 1000;

  if (req.session.isLoggedIn && loggedInDuration < 60 * 60) {
    next();

    return;
  }

  req.session.beforeOAuthUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.redirect(getGoogleRedirectUrl());
}
