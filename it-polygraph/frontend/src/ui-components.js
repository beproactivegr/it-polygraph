import * as bootstrap from 'bootstrap';
import {v4 as uuid} from 'uuid';

export function ShowToast(toastID) {

    let tt = document.getElementById(toastID);

    if (tt == null) {
        return false;
    }

    let toast1 = new bootstrap.Toast(tt);
    toast1.show();

    return true;
}

export function CreateInfoToast(title, message, show = true, append = true) {

    return CreateToast(uuid(), title, message, 'info', show, append);
}

export function CreateWarnToast(title, message, show = true, append = true) {

    return CreateToast(uuid(), title, message, 'warn', show, append);
}

export function CreateErrorToast(title, message, show = true, append = true) {

    return CreateToast(uuid(), title, message, 'error', show, append);
}

export function CreateRandomIDToast(title, message, show = true, append = true) {

    return CreateToast(uuid(), title, message, 'info', show, append);
}

export function CreateToast(toastID, title, message, type, show = true, append = true) {

    let toastContainerID = 'toastcontainer';
    let container = document.getElementById(toastContainerID);
    if (container == null) {
        return false;
    }

    let icon = ''

    switch (type) {
        case "info":
            icon = '<i class="fas fa-circle-info"></i>&nbsp';
            break;
        case "error":
            icon = '<i class="fas fa-xmark"></i>&nbsp';
            break;
        case "warn":
            icon = '<i class="fas fa-triangle-exclamation"></i>&nbsp';
            break;
        default:
            icon = '<i class="fas fa-circle-info"></i>&nbsp';
    }

    let data = `
        <div id="${toastID}" class="toast" data-bs-delay="8000" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <i class="fas fa-circle-info"></i>&nbsp
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

    if (show === true) {
        ShowToast(toastID);
    }

    return true;
}