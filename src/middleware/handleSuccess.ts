import { Response } from 'express';
import { SuccessHandler } from 'src/helpers/SuccessHandler';

export const handleSuccess = (
  successHandler: SuccessHandler,
  res: Response,
) => {
  const { statusCode, data } = successHandler;
  return res.status(statusCode).json({
    status: 'success',
    statusCode,
    data,
  });
};
