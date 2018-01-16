var bookedDays = [];
var btnReservation;
jQuery(document).ready(function () {
    btnReservation = $('#btn-reservation');

    //нажатие на кнопку бронирования
    btnReservation.on('click', function () {
        var chosenDays = [];
        $('.chosen').each(function (index, elem) {
            chosenDays.push(elem.getAttribute('data-id'));
        });
        unbindDays();
        $('#success-message').removeClass('hidden');
        btnReservation.addClass('hidden');
        $.get('addBookedDays.php', {
            bookedDays: chosenDays
        });
    });

    //анимация кнопки при наведении
    btnReservation.hover(function () {
        $('.btn-shadow').addClass("btn-shadow-top");
        $('.btn-shadow').removeClass("btn-shadow-bottom")
        btnReservation.css("top", "1px");
    }, function () {
        $('.btn-shadow').addClass("btn-shadow-bottom");
        $('.btn-shadow').removeClass("btn-shadow-top")
        btnReservation.css("top", "0");
    });


    getBookedDay();



});


//отвязывай события нажатия
function unbindDays() {
    $('.calendar td').off('click');
}


//красим в красный бронь
function setBookedDay(days) {
    days.forEach(element => {
        $(".calendar td[data-id='" + element + "']").addClass("booked");
    });
}

//получаем данные с сервера GET
function getBookedDay() {
    $.get("getBookedDays.php",
        function (data) {
            setBookedDay(data);
            bindFreeDay();
        }, 'json');
}

function getFreeDays() {
    return $(".calendar td").not(".inactive").not(".booked");
}

//возвращает количество выбранных дней
function getCountChosen() {
    return $(".calendar .chosen").length;
}

//привязка click к свободным дням
function bindFreeDay() {
    getFreeDays().on('click', function (e) {
        if ($(this).hasClass("chosen")) {
            $(this).removeClass("chosen");
        } else {
            $(this).addClass("chosen");
        }

        if (getCountChosen() === 0) {
            btnReservation.addClass("collapse");
        } else {
            btnReservation.removeClass("collapse");
        }
    });
}