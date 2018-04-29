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
(function addPop_upOtherMenu() {
    $('.comments__other').on('click', function () {
       $(this).toggleClass('open-popup');
    });
    $(document).mouseup(function (e){
        var otherMenu = $(".other-menu");
        if (!otherMenu.is(e.target) && $('.comments__other').hasClass('open-popup') && otherMenu.has(e.target).length === 0) {
            $('.comments__other').removeClass('open-popup');
        }
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
    $('.minutes-input').mask("ab", {
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
    });
        $('.deadline-datapicker-wrapper').append($('.deadline'));
})();

(function validateChangeForm() {
        $('#change-form').validate();
    })();

(function OpenEditComments() {
    $('.comments__answer, .other-menu__edit, .add-comment').on('click', function () {

        var thisEditBlock = $(this).parents('.comments__item').find('.comments-edit');
        var thisItem = $(this).parents('.comments__item-wrapper');
        var addCommentBlock = $('.comments__add-comment');
        var addCommentBlockWrapper = $('.comments__add-comment .comments__item-wrapper');
        var addCommentBlockCommentsEdit = $('.comments__add-comment .comments-edit');

            if ($(this).hasClass('other-menu__edit')) {

                thisEditBlock.slideDown(300);
                addCommentBlock.slideUp(300);
            } else if ($(this).hasClass('comments__answer')) {
                addCommentBlockWrapper.hide(0);
                addCommentBlockCommentsEdit.slideDown(300);
            } else if ($(this).hasClass('add-comment')) {

                thisItem.hide(0);
                thisEditBlock.slideDown(300);
            }
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
