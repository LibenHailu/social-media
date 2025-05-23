import { firstLetterUppercase, IAuthDocument, lowerCase } from '@liben_hailu/sm-shared';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize';
import { config } from '../config';
import { AuthModel } from '../models/auth.schema';
import { publishDirectMessage } from '../queues/auth.producer';
import { authChannel } from '../server';

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument> {
    const result: Model = await AuthModel.create(data);
    const messageDetails = {
        username: result.dataValues.username!,
        fullName: result.dataValues.fullName!,
        email: result.dataValues.email!,
        profilePicture: result.dataValues.profilePicture!,
        profilePublicId: result.dataValues.profilePublicId!,
        country: result.dataValues.country!,
        type: 'auth'
    };
    await publishDirectMessage(
        authChannel,
        'sm-user-update',
        'update-user',
        JSON.stringify(messageDetails),
        'User details sent to user service.'
    );
    const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
    return userData;
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument> {
    const user: Model = (await AuthModel.findOne({
        where: { id: authId },
        attributes: { exclude: ['password'] }
    })) as Model;
    return user?.dataValues;
}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
    const user: Model = (await AuthModel.findOne({
        where: {
            [Op.or]: [
                {
                    username: firstLetterUppercase(username)
                },
                {
                    email: lowerCase(email)
                }
            ]
        },
    })) as Model;
    return user?.dataValues;
}


export async function getUserByUsername(username: string): Promise<IAuthDocument> {
    const user: Model = (await AuthModel.findOne({
        where: {
            username: firstLetterUppercase(username)
        },
    })) as Model;
    return user?.dataValues;
}

export async function getUserByEmail(email: string): Promise<IAuthDocument> {
    const user: Model = (await AuthModel.findOne({
        where: {
            email: lowerCase(email)
        },
    })) as Model;
    return user.dataValues;
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument> {
    const user: Model = await AuthModel.findOne({
        where: {
            emailVerificationToken: token,
        },
        attributes: { exclude: ['password'] }
    }) as Model

    return user?.dataValues
}


export async function getAuthUserByPasswordToken(token: string): Promise<IAuthDocument> {
    const user: Model = await AuthModel.findOne({
        where: {
            [Op.and]: [
                {
                    passwordResetToken: token
                },
                {
                    passwordResetExpires: { [Op.gt]: new Date() }
                }
            ]
        },
        attributes: { exclude: ['password'] }
    }) as Model

    return user?.dataValues
}


export async function updateVerifyEmailField(authId: number, emailVerified: number, emailVerificationToken: string): Promise<void> {
    await AuthModel.update(
        {
            emailVerified,
            emailVerificationToken
        },
        {
            where: { id: authId }
        },
    );
}

export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
    await AuthModel.update(
        {
            passwordResetToken: token,
            passwordResetExpires: tokenExpiration
        },
        {
            where: { id: authId }
        },
    );
}

export async function updatePassword(authId: number, password: string): Promise<void> {
    await AuthModel.update(
        {
            password,
            passwordResetToken: '',
            passwordResetExpires: new Date()
        },
        {
            where: { id: authId }
        },
    );
}

export function signToken(id: number, email: string, username: string): string {
    return sign({ id, email, username }, config.JWT_TOKEN!)
}






