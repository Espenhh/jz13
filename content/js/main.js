/*global window, navigator, jz, $, _ */

window.jz = {
    utils: {},
    routes: {},
    data: {}
};

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
};

jz.utils.agent = function() {
    return _.any(_.toArray(arguments), function(s) {
        return !!navigator.userAgent.match(s);
    });
};

jz.routes.go = function() {
    var path = window.location.pathname.replace(/\/$/, "").split(".")[0];
    var file = _.last(path.split("/")) || "index";
    var name = !(/^[a-z0-9_\-]+$/i).test(file) ? "index" : file;
    if(jz.routes[name]) jz.routes[name]();
};

jz.routes.partners = function() {
    var partners = jz.utils.shuffle(jz.data.partners);
    $("#partners").empty();
    _.each(partners, function(partner, i) {
        $("#partners").prepend($("<a />")
            .attr("href", partners[i][2]).attr("target", "_blank")
            .html($("<img />")
                .attr("src", "img/partners/" + partners[i][1])
                .attr("alt", partners[i][0])));
    });
};

$(function() {
    jz.utils.addSupportClasses();
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
    ["Computas", "nith_2012.jpg", "http://nith.no/"],
    ["Conax", "conax_2012.jpg", "http://www.conax.no/"],
    ["Conduct", "conduct_2012.jpg", "http://www.conduct.no"], //TODO
    ["Finn.no", "finn_2012.jpg", "http://www.finn.no"],
    ["Inmeta", "inmeta_2012.jpg", "http://www.inmetacrayon.no/"], //TODO
    ["Itera", "itera_2012.jpg", "http://www.iteraconsulting.no/"],
    ["jPro", "jpro_2012.jpg", "http://www.jpro.no/"],
    ["Kantega", "kantega_2012.jpg", "http://www.kantega.no/"],
    ["KnowIT", "knowit_2012.jpg", "http://www.knowit.no/"],
    ["Kodemaker", "kodemaker_2012.jpg", "http://www.kodemaker.no/"],
    ["Marcello", "marcello_2012.jpg", "http://www.marcello.no/"],
    ["Mesan", "mesan_2012.jpg", "http://www.mesan.no/"],
    ["Microsoft", "microsoft_2012.jpg", "http://www.microsoft.no/"],
    ["Miles", "miles_2012.jpg", "http://www.miles.no/"],
    ["NITH", "nith_2012.jpg", "http://www.nith.no/"], //TODO
    ["Programutvikling", "programutvikling_2012.jpg", "http://www.put.no/"],
    ["Skatteetaten", "skatteetaten_2012.jpg", "http://www.skatteetaten.no/"], //TODO
    ["Steria", "steria_2012.jpg", "http://www.steria.no/"],
    ["Systek", "systek_2012.jpg", "http://www.systek.no/"],
    ["ViaNett", "vianett_2012.jpg", "http://www.vianett.no/"],
    ["Visma", "visma_2012.jpg", "http://www.visma.no/"],
    ["Webstep", "wepstep_2012.jpg", "http://www.webstep.no/"]

    //["Evry", "edb_int_2012.jpg", "http://www.evry.com/"],
    //["Computas", "computas_2012.jpg", "http://www.computas.no/"],
    //["Iterate", "iterate_2012.jpg", "http://www.iterate.no/"],
    //["Norgesgruppen", "norgesgruppen_2012.jpg", "http://www.norgesgruppen.no/"],
    //["Bouvet", "bouvet_2012.jpg", "http://www.bouvet.no/"],
];

