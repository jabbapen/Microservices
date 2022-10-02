import { CustomError, CommonErrorStructure } from './error-structure';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('Route not found');
	}

	serializeErrors(): CommonErrorStructure {
		return {
			errors: [
				{
					message: 'Not Found',
				},
			],
		};
	}
}
