const {Sequelize,Model,Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Customer} = require('../models/customer')
const {Product} = require('../models/product')

class Order extends Model{
  //获取订单详情
  static async getAllOrder(){
    //1.先获取订单表
    const orderList = await Order.findAll({})
    let userIds = []
    let productIds = []
    //2.获取客户，产品的id集
    orderList.forEach(order => {
      userIds.push(order.user_id)
      productIds.push(order.product_id)
    })
    //3.用id集去查询对应的客户产品，获得名字加到order
    const customers = await Customer.findAll({
      where:{
        id:{
          [Op.in]:userIds
        }
      }
    })
    const products = await Product.findAll({
      where:{
        id:{
          [Op.in]:productIds
        }
      }
    })
    orderList.forEach(order => {
      Order._getName(order,customers,products)
    })
    return orderList
  }

  //整合客户名和产品名到订单中
  static async _getName(order,customers,products){
    let username,product_name
    customers.forEach(c => {
      if(order.user_id === c.id){
        username = c.get("username")
        order.setDataValue('username',username)
      }
    })
    products.forEach(p => {
      if(order.product_id === p.id){
        product_name = p.get("product_name")
        order.setDataValue('product_name',product_name)
      }
    })
    return order
  }

  //增加订单
  static async addOrder(params){
    return await Order.create(params)
  }

  //更新订单
  static async updateOrder(params){
    return await Order.update(params,{
      where:{
        id:params.id
      }
    })
  }

  //删除订单
  static async deleteOrder(id){
    return await Order.destroy({
      where:{
        id
      }
    })
  }

}

Order.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:Sequelize.INTEGER,
  product_id:Sequelize.INTEGER,
  price:Sequelize.INTEGER,
  promotion_code:Sequelize.STRING
},{
  sequelize,
  tableName:'order'
})


module.exports = {
  Order
}