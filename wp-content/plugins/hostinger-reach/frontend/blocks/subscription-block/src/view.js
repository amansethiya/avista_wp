document.addEventListener('DOMContentLoaded', function() {
	const translations = hostinger_reach_subscription_block_data.translations;
	const formSelector = '.hostinger-reach-block-subscription-form';
	const forms = document.querySelectorAll(formSelector);
	forms.forEach(form => {
		const messageEl = form.querySelector('.reach-subscription-message');
		const iconEl = form.querySelector('.reach-subscription-message__icon');
		const textEl = form.querySelector('.reach-subscription-message__text');
		const fieldsEl = form.querySelector('.hostinger-reach-block-form-fields');
		form.addEventListener('submit', function(e) {
			e.preventDefault();

			const submitBtn = form.querySelector('button[type="submit"]');
			const formData = new FormData(form);
			const data = {};

			formData.forEach((value, key) => {
				if (key.includes('.')) {
					const [ mainKey, subkey ] = key.split('.');

					if ( ! data[mainKey] ) {
						data[mainKey] = {};
					}

					data[mainKey][subkey] = value;
				} else {
					data[key] = value;
				}
			});

			submitBtn.disabled = true;

			fetch(hostinger_reach_subscription_block_data.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': hostinger_reach_subscription_block_data.nonce,
				},
				body: JSON.stringify(data)
			})
				.then(async response => {
					messageEl.style.display = 'flex';
					form.reset();

					if (response.ok) {
						textEl.textContent = translations.thanks;
						messageEl.classList.add('is-success');
						fieldsEl.style.display = 'none';
						iconEl.style.display = 'block';
					} else {
						const data = await response.json();
						if ( data.errors ) {
							textEl.textContent = data.errors;
							messageEl.style.display = 'block';
							messageEl.classList.add('is-error');
							submitBtn.disabled = false;
						} else {
							throw new Error();
						}

					}
				})
				.catch(err => {
					messageEl.textContent = translations.error;
					messageEl.style.display = 'block';
					submitBtn.disabled = false;
				});
		});
	});
});
