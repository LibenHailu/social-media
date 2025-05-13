import Joi, { ObjectSchema } from 'joi';

const followSchema: ObjectSchema = Joi.object().keys({
  followerId: Joi.string().required().messages({
    'string.base': 'FollowerId must be of type string',
    'string.empty': 'FollowerId is required',
    'any.required': 'FollowerId is required'
  }),
    followeeId: Joi.string().required().messages({
    'string.base': 'FolloweeId must be of type string',
    'string.empty': 'FolloweeId is required',
    'any.required': 'FolloweeId is required'
  }),
  _id: Joi.string().optional(),
  id: Joi.string().optional(),
  createdAt: Joi.string().optional()
});

export { followSchema };