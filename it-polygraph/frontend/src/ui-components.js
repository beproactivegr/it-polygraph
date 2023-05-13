import * as bootstrap from 'bootstrap';

export function ShowToast(toastID, title, message, toastContainerID, append = false) {

    let container = document.getElementById(toastContainerID);
    if (container == null) {
        return false;
    }

    let data = `
        <div id="${toastID}" class="toast" data-bs-delay="8000" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <i class="fas fa-circle-info"></i>&nbsp;
            <strong class="me-auto">${title}</strong>
<!--            <small class="text-muted">just now</small>-->
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            ${message}
          </div>
        </div>`;

    if (append === true) {
        container.innerHTML += data;
        alert('here');
    } else {
        container.innerHTML = data;
    }

    const toast = document.getElementById(toastID)
    const toast1 = new bootstrap.Toast(toast)
    toast1.show()

    return true;
}