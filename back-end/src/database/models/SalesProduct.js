module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true },
    productId: { allowNull: false, type: DataTypes.STRING, primaryKey: true },
    quantity: { allowNull: false, type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,  
  });

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SalesProduct;
};