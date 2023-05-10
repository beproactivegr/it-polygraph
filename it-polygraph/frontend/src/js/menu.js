function loadDashboard() {
    document.querySelector('#topmenucontainer').innerHTML = ``;
    document.querySelector('#main-body').innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-4 title">
                <h3>System Information</h3>
            </div>
        </div>
        <div class="row dashboard-main">
            <div class="col-12">
                <div class="row">
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Computer Hostname</b><br>
                              <i class="fas fa-computer"></i><span class="data-result" id="hostname-result">
                            </div>
                            <div class="col-5">
                              
                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Local IP Address</b><br>
                              <i class="fas fa-network-wired"></i><span class="data-result" id="ipaddress-result">
                            </div>
                            <div class="col-5">
                              
                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-6 border border-dark infobox">
                        <div class="row">
                            <div class="col-5">
                              <b>Internet IP Address</b><br>
                              <i class="fas fa-globe"></i><span class="data-result" id="publicaddress-result">
                            </div>
                            <div class="col-5">
                              
                            </div>
                            <div class="col-2">
                              <i class="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 border border-dark infobox">
                        
                    </div>
                </div>
                 <div class="row">
                    <div class="col-6 border border-dark infobox">
                        
                    </div>
                    <div class="col-6 border border-dark infobox">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    gethostname("hostname-result");
    getlocalIPaddress("ipaddress-result");
    getpublicIPaddress("publicaddress-result");
}

$(document).ready(function () {

    loadDashboard();

    $('.dashboard-nav .dashboard-nav-list a').on('click', function () {
        $('.dashboard-nav .dashboard-nav-list').find('a.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#dashboard').on('click', function () {
        loadDashboard();
    });

    $('#net-scan').on('click', function () {

        document.querySelector('#topmenucontainer').innerHTML = `
              <div class="result"><i class="fas fa-computer"></i><span class="data-result" id="hostname-result"></span></div>
              <div class="result"><i class="fas fa-network-wired"></i><span class="data-result" id="ipaddress-result"></span></div>
              <div class="result"><i class="fas fa-globe"></i><span class="data-result" id="publicaddress-result"></span></div>`;

        document.querySelector('#main-body').innerHTML = ``;

        gethostname("hostname-result");
        getlocalIPaddress("ipaddress-result");
        getpublicIPaddress("publicaddress-result");
    });
});
