// (function addAnimationSignIn() {
//     $('.button_animation').on("click", function (e) {
//         e.preventDefault();
//         $(this).addClass('button_animation-on');
//         setTimeout(function () {
//             $('.button_animation').removeClass('button_animation-on');
//         }, 400);
//     })
// })();
(function addSliderReview() {
    $('#reviews-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
    });
})();
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
(function addMainTabs() {
    addTabs('.tabbed');
})();
(function addAccordionFaq() {
    $('.faq__item-text').on('click', function () {
        var thisObject = $(this);
        if ($(this).hasClass('active')) {
            $('.faq__item-text.active + .faq__item-answer').slideUp();
            $(this).removeClass('active');
        } else {
            $('.faq__item-text').removeClass('active');
            $(this).addClass('active');
            $('.faq__item-answer').slideUp();
            $(this).siblings('.faq__item-answer').slideDown();
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: thisObject.offset().top - 20
                }, 600);
            }, 350);
        }
    });
})();
(function addToTopBottom() {
    if ($('div').is('.to-top')) {
        $(window).scroll(function () {
            var topMain = $('main').offset().top,
                topScroll = $(document).scrollTop(),
                bottomCoordinate = $('.feedback-grey-block').offset().top + 76,
                windowHeight = $(window).height(),
                bottomScroll = topScroll + windowHeight + 76;
            if (topScroll > topMain && bottomScroll < bottomCoordinate) {
                $('.to-top').addClass('to-top_fixed to-top__animate');
            } else if (bottomScroll > bottomCoordinate) {
                $('.to-top').removeClass('to-top_fixed');
            } else {
                $('.to-top').removeClass('to-top_fixed to-top__animate');
            }
        });
        $('.to-top__top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 750, 'swing');
        });
    }
})();
(function addModalSignIn() {
    $('.button-add-modal-entrance').magnificPopup({
        items: {
            src: '.open-entrance-form',
            type: 'inline',
        }
    });
})();
(function addFormTabs() {
    addTabs('.entrance__tabbed');
})();
(function openForgotPasswordForm() {
    var magnificPopup = $.magnificPopup.instance;
    $('.entrance__forget-button').on('click', function (e) {
        e.stopPropagation();
        magnificPopup.open({
            items: {
                src:'.forgot-password',
                type: 'inline',
            }
        },0);
    });
})();
(function backwardToSignIn() {
    var magnificPopup = $.magnificPopup.instance;
    $('.backward').on('click', function (e) {
        e.stopPropagation();
        magnificPopup.open({
            items: {
                src:'.open-entrance-form',
                type: 'inline',
            }
        },0);
    })
})();
(function addPhoneMask() {
    $('.input-phone').mask('+7 000-000-00-00');
})();
(function addValidationSignForm() {
    $('#sign-in-form').validate({
        rules:{
            user_phone: {
                required: true,
                minlength: 16,
            },
            user_password:{
                required: true,
            },
        },
        messages:{
            user_phone: {
                required: "Поле обязательно для заполнения",
                minlength: "Введите свой телефон",
            },
            user_password:{
                required: "Поле обязательно для заполнения",
            },
        },
    });
})();
(function addValidationRegistrationForm() {
    $('#registration-form').validate({
        rules:{
            registration_phone: {
                required: true,
                minlength: 16,
            },
            registration_password:{
                required: true,
                minlength: 5,
            },
            repeat_registration_password: {
                required: true,
                equalTo: "#registration_password"
            },
            entrance_agreement: {
                required: true,
            }
        },
        messages:{
            registration_phone: {
                required: "Поле обязательно для заполнения",
                minlength: "Введите свой телефон",
            },
            registration_password:{
                required: "Поле обязательно для заполнения",
                minlength: "Пароль должен содержать не менее 5 символов",
            },
            repeat_registration_password: {
                required: "Поле обязательно для заполнения",
                equalTo: "Пароли не совпадают",
            },
            entrance_agreement: {
                required: "",
            }
        },
    });
})();
(function addValidationRecoveryPasswordForm() {
    $('#password-recovery-form').validate({
        rules:{
            recovery_password_tel: {
                required: true,
                minlength: 16,
            },
        },
        messages:{
            recovery_password_tel: {
                required: "Поле обязательно для заполнения",
                minlength: "Введите свой телефон",
            },
        },
    });
})();
(function addValidationOnFeedbackForm() {
    $('.feedback__form').validate({
        rules:{
            'feedback_email': {
                required: true,
                email: true,
            },
            form_agreement: {
                required: true,
            },
        },
        messages:{
            'feedback_email': {
                required: "",
                email: "",
            },
            form_agreement: {
                required: "",
            }
        },
        submitHandler: function() {
            // -----AJAX------
            var magnificPopup = $.magnificPopup.instance;
            magnificPopup.open({
                items: {
                    src:'.form-success',
                    type: 'inline',
                }
            },0);
            $('.feedback__form input').val('');
            $('.feedback__form-agreement input').prop("checked", false);
        }
    });
})();
(function addAnimation() {
    $('.header_main__messages').viewportChecker({
        classToAdd: 'animate-message',
        // repeat: true,
    });
    $('.final-result__animate-img').viewportChecker({
        classToAdd: 'animated fadeInRight',
        classToRemove: 'hidden',
        repeat: true,
    });
})();
