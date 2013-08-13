jz.date.parse = function(date) {
    var    m = /(\d\d\d\d)-(\d\d)-(\d\d).(\d\d):(\d\d):(\d\d)/.exec(date);
    if(!m) m = /(\d\d\d\d)-(\d\d)-(\d\d)/.exec(date);
    if(!m) return "";
    return { year: m[1], month: m[2], day: m[3], hour: m[4], min: m[5], sec: m[6] };
};

jz.date.date = function(date) {
    var m = jz.date.parse(date);
    return !m ? "" : m.day + "." + m.month + " " + m.year + " " + m.hour + "." + m.min;
};

jz.date.time = function(date) {
    var m = jz.date.parse(date);
    return !m ? "" : m.hour + ":" + m.min;
};

jz.date.day = function(date) {
    var d  = (new Date(date));
    var ds = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var ms = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day   = ds[d.getDay()];
    var month = ms[d.getMonth()];
    return day + ', ' + d.getDate() + ' ' + month + ' ' + d.getFullYear();
};

jz.date.duration = function(start, stop) {
    var startDate = Date.parse(start);
    var stopDate = Date.parse(stop);
    return stopDate - startDate;
};
