// models/User.js
import {DataTypes, Model} from 'sequelize';
import sequelize from '@/db/dbConfig';

import bcrypt from 'bcryptjs';
import logger from "@/logger";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10; // Default to 10 if not defined
const customSalt = process.env.BCRYPT_CUSTOM_SALT || ''; // Default to an empty string if not defined

export async function encryptPassword(input) {
    const saltedPassword = input + customSalt;
    return await bcrypt.hash(saltedPassword, saltRounds);
}

class User extends Model {
    static async insert(input) {

        try {
            const newUser = {...input};
            let password = await encryptPassword(newUser.password);
            newUser.password = password;

            const result = await User.create(newUser);


                delete result.password;
                return result;

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Here we're extracting the detailed message from the original error
                const detailedMessage = error.errors && error.errors.length > 0 ? error.errors[0].message : 'A unique constraint error occurred.';
                throw new Error(`Validation error: ${detailedMessage}`);
            } else {
                throw error;
            }
        }
    }

    async updateDetails(updateData) {

        try {
            Object.assign(this, updateData);
            if (updateData.password) {

                let passwordToBeUpdated = await encryptPassword(updateData.password);
                this.password = passwordToBeUpdated
            }
            const result = await this.save();
            return result

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                const detailedMessage = error.errors && error.errors.length > 0 ? error.errors[0].message : 'A unique constraint error occurred.';
                throw new Error(`Validation error: ${detailedMessage}`);
            } else {
                throw error;
            }
        }
    }
    static async isTableEmpty() {
        const userCount = await User.count();
        return userCount === 0;
    }
    static async bulkCreateUsers(userArray) {
        try {
            const usersWithEncryptedPasswords = await Promise.all(
                userArray.map(async (user) => {
                    const hashedPassword = await encryptPassword(user.password);
                    return { ...user, password: hashedPassword };
                })
            );

            const createdUsers = await User.bulkCreate(usersWithEncryptedPasswords, {
                // IndividualHooks: true will execute hooks for each record (if you have any defined)
                // Remove this option if you do not need to trigger hooks
                individualHooks: false ,
                // This option ignores the error and keeps processing the rest if a validation error happens
                // Remove or change to 'false' if you want to handle such errors
                validate: true
            });

            // Optionally, remove the password field from the returned user objects
            return createdUsers.map(user => {
                const userWithoutPassword = user.get({ plain: true });
                delete userWithoutPassword.password;
                return userWithoutPassword;
            });

        } catch (error) {
            console.error('Error during bulk creation of users:', error);
            throw error;
        }
    }
    static async deleteById(userId) {
        return User.destroy({where: {id: userId}});
    }
    static async truncate() {
        try {
            await User.destroy({
                where: {},
                // If you are using paranoid mode (soft deletes), you might want to force the delete
                 force: true // Uncomment if you want to permanently delete all records
            });
           logger.info('All users have been deleted.');
        } catch (error) {
            logger.error('Failed to clean up Users table:', error);
            throw error;
        }
    }
    static async listAll() {
        return User.findAll({
            attributes: {exclude: ['password']}
        });
    }

    static async findByEmail(email) {
        return User.findOne({
            where: {email},
            attributes: {exclude: ['password']}
        });
    }

    async changePassword(newPassword) {
        this.password = await bcrypt.hash(newPassword, 10);
        return this.save();
    }

    static async findByEmailAndPassword(email, password) {
        logger.debug("findByEmailAndPassword called");
        const user = await User.findOne({where: {email}});
        logger.debug("findByEmailAndPassword received user" + user);
        if (!user) return null;

        const encryptedPassword =  await encryptPassword(password);
        const isMatch = await bcrypt.compare(password + customSalt, user.password);

        if(isMatch){
            const userWithoutPassword = user.get({ plain: true });
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }else {
            return null;
        }

    }
}

User.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false

    },
    institutionName: {
        type: DataTypes.STRING

    },
    organizationName: {
        type: DataTypes.STRING

    }

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: true // Disable the automatic timestamps
});

export default User;
