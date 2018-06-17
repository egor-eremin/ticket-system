$(document).ready(function () {

function addTabs(tabbed_selector) {
    // Get relevant elements and collections
    var tabbed = document.querySelector(tabbed_selector);
    var tablist = tabbed.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabbed.querySelectorAll('[id^="section"]');

    // The tab switching function
    var switchTab = function switchTab(oldTab, newTab) {
        newTab.focus();
        // Make the active tab focusable by the user (Tab key)
        newTab.removeAttribute('tabindex');
        // Set the selected state
        newTab.setAttribute('aria-selected', 'true');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        // Get the indices of the new and old tabs to find the correct
        // tab panels to show and hide
        var index = Array.prototype.indexOf.call(tabs, newTab);
        var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
        panels[oldIndex].hidden = true;
        panels[index].hidden = false;
    };

    // Add the tablist role to the first <ul> in the .tabbed container
    tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation');

        // Handle clicking of tabs for mouse users
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });

        // Handle keydown events for keyboard users
        tab.addEventListener('keydown', function (e) {
            // Get the index of the current tab in the tabs node list
            var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            // Work out which key the user is pressing and
            // Calculate the new tab's index where appropriate
            var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
            if (dir !== null) {
                e.preventDefault();
                // If the down key is pressed, move focus to the open panel,
                // otherwise switch to the adjacent tab
                dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
            }
        });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        var id = panel.getAttribute('id');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
};
(function addCommentTabs() {
    if ($('div').is('.ticket-body__footer')) {
        addTabs('.tabbed');
    }
})();
(function createClientCardTabs() {
        if ($('div').is('.client-card__tabs')) {
            addTabs('.tabbed');
        }
})();
(function createClientCardTabs() {
        if ($('div').is('.document-tabs')) {
            addTabs('.tabbed');
        }
})();
(function addPopupOtherMenu() {
    $(document).on('click', '.comments__other', function () {
        if ($(this).hasClass('open-popup')) {
            $(this).removeClass('open-popup');
            $('.close-wrapper-for-comments').remove();
        } else {
            $(this).addClass('open-popup');
            $('body').append('<div class="close-wrapper-for-comments"></div>');
        }
    });

    $(document).on('click', '.close-wrapper-for-comments', function () {
        $('.comments__other').removeClass('open-popup');
        $(this).remove();
    });
})();
(function createCustomSelect() {
    CustomSelect('.custom-select',"Выберите категорию",'.custom-select-wrapper');
    CustomSelect('.edit-information__select',"Выберите тариф",'.custom-select-wrapper');
    CustomSelect('.responsible-select',"Ответственный",'.responsible-select-wrapper');
    CustomSelect('.tester-select',"Тестировщик",'.tester-select-wrapper');
    CustomSelect('.director-select',"Постановщик",'.director-select-wrapper');
    CustomSelect('.select-executor',"Исполнитель",'.select-executor-wrapper');
    CustomSelect('.select-tester',"Тестировщик",'.select-tester-wrapper');
    CustomSelect('.change-status',"Статус",'.change-status-wrapper');
})();
function CustomSelect(main_selector,select_placeholder,dr_parent) {
    $(main_selector).select2({
        placeholder: select_placeholder,
        allowClear: true,
        dropdownParent:$(dr_parent),
    });
}
(function editPathFile() {
    $(".custom-input-file input").change(function(e){
        var fileName = '';
        $('.list-add-files').empty();
        if( this.files && this.files.length >= 1 )
            fileName = 'число файлов - ' + this.files.length;
         else
            fileName = e.target.value.split( '\\' ).pop();
        if( fileName )
        {$('.list-add-files').append(fileName);} else {
            $('.list-add-files').text('файл не выбран');
        }
    });
})();
(function validateAddForm() {
    $(".add-form").validate({
    });
    jQuery.extend(jQuery.validator.messages, {
        required: "Это поле необходимо заполнить",
        email:'Введите корректный E-mail',
    });
})();
(function validateEditInformationForm() {
    var nameClientEmail = $('#client-email').attr('name');
    $('.edit-information__form').validate({
    });
})();
(function addAnimationHelp() {
    $('.help-item, .help-arrow').viewportChecker({
        classToAdd:'fadeIn animation-help',
        classToRemove: 'hide',
    });
})();
(function createCustomDatepicker() {
    $('.add-form__datapicker, .custom-datpicker').datepicker({
        minDate: new Date(),
        autoClose: true,
    });
})();
(function createsEditInformation() {
    $('.button-edit-information').magnificPopup({
        items: {
            src: '.edit-information',
            type: 'inline',
        },
        tClose: 'Закрыть',
        callbacks: {
            open: function() {
              var clientName = $.trim($('.general-information__title').text()),
                  clientSite = $.trim($('.general-information__address').text()),
                  clientEmail = $.trim($('.general-information__email').text()),
                  clientNotes = $.trim($('.general-information__notes').text()),
                  clientTariff = $.trim($('.general-information__tariff').text());
              $('#client-name').val(clientName);
              $('#client-site').val(clientSite);
              $('#client-email').val(clientEmail);
              $('#client-notes').val(clientNotes);
              $('#client-tariff option').each(function () {
                  var textOption = $(this).val();
                 if (clientTariff == textOption) {
                     $('#client-tariff option').prop('selected',false);
                     $(this).prop('selected',true);
                     CustomSelect('.edit-information__select',"Выберите тариф",'.custom-select-wrapper');
                 }
              });
              $('.check-status').each(function () {
                var idCheckbox = $(this).data("id");
                    if ($(this).hasClass('checked')) {
                        $('#' + idCheckbox).prop('checked', true);
                    } else {
                        $('#' + idCheckbox).prop('checked', false);
                    }
              })
            },
        }
    });
})();
(function changeResponsibleCheckbox() {
    $('.switch-checkbox').change(function () {
        changeCheckbox(this);
    });
    $('.switch-checkbox').each(function () {
        changeCheckbox(this);
    });
    function changeCheckbox(thisSelect) {
        if ($(thisSelect).prop('checked')) {
            $(thisSelect).parent().addClass('checked')
        } else {
            $(thisSelect).parent().removeClass('checked')
        }
    }
    $('.switch-checkbox').focus(function () {
        $(this).parent().addClass('focus');
    });
    $('.switch-checkbox').blur(function () {
        $(this).parent().removeClass('focus');
    })
})();
(function addMakOnHourInput() {
    $('.hour-input').mask("a#", {
        "#": {pattern: "^[0-9]+$"},
        translation: {
            'a': {
                pattern: "[1-9]",
            }
        }
    });
})();
(function addMakOnMinutesInput() {
    $('.minutes-input, .second-input').mask("ab", {
        translation: {
            'a': {
                pattern: "[1-9]",
            },
            'b': {
                pattern: "[0-9]?",
            }
        }
    });
})();
(function swithPaindInput() {
    $('.amount + .custom-checkbox input').each(function () {
        switchColorAmount(this)
    });
    $('.amount + .custom-checkbox input').change(function () {
        switchColorAmount(this)
    });
    function switchColorAmount(thisSelect) {
        if ($(thisSelect).prop('checked')) {
            $(thisSelect).parents('.custom-checkbox').siblings('.amount').removeClass('amount_unpaid');
        } else {
            $(thisSelect).parents('.custom-checkbox').siblings('.amount').addClass('amount_unpaid');
        }
    }
})();
(function editField() {
    $('.input-editing').hide();
    $('.save-button').hide();
    $('.input-editing').mask("#", {
        "#": {pattern: "^[0-9]+$"},
    });
    $('.edit-button').on('click', function (e) {
        var editContentElement = $(this).parents('.service__cell-edit').find('.edit-content');
        var inputEditingElement = $(this).parents('.service__cell-edit').find('.input-editing');
        var saveButtonElement = $(this).siblings('.save-button');
        var contentWidth = editContentElement.width();
        var editContent = editContentElement.text();
        var bufferDiv = $(this).parents('.service__cell-edit').find('.input-buffer');
         e.preventDefault();
         bufferDiv.text(editContent);
         editContentElement.hide();
         inputEditingElement.css({'display':'inline-block'});
         inputEditingElement.width(contentWidth);
         inputEditingElement.val(editContent);
         inputEditingElement.focus();
         $(this).hide();
        saveButtonElement.show().addClass('active');

    });


    $('.input-editing').on('input',function () {
        var inputBuffer = $(this).siblings('.input-buffer');
        var inputBufferWidth = inputBuffer.width();
        if (inputBufferWidth < 100) {
            inputBuffer.text($(this).val());
            inputBufferWidth = inputBuffer.width();
            $(this).width(inputBufferWidth);
        } else {
            inputBuffer.text($(this).val());
        }
    })
})();

