Now, we will be updating the accessToken with a new token everytime , as it expires every 15m ; so a logged in authenticated user if he doesn't have this accessToken they can't send any request to create a product , buy something or do payments , etc. ; though they won't be logged out as we have refreshToken still there , but other things that need accessToken won't be now serviceable by them.
##
So, we should be able to re-create the accessToken once it expires.
##
- Access and refresh tokens are used together for security and usability.

- Refresh token is long-lived (7 days) and access token is short-lived (15 minutes).

- Using only refresh token for all requests is risky because if stolen, attacker can act like the user for the full 7-day period.

- Access token is short-lived, so even if stolen, it becomes useless quickly.

- Access token is sent in the Authorization header (Bearer token) on every request.

- Access token is required for protected APIs such as creating a product, buying something, making payments, and updating profile.

- If access token expires, the user cannot perform these actions until a new access token is issued.

- Refresh token is stored securely, usually in HttpOnly cookies.

- Refresh token is used only to obtain new access tokens when the old one expires.

- If refresh token is stolen, it can be revoked by deleting it from Redis.

- Refresh token maintains session continuity, keeping the user logged in without re-entering credentials.

- System flow: user logs in → server issues access token (15 min) and refresh token (7 days).

- User makes requests using access token in headers.

- When access token expires, client calls /refresh endpoint with refresh token.

- Server verifies refresh token: if valid → issues new access token, if revoked/expired → user must log in again.
##
See the next steps in auth.route.js file now there.