const Router = require('koa-router')
const {Product} = require('../../models/product')
const {AddProductValidator,PositiveIntegerValidator} = require('../../validator/validatorr')
const router = new Router({
  prefix:'/v1/product'  //路由的前缀
})

//获取产品信息
router.get('/', async ctx => {
  ctx.body = await Product.getProduct()
})

//增加产品信息
router.post('/add',async ctx => {
  const v = await new AddProductValidator().validate(ctx)
  let params = ctx.request.body

  await Product.addProduct(params)
  ctx.body = {
    message:'add ok!',
    code:200
  }
})

//更新产品信息
router.post('/update',async ctx=> {
  const v = await new AddProductValidator().validate(ctx)
  let params = ctx.request.body
  await Product.updateProduct(params)
  ctx.body = {
    message:'uodate ok!',
    code:200
  }
})

//删除产品信息
router.post('/delete' , async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  await Product.deleteProduct(v.get('body.id'))
  ctx.body = {
    message:'delete ok!',
    code:200
  }
})


module.exports = router