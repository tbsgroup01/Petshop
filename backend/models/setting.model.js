export default (sequelize, DataTypes) => {
    return sequelize.define('Setting', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true    
        },
        site_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        brand_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                notEmpty: true
            }
        },
        site_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {     
                isEmail: true
            }
        } ,
        support_email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }, {
        tableName: 'settings',
        timestamps: false
    });
};