// models/User.js
import {DataTypes, Model} from 'sequelize';
import sequelize from '@/db/dbConfig';

import bcrypt from 'bcryptjs';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10; // Default to 10 if not defined
const customSalt = process.env.BCRYPT_CUSTOM_SALT || ''; // Default to an empty string if not defined

async function encryptPassword(input) {
    const saltedPassword = input + customSalt;
    let password = await bcrypt.hash(saltedPassword, saltRounds);
    return password;
}

class User extends Model {
    static async insert(input) {
        const newUser = { ...input };
        let password = await encryptPassword(newUser.password);
        newUser.password = password;
        return User.create(newUser);
    }

    async updateDetails(updateData) {
        Object.assign(this, updateData);
        if (updateData.password) {

            let passwordToBeUpdated = await encryptPassword(updateData.password);
            this.password =passwordToBeUpdated
        }
        return this.save();
    }
    static async deleteById(userId) {
        return User.destroy({ where: { id: userId } });
    }

    static async listAll() {
        return User.findAll({
            attributes: { exclude: ['password'] }
        });
    }

    static async findByEmail(email) {
        return User.findOne({
            where: { email },
            attributes: { exclude: ['password'] }
        });
    }

    async changePassword(newPassword) {
        this.password = await bcrypt.hash(newPassword, 10);
        return this.save();
    }

    static async findByEmailAndPassword(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usertype: {
        type: DataTypes.STRING,
        allowNull: false

    },
    institutionname: {
        type: DataTypes.STRING,
        allowNull: true

    },
    industryname: {
        type: DataTypes.STRING,
        allowNull: true

    },
    createdon: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedon: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'users', // Specify the table name
    timestamps: false // Disable the automatic timestamps
});

export default User;
