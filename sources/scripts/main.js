$(function(){
    $.get("https://rawgit.com/minasdev/minasdev-events/master/next-events.json", function(data){
        events = _.sortBy(data.events, "date");
        var events = _.remove(events, function(r) {
            return moment(r.date+"T22:00:00") >= moment();
        });

        renderTemplate($("#next-events"), events, {max: 4}, function(){
            var itens = $("#next-events li");
            itens.first().addClass("first");
            itens.last().addClass("last");
            $(".proximos-eventos").show();
        });
    });

    $.get("https://rawgit.com/minasdev/minasdev-events/master/minasdevbeer.json", function(data){
        events = _.sortBy(data.events, "date");
        events.reverse();

        var eventDate = new Date(events[0].date),
            todayDate = new Date();

        renderTemplate($("#minasdevbeer"), events, {}, function(){
            if(eventDate >= todayDate){
                $('.minasdev-beer-no-date-container').hide();
                $('.minasdev-beer-date-container').show();
            }
            $(".minasdev-beer").show();
        });
    });

    navBarPosition();

    $('header').addClass('show');

    $(document).on('scroll', function(){
        navBarPosition();
    });

    // Tem que ter suporte via teclado
    $(".nav-link").on('click', function(e) {
        e.preventDefault();
        var _this = $(this);
        scrollToElement(_this.attr('data-anchor'), _this.attr('data-offset'));
    });

    $('.newsletter-form').on('submit', function(){
        var emailInpt = $("#email");
        if(emailInpt.val() === "" || !validateEmail(emailInpt.val())){
            emailInpt.addClass("animate-error");
            setTimeout(function(){ emailInpt.removeClass('animate-error') }, 300);
            return false;
        }

    });

});

function renderTemplate(block, results, options, done){
    if (typeof options === 'undefined') var options = {};
    if (typeof options.max === 'undefined') options.max = 1;

    var tpl = block.html(),
        output = "";

    $.each(results, function(i,v){
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        output += _.template(tpl, v);
        return (i < (options.max - 1)) ? true : false;
    });

    block.html(output);

    done();
}

function navBarPosition() {
    if($(window).scrollTop() < 170){
        $('header').addClass('on-top');
    }else{
        $('header').removeClass('on-top');
    }
}

function scrollToElement(selector, offset){
    $('html, body').animate({
        scrollTop: $(selector).offset().top - offset
    }, 1200, 'easeInOutCubic');
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
