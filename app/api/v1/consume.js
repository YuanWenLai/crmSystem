const Router = require('koa-router')
const {Consume} = require('../../models/consume')
const router = new Router({
  prefix:'/v1/consume'  //路由的前缀
})

//获取客户消费详情
router.get('/',async ctx =>{
  ctx.body = await Consume.getConsume()
})

module.exports = router;