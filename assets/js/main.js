/*----------------------------------------------
Responsive Menu
----------------------------------------------*/
(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {

        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })

    
    $('.menu .nav-item.dropdown').each(function() {

        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (event) {

        if($(this).hasClass('prevent')) {
            event.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
}(jQuery));

/*----------------------------------------------
Navigation
----------------------------------------------*/
(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var navbar = $('.navbar');
    var topThreshold = 50; // Adjust this value to control when the navbar reappears

    $(document).ready(function() {
        if (position > topThreshold) {
            navbar.hide(); // Hide navbar if not near the top on page load
        }
    });

    $(window).scroll(function () {

        let scroll = $(window).scrollTop();
        let navbar = $('.navbar');

        if (!navbar.hasClass('relative')) {

            if (scroll > topThreshold) { // Scrolling down or up, but not near the top
                navbar.fadeOut('fast'); // Hide the navbar
            } else { // Near the top of the page
                navbar.slideDown('fast'); // Show the navbar
            }

            position = scroll; // Update the position for the next scroll event
		}
    });

    $('.nav-link').each(function() {
        let href = $(this).attr('href');
        if (href.length > 1 && href.indexOf('#') != -1) {
            $(this).addClass('smooth-anchor');
        }
    });

    $(document).on('click', '.smooth-anchor', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    $('.dropdown-menu').each(function () {
        let dropdown = $(this);

        dropdown.hover(function () {
            dropdown.parent().find('.nav-link').first().addClass('active');
        }, function () {
            dropdown.parent().find('.nav-link').first().removeClass('active');
        });
    });

}(jQuery));

/*----------------------------------------------
Navbar Toggler
----------------------------------------------*/
(function ($) {

    'use strict';

	$(document).ready(function() {
		$('.navbar-toggler').on('click', function() {
			var offcanvas = $('#offcanvasRight');
			if (offcanvas.hasClass('show')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});

		// Ensure the active class is correctly updated when the offcanvas is closed via other means
		$('#offcanvasRight').on('hidden.bs.offcanvas', function() {
			$('.navbar-toggler').removeClass('active');
		});

		// Immediately remove active class when backdrop is clicked
		$(document).on('click', '.offcanvas-backdrop', function() {
			$('.navbar-toggler').removeClass('active');
		});

		// Add class to navbar-toggler when scroll position is 100px
		$(window).on('scroll resize', function () {
			var scrollPosition = $(window).scrollTop();
			var isMobile = window.innerWidth < 768; // Adjust this value based on your mobile breakpoint
		
			// On resize to mobile, add 'scrolled' class
			if (isMobile) {
				if (scrollPosition < 50) {
					$('.navbar .navbar-toggler').addClass('scrolled');
				}
			}
		
			// Scroll behavior
			if (scrollPosition >= 300) {
				$('.navbar-toggler').addClass('scrolled');
			} else if (scrollPosition >= 50) {
				$('.navbar-toggler').removeClass('scrolled');
			} else if (!isMobile) { // Ensure class is removed on larger screens when scrolling back to the top
				$('.navbar-toggler').removeClass('scrolled');
			}
		});

		// Close the offcanvas when smooth anchor is clicked
		$(document).ready(function() {
			// Detect click event on 'smooth-anchor' links inside the offcanvas
			$('.offcanvas-body').on('click', '.nav-link.smooth-anchor', function() {
				// Hide the offcanvas (just like clicking the toggler to close)
				var offcanvasElement = $('#offcanvasRight');
				var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement[0]); // Get the offcanvas instance
				bsOffcanvas.hide(); // Close the offcanvas
			});
		});
	});

}(jQuery));


