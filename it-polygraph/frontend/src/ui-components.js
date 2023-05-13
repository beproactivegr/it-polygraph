import * as bootstrap from 'bootstrap';

export function ShowToast(toastID) {

    let tt = document.getElementById(toastID);

    if (tt == null) {
        return false;
    }

    let toast1 = new bootstrap.Toast(tt);
    toast1.show();

    return true;
}

export function CreateToast(toastID, title, message, toastContainerID, append = true) {

    let container = document.getElementById(toastContainerID);
    if (container == null) {
        return false;
    }

    let data = `
        <div id="${toastID}" class="toast" data-bs-delay="8000" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <i class="fas fa-circle-info"></i>&nbsp;
            <strong class="me-auto">${title}</strong>
            <small class="text-muted"></small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            ${message}
          </div>
        </div>`;

    if (append === true) {
        container.innerHTML += data;
    } else {
        container.innerHTML = data;
    }

    return true;
}