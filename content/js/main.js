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
    var path = window.location.href.replace(/\/$/, "").split(".")[0];
    var file = _.last(path.split("/")) || "index";
    var name = !(/^[a-z0-9_\-]+$/i).test(file) ? "index" : file;
    if(jz.routes[name]) jz.routes[name]();
};

jz.routes.partners = function() {
    var partners = jz.utils.shuffle(jz.data.partners);
    $("#partners").empty();
    _.each(partners, function(partner, i) {
        $("#partners").prepend($("<a />")
            .attr("href", partners[i][1]).attr("target", "_blank")
            .html($("<img />").attr("src", "img/partners/" + partners[i][0])));
    });
};

$(function() {
    jz.routes.go();
});

jz.data.partners = [
    ["systek_2012.jpg", "http://www.systek.no/"],
    ["arktekk_2012.jpg", "http://www.arktekk.no/"],
    ["nets_2012.jpg", "http://www.nets.no/"],
    ["marcello_2012.jpg", "http://www.marcello.no/"],
    ["edb_int_2012.jpg", "http://www.edb.com/"],
    ["visma_2012.jpg", "http://www.visma.no/"],
    ["bekk_2012.jpg", "http://www.bekk.no/"],
    ["computas_2012.jpg", "http://www.computas.no/"],
    ["jpro_2012.jpg", "http://www.jpro.no/"],
    ["nith_2012.jpg", "http://nith.no/"],
    ["steria_2012.jpg", "http://www.steria.no/"],
    ["kantega_2012.jpg", "http://www.kantega.no/"],
    ["iterate_2012.jpg", "http://www.iterate.no/"],
    ["conax_2012.jpg", "http://www.conax.no/"],
    ["microsoft_2012.jpg", "http://www.microsoft.no/"],
    ["knowit_2012.jpg", "http://www.knowit.no/"],
    ["mesan_2012.jpg", "http://www.mesan.no/"],
    ["norgesgruppen_2012.jpg", "http://www.norgesgruppen.no/"],
    ["bouvet_2012.jpg", "http://www.bouvet.no/"],
    ["kodemaker_2012.jpg", "http://www.kodemaker.no/"],
    ["accenture_2012.jpg", "http://www.accenture.no/"],
    ["capgemini_2012.jpg", "http://www.capgemini.no/"],
    ["cisco_2012.jpg", "http://www.cisco.com/"],
    ["ciber_2012.jpg", "http://www.ciber.no/"],
    ["programutvikling_2012.jpg", "http://www.put.no/"],
    ["itera_2012.jpg", "http://www.iteraconsulting.no/"],
    ["wepstep_2012.jpg", "http://www.webstep.no/"],
    ["miles_2012.jpg", "http://www.miles.no/"],
    ["finn_2012.jpg", "http://www.finn.no"]
];

