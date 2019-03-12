//set contributions chart
function addDays(date, daysToAdd) {
    var _24HoursInMilliseconds = 86400000;
    return new Date(date.getTime() + daysToAdd * _24HoursInMilliseconds)
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

var d = new Date();
var month = 0;
var currHour = d.getHours();
var currMonth = month - 10;
var currDay = d.getDay();
var currDate = d.getDate();
var currYear = d.getFullYear();
var lastDayThisMonth = daysInMonth(currMonth, currYear);

var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const squares = document.querySelector('.squares');
var menuMonths = [];
var count = 12;

//position last square of grid on correct day or week
var display_to_today = (364) + ((Math.floor(currDate / 7) * 7) + currDay);
if (currHour >= 10) {// display today's square with contributions only after 10am
    display_to_today = display_to_today + 1;
}
//chart function
for (var i = lastDayThisMonth; i < display_to_today; i += 1) {
    var level = Math.floor(Math.random() * 25);
    if (level === 1) {
        var popupText = 'contribution on '
    } else {
        popupText = 'contributions on '
    }

    var now = new Date();
    var flexDate = addDays(now, i - (364 + currDay));
    var contrDate = flexDate.getDate()-7 + ' ' + monthArray[flexDate.getMonth()] + ', ' + flexDate.getFullYear();
    var shortDate = flexDate.getDate() + ' ' + monthArray[flexDate.getMonth()];
    var holidays = ['21 Dec', '22 Dec', '23 Dec', '24 Dec', '25 Dec', '26 Dec', '27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', '1 Jan', '1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul', '12 Jul', '13 Jul', '14 Jul', '15 Jul', '16 Jul', '17 Jul', '18 Jul', '19 Jul', '3 Oct', '4 Oct', '5 Oct', '6 Oct', '7 Oct', '8 Oct', '9 Oct', '10 Oct', '11 Oct', '12 Oct'];
    var textInsert = `<span class="bubble-arrow">` + ` ${level} ` + popupText + contrDate + `</span></li>`;

    if (holidays.indexOf(shortDate) > -1) {//sundays and holidays
        level = 0;
        squares.insertAdjacentHTML('beforeend', `<li class="tips"><span class="bubble-arrow">0 ` + popupText + contrDate + `</span></li>`);
        if (i < 84) {
            $('.tips').addClass('short');
        }
    } else {
        squares.insertAdjacentHTML('beforeend', `<li class="tips" data-level="${level}">` + textInsert)
    }
}

while (count > 0) {
    if (currMonth < 0) {
        currMonth += 13
    }
    if (currMonth >= 12) {
        currMonth -= 12
    }
    var month = monthArray[currMonth];
    menuMonths.push(month);
    currMonth = currMonth + 1;
    count = count - 1
}
for (var j = 0; j < 12; j += 1) {
    var monthList = "<li>" + menuMonths[j] + "</li>";
    document.getElementById("months").innerHTML += monthList
}

$('.tips').hover(function () {
    console.log('wtf');
    $(this).toggleClass('show-tips');
})
