const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')

const app = new Koa()
const router = new Router()

// 模拟网络请求延迟
const getResponseFn = (fn, ctx) => {
	return new Promise(resolve => {
		setTimeout(() => {
			const res = fn(ctx)
			resolve(res)
		},1000)
	})
}

// 注册mock路由
mockList.forEach(item => {

	// url: 接口路径, method: 请求方式, response: 响应结果
	const {url, method, response} = item

	// router[method]: router.get/router.post
	router[method](url, async ctx => {
		const res  = await getResponseFn(response, ctx)
		ctx.body = res
	})
})

app.use(router.routes()) // 挂载路由
app.listen(3100) // 端口