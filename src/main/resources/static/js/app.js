//conteo banner
$(document).ready(function () {
    let conteoBanner = 0;
    setInterval(function () {
        esconderBanner();
        cambiarConteoBanner();
        cambiarBanner();
    }, 5000);


    function cambiarBanner() {
        $('.banner-item').each(function (idx) {
            if (conteoBanner == idx) {
                $(this).addClass('active-banner');
            }
        });
    }

    function esconderBanner() {
        $('.banner-item').each(function (idx) {
            $(this).removeClass('active-banner');
        });
    }

    function cambiarConteoBanner() {
        conteoBanner++;
        if (conteoBanner >= $('.banner-item').length) {
            conteoBanner = 0;
        }
    }

    //navbar responsive
    $('#navbar-burger').click(function () {
        $('.navbar-collapse').slideToggle(500);
    });

    //navbar estatico
    $(window).scroll(function () {
        let pos = $(window).scrollTop();
        if (pos >= 760) {
            $('.navbar').addClass('navbar-estatico');
        } else {
            $('.navbar').removeClass('navbar-estatico');
        }
    });

});