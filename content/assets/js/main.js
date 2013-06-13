/*global window, navigator, jz, $, _ */

window.jz = {
    utils: {},
    routes: {},
    data: {},
    view: {},
    api: {}
};

/*         UTILS         */

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


/*         ROUTES         */

jz.routes.go = function() {
    var path = window.location.pathname.replace(/\/$/, "").split(".")[0];
    var file = _.last(path.split("/")) || "index";
    var name = !(/^[a-z0-9_\-]+$/i).test(file) ? "index" : file;
    if(jz.routes[name]) jz.routes[name]();
};

jz.routes.index = function() {
    jz.api.tweets().then(function(tweets) {
        var tweetsDiv = $(".tweets");
        var tweet = tweets.tweets[0];
        var text = jz.utils.urlify(tweet.tweet);
        var icon = $("<i>").addClass("icon-twitter");
        if(tweet) $(".tweet").html($("<p>").append(icon, text));
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


/*         VIEW         */

jz.view.partners = function() {
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




/*         API         */

jz.api.tweets = function() {
    return jz.api.get("/api/tweets");
};

jz.api.get = function(url) {
    return $.get(url);
};


$(function() {
    jz.utils.addSupportClasses();
    jz.view.partners();
    jz.routes.go();
});

jz.data.partners = [
    ["NETS", "nets_2012.jpg", "http://www.nets.no/"],
    ["Accenture", "accenture_2012.jpg", "http://www.accenture.no/"],
    ["Arktekk", "arktekk_2012.jpg", "http://www.arktekk.no/"],
    ["Bekk", "bekk_2012.jpg", "http://www.bekk.no/"],
    ["Cap Gemini", "capgemini_2012.jpg", "http://www.capgemini.no/"],
    ["Ciber", "ciber_2012.jpg", "http://www.ciber.no/"],
    ["Cisco", "cisco_2012.jpg", "http://www.cisco.com/"],
    ["NITH", "nith_2012.jpg", "http://nith.no/"],
    ["Conax", "stolt_partner_conax.jpg", "http://www.conax.no/"],
    ["Finn.no", "finn_2012.jpg", "http://www.finn.no"],
    ["Itera", "stolt_partner_itera.jpg", "http://www.iteraconsulting.no/"],
    ["jPro", "jpro_2012.jpg", "http://www.jpro.no/"],
    ["Kantega", "kantega_2012.jpg", "http://www.kantega.no/"],
    ["KnowIT", "knowit_2012.jpg", "http://www.knowit.no/"],
    ["Kodemaker", "kodemaker_2012.jpg", "http://www.kodemaker.no/"],
    ["Marcello", "marcello_2013.jpg", "http://www.marcello.no/"],
    ["Mesan", "mesan_2012.jpg", "http://www.mesan.no/"],
    ["Microsoft", "microsoft_2012.jpg", "http://www.microsoft.no/"],
    ["Miles", "miles_2012.jpg", "http://www.miles.no/"],
    ["Programutvikling", "programutvikling_2012.jpg", "http://www.put.no/"],
    ["Steria", "steria_2012.jpg", "http://www.steria.no/"],
    ["Systek", "systek_2012.jpg", "http://www.systek.no/"],
    ["ViaNett", "vianett_2013.jpg", "http://www.vianett.no"],
    ["Visma", "visma_2012.jpg", "http://www.visma.no/"],
    ["Webstep", "webstep_2012.jpg", "http://www.webstep.no/"],
    ["Skatteetaten", "skatteetaten_2012.jpg", "http://www.skatteetaten.no/"],
    ["Inmeta", "inmeta_2012.jpg", "http://www.inmetacrayon.no/"],
    ["Conduct", "conduct_2012.jpg", "http://www.conduct.no"],
    ["Computas", "computas_2012.jpg", "http://www.computas.no/"],
    ["Iterate", "stolt_partner_iterate.jpg", "http://www.iterate.no/"],
    ["Altran", "stolt_partner_altran.jpg", "http://www.altran.no/"],
    ["Decisive", "stolt_partner_decisive.jpg", "http://www.decisive.no/"],
    ["Esito", "stolt_partner_esito.jpg", "http://www.esito.no/"],
    ["Bouvet", "bouvet_2012.jpg", "http://www.bouvet.no/"]
];

// TODODODODODOD!!11one
jz.data.credits = [
    ["Navn", "http://distilleryimage4.s3.amazonaws.com/07fa19b2d14a11e2866d22000a9f137d_7.jpg", "https://twitter.com/Espenhh"],
    ["Navn", "http://distilleryimage3.s3.amazonaws.com/c904f556d14911e292d022000a1fcc15_7.jpg", "https://twitter.com/vandelan"],
    ["Navn", "http://distilleryimage8.s3.amazonaws.com/c4125a36d14711e29b6422000aa80460_7.jpg", ""],
    ["Navn", "http://distilleryimage6.s3.amazonaws.com/8874eb8ad14511e285fc22000a1f96be_7.jpg", ""],
    ["Navn", "http://distilleryimage10.s3.amazonaws.com/b900e1a8d15111e285b022000a9f15de_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage4.s3.amazonaws.com/07fa19b2d14a11e2866d22000a9f137d_7.jpg", "https://twitter.com/Espenhh"],
    ["Navn", "http://distilleryimage3.s3.amazonaws.com/c904f556d14911e292d022000a1fcc15_7.jpg", "https://twitter.com/vandelan"],
    ["Navn", "http://distilleryimage8.s3.amazonaws.com/c4125a36d14711e29b6422000aa80460_7.jpg", ""],
    ["Navn", "http://distilleryimage6.s3.amazonaws.com/8874eb8ad14511e285fc22000a1f96be_7.jpg", ""],
    ["Navn", "http://distilleryimage10.s3.amazonaws.com/b900e1a8d15111e285b022000a9f15de_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage6.s3.amazonaws.com/8874eb8ad14511e285fc22000a1f96be_7.jpg", ""],
    ["Navn", "http://distilleryimage10.s3.amazonaws.com/b900e1a8d15111e285b022000a9f15de_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""],
    ["Navn", "http://distilleryimage8.s3.amazonaws.com/c4125a36d14711e29b6422000aa80460_7.jpg", ""],
    ["Navn", "http://distilleryimage6.s3.amazonaws.com/8874eb8ad14511e285fc22000a1f96be_7.jpg", ""],
    ["Navn", "http://distilleryimage10.s3.amazonaws.com/b900e1a8d15111e285b022000a9f15de_7.jpg", ""],
    ["Navn", "http://distilleryimage1.s3.amazonaws.com/85ffef08d06911e29f1422000a1fbc0e_7.jpg", ""]
];

