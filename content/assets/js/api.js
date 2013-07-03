jz.api.tweets = function() {
    return jz.api.get("/api/tweets");
};

jz.api.sessions = function() {
    return jz.api.get("/api/sessions");
};

jz.api.get = function(url) {
    return $.get(url);
};
