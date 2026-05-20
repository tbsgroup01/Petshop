  export default (sequelize, DataTypes) => {
    return sequelize.define('Listing', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        pet_type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        listing_type: {
            type: DataTypes.ENUM('sell', 'mating','buy'),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        mating_fee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        bloodline: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        health_info: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        badges: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        images: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_visible_on_home: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'active', 'sold', 'inactive'),
            allowNull: false,
            defaultValue: 'pending'
        },
        favorite_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false, 
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        approved_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        approved_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'listings',
        timestamps: false
    });
};