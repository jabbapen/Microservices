import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		// Check if Email and Password property are on sent json and valid
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters'),
	],
	async (req: Request, res: Response) => {
		// Get errors found in middlewares
		const errors = validationResult(req);

		// If errors occured
		if (!errors.isEmpty()) {
			// Send errors as response
			throw new RequestValidationError(errors.array());
		}

		// TODO: Hash password
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}

		const user = User.build({ email, password });
		await user.save();

		// TODO: Generate JWT
		res.send(user);
	}
);

export { router as signupRouter };
