const Router = require('koa-router')
const {Customer} = require('../../models/customer')
const {AddCustomerValidator,PositiveIntegerValidator} = require('../../validator/validatorr')
const router = new Router({
  prefix:'/v1/customer'  //路由的前缀
})


//获取客户列表
router.get('/', async ctx=> {
  const result = await Customer.getCustomerList()
  ctx.body = {
    result
  }
})

//添加用户
router.post('/addCustomer', async  ctx => {
  const v = await new AddCustomerValidator().validate(ctx)
  let params = ctx.request.body
  await Customer.addCustomer(params)
  ctx.body = {
    message:'add ok!',
    code:200
  }
})

//更新客户
router.post('/updateCustomer',async ctx=>{
  const v = await new AddCustomerValidator().validate(ctx)
  let params = ctx.request.body
  let ret = await Customer.updateCustomer(params)
  if(ret[0]){
    ctx.body = {
      message:'update err!',
      code:403
    }
  }
  ctx.body = {
    message:'update ok!',
    code:200
  }
})

//删除客户
router.post('/deleteCustomer',async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  await Customer.deleteCustomer(v.get('body.id'))
  ctx.body = {
    message:'delete ok!',
    code:200
  }
})


module.exports = router