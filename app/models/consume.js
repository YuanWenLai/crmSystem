const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Consume extends Model{
  static async getConsume(){
    return await Consume.findAll({})
  }
}
Consume.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:Sequelize.INTEGER,
  way:Sequelize.STRING,
  amount:Sequelize.INTEGER
},{
  sequelize,
  tableName:'consume'
})

module.exports = {
  Consume
}