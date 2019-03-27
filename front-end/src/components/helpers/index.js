function padLeft(str, pad) {
    str = "" + str;
    if (typeof pad === "undefined") {
        pad = "00";
    }
    return pad.substring(0, pad.length - str.length) + str
}
const times_ago = (timestamp) => {
    let date = (new Date(timestamp).getTime()) / 1000;
    let today = (new Date().getTime()) / 1000;
    let times_ago = today - date;
    let time;
    let unix = '';
    if (times_ago < 60) {
        time = 'Vài s';

    } else if (times_ago < 60 * 60) {
        time = Math.round(times_ago / 60);
        unix = ' phút';
    } else if (times_ago < 3600 * 24) {
        time = Math.round(times_ago / 3600);
        unix = ' giờ';
    } else if(times_ago < 3600 * 24 * 30) {
        time = Math.round(times_ago / (3600* 24));
        unix = ' ngày';
    } else if(times_ago < 3600 * 24 * 30 * 12) {
        time = Math.round(times_ago /(3600 * 24 * 30));
        unix = ' tháng';
    } else {
        time = Math.round(times_ago / (3600 * 24 * 30 * 12));
        unix = ' năm';
    }
    return time+unix;

}
function custom_date(timestamp, format) {
    if (!format) {
        format = "dd/mm/yyyy";
    }
    let today = new Date();
    let date = new Date(timestamp * 1000);


    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let weekday = date.getDay();
    let day = '';
    let days = ["Chủ Nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    if (weekday == today.getDay()) {
        day = 'Hôm nay';
    } else {
        day = days[weekday];
    }

    return format.replace("day", day).replace("hh", padLeft(hours)).replace("ii", padLeft(minutes)).replace("dd", padLeft(dd)).replace("mm", padLeft(mm)).replace("yyyy", yyyy);
}

module.exports = {
    custom_date,
    times_ago
};