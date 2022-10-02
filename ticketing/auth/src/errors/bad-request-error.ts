import { CustomError, CommonErrorStructure } from './error-structure';

export class BadRequestError extends CustomError {
	statusCode = 400;

	constructor(public message: string) {
		super(message);
	}

	serializeErrors(): CommonErrorStructure {
		return {
			errors: [
				{
					message: this.message,
				},
			],
		};
	}
}
