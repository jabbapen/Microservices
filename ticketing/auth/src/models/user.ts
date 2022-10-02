import mongoose from 'mongoose';
import { Password } from '../services/password';
// An interface that describes the properties to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// This is to solve the issue of being able to input anything to a User document
// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// This is to solve issue where we don't know exactly what properties a user document has
// An interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
	updatedAt: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// have to use a function here rather than an arrow function
userSchema.pre('save', async function (done) {
	// This happens when a user is created
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});
// Call this function instead of calling new User() directly so we can use typescript effectively
// This adds the function to the model itself
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// The first generic describes what the doctype will be
// The second generic describes what will be returned from the model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
	email: 'test@test.com',
	password: 'password',
});

export { User };
