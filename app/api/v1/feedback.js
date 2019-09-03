const Router = require('koa-router')
const {Feedback} = require('../../models/feedback')
const {FeedbackValidator,PositiveIntegerValidator} = require('../../validator/validatorr')
const router = new Router({
  prefix:'/v1/feedback'  //路由的前缀
})

//获取反馈表
router.get('/',async ctx => {
  ctx.body = await Feedback.getAllFeedback()
})

//增加反馈表
router.post('/add',async ctx=> {
  const v = await new FeedbackValidator().validate(ctx)
  let params = ctx.request.body
  await Feedback.addFeedback(params)
  ctx.body = {
    message:'add ok!',
    code:200
  }
})

//更新反馈表
router.post('/update',async ctx => {
  const v = await new FeedbackValidator().validate(ctx)
  let params = ctx.request.body
  await Feedback.updateFeedback(params)
  ctx.body = {
    message:'update ok!',
    code:200
  }
})

//删除反馈表
router.post('/delete',async ctx=>{
  const v = await new PositiveIntegerValidator().validate(ctx)
  await Feedback.deleteFeedback(v.get('body.id'))
  ctx.body = {
    message:'delete ok!',
    code:200
  }
})



module.exports = router