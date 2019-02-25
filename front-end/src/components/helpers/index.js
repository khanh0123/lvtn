function padLeft(str, pad) {
    str = "" + str;
    if (typeof pad === "undefined") {
        pad = "00";
    }
    return pad.substring(0, pad.length - str.length) + str
}
function custom_date(date,format) {
    if (!format) {
        format = "dd/mm/yyyy";
    }
    let today = new Date();
    var date = new Date(date*1000);


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
    custom_date
};