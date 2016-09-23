/* horizontal navigation */
$(function() {
        $('#slide-submenu').on('click', function() {
            $(this).closest('.list-group').fadeOut(function() {
                $('.horizontal-sidebar').addClass('mxw45');
                $('.horizontal-sidebar').removeClass('horizontal-sidebar-expand');
                $('div').removeClass('menu-opened');
                $('.mini-submenu').show();
            });
        });
        $('.mini-submenu').on('click', function() {
            $('.horizontal-sidebar').removeClass('mxw45');
            $('.horizontal-sidebar').addClass('horizontal-sidebar-expand');
            $(this).next('.list-group').addClass('menu-opened');
            $('.mini-submenu').hide();
        })
    })
    /* area expanded & collapsed*/
$(document).ready(function() {
    $('.mini-submenu').hide();
    $('#down-arrow').click(function() {
        $('.area-collapsed').addClass('area-expanded');
        $('.area-collapsed').removeClass('area-collapsed');
        $('#down-arrow').addClass('hide');
        $('#up-arrow').removeClass('hide');
    });
    $('#up-arrow').click(function() {
        $('.area-expanded').addClass('area-collapsed');
        $('.area-expanded').removeClass('area-expanded');
        $('#up-arrow').addClass('hide');
        $('#down-arrow').removeClass('hide');
    });
    $('#desiredatewrap').hide();
    $("input").on("click", function() {
        if ($('#desiredate:checked').length > 0) {
            $('#desiredatewrap').show("fast");
        } else {
            $('#desiredatewrap').hide("fast");
        }
    });
    $("#oneclickhide").on("click", function() {
        $(this).hide();
    });
    $("#offer-down-arrow").on("click", function() {
        $(this).addClass('hide')
    });
    $("#show-other-arrow").on("click", function() {
        $("#offer-down-arrow").removeClass('hide');
    });

    /* chatPage height adjustment */
    var chatheight = $('.chat-wrap-inner').height();
    if (chatheight > 270) {
        $('.chat-wrap-inner').css('height', '100%');
    }
    /* chatName Changes */
    $('a[href^="#chat-name"]').click(function() {
        var text = $(this).children('.chat-person').text();
        $('.chat-name').text(text);
    });
    /* input file Changes */
    $('.input-file-wrap input').on('change', function() {
        fileName = $(this).val().split('\\').pop();
        $(this).prev('span').text(fileName);
    });

    /* input file Preview Image */
    $(".file-upload").bind('change', '.file-upload', function() {
        imgx = $(this).closest('.input-file-wrap').find('.filepreview');
        readURL(this);
        $(this).closest('.input-file-wrap').addClass('no-bg');
        $(this).closest('.input-file-wrap').find('.close').removeClass('hide');
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                imgx.addClass('setPosition');
                imgx.attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".filepreview-close").click(function() {
        $(this).addClass('hide');
        targetimg = $(this).next('img');
        targetimg.attr('src', 'images/transparent-img.png');
        targetimg.removeClass('setPosition');
        $(this).closest('.input-file-wrap').removeClass('no-bg');
        $(this).closest('.input-file-wrap').find('span').text('Træk og slip din billedfil her eller tryk for at vælge fil');
    });



});

/* equal height divs */
equalheight = function(container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0;
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(window).load(function() {
    equalheight('.offer-wrap,.para-text2,.photos-wrap .para-text-sm');
    equalheight('.para-text-sm.wrapnormal');
});


$(window).resize(function() {
    equalheight('.offer-wrap,.para-text2,.photos-wrap .para-text-sm');
    equalheight('.para-text-sm.wrapnormal');

});

/* one modal box at a time*/
var modalUniqueClass = ".modal";
$('.modal').on('show.bs.modal', function(e) {
    if ($(this).hasClass('modalstick')) {
        return false;
    }
    var $element = $(this);
    var $uniques = $(modalUniqueClass + ':visible').not($(this));
    if ($uniques.length) {
        $uniques.modal('hide');
        $uniques.one('hidden.bs.modal', function(e) {
            $element.modal('show');
        });
        return false;
    }
});

// /*  jquery UI Datepicker Today Button Listener*/
// var _gotoToday = jQuery.datepicker._gotoToday;
// jQuery.datepicker._gotoToday = function(a) {
//     var target = jQuery(a);
//     var inst = this._getInst(target[0]);
//     _gotoToday.call(this, a);
//     jQuery.datepicker._selectDate(a, jQuery.datepicker._formatDate(inst, inst.selectedDay, inst.selectedMonth,
//         inst.selectedYear));
// }

// /* jquery UI Datepicker Initialization */
// $(function() {
//     $(".skin-datepicker,.skin-datepicker2").datepicker({
//         showButtonPanel: true,
//         changeMonth: true,
//         changeYear: true
//     });
// });

$('.modal').on('shown.bs.modal', function(e) {
    equalheight('.para-text2,.photos-wrap .para-text-sm');
    equalheight('.para-text-sm.wrapnormal');
});
