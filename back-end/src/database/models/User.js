module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { allowNull: false, autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
    name: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, unique: true, type: DataTypes.STRING },
    password: { allowNull: false, type: DataTypes.STRING },
    role: { allowNull: false, type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: false,  
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'userSales' });
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sellerSales' });
  };

  return User;
};