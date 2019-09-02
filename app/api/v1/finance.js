const Router = require('koa-router')
const {Finance} = require('../../models/finance')
const {AddFinanceValidator,PositiveIntegerValidator} = require('../../validator/validatorr')
const router = new Router({
  prefix:'/v1/finance'  //路由的前缀
})

//获取公司财务详情
router.get('/',async ctx => {
  ctx.body = await Finance.getFinance()
})

//增加财务单
router.post('/add', async ctx => {
  const v = await new AddFinanceValidator().validate(ctx)
  let params = ctx.request.body
  await Finance.addFinance(params)
  ctx.body = {
    message:'add ok!',
    code:200
  }
})

//更新财务单
router.post('/update',async ctx => {
  const v = await new AddFinanceValidator().validate(ctx)
  let params = ctx.request.body
  await Finance.updateFinance(params)
  ctx.body = {
    message:'update ok!',
    code:200
  }
})

//删除财务单
router.post('/delete', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  await Finance.deleteFinance(v.get('body.id'))
  ctx.body = {
    message:'delete ok!',
    code:200
  }
})



module.exports = router