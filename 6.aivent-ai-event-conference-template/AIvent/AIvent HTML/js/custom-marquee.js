$(function(){
    $('.de-marquee-list-1').marquee({
        direction: 'right',
        duration: 60000,
        gap: 0,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });

    $('.de-marquee-list-2').marquee({
        direction: 'left',
        duration: 60000,
        gap: 0,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });

});