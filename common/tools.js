var moment = require('moment');
var md = require('markdown-it')();

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD');
  }

};

exports.markdownParser = function(text) {
	md.set({
	  html:         true,        // Enable HTML tags in source
	  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	  breaks:       false,        // Convert '\n' in paragraphs into <br>
	  linkify:      true,        // Autoconvert URL-like text to links
	  typographer:  true,        // Enable smartypants and other sweet transforms
	});
	return md.render(text);
}