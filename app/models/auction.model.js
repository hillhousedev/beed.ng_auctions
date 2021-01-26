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
        }
    });

    return Auction;
}