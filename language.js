const currentLangCookie = Cookies.get('currentLang');

console.log(currentLangCookie)

if (!currentLangCookie) {
  updateLang('en');
  autoTrigger();
} else {
  filterLangCode(currentLangCookie);
  //removed so it starts uchecked:
  //setActiveTrigger(currentLangCookie);
  autoTrigger();
};

function updateLang(langCode) {
  Cookies.set('currentLang', langCode, { expires: 7 });
  console.log(langCode);
}

function filterLangCode(langCode) {
  //console.log('running')

  let simpleLangItems = $('[lang-u-simple]');

  simpleLangItems.each(function (index, item) {
    if (!item.hasAttribute("lang-u-original")) {
      item.setAttribute("lang-u-original", item.textContent);
    };
    if (langCode === 'fr') {
      //$(item).html($(item).attr('lang-u-simple'));
      if ($(item).html() == $(item).attr('lang-u-original')) $(item).html($(item).attr(
        'lang-u-simple'));

    } else {
      // $(item).html($(item).attr('lang-u-original'));
      if ($(item).html() == $(item).attr('lang-u-simple')) $(item).html($(item).attr(
        'original'));
    };
  });

  let simpleLangItemsPlaceholder = $('[lang-u-simple-placeholder]');

  simpleLangItemsPlaceholder.each(function (index, item) {
    if (!item.hasAttribute("lang-u-original")) {
      item.setAttribute("lang-u-original", item.getAttribute('placeholder'));
    };
    if (langCode === 'fr') {
      $(item).attr("placeholder", $(item).attr('lang-u-simple-placeholder'));

    } else {
      $(item).attr("placeholder", $(item).attr('lang-u-original'));
    };
  });

  var items = $('[lang-u-data]');

  items.each(function (index, item) {
    //item.hide();
    if ($(item).attr('lang-u-data') === langCode) {
      $(item).show();
    } else if ($(item).attr('lang-u-data') === 'group') {
      // Handle 'group' case separately if needed
    } else {
      $(item).hide();
    }
  });

}

function setActiveTrigger(langCode) {
  $('[lang-u-trigger]').removeClass('is-active');
  $('[lang-u-trigger="' + langCode + '"]').addClass('is-active');
}

// Function to handle click event on items with lang-u-trigger attribute
$('[lang-u-trigger]').on('click', function () {
  let langCode = $(this).attr('lang-u-trigger');
  setActiveTrigger(langCode);
  updateLang(langCode)
  filterLangCode(langCode);
});

function autoTrigger() {
  if ($('[lang-u-auto-item]').length > 0) {
    let currentLangCode = Cookies.get('currentLang');
    if (currentLangCode === 'en') {
      $('[lang-u-auto-item]').removeClass('is-active');
    } else {
      $('[lang-u-auto-item]').addClass('is-active');
    };
    setInterval(function () {
      currentLangCode = Cookies.get('currentLang');
      if (currentLangCode === 'fr') {
        updateLang('en')
        filterLangCode('en');
        $('[lang-u-auto-item]').removeClass('is-active');
      } else {
        updateLang('fr')
        filterLangCode('fr');
        $('[lang-u-auto-item]').addClass('is-active');
      };
    }, 10000);
  }
}
