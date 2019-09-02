const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')


class Finance extends Model{

  //获取详情
  static async getFinance(){
    return await Finance.findAll({})
  }

  //增加财务单
  static async addFinance(params){
   return await Finance.create(params)
  }

  //更新财务单
  static async updateFinance(params){
    return await Finance.update({
      month:params.month,
      cost:params.cost,
      income:params.income
    },{
      where:{
        id:params.id
      }
    })
  }

  //删除财务单
  static async deleteFinance(id){
    return await Finance.destroy({
      where:{
        id:id
      }
    })
  }
}

Finance.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  month:Sequelize.STRING,
  cost:Sequelize.INTEGER,
  income:Sequelize.INTEGER
},{
  sequelize,
  tableName:'finance'
})

module.exports = {
  Finance
}