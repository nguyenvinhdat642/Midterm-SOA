const User = require('../service/User');

class UserController {
    static async findUserIdByEmail(email) {
        try {
            const user = await User.findByEmail(email);
            console.log('User found:', user);
            if (user) {
                return user.userID;
            }
            return null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async getUserRole(email) {
        try {
            const user = await User.findByEmail(email);
            return user ? user.role : null;
        } catch (error) {
            console.error('Error getting user role:', error);
            throw error;
        }
    }
}

module.exports = UserController;
