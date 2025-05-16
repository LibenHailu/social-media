import Joi, { ObjectSchema } from 'joi';

const reactionSchema: ObjectSchema = Joi.object().keys({
    postId: Joi.string().required().messages({
        'string.base': 'PostId must be of type string',
        'string.empty': 'PostId is required',
        'any.required': 'PostId is required'
    }),
    username: Joi.string().required().messages({
        'string.base': 'username must be of type string',
        'string.empty': 'username is required',
        'any.required': 'username is required'
    }),
    reaction: Joi.string()
        .valid('like', 'dislike')
        .required()
        .messages({
            'any.only': 'Reaction must be either "like" or "dislike".',
            'any.required': 'Reaction is required.'
        }),
    _id: Joi.string().optional(),
    id: Joi.string().optional(),
    createdAt: Joi.string().optional()
});

export { reactionSchema };