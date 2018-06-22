var sliderPeriod = 5000;
var sliderSpeed  = 500;

$(document).ready(function() {

    $('.menu-mobile-link').click(function(e) {
        $('html').toggleClass('menu-mobile-open');
        e.preventDefault();
    });

    $('nav li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('nav ul li.with-submenu > a').click(function(e) {
        if ($(window).width() < 1200) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.side-menu > ul > li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.append('<span></span>');
        }
    });

    $('body').on('click', '.side-menu > ul > li > span', function() {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open closed');
            curLi.find('ul').slideToggle(100);
            e.preventDefault();
        }
    });

    $('.catalogue-item-compare > a').click(function(e) {
        $(this).parents().filter('.catalogue-item').toggleClass('in-compare');
        e.preventDefault();
    });

    $('.catalogue-item-cart > a').click(function(e) {
        $(this).parents().filter('.catalogue-item').addClass('in-cart');
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-basket-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.catalogue-recommend').each(function() {
        var curBlock = $(this);
        var curHTML = '<ul>';
        curBlock.find('.recommend-tab').each(function() {
            if($(this).data('title') != undefined)
              curHTML += '<li><a href="#">' + $(this).data('title') + '</a></li>';
        });
        curHTML += '</ul>';
        if (curHTML != '<ul></ul>') {
            $('.catalogue-recommend').show();
            curBlock.find('.recommend-menu').prepend(curHTML);
            curBlock.find('.recommend-menu li:first').addClass('active');
            if (curBlock.find('.recommend-menu li').length > 0) {
                curBlock.find('.recommend-menu').show();
                switch (curBlock.find('.recommend-menu li').length) {
                    case 2:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-2');
                        break;
                    case 3:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-3');
                        break;
                    default:
                        break;
                }
            }
            curBlock.find('.recommend-tab:first').addClass('active');
        }
    });

    $('.catalogue-recommend').on('click', '.recommend-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.recommend-menu ul li').index(curLi);
            $('.recommend-menu ul li.active').removeClass('active');
            curLi.addClass('active');

            curLi.parent().parent().next().find('.recommend-tab.active').removeClass('active');
            curLi.parent().parent().next().find('.recommend-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-photo-preview ul li').index(curLi);
            $('.product-photo-big a.active').removeClass('active');
            $('.product-photo-big a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-order .btn-submit').click(function(e) {
        windowOpen($('.product-order form').attr('action'), $('.product-order form').serialize());
        e.preventDefault();
    });

    $('.product-order .btn-reset').click(function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');

            $('.product-tabs-menu').each(function() {
                var curMenu = $(this);
                var curLink = curMenu.find('li.active a');
                $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.product-photo-big-inner a', function(e) {
        var curArray = [];
        $('.product-photo-preview a').each(function() {
            curArray.push({src: $(this).attr('rel')});
        });
        var curIndex = $('.product-photo-preview li').index($('.product-photo-preview li.active'));
        $.fancybox.open(curArray, {
                baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-controls">' +
                        '<div class="fancybox-infobar">' +
                            '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                            '<div class="fancybox-infobar__body">' +
                                '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                            '</div>' +
                            '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                        '</div>' +
                        '<div class="fancybox-buttons">' +
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="fancybox-slider-wrap">' +
                        '<div class="fancybox-slider"></div>' +
                    '</div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>',
                slideShow : false,
                fullScreen : false,
                thumbs : false
            },
            curIndex
        );
        e.preventDefault();
    });

    $('.slider').each(function() {
        var curSlider = $(this);
        var curHTML = '';
        curSlider.find('.slider-item').each(function() {
            curHTML += '<div class="slider-ctrl-item"><a href="#"><span></span><strong>' + $(this).data('title') + '</strong></a></div>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
    });

    $('.slider-content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: sliderPeriod,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: sliderSpeed,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slider-ctrl a span').stop(true, true).css({'width': 0});
        $('.slider-ctrl a.active').removeClass('active');
        $('.slider-ctrl a').eq(nextSlide).addClass('active');
        $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');
    });
    $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');

    $('body').on('click', '.slider-ctrl a', function(e) {
        var curIndex = $('.slider-ctrl a').index($(this));
        $('.slider-content').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.main-video-link').fancybox({
        baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-controls">' +
                '<div class="fancybox-infobar">' +
                    '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                    '<div class="fancybox-infobar__body">' +
                        '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                    '</div>' +
                    '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                '</div>' +
                '<div class="fancybox-buttons">' +
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                '</div>' +
            '</div>' +
            '<div class="fancybox-slider-wrap">' +
                '<div class="fancybox-slider"></div>' +
            '</div>' +
            '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
        '</div>',
        slideShow : false,
        fullScreen : false,
        thumbs : false
    });

    $('#changeDelivery').change(function(e) {
        var curValue = $(this).val();
        $('.order-delivery-item.active').removeClass('active');
        $('#delivery-' + curValue).addClass('active');
        recalcCart();
    });

    $('.basket-row-count input').on('spinstop', function(event, ui) {
        recalcCart();
    });

    $('.basket-delete a').click(function(e) {
        $(this).parents().filter('.basket-row').remove();
        recalcCart();
        e.preventDefault();
    });

    $('.compare-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }).on('setPosition', function(slick) {
        $('.catalogue-list').each(function() {
            resizeCatalogue($(this));
        });
        $('.slick-dots').css({'top': $('.compare-list-wrap .catalogue-item-inner:first').outerHeight()});
    });

    $('.recommend-tab').each(function() {
        $(this).find('.catalogue-list').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: true,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }).on('setPosition', function(slick) {
            $('.recommend-tab .catalogue-list').each(function() {
                resizeCatalogue($(this));
            });
        });
    });

    $('.basket-order-link-mobile a').click(function(e) {
        $('.checkout').addClass('step-2');
        $('html, body').animate({scrollTop: $('.checkout').offset().top});
        e.preventDefault();
    });

    $('.checkout-step-1').click(function(e) {
        $('.checkout').removeClass('step-2');
        e.preventDefault();
    });

    $('.checkout-step-2').click(function(e) {
        $('.checkout').addClass('step-2');
        e.preventDefault();
    });

    $('body').on('change', '.bx_filter_input_checkbox input', function() {
        var curField = $(this).parent();
        $('.bx_filter_input_checkbox.focus').removeClass('focus');
        curField.addClass('focus');
    });

    $('body').on('change', '.bx_filter_count_block input', function() {
        var curField = $(this);
        var curBlock = curField.parents().filter('.bx_filter_count_block');
        var curIndex = curBlock.find('input').index(curField);
        if (curField.prop('checked')) {
            curBlock.find('input:lt(' + curIndex +')').prop('checked', true);
            curBlock.find('input:gt(' + curIndex +')').prop('checked', false);
        } else {
            if (curBlock.find('input:gt(' + curIndex +'):checked').length == 0) {
                curBlock.find('input:lt(' + curIndex +')').prop('checked', false);
            } else {
                curField.prop('checked', true);
                curBlock.find('input:gt(' + curIndex +')').prop('checked', false);
            }
        }
    });

    $('.examples-item a').fancybox({
        baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-controls">' +
                '<div class="fancybox-infobar">' +
                    '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                    '<div class="fancybox-infobar__body">' +
                        '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                    '</div>' +
                    '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                '</div>' +
                '<div class="fancybox-buttons">' +
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                '</div>' +
            '</div>' +
            '<div class="fancybox-slider-wrap">' +
                '<div class="fancybox-slider"></div>' +
            '</div>' +
            '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
        '</div>',
        slideShow : false,
        fullScreen : false,
        thumbs : false
    });

    $('.examples-slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.catalogue-filter-mobile-link').click(function(e) {
        $('html').toggleClass('filter-open');
        $(window).scrollTop(0);
        e.preventDefault();
    });

    $('.catalogue-header h1').click(function(e) {
        if ($('.side-menu').length > 0) {
            $('html').toggleClass('side-menu-open');
            $(window).scrollTop(0);
        }
    });

    $('.side-menu-mobile-link').click(function(e) {
        $('html').removeClass('side-menu-open');
        e.preventDefault();
    });

    $('.catalogue-sort-link').click(function(e) {
        $('.catalogue-sort').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort').length == 0) {
            $('.catalogue-sort').removeClass('open');
        }
    });

});

