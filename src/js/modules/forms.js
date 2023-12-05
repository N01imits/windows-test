import { checkNumInputs } from './checkNumInputs.js';

export const forms = state => {
	const forms = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');

	checkNumInputs('input[name="user_phone"]');

	const messages = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так...',
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = messages.loading;

		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});

		return await result.text();
	};

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = '';
		});
	};

	const formDataToJson = formData => {
		return JSON.stringify(Object.fromEntries(formData));
	};

	forms.forEach(form => {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.append(statusMessage);

			const formData = new FormData(form);
			if (form.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			const jsonData = formDataToJson(formData);

			postData('https://postsimpleserver.onrender.com/api/data', jsonData)
				.then(result => {
					console.log(result);
					statusMessage.textContent = messages.success;
				})
				.catch(() => (statusMessage.textContent = messages.failure))
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};
