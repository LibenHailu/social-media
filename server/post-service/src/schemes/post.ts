import Joi, { ObjectSchema } from 'joi';

const postSchema: ObjectSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  body: Joi.string().optional().allow(null, ''),
  file: Joi.string().optional().allow(null, ''),
  fileType: Joi.string().optional().allow(null, ''),
  fileName: Joi.string().optional().allow(null, ''),
  fileSize: Joi.string().optional().allow(null, ''),
  userId: Joi.string().required().messages({
    'string.base': 'User id is required',
    'string.empty': 'User id is required',
    'any.required': 'User id is required'
  }),
  username: Joi.string().required().messages({
    'string.base': 'Username is required',
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  likesCount: Joi.number().optional(),
  dislikeCount: Joi.number().optional(),
  createdAt: Joi.string().optional()
});

export { postSchema };