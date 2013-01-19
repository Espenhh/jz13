window.jz = {
    utils: {},
    routes: {},
    data: {}
};

jz.utils.shuffle = function(array) {
    var i = array.length, j, tempi, tempj;
    if ( i == 0 ) return false;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        tempi = array[i];
        tempj = array[j];
        array[i] = tempj;
        array[j] = tempi;
    }
    return array;
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
    jz.routes.go();
});

jz.data.partners = [
    ["Systek", "systek_2012.jpg", "http://www.systek.no/"],
    ["Arktekk", "arktekk_2012.jpg", "http://www.arktekk.no/"],
    ["NETS", "nets_2012.jpg", "http://www.nets.no/"],
    ["Marcello", "marcello_2012.jpg", "http://www.marcello.no/"],
    ["Evry", "edb_int_2012.jpg", "http://www.evry.com/"],
    ["Visme", "visma_2012.jpg", "http://www.visma.no/"],
    ["Bekk", "bekk_2012.jpg", "http://www.bekk.no/"],
    ["Computas", "computas_2012.jpg", "http://www.computas.no/"],
    ["jPro", "jpro_2012.jpg", "http://www.jpro.no/"],
    ["Computas", "nith_2012.jpg", "http://nith.no/"],
    ["Steria", "steria_2012.jpg", "http://www.steria.no/"],
    ["Kantega", "kantega_2012.jpg", "http://www.kantega.no/"],
    ["Iterate", "iterate_2012.jpg", "http://www.iterate.no/"],
    ["Conax", "conax_2012.jpg", "http://www.conax.no/"],
    ["Microsoft", "microsoft_2012.jpg", "http://www.microsoft.no/"],
    ["KnowIT", "knowit_2012.jpg", "http://www.knowit.no/"],
    ["Mesan", "mesan_2012.jpg", "http://www.mesan.no/"],
    ["Norgesgruppen", "norgesgruppen_2012.jpg", "http://www.norgesgruppen.no/"],
    ["Bouvet", "bouvet_2012.jpg", "http://www.bouvet.no/"],
    ["Kodemaker", "kodemaker_2012.jpg", "http://www.kodemaker.no/"],
    ["Accenture", "accenture_2012.jpg", "http://www.accenture.no/"],
    ["Cap Gemini", "capgemini_2012.jpg", "http://www.capgemini.no/"],
    ["Cisco", "cisco_2012.jpg", "http://www.cisco.com/"],
    ["Ciber", "ciber_2012.jpg", "http://www.ciber.no/"],
    ["Programutviling", "programutvikling_2012.jpg", "http://www.put.no/"],
    ["Itera", "itera_2012.jpg", "http://www.iteraconsulting.no/"],
    ["Webstep", "wepstep_2012.jpg", "http://www.webstep.no/"],
    ["Miles", "miles_2012.jpg", "http://www.miles.no/"],
    ["Finn.no", "finn_2012.jpg", "http://www.finn.no"]
];

