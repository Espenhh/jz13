jz.api.cache = {};

jz.api.get = function(url) {
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

jz.api.sessions = function() {
    var def = new $.Deferred();
    jz.api.get("/api/sessions").then(function(data) {
        _.each(data, function(d) {
            d.slugs = _.map(d.keywords, jz.utils.slug);
            d.names = _.pluck(d.speakers, "name").join(", ");
        });
        var c = _.chain(data), parsed = {
            tags:    c.pluck("keywords").flatten().uniq().value(),
            langs:   c.pluck("lang").uniq().value(),
            levels:  c.pluck("level").uniq().value(),
            formats: c.pluck("format").uniq().value(),
            sessions: data
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
            def.resolve(def);
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
