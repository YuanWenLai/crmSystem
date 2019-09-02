const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Product extends Model{

  //获取产品信息
  static async getProduct(){
    return await Product.findAll({})
  }

  //增加产品信息
  static async addProduct(params){
    return await Product.create({
      product_name:params.product_name,
      content:params.content
    })
  }

  //更新产品信息
  static async updateProduct(params){
    return await Product.update({
      product_name:params.product_name,
      content:params.content
    },{
      where:{
        id:params.id
      }
    })
  }

  //删除产品
  static async deleteProduct(id){
    return await Product.destroy({
      where:{
        id:id
      }
    })
  }
}

Product.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  product_name:Sequelize.STRING,
  content:Sequelize.STRING
},{
  sequelize,
  tableName:'product'
})


module.exports = {
  Product
}