$(window).on('load resize scroll', function() {
    if ($(window).scrollTop() >= $('header').outerHeight()) {
        $('html').addClass('nav-fixed');
    } else {
        $('html').removeClass('nav-fixed');
    }
});

function recalcCart() {
    var curSumm = 0;
    $('.checkout-cart .basket-row').each(function() {
        var curRow = $(this);
        curSumm += Number(curRow.find('.basket-row-count input').val()) * Number(curRow.find('.basket-row-price span').html().replace(' ', ''));
    });
    var curDeliveryPrice = 0;
    if ($('.order-delivery-item.active').length > 0) {
        if ($('.order-delivery-item.active .delivery-price').length > 0) {
            curDeliveryPrice = Number($('.order-delivery-item.active .delivery-price').html().replace(' ', ''));
        }
    }

    $('#basket-price').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('#basket-delivery').html(String(curDeliveryPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    var allSumm = curSumm + curDeliveryPrice + Number($('#basket-discount').html().replace(' ', ''));
    if (allSumm < 0) {
        allSumm = 0;
    }
    $('#basket-summ').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

$(window).on('load resize', function() {
    $('.catalogue-list').each(function() {
        resizeCatalogue($(this));
    });

    $('.product-photo-big-inner').css({'line-height': $('.product-photo-big-inner a').height() + 'px'});

    $('.product-tabs-menu').each(function() {
        var curMenu = $(this);
        var curLink = curMenu.find('li.active a');
        $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
    });
});

$(window).on('load resize scroll', function() {
    if ($(window).scrollTop() > $(window).height()) {
        $('.up-link').css({'display': 'block'});
    } else {
        $('.up-link').css({'display': 'none'});
    }
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    if (curForm.hasClass('window-form')) {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            },
            submitHandler: function(form) {
                windowOpen($(form).attr('action'), $(form).serialize());
            }
        });
    } else {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            }
        });
    }
}

