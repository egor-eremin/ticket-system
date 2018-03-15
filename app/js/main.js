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
    $('.custom-select').select2({
        placeholder: "Выберите категорию",
        allowClear: true,
        dropdownParent:$('.custom-select-wrapper'),
    });
})();
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
    });
})();
(function addAnimationHelp() {
    $('.help-item, .help-arrow').viewportChecker({
        classToAdd:'fadeIn animation-help',
        classToRemove: 'hide',
    });
})();
(function createCustomDatepicker() {
    $('.add-form__datapicker').datepicker({
        minDate: new Date(),
    });
})();