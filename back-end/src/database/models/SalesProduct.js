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
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SalesProduct;
};