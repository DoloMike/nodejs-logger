module.exports = (sequelize, DataTypes) => {

    // data model for a log
    return sequelize.define('log', {
        appName: DataTypes.STRING,
        action: DataTypes.STRING
    })
}

// force: true will drop the table if it already exists
// Log.sync({force: true}).then(() => {
//     // Table created
//     return Log.create({
//         appName: 'thiss script',
//         action: 'write to msp'
//     });
//   });
