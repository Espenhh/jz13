jz.api.cache = {};

jz.api.get = function(url) {
    if(url.indexOf("http") === 0) {
        url = "/api/" + url.split("/api/")[1];
    }
    var def = new $.Deferred();
    var data = jz.api.cache[url];
    if(data) return def.resolve(data);
    $.get(url, function(data) {
        jz.api.cache[url] = data;
        def.resolve(data);
    });
    return def;
};

jz.api.tweets = function() {
    return jz.api.get("/api/tweets");
};

jz.api.parseSession = function(d) {
    d.slugs = _.map(d.keywords, jz.utils.slug);
    d.names = _.pluck(d.speakers, "name").join(", ");
    d.imgs  = _.pluck(d.speakers, "gravatarUrl");
    d.date  = jz.date.parse(d.start);
    d.day   = parseInt(d.date.day, 10);
    d.sessionlength = d.format === "presentation" ? "60 min" : "10 min";
    d.language = d.lang === "no" ? "Norwegian" : "English";
    d.level = d.level === 'intermediate-advanced' ? 'advanced' : d.level;
    return d;
};

jz.api.groupSlots = function(day) {
    var slots = [[]], prev;

    // Group into time slots
    _.each(day, function(session) {
        var index = slots.length - 1;
        if (!slots[index]) slots[index] = [];
        if (session.format === 'lightning-talk') return slots[index].push(session);
        if (!prev || prev.start === session.start) slots[index].push(session);
        else slots.push([session]);
        prev = session;
    });

    // Divide into formats
    _.each(slots, function(slot, index) {
        slots[index] = _.groupBy(slot, 'format');
    });

    // Sort presentations by room number
    _.each(slots, function(slot, index) {
        slots[index].presentation = _.sortBy(slots[index].presentation, 'room');
    });

    return slots;
};

jz.api.groupSessions = function(data) {
    var sorted = _.chain(data).sortBy(jz.api.string_comparator('-format')).sortBy('start').groupBy('day').value();
    sorted = _.map(sorted, jz.api.groupSlots);
    return sorted;
};

jz.api.sessions = function() {
    var def = new $.Deferred();
    jz.api.get("/api/sessions").then(function(data) {
        _.each(data, jz.api.parseSession);

        // Remove invalid sessions
        data = _.reject(data, function(d) {
            return !d.start || !d.title || !d.room;
        });

        var c = _.chain(data), parsed = {
            tags: c.pluck("keywords").flatten().uniq().value(),
            langs: c.pluck("lang").uniq().value(),
            levels: c.pluck("level").uniq().value(),
            formats: c.pluck("format").uniq().value(),
            sessions: jz.api.groupSessions(data)
        };
        parsed.slugs = _.map(parsed.formats, jz.utils.slug);
        def.resolve(parsed);
    });
    return def;
};

jz.api.details = function(url) {
    var def = new $.Deferred();
    jz.api.get(url).then(function(data) {
        jz.api.template("details", data).then(function(html) {
            def.resolve(html);
        });
    });
    return def;
};

jz.api.template = function(name, data) {
    var def = new $.Deferred();
    jz.api.get("/assets/templates/" + name + ".html").then(function(html) {
        def.resolve(_.template(html)(data || {}));
    });
    return def;
};



/**
 * Olav: litt jalla? :P Er herfra: https://gist.github.com/stereobooster/2952629 
 *
 * Underscore string descending sortBy
 * usage:
 *   Sort by name ascending `_.sortBy(data, string_comparator('name'));`
 *   Sort by name descending `_.sortBy(data, string_comparator('-name'));`
 */
jz.api.string_comparator = function(param_name, compare_depth) {
    if (param_name[0] == '-') {
        param_name = param_name.slice(1),
        compare_depth = compare_depth || 10;
        return function (item) {
             return String.fromCharCode.apply(String,
                _.map(item[param_name].slice(0, compare_depth).split(""), function (c) {
                    return 0xffff - c.charCodeAt();
                })
            );
        };
    } else {
        return function (item) {
            return item[param_name];
        };
    }
};