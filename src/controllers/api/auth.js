import { Router } from 'express';
import { getTokens } from '../../services/googleOAuth';

const router = Router();

/**
 * GET /api/auth/oauthcallback
 */
router.get('/oauthcallback', async (req, res, next) => {
  const code = req.param('code');

  getTokens(code)
    .then(tokens => {
      req.session.isLoggedIn = true;
      req.session.accessToken = tokens.access_token;
      req.session.loggedInDate = new Date();
      res.redirect(req.session.beforeOAuthUrl);
    })
    .catch(err => {
      next(err);
    });
});

export default router;