function checkErrors() {
    $('.form-input').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-checkbox, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('body').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').load(function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('body').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    windowClose();
                }
            });

            $('.window form').each(function() {
                initForm($(this));
            });

            $(document).click(function(e) {
                if ($(e.target).hasClass('window')) {
                    windowClose();
                }
            });
        }
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}

function resizeCatalogue(curList) {
    curList.find('.catalogue-item-photo').css({'min-height': '0px'});

    curList.find('.catalogue-item-photo').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-photo').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px', 'line-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px', 'line-height': newHeight + 'px'});
                }
            }
        });
    });

    curList.find('.catalogue-item-text').css({'height': 'auto'});

    curList.find('.catalogue-item-text').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-text').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'height': newHeight + 'px'});
                } else {
                    otherBlock.css({'height': curHeight + 'px'});
                }
            }
        });
    });

    curList.find('.catalogue-item-ctrl').css({'min-height': 0 + 'px'});

    curList.find('.catalogue-item-ctrl').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-ctrl').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px'});
                }
            }
        });
    });

    $('.side+.content .catalogue-recommend').each(function() {
        var curBlock = $(this);
        curBlock.css({'padding-top': '0px'});
        var curPadding = curBlock.offset().top - ($('.side').offset().top + $('.side').outerHeight());
        if (curPadding < 0) {
            curBlock.css({'padding-top': -curPadding + 'px'});
        }
    });

    $('.compare-list-sep').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});
    $('.compare-list-wrap .slick-dots').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});

    curList.find('.compare-info-row').css({'min-height': 0 + 'px'});

    curList.find('.compare-info-row').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.compare-info-row').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px'});
                }
            }
        });
    });

}