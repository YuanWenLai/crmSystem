const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Feedback extends Model{

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