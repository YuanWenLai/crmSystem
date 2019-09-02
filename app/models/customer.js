const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Customer extends Model{
  //获取客户列表
  static async getCustomerList(){
    return await Customer.findAll({})
  }
  //添加客户
  static  async addCustomer(params){
    return  await Customer.create({
      username:params.username,
      age:params.age,
      sex:params.sex,
      phone:params.phone,
      address:params.address,
      income:params.income,
      career:params.career
    })
  }

  //更新用户
  static async updateCustomer(params){
    return await Customer.update({
      username:params.username,
      age:params.age,
      sex:params.sex,
      phone:params.phone,
      address:params.address,
      income:params.income,
      career:params.career
    },{
      where:{
        id:params.id
      }
    })
  }
  //删除用户
  static async deleteCustomer(id){
    return await Customer.destroy({
      where:{
        id:id
      }
    })
  }

}

Customer.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  username:Sequelize.STRING,
  age:Sequelize.INTEGER,
  sex:Sequelize.STRING,
  phone:Sequelize.INTEGER,
  address:Sequelize.STRING,
  income:Sequelize.INTEGER,
  career:Sequelize.STRING
},{
  sequelize,
  tableName:'customer'
})

module.exports = {
  Customer
}