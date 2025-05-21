import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
     fullName: Joi.string().required().messages({
        'string.base': 'Fullname must be a type of string',
        'string.empty': 'Fullname is a required field'
    }),
    username: Joi.string().min(4).max(12).required().messages({
        'string.base': 'Username must be a type of string',
        'string.min': 'Invalid username',
        'string.max': 'Invalid username',
        'string.empty': 'Username is a required field'
    }),
    password: Joi.string().min(4).max(12).required().messages({
        'string.base': 'Password must be a type of string',
        'string.min': 'Invalid password',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    }),
    country: Joi.string().required().messages({
        'string.base': 'Country must be a type of string',
        'string.empty': 'Country is a required field'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a type of string',
        'string.email': 'Invalid email',
        'string.empty': 'Email is a required field'
    }),
    profilePicture: Joi.string().required().messages({
        'string.base': 'Please add a profile picture.',
        'string.email': 'Profile picture is required',
        'string.empty': 'Profile picture is required'
    })
});

export { signupSchema };