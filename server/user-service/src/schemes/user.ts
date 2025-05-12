import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object().keys({
  fullName: Joi.string().required().messages({
    'string.base': 'Fullname must be of type string',
    'string.empty': 'Fullname is required',
    'any.required': 'Fullname is required'
  }),
  _id: Joi.string().optional(),
  id: Joi.string().optional(),
  username: Joi.string().optional(),
  profilePublicId: Joi.string().optional().allow(null, ''),
  email: Joi.string().optional(),
  profilePicture: Joi.string().required().messages({
    'string.base': 'Please add a profile picture',
    'string.empty': 'Profile picture is required',
    'any.required': 'Profile picture is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Please add a user bio',
    'string.empty': 'User bio is required',
    'any.required': 'User bio is required'
  }),
  country: Joi.string().required().messages({
    'string.base': 'Please select a country',
    'string.empty': 'Country field is required',
    'any.required': 'Country field is required'
  }),
  followers: Joi.number().optional(),
  following: Joi.number().optional(),
  createdAt: Joi.string().optional()
});

export { userSchema };