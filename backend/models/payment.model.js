export default (sequelize, DataTypes) => {

    return sequelize.define("Payment", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        listing_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        razorpay_order_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        razorpay_payment_id: {
            type: DataTypes.STRING,
            allowNull: true
        },

        razorpay_signature: {
            type: DataTypes.STRING,
            allowNull: true
        },

        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "pending",
                "paid",
                "failed"
            ),
            defaultValue: "pending"
        }

    }, {
        tableName: "payments"
    });
};