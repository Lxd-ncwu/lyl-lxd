module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue' : '/',
	devServer: {
		port: 9528
	}
}