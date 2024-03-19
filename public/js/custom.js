// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});

// date picker
$(function () {
    $("#inputDate").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});

// owl carousel slider js
$('.team_carousel').owlCarousel({
    loop: true,
    margin: 15,
    dots: true,
    autoplay: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            margin: 0
        },
        576: {
            items: 2,
        },
        992: {
            items: 3
        }
    }
})

// login and logout
function toggleLogin() {
    $.ajax({
        url: '/check-login',
        method: 'GET',
        success: function (data) {
            if (data.loggedIn) {
                handleLogout();
            } else {
                window.location.href = '/login';
            }
        },
        error: function () {
            console.error('Error checking login status');
        }
    });
}

function handleLogout() {
    $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data) {
            if (data.success) {
                location.reload();
            }
        },
        error: function () {
            console.error('Error logging out');
        }
    });
}

$(document).ready(function () {
    $.ajax({
        url: '/check-login',
        method: 'GET',
        success: function (data) {
            if (data.loggedIn) {
                $('#user-email').html(data.userEmail);
                $('#login-logout-text').html('Logout');
            } else {
                $('#user-email').html('');
                $('#login-logout-text').html('Login');
            }
        },
        error: function () {
            console.error('Error checking login status');
        }
    });
});