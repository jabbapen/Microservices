import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/error-structure';

// 4 params means its an error
export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send(err.serializeErrors());
	}
};
