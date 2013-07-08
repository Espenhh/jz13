/*global window, navigator, jz, $, _ */

$(function() {
    jz.utils.addSupportClasses();
    var path = window.location.pathname.replace(/\/$/, "").split(".")[0];
    var file = _.last(path.split("/")) || "index";
    var name = !(/^[a-z0-9_\-]+$/i).test(file) ? "index" : file;
    if(jz.routes[name]) jz.routes[name]();
});

jz.routes.index = function() {
    jz.api.tweets().then(function(tweets) {
        var tweetsDiv = $(".tweets");
        var tweet = tweets.tweets[0];
        var text = jz.utils.urlify(tweet.tweet);
        var icon = $("<i>").addClass("icon-twitter");
        var play = $("<i>").addClass("icon-play-sign");
        var next = $("<a>").addClass("next").attr("href", "https://twitter.com/javazone").html(play);
        if(tweet) $(".tweet").html($("<p>").append(icon, text, next));
    });
};

jz.routes.credits = function() {
    if($(".credits").size() === 0) return;
    $(".credits").empty().each(function(i, el) {
        var credits = jz.utils.shuffle(jz.data.credits);
        var limit = parseInt($(el).attr("data-limit"), 10) || 1000;
        _.each(credits, function(credit, i) {
            if(i + 1 > limit) return;
            var img = $("<img />").addClass("instagram").attr("src", credits[i][1]).attr("alt", credits[i][0]);
            var lnk = $("<a />").html(img).attr("href", credits[i][2]).attr("target", "_blank");
            $(el).prepend(lnk);
        });
    });
};

jz.routes.program = function() {
    var show = function(event) {
        event.preventDefault();
        $(this).toggleClass("active");
        jz.api.details($(this).attr("data-url")).then(_.bind(function(html) {
            $(this).find(".details").html(html).slideToggle(200);
        }, this));
    };
    var filter = function(event) {
        event.preventDefault();
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".intro").show();
        } else {
            $(".filters a").removeClass("active");
            $(this).addClass("active");
            $(".intro").hide();
            $(".intro." + $(this).attr("rel")).show();
        }
    };
    jz.api.sessions().then(function(data) {
        jz.api.template("filters", { filters: data.tags }).then(function(html) {
            $(".filters").html(html);
            $(".filters a").on("click", filter);
        });
        jz.api.template("sessions", { sessions: data.sessions }).then(function(html) {
            $(".program").html(html);
            $(".program li").on("click", show);
        });
    });
};

jz.routes.partners = function() {
    if($(".partners").size() === 0) return;
    $(".partners").empty().each(function(i, el) {
        var partners = jz.utils.shuffle(jz.data.partners);
        var limit = parseInt($(el).attr("data-limit"), 10) || 1000;
        _.each(partners, function(partner, i) {
            if(i + 1 > limit) return;
            var img = $("<img />").attr("src", "/assets/img/partners/" + partners[i][1]).attr("alt", partners[i][0]);
            var lnk = $("<a />").html(img).attr("href", partners[i][2]).attr("target", "_blank");
            if($(el).attr("data-internal")) $(lnk).attr("href", "/partners.html").attr("target", "");
            $(el).prepend(lnk);
        });
    });
};
