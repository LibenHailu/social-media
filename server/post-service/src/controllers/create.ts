import crypto from 'crypto';

import { BadRequestError, IPostDocument, uploads } from '@liben_hailu/sm-shared';
import { postSchema } from '@post/schemes/post';
import { createPost } from '@post/services/post.service';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const post = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(postSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create post() method');
  }
  let file: string = req.body.file;
  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  let result: UploadApiResponse;
  if (file) {
    result = (req.body.fileType === 'zip' ? await uploads(file, `${randomCharacters}.zip`) : await uploads(file)) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError('File upload error. Try again', 'Create post() method');
    }
    file = result?.secure_url;
  }
  const postData: IPostDocument = {
    userId: req.body.userId,
    username: req.body.username,
    body: req.body.body,
    file,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
    fileName: req.body.fileName,
  };
  await createPost(postData);
  res.status(StatusCodes.OK).json({ message: 'Post added', postData });
};

export { post };
