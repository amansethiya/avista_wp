(function () {
	function isOptinMonsterSubmitUrl(url) {
		if (!url) {
			return false;
		}

		try {
			const u = new URL(url, window.location.href);
			return u.hostname === "api.omappapi.com" && u.pathname.startsWith("/v2/optin/");
		} catch (e) {
			return false;
		}
	}

	function getFormId(url) {
		const match = url.match(/\/optin\/([^/?#]+)/);
		return match ? match[1] : null;
	}

	function forwardToWP(formId, data) {
		if (
			!data ||
			!window?.hostinger_reach_optinmonster_data?.nonce ||
			!window?.hostinger_reach_optinmonster_data?.restUrl) {
			return;
		}
		const payload = JSON.parse(data);
		fetch(window.hostinger_reach_optinmonster_data.restUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": window.hostinger_reach_optinmonster_data.nonce
			},
			body: JSON.stringify({...payload, formId}),
			credentials: "same-origin",
		}).catch(function () {
			console.error("Failed to forward OptinMonster data to Reach");
		});
	}

	/**
	 * Patch XHR request from OptinMonster to forward a copy to WP
	 * to send it to Reach.
	 **/
	const OriginalXHR = window.XMLHttpRequest;
	if (!OriginalXHR) return;
	window.XMLHttpRequest = function () {
		const xhr = new OriginalXHR();

		let requestUrl = "";
		const originalOpen = xhr.open;
		xhr.open = function (method, url) {
			requestUrl = String(url || "");
			return originalOpen.apply(this, arguments);
		};
		const originalSend = xhr.send;
		xhr.send = function (body) {
			if (isOptinMonsterSubmitUrl(requestUrl)) {
				forwardToWP(getFormId(requestUrl), body);
			}

			return originalSend.apply(this, arguments);
		};

		return xhr;
	};

	window.XMLHttpRequest.prototype = OriginalXHR.prototype;
})();