(function saveInput() {
    $('.save-button').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            var changeInputElement = $(this).parents('.service__cell-edit').find('.input-editing');
            var changeContentElement = $(this).parents('.service__cell-edit').find('.edit-content');
            var editButtonElemnt = $(this).siblings('.edit-button');
            changeInputElement.hide();
            changeContentElement.text(changeInputElement.val());
            changeContentElement.css('display','inline-block');
            changeContentElement.css('display','inline-block');
            editButtonElemnt.css('display','inline-block');
            $(this).addClass('active').hide();
        }
    });
})();

(function openEditTicket() {
    $('#open-edit-popup').magnificPopup({
        removalDelay:1000,
        mainClass: 'change-popup mfp-fade',
        focus: '.input-edit-ticket',
        items: {
            src: '.change-ticket',
            type: 'inline',
        },
        tClose: 'Закрыть',
    });
    $(document).on('click', '#close-change-form', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    })
})();

(function addDatapickerWithTime() {
    $('.deadline-datapicker').datepicker({
        minDate: new Date(),
        timepicker: true,
        classes: 'deadline',
        autoClose: true,
    });
        $('.deadline-datapicker-wrapper').append($('.deadline'));
})();

(function validateChangeForm() {
        $('#change-form').validate();
    })();

(function OpenEditComments() {
    $(document).on('click', '.comments__answer, .other-menu__edit, .add-comment', function () {
        var thisEditBlock = $(this).parents('.comments__item').find('.comments-edit');
        var thisItem = $(this).parents('.comments__item-wrapper');
        var addCommentBlock = $('.comments__add-comment');
        var addCommentBlockWrapper = $('.comments__add-comment .comments__item-wrapper');
        var addCommentBlockCommentsEdit = $('.comments__add-comment .comments-edit');
        var allCommentEdit = $('.comments-edit');

        if ($(this).hasClass('other-menu__edit')) {
            thisEditBlock.slideDown(300);
            thisEditBlock.find('.comments-edit__field').focus();
            addCommentBlock.slideUp(300);
            addCommentBlockCommentsEdit.find('.comments-edit__field').val();
        } else if ($(this).hasClass('comments__answer')) {
            var commentsTitle = $(this).siblings('.comments__title').text();
            addCommentBlock.show(0);
            allCommentEdit.slideUp(300);
            addCommentBlockWrapper.hide(0);
            addCommentBlockCommentsEdit.slideDown(300);
            addCommentBlockCommentsEdit.find('.comments-edit__field').val($.trim(commentsTitle) + ', ').focus();
            $('html, body').animate({ scrollTop: $('.comments__add-comment').offset().top }, 500);
        } else if ($(this).hasClass('add-comment')) {
            thisItem.hide(0);
            thisEditBlock.slideDown(300);
            thisEditBlock.find('.comments-edit__field').focus();
        }
    });
})();

