const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector) {
		const triggers = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);

		const openModal = () => {
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
		};

		const closeModal = () => {
			modal.style.display = 'none';
			document.body.style.overflow = '';
		};

		triggers.forEach(trigger => {
			trigger.addEventListener('click', e => {
				if (e.target) {
					e.preventDefault();
				}
				openModal();
			});
		});

		close.addEventListener('click', closeModal);

		modal.addEventListener('click', e => {
			if (e.target === modal) {
				closeModal();
			}
		});

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});
	}

	const showModalByTime = (selector, time) => {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	};

	bindModal(
		'.popup_engineer_btn',
		'.popup_engineer',
		'.popup_engineer .popup_close',
	);
	bindModal('.phone_link', '.popup', '.popup_close');
	showModalByTime('.popup', 60000);
};

export default modals;
