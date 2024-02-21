const Mock = require('mockjs')
const Random = Mock.Random

const getQuestionList = (option = {}) => {
	const {length = 10 , isStar = false, isDeleted = false} = option
	console.log(length, 'aaaa')
	const questionList = []

	for(let i = 0; i < length; i ++) {
		const item = {
			_id: Random.id(),
			title: Random.ctitle(),
			isPublished: Random.boolean(),
			isStar,
			answerCount: Random.natural(50, 100), // 生成50~100之间的自然数
			createdAt: Random.datetime(),
			isDeleted
		}

		questionList.push(item)
	}

	return questionList
}

// 导出
module.exports = getQuestionList