(function canselButton() {
    $(document).on('click','.cancel-button', function () {
        var editBlock = $(this).parents('.comments-edit');
        var addCommentBlock = $('.comments__add-comment');
        var addCommentWrapper = $('.comments__add-comment .comments__item-wrapper');
        addCommentWrapper.show(0);
        // editBlock.slideUp(300);
        $('.comments-edit').slideUp(300);
        addCommentBlock.show(0);
        $('.comments-edit__field').val('');
    });
})();

(function callbackModal() {
    $('.callback-link').magnificPopup({
        type:"inline",
    });
})();
(function validationCallbackModal() {
    $('.callback-form').validate({});
    $('.callback-form button[type="submit"]').on('click', function () {
       if (!$('.callback-form').valid()) return false;
    });
})();
(function addPhoneMask() {
    $('.input-phone').mask('+7 (000)-000-00-00');
})();
(function addAnimation() {
    $('.convenience__information').viewportChecker({
        classToAdd: 'active',
    });
    $('.execution__step').viewportChecker({
       classToAdd: 'active',
    });
})();
    (function addDropDownMenu() {
        jQuery('.submenu').hide();
        jQuery('.header__information, .user-information').hover(function () {
            if (document.documentElement.clientWidth > 1280) {
                clearTimeout(jQuery.data(this, 'timer'));
                jQuery('.submenu', this).stop(true, true).fadeIn(300);
            }
        }, function () {
            if (document.documentElement.clientWidth > 1280) {
                jQuery.data(this, 'timer', setTimeout(jQuery.proxy(function () {
                    jQuery('.submenu', this).stop(true, true).fadeOut(300);
                }, this), 100));
            }
        });
        jQuery('.header__information, .user-information').click(function () {
            if (document.documentElement.clientWidth < 1280) {
                if (jQuery('.submenu', this).css('display') == 'none') {
                    jQuery('.submenu', this).fadeIn(300);
                } else {
                    jQuery('.submenu', this).fadeOut(300)
                }
            }
        });
        window.addEventListener("resize", function () {
            jQuery('.submenu').hide();
        }, false);
        window.addEventListener("orientationchange", function () {
            jQuery('.submenu').hide();
        }, false);
    })();
    (function animateAfterAjax() {
        $( document ).ajaxSend(function() {
            $('.preloder').addClass('animated');
        });
        $( document ).ajaxStop(function() {
            $('.preloder').removeClass('animated');
        });
    })();
    (function showNoticeMenu() {
        $('.notice').on('click', function () {
            $('.menu-saidbar').toggleClass('active');
        });
    })();
    (function closeNoticeMenu() {
        $('.menu-saidbar__close-button, .menu-saidbar__close-wrapper').on('click', function () {
           $('.menu-saidbar').removeClass('active');
        });
    })();
    $( document ).ajaxSend(function() {
        $('.preloder').addClass('animated');
    });
    $( document ).ajaxStop(function() {
        $('.preloder').removeClass('animated');
    });
    (function addPopupEditTicket() {
        $(document).on('click', '.ticket__edit', function () {
            if ($(this).hasClass('open-popup')) {
                $(this).removeClass('open-popup');
                $('.close-wrapper-for-comments').remove();
            } else {
                $(this).addClass('open-popup');
                $('body').append('<div class="close-wrapper-for-comments"></div>');
            }
        });

        $(document).on('click', '.close-wrapper-for-comments', function () {
            $('.ticket__edit').removeClass('open-popup');
            $(this).remove();
        });
    })();
    (function showLeadTimeModal() {
        $('.add-lead-time').magnificPopup({
            items: {
                src: '.lead-time-popup'
            },
            type: 'inline',
        });
    })();
    (function hideFile() {
        $(document).on('click', '.del-icon', function () {
           var thisParent = $(this).parents('.ticket-body__files-item');
            thisParent.hide(300);
            thisParent.find('.fileDelete').val("Y");
        });
    })();
    (function deleteFile() {
        $(document).on('click','.progress-wrapper', function () {
            var thisParent = $(this).parents('.media');
            thisParent.slideUp(300);
        });
    })();
    (function addTimeInformation() {
        $(document).on('click', '.tabbed-time__edit', function () {
            var thisTime = $(this).parents('.tabbed-time__item').find('.tabbed-time__hours');
            var massTime = thisTime.text().split(':');
            console.log(massTime[0]);
            $('.hour-input').val($.trim(+massTime[0]));
            $('.minutes-input').val($.trim(+massTime[1]));
            $('.second-input').val($.trim(+massTime[2]));
        });
    })();
    (function showModalEdit() {
        $('.tabbed-time__edit').magnificPopup({
            items: {
                src: '#edit-time-modal',
                type: 'inline',
            },
            tClose: 'Закрыть',
        });
    })();
    (function addDatapickerWithTime() {
        $('.add-date').datepicker({
            minDate: new Date(),
            timepicker: true,
            position: "top left",
            autoClose: true,
        });
    })();
    (function deleteTabbedTime() {
        $(document).on('click', '.tabbed-time__delete', function () {
           var thisParent = $(this).parents('.tabbed-time__item');
            thisParent.slideUp(300);
        });
    })();
    (function initWelcomSlider() {
        $('#init-welcome-slider').on('init', function(e, slick) {
            $('.main-block').addClass('animation-slide-1');
        });
        $('#init-welcome-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            asNavFor: '#init-number-slider',
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev welcome-slider__prev"><img src="images/welcome-prev.png" alt="prev"></button>',
            nextArrow: '<button type="button" class="slick-next welcome-slider__next"><img src="images/welcome-next.png" alt="next"></button>'
        });
        $(".welcome-text .slick-arrow").wrapAll("<div class='slick-button-wrapper'></div>");
        $('.slick-button-wrapper').appendTo($('.welcome-slider'));
    })();
    (function initNumberSlider() {
        $('#init-number-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false
        });
        $('#init-number-slider').appendTo('.slick-button-wrapper');
    })();


    (function addAnimationWelcomSlider() {
        $('#init-welcome-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            if (nextSlide == 0) {
                $('.main-block').addClass('animation-slide-1');
            }
            if (nextSlide == 1) {
                $('.header').addClass('animation-slide-2');
            }
        });

        $('#init-welcome-slider').on('beforeChange', function(event, slick, currentSlide) {
            if (currentSlide == 0) {
                $('.main-block').removeClass('animation-slide-1');
            }
            if (currentSlide == 1) {
                $('.header').removeClass('animation-slide-2');
            }
        });
    })();
});
BX.ready(function(){
    loader = BX('preloder');
    BX.showWait = function(node, msg) {
        $('.preloder').addClass('animated');
    };
    BX.closeWait = function(node, obMsg) {
        $('.preloder').removeClass('animated');
    };
});

