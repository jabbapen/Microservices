// type that refers to error sent back by request validator
import { ValidationError } from 'express-validator';
import { CommonErrorStructure, CustomError } from './error-structure';

export class RequestValidationError extends CustomError {
	statusCode = 400;
	constructor(private errors: ValidationError[]) {
		super('Invalid request parameters');
	}

	serializeErrors(): CommonErrorStructure {
		return {
			errors: this.errors.map((error) => ({
				message: error.msg,
				field: error.param,
			})),
		};
	}
}
