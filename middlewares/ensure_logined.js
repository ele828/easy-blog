module.exports = function(req, res, next) {
	if(req.session.logined === true) {
		next();
	} else {
		if(req.url === '/' || req.url === '/login') {
			next();
		} else {
			res.redirect('/admin');
		}
	}
}