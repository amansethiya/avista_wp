import './notice.scss';

(function () {

	const getNotice = () => {
		return document.getElementById('hostinger-reach-add-form-notice');
	}

	const handleAction = (choice) => {
		const data = new FormData();
		data.append('action', hostinger_reach_add_form_notice_data.action);
		data.append('nonce', hostinger_reach_add_form_notice_data.nonce);
		data.append('choice', choice);

		fetch(hostinger_reach_add_form_notice_data.ajaxurl, {
			method: 'POST',
			body: data
		})
			.then(response => response.json())
			.then(result => {
				if (result?.success && result.data?.redirect_url) {
					window.location.href = result.data.redirect_url;
				}
				const notice = getNotice();
				const closer = getNotice().querySelector('.notice-dismiss');
				if ( closer ) {
					closer.click();
				}

				if ( notice ) {
					notice.style.display = 'none';
				}
			})
	}

	const init = () => {
		const notice = getNotice();

		if (!notice || !hostinger_reach_add_form_notice_data) {
			return;
		}

		const actions = notice.querySelectorAll('.hostinger-reach-action-button');
		if (actions?.length) {
			actions.forEach(( action ) => {
				action.addEventListener('click', function (e) {
					handleAction(e.target.dataset.action);
				});
			});
		}
	}

	document.addEventListener('DOMContentLoaded', init);
})();
