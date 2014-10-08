 $(document).ready(function() {

    /* ============= social nav ============= */

    var $sidebar   	= $("#socials"),

    $window    		= $(window),
    offset     		= $sidebar.offset(),
    topPadding 		= 250;

    $window.scroll(function() {

        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });

        } else {

            $sidebar.stop().animate({
                marginTop: 0
            });

        }

    });

}); // FIN
