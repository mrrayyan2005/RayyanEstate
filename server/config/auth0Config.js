import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'https://rayyan-estate-server.vercel.app',  // Use deployed URL or localhost
    issuerBaseURL: 'https://dev-7q83fq2272cfxooq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export default jwtCheck;
