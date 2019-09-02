const Router = require('koa-router')
const {RegisterValidator,LoginValidator} = require('../../validator/validatorr')
const {Success} = require('../../../core/http-exception')

const {User} = require('../../models/user')
const router = new Router({
  prefix:'/v1/user'  //路由的前缀
})

//用于注册
router.post('/register',async (ctx)=>{
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email:v.get('body.email'),
    password:v.get('body.password1'),
    nickname:v.get('body.nickname')
  }
  await User.create(user)
  //抛出成功的信息
  throw new Success()
})

router.post('/login',async (ctx)=>{
  const v = await new LoginValidator().validate(ctx)
  await User.vertifyEmailPassword(v.get('body.email'),v.get('body.password'))
  ctx.body = {
    message:'login ok!',
    code:200
  }
})

module.exports = router