const Mock = require('mockjs')
const Random = Mock.Random

// 获取问卷列表
const getQuestionList = require('./data/questionList')

module.exports = [

	// 根据问卷id查询问卷
	{
		url: "/api/question/:id",
		method: 'get',
		response() {
			return {
				code: 0,
				msg: 'ok',
				data: {
					id: Random.id(),
					title: Random.ctitle()
				},
			}
		}
	},

	// 创建问卷
	{
		url: '/api/question',
		method: "post",
		response() {
			return {
				code: 0,
				msg: "ok",
				data: {
					id: Random.id()
				}
			}
		}
	},

	// 查询问卷列表
	{
		url: "/api/question",
		method: 'get',
		response(ctx) {
			console.log('ctx', ctx)

			const isStar = ctx.url.indexOf('/api/question?keyword=&isStar=true') >= 0
			const isDeleted = ctx.url.indexOf('/api/question?keyword=&isDeleted=true') >= 0
			console.log(isDeleted)
			return {
				code: 0,
				msg: 'ok',
				data: {
					list: getQuestionList({isStar, isDeleted}), // 问卷列表
					total: 100, // 问卷总数
				}
			}
		}
	}
]