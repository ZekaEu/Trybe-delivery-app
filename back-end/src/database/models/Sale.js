module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { allowNull: false, autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
    userId: { allowNull: false, type: DataTypes.INTEGER },
    sellerId: { allowNull: false, type: DataTypes.INTEGER },
    totalPrice: { allowNull: false, type: DataTypes.DECIMAL },
    deliveryAddress: { allowNull: false, type: DataTypes.STRING },
    deliveryNumber: { allowNull: false, type: DataTypes.INTEGER },
    saleDate: { allowNull: false, type: DataTypes.DATE },
    status: { allowNull: false, type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,  
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'sellers' });
  };

  return Sale;
};