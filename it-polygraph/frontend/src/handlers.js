export function LoadHandlers() {

    const be_proactive_link = document.querySelector("#open-beproactive");
    const be_proactive_email = document.querySelector("#open-beproactive-email");

    be_proactive_link.addEventListener('click', (event) => {
        event.preventDefault();
        openurl('https://beproactive.gr');
    }, false);

    be_proactive_email.addEventListener('click', (event) => {
        event.preventDefault();
        openemail('support@beproactive.gr');
    }, false);
}