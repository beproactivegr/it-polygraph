$(document).ready(function () {

    $('.dashboard-nav .dashboard-nav-list a').on('click', function () {
        $('.dashboard-nav .dashboard-nav-list').find('a.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#net-scan').on('click', function () {
        document.querySelector('#topmenucontainer').innerHTML = `
              <div class="result"><i class="fas fa-computer"></i><span class="data-result" id="hostname-result"></span></div>
              <div class="result"><i class="fas fa-network-wired"></i><span class="data-result" id="ipaddress-result"></span></div>
              <div class="result"><i class="fas fa-globe"></i><span class="data-result" id="publicaddress-result"></span></div>`;

        gethostname();
        getlocalIPaddress();
        getpublicIPaddress();
    });
});
