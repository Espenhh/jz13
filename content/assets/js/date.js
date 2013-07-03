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

jz.date.duration = function(start, stop) {
    var startDate = Date.parse(start);
    var stopDate = Date.parse(stop);
    return stopDate - startDate;
};
