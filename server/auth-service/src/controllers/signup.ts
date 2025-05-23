import { signupSchema } from '../schemes/signup';
import { createAuthUser, getUserByUsernameOrEmail, signToken } from '../services/auth.service';
import { BadRequestError, firstLetterUppercase, IAuthDocument, IEmailMessageDetails, uploads } from '@liben_hailu/sm-shared';
import { UploadApiResponse } from 'cloudinary';
import { v4 as uuidV4 } from 'uuid';
import crypto from 'crypto';
import { lowerCase } from 'lodash';
import { config } from '../config';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export async function create(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(signupSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignUp create() method error');
  }
  const { username, email, password, country, profilePicture, fullName } = req.body;
  const checkIfUserExist: IAuthDocument = await getUserByUsernameOrEmail(username, email);
  if (checkIfUserExist) {
    throw new BadRequestError('Invalid credentials. Email or Username', 'SignUp create() method error');
  }

  const profilePublicId = uuidV4();
  const uploadResult: UploadApiResponse = (await uploads(profilePicture, `${profilePublicId}`, true, true)) as UploadApiResponse;
  if (!uploadResult.public_id) {
    throw new BadRequestError('File upload error. Try again', 'SignUp create() method error');
  }

  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  const authData: IAuthDocument = {
    username: firstLetterUppercase(username),
    email: lowerCase(email),
    fullName,
    profilePublicId,
    password,
    country,
    profilePicture: uploadResult.public_id,
    emailVerificationToken: randomCharacters
  } as IAuthDocument;

  const result: IAuthDocument = await createAuthUser(authData);
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: result.email,
    verifyLink: verificationLink,
    template: 'verifyEmail'
  };

  await publishDirectMessage(
    authChannel,
    'sm-email-notification',
    'auth-email',
    JSON.stringify(messageDetails),
    'Verify email message has been sent to notification service'
  );
  const userJWT: string = signToken(result.id!, result.email!, result.username!);
  res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result, token: userJWT });
}
