//存放各种校验器
const  {LinValidator,Rule} = require('../../core/lin-validator-v2')
const {User} = require('../models/user')
const {LoginType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
  }
}

class RegisterValidator extends LinValidator{
  constructor(){
    super()
    this.email = [
      new Rule('isEmail','不符合Email')
    ]
    this.password1 = [
      new Rule('isLength','密码长度至少6个',{min:6,max:20}),
      new Rule('matches','密码必须包含特殊字符', '^.*(?=.*[!@#$%^&*?\(\)]).*$')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength','昵称至少4个，最多16个',{min:4,max:16})
    ]
  }

  //自定义validator方法，必须以validate开头命名
  validatePassword(vals){
    //vals是所有参数集
    const pwd1 = vals.body.password1;
    const pwd2 = vals.body.password2;
    if (pwd1 !== pwd2) {
      throw new Error('两个密码必须相同');
    }
  }
  async validateEmail(vals){
    const email = vals.body.email
    const result = await User.findOne({where:{email:email}})
    if(result){
      throw new Error('该邮箱已被使用')
    }
  }
}

//登陆校验
class LoginValidator extends LinValidator{
  constructor(){
    super()
    this.email = [
      new Rule('isEmail','不符合Email')
    ]
    this.password = [
      new Rule('isLength','密码长度至少6个',{min:6,max:20}),
    ]
  }
}

class TokenValidator extends LinValidator{
  constructor(){
    super()
    //校验登陆的账号信息
    this.account = [
      new Rule('isLength','不符合账号规则',{min:4,max:32})
    ]
    //校验登陆的密码，isOptional的作用是，有密码的情况下校验，没有密码就不校验密码
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{min:6,max:128})
    ]
  }
  //校验登陆用户的类型
  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type是必须的参数')
    }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type参数不合法')
    }
  }
}

class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength','token不能为空',{min:1})
    ]
  }
}

//增加客户信息验证
class AddCustomerValidator extends LinValidator{
  constructor(){
    super()
    this.age = [
      new Rule('isLength','不能为空',{min:1})
    ]
    this.phone = [
      new Rule('isLength','需要是11位手机号',{min:2}),
    ]
    this.income = [
      new Rule('isLength','不能为空',{min:1})
    ]
  }
}

//增加公司财务验证
class AddFinanceValidator extends LinValidator{
  constructor(){
    super()
    this.cost = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
    this.month = [
      new Rule('isLength','月份最少两个字符串',{min:2}),
    ]
    this.income = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
  }
}

//验证产品信息的操作
class AddProductValidator extends LinValidator{
  constructor(){
    super()
    this.content = [
      new Rule('isLength','最少两个字符串',{min:2}),
    ]
    this.product_name = [
      new Rule('isLength','最少两个字符串',{min:2}),
    ]
  }
}

//验证反馈信息
class FeedbackValidator extends LinValidator{
  constructor(){
    super()
    this.comment = [
      new Rule('isLength','最少两个字符串',{min:2}),
    ]
    this.user_id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
    this.faithful = [
      new Rule('isInt','需要是正整数')
    ]
    this.satisfaction = [
      new Rule('isInt','需要是正整数')
    ]
  }
}

//验证订单表的信息
class OrderValidator extends LinValidator{
  constructor(){
    super()
    this.user_id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
    this.product_id = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
    this.price = [
      new Rule('isInt','需要是正整数',{min:1})
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LoginValidator,
  AddCustomerValidator,
  AddFinanceValidator,
  AddProductValidator,
  FeedbackValidator,
  OrderValidator
}