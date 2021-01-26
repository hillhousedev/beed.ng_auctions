module.exports = (sequelize, Sequelize) => {
    const Auction = sequelize.define("auction", {
        title: {
            type: Sequelize.STRING
        },
        start_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        end_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

        // image_type: {
        //     type: DataTypes.STRING,
        // },

        // image_name: {
        //     type: DataTypes.STRING,
        // },

        // image_data: {
        //     type: DataTypes.BLOB("long"),
        // }
    });

    return Auction;


}