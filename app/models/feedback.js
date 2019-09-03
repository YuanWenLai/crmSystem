const {Sequelize,Model,Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Customer} = require('../models/customer')

class Feedback extends Model{

  //获取反馈列表
  static async getAllFeedback(){
    //1.先获取反馈表
    const feedbackList = await Feedback.findAll({})
    //2.获取客户id集
    let ids = []
    feedbackList.forEach(feedback => {
      ids.push(feedback.id)
    })
    //3.用ids去查询客户，获取名字加到feedback
    const customers = await Customer.findAll({
      where:{
        id:{
          [Op.in]:ids
        }
      }
    })
    feedbackList.forEach(feedback => {
      Feedback._getEachCustomerName(feedback,customers)
    })
    return feedbackList
  }
  //获取反馈表的私有函数
  static async _getEachCustomerName(feeback,customers){
    let username
    customers.forEach(c => {
      if(feeback.user_id === c.id){
        username = c.get("username")
        feeback.setDataValue('username',username)
      }
    })
    //console.log(feeback)
    return feeback
  }

  //增加反馈表
  static async addFeedback(params){
    return await Feedback.create(params)
  }

  //更新反馈表
  static async updateFeedback(params){
    return await Feedback.update(params,{
      where:{
        id:params.id
      }
    })
  }

  //删除反馈表
  static async deleteFeedback(id){
    return await Feedback.destroy({
      where:{
        id
      }
    })
  }
}

Feedback.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:Sequelize.INTEGER,
  comment:Sequelize.STRING,
  faithful:Sequelize.INTEGER,
  satisfaction:Sequelize.INTEGER
},{
  sequelize,
  tableName:'feedback'
})

module.exports = {
  Feedback
}