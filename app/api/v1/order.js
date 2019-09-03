const Router = require('koa-router')
const {Order} = require('../../models/order')
const {OrderValidator,PositiveIntegerValidator} = require('../../validator/validatorr')
const router = new Router({
  prefix:'/v1/order'  //路由的前缀
})

//获取订单详情
router.get('/',async ctx => {
  ctx.body = await Order.getAllOrder()
})

//增加订单
router.post('/add',async ctx => {
  const v = await new OrderValidator().validate(ctx)
  let params = ctx.request.body
  await Order.addOrder(params)
  ctx.body = {
    message:'add ok!',
    code:200
  }
})

//修改订单
router.post('/update',async ctx=>{
  console.log(ctx.request.body)
  await new OrderValidator().validate(ctx)
  let params = ctx.request.body
  await Order.updateOrder(params)
  ctx.body = {
    message:'update ok!',
    code:200
  }
})

//删除订单
router.post('/delete',async ctx=>{
  const v = await new PositiveIntegerValidator().validate(ctx)
  await Order.deleteOrder(v.get('body.id'))
  ctx.body = {
    message:'delete ok!',
    code:200
  }
})

module.exports = router