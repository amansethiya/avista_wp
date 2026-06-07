(function () {
	function getTargetElementId() {
		var match = (window.location.hash || '').match(/elementor-element-([\w-]+)/);
		return match ? match[1] : null;
	}

	function findInPreviewIframe(elementId) {
		const iframe = document.querySelector('#elementor-preview-iframe');
		if (!iframe || !iframe.contentWindow) return null;

		return iframe.contentWindow.document.getElementById(elementId);
	}

	function scrollToElement(elementId) {
		if (!elementId) return false;

		const target = findInPreviewIframe(elementId);
		if (!target) {
			return false;
		}

		if ( ! target ) return false;

		target.scrollIntoView({ behavior: 'smooth', block: 'center' });
		return true;
	}

	function initScroll() {
		const elementId = getTargetElementId();
		if (!elementId) return;

		let attempts = 0;

		const interval = setInterval(() => {
			if (scrollToElement(elementId) || attempts > 30) {
				clearInterval(interval);
			}
			attempts++;
		}, 500);
	}

	if (window.elementor) {
		window.elementor.on('preview:loaded', function () {
			console.log('Elementor preview loaded');
			initScroll();
		});
	} else {
		window.addEventListener('load', initScroll);
	}
})();
