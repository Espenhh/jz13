jz.utils.shuffle = function(array) {
    var i = array.length, j, tempi, tempj;
    if(i === 0) return false;
    while(--i) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        tempi = array[i];
        tempj = array[j];
        array[i] = tempj;
        array[j] = tempi;
    }
    return array;
};

jz.utils.addSupportClasses = function() {
    var mobile   = jz.utils.agent("Android", "webOS", "iPhone", "iPod", "BlackBerry", "IEMobile");
    var handheld = jz.utils.agent("iPad", "Tablet") || mobile;
    if(mobile)   $("html").addClass("support-mobile");
    if(handheld) $("html").addClass("support-handheld");
    $("html").addClass("loaded");
};

jz.utils.agent = function() {
    return _.any(_.toArray(arguments), function(s) {
        return !!navigator.userAgent.match(s);
    });
};

jz.utils.urlify = function(string) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return string.replace(exp, "<a href='$1'>$1</a>");
};

jz.utils.date = function(year, month, day, hour, min) {
    return new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10),
        parseInt(hour, 10) - 2, parseInt(min, 10)));
};

jz.utils.ms = function(endDate) {
    var startDate = new Date();
    if (endDate < startDate) return "kLO1djacsfg";
    else return endDate - startDate;
};

jz.utils.join = function(array) {
    return _.reduce(array, function(acc, next) { return (acc && acc + ", ") + next; }, "");
};

jz.utils.slug = function(str) {
    return 'slug-' + str.replace(/[ ]+/g, "-").toLowerCase();
};

jz.utils.title = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

jz.utils.paragraphs = function(str) {
    return "<p>" + str.replace(/\n\n/g, "</p><p>") + "</p>";
};
