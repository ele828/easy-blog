var moment = require('moment');
var markdown = require( "markdown" ).markdown;

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

exports.markdownParser = function(md) {
	return markdown.toHTML(md);
}