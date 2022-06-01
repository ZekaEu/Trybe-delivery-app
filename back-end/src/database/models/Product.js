module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { allowNull: false, autoIncrement: true, type: DataTypes.INTEGER, primaryKey: true },
    name: { allowNull: false, type: DataTypes.STRING },
    price: { allowNull: false, type: DataTypes.DECIMAL },
    urlImage: { allowNull: false, type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,  
  });

  return Product;
};