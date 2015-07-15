var WebViewJavascriptBridge = require("modules-common/webView-javascript-bridge/webView-javascript-bridge.js");

var iosFlag = !! navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

var file = {
	upload: function(param) {
		param = JSON.stringify(param);
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("uploadFile", param);
		} else {
			try {
				window.starfish.uploadFile(param);
			} catch (ee) {
				alert(ee);
			}
		}
	},

	download: function(param) {
		param = JSON.stringify(param);
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("downloadFile", param, null);
		} else {
			try {
				window.starfish.downloadFile(param);
			} catch (ee) {
				alert(ee);
			}
		}
	},

	openFile: function(param) {
		param = JSON.stringify(param);
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("openRemoteFile", param, null);
		} else {
			try {
				window.starfish.openRemoteFile(param);
			} catch (ee) {
				alert(ee);
			}
		}
	},

	getState: function(param) {
		function handle(response) {
			if (response.errcode === 0) {
				param.success && param.success(response);
			} else {
				param.error && param.error(response);
			}
		}
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("getTransferState", null, handle);
		} else {
			try {
				handle(JSON.parse(window.starfish.getTransferState(param.type)));
			} catch (ee) {
				alert(ee);
			}
		}
	},

	restartFile: function(param) {
		function handle(response) {
			if (response.errcode === 0) {
				param.success && param.success(response.data);
			} else {
				param.error && param.error(response);
			}
		}
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("restartFile", param, handle);
		} else {
			handle(window.starfish.restartFile(param));
		}
	},

	cancelFile: function(param) {
		function handle(response) {
			if (response.errcode === 0) {
				param.success && param.success(response.data);
			} else {
				param.error && param.error(response);
			}
		}
		if (iosFlag) {
			window.WebViewJavascriptBridge.callHandler("cancelFile", param, handle);
		} else {
			handle(window.starfish.cancelFile(param));
		}
	}
};

module.exports = file;