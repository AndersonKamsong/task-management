import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

class UserController {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async getAllUser(req, res) {
        const users = await User.find();
        return res.status(201).json({ message: 'User List.', user: users });
    }
    async register(req, res) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dateOfBirth,
                gender,
                roles
            } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ message: 'Missing required fields: firstName, lastName, email or password.' });
            }

            // Check if the email is already registered
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered.' });
            }

            // Create the new user
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: password,
                phoneNumber,
                gender,
                roles: roles || ['candidate'] // Default role is 'candidate'
            });

            // Save the user to the database
            await newUser.save();

            // Return the created user (excluding sensitive fields)
            const userResponse = {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                dateOfBirth: newUser.dateOfBirth,
                gender: newUser.gender,
                roles: newUser.roles,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            };

            return res.status(201).json({ message: 'User registered successfully.', user: userResponse });

        } catch (error) {
            console.error('Error in registerUser:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            // Include security fields in query
            const user = await User.findOne({ email })
                .select('+password +security.loginAttempts +security.lockUntil');

            if (!user) {
                throw createError(401, 'Invalid credentials');
            }

            // Check if account is locked
            if (user.isLocked) {
                throw createError(423, 'Account is temporarily locked');
            }

            // Verify password
            const isValid = await user.comparePassword(password);
            console.log(isValid);

            if (!isValid) {
                await user.incrementLoginAttempts();
                throw createError(401, 'Invalid credentials');
            }

            // Reset login attempts on successful login
            await User.findByIdAndUpdate(user._id, {
                $set: { 'security.loginAttempts': 0 },
                $unset: { 'security.lockUntil': 1 },
                lastLogin: new Date()
            });
            console.log(user.toJSON());
            // console.log(res.token);
            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, roles: user.roles },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            res.user = user.toJSON()
            res.token = token
            console.log(res.user?.roles);
            // req.body["roles"] = res.user?.roles
            res.json({ token, user: user.toJSON() });
        } catch (error) {
            console.log("error test:", error.message)
            res.json(error);
        }
    }
}

export default new UserController(); 