import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'baijuyadav',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            timezone: 'Z'
        },
        define: {
            underscored: true
        }
    }
);

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter : true});
        console.log('Database connection established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

export default sequelize;