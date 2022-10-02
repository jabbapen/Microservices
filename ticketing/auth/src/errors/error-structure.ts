export interface CommonErrorStructure {
	errors: {
		message: string;
		field?: string;
	}[];
}

export abstract class CustomError extends Error {
	constructor(message: string) {
		super(message);
		// restore prototype chain
		const actualProto = new.target.prototype;

		if (Object.setPrototypeOf) {
			Object.setPrototypeOf(this, actualProto);
		}
	}
	// Subclass must implement this
	abstract statusCode: number;
	abstract serializeErrors(): CommonErrorStructure;
}
