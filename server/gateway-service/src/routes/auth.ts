import { VerifyEmail } from '../controllers/auth/verify-email';
import { SignIn } from '../controllers/auth/signin';
import { SignUp } from '../controllers/auth/signup';
import express, { Router } from 'express';
import { Password } from '../controllers/auth/password';

class AuthRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/auth/signup', SignUp.prototype.create);
        this.router.post('/auth/signin', SignIn.prototype.read);
        // this.router.post('/auth/signout', Signout.prototype.update);
        this.router.put('/auth/verify-email', VerifyEmail.prototype.update);
        // this.router.put('/auth/verify-otp/:otp', VerifyOTP.prototype.update);
        this.router.put('/auth/forgot-password', Password.prototype.forgotPassword);
        this.router.put('/auth/reset-password/:token', Password.prototype.resetPassword);
        this.router.put('/auth/change-password', Password.prototype.changePassword);
        // this.router.put('/auth/seed/:count', AuthSeed.prototype.create);
        return this.router;
    }
}

export const authRoutes: AuthRoutes = new AuthRoutes();