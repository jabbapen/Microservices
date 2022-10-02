import { CustomError, CommonErrorStructure } from './error-structure';

export class DatabaseConnectionError extends CustomError {
	reason = 'Error connecting to database';
	statusCode = 500;

	constructor() {
		super('Error connecting to db');
	}

	serializeErrors(): CommonErrorStructure {
		return {
			errors: [
				{
					message: this.reason,
				},
			],
		};
	}
}
