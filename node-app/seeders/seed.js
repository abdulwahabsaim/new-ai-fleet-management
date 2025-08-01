import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        await User.deleteMany(); // Clear existing users

        const adminUser = new User({
            username: 'admin',
            password: 'password123',
            role: 'admin',
        });
        await adminUser.save();

        const managerUser = new User({
            username: 'manager',
            password: 'password123',
            role: 'manager',
        });
        await managerUser.save();

        console.log('Default users have been seeded!');
        console.log('------------------------------------');
        console.log('Admin: admin / password123');
        console.log('Manager: manager / password123');
        console.log('------------------------------------');

    } catch (error) {
        console.error(`Error seeding users: ${error.message}`);
    }
};

const runSeed = async () => {
    await connectDB();
    await seedUsers();
    mongoose.connection.close();
    process.exit();
};

runSeed();