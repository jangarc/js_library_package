
// 語系
var language = {
	default: 'en',
	list: {
		en: {
			run_code: 'run JS code',
			run_log: 'run log'
		},
		tw: {
			run_code: '執行JS代碼',
			run_log: '執行結果'
		},
	},
	init: function (lang) {
		lang = lang || this.default;

		if (Object.keys(this.list).indexOf(lang) == -1)
			lang = this.default;

		console.log(this.list[lang]);

		return this.list[lang];
	}
};

// override console.log
/*
(function(){
	if(window.console && console.log)
  {
  	var log = console.log;
    console.log = function(){
      log.apply(this, arguments);
      return Array.prototype.slice.call(arguments);
    };
  }
})();
*/

// console view example
var example = {
	logIndex: 1, // 執行編號
	type: 'sendToBox',
	log: function (code) {
        var self = this;
		code = code.trim();
		var infoArr = [
			'# ' + self.lang.run_code + ' ( ' + this.logIndex + ' ) : ',
			'\n--JS CODE---------------------------\n',
			code,
			'\n----------------------------------------\n',
			'>> ' + self.lang.run_log + ': \n\t',
			eval(code),
			'\n##############################',
		];

		console.log.apply(this, infoArr);

		this.logIndex++;

		if (this.type == 'sendToBox') {
			this.sendToBox(infoArr.join('').replace(/\n/ig, '<br />'));
		}

		return infoArr;
	},
	sendToBox: function (info) {
		var newLi = this.ctrl.template.clone();
		newLi.html(info);
		this.ctrl.logbox.append(newLi);
	},
	init: function () {

		var self = this;
        
        // 設定控件及模版
		var ctrl = self.ctrl = {
			logbox: $('#log'),
			template: $('#log li').clone()
		};
		ctrl.logbox.html('');

        // 設定語系
        self.lang = language.init('tw');

	}
};


//example.init();