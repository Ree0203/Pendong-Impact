const modal = document.querySelector('.uni-modal');
const modalIcon = document.querySelector('.uni-modal-icon');
const modalMessage = document.querySelector('.uni-modal-message');
let modalTimer;

function showModal(status, message) {
    if (modalTimer) {
        clearTimeout(modalTimer);
    }

    modal.style.display = 'none';
    modal.classList.remove('show', 'hide');
    void modal.offsetWidth; 

    if(status === 'error') {
        modal.style.borderColor = '#b30202';
        modal.style.color = '#b30202';
        modalIcon.src = 'Assets/cross-icon.svg';
    }
    else {
        modal.style.borderColor = '#009447';
        modal.style.color = '#009447';
        modalIcon.src = 'Assets/checkmark-icon.svg';
    }

    modal.style.display = 'flex';
    modalMessage.textContent = message;
    modal.classList.add('show');

    modalTimer = setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.add('hide');
        }, 4000);
}

modal.addEventListener('animationend', hideModal);

function hideModal(e) {
    if(e.animationName === 'hideModal') {
        modal.style.display = 'none';
    }
}