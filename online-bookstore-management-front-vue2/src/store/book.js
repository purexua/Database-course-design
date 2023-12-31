import axios from 'axios'

export default {
	namespaced: true,
	actions: {
		async getBookData(context, bookType) {
			try {
				const response1 = await axios.get('http://localhost:3919/serve8080/book/page/type', {
					params: {
						type: bookType,
						pageNum: context.state.pageInfo.pageNum,
						pageSize: context.state.pageInfo.pageSize,
					}
				});
				const response2 = await axios.get('http://localhost:3919/serve8080/book/page/type/info', {
					params: {
						type: bookType,
						pageNum: context.state.pageInfo.pageNum,
						pageSize: context.state.pageInfo.pageSize,
					}
				});
				context.commit('GETBOOKDATA', {
					tableData: response1.data,
					pageInfo: response2.data
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getBookDataExist(context, data) {
			//data = {  pageNum ,pagSize,title,author,isbn,type} }
			try {
				const response1 = await axios.get('http://localhost:3919/serve8080/book/exist', {
					params: {
						pageNum: context.state.pageInfo.pageNum,
						pageSize: context.state.pageInfo.pageSize,
						title: data.title,
						author: data.author,
						isbn: data.isbn,
						type: data.type,
					}
				});
				const response2 = await axios.get('http://localhost:3919/serve8080/book/exist/info', {
					params: {
						pageNum: context.state.pageInfo.pageNum,
						pageSize: context.state.pageInfo.pageSize,
						title: data.title,
						author: data.author,
						isbn: data.isbn,
						type: data.type,
					}
				});
				context.commit('GETBOOKDATA', {
					tableData: response1.data,
					pageInfo: response2.data,
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getBookById(context, bookId) {
			//data = { bookId }
			try {
				const response1 = await axios.get(`http://localhost:3919/serve8080/book/${bookId}`, {
				});
				context.commit('GETBOOKBYID', response1.data);
			} catch (error) {
				console.error(error);
			}
		},
		updateBookAfterPay(context, data) {
			//data = { bookId, bookNum }
			axios({
				method: 'put',
				url: 'http://localhost:3919/serve8080/book/update/after/user/pay',
				params: {
					bookId: data.bookId,
					quantity: data.quantity,
				}
			}).then((response) => {
				console.log(response);
			}).catch((error) => {
				console.error(error);
			})
		},
	},
	mutations: {
		GETBOOKDATA(state, data) {
			state.tableData = data.tableData;
			state.pageInfo = data.pageInfo;
		},
		SETPAGENUM(state, pageNum) {
			state.pageInfo.pageNum = pageNum;
		},
		GETBOOKBYID(state, data) {
			state.bookById = data;
		},
	},
	state: {
		tableData: [],
		pageInfo: {
			totalpages: 0,
			totalItems: 0,
			pageNum: 1,
			pageSize: 9,
		},
		bookById: {},
	},
	getters: {},
}
