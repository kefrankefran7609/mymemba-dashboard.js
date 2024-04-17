console.log("We are ready v3.0")

// Create and update language variable
var language = Cookies.get('currentLang');
$('[lang-u-trigger]').on('click', function () {
  language = $(this).attr('lang-u-trigger');
  // Put a comma for thousands in English and a space in French
  if (language == "fr") {
    document.querySelector('[results]').innerHTML = document.querySelector(
      '[results]').innerHTML.replace(/,/g, " ")

  } else {
    document.querySelector('[results]').innerHTML = document.querySelector(
      '[results]').innerHTML.replace(/ /g, ",")
  }
});

// funtion to make sure result texts fits the space
function adjustTextSize() {
  $('.dashboard_card-text-wrapper').each(function () {
    //console.log('adjust text')
    var wrapper = $(this);
    var indicator = wrapper.find('.dashboard_selected-text-indicator');
    // Get the original font size or set it if not saved
    var originalFontSize = wrapper.data('originalFontSize');
    if (!originalFontSize) {
      originalFontSize = parseFloat(indicator.css('font-size'));
      wrapper.data('originalFontSize', originalFontSize);
    }
    // Set the font size back to the original size
    indicator.css('font-size', originalFontSize + 'px');
    // Check if the text overflows the container either horizontally or vertically
    while (
      indicator[0].scrollWidth > wrapper.width() ||
      indicator[0].scrollHeight > wrapper.height()
    ) {
      // Reduce the font size until it fits
      originalFontSize -= 1;
      indicator.css('font-size', originalFontSize + 'px');
    }
  });
}
$(window).on('resize', function () {
  adjustTextSize();
});

function updateTagsMask() {
  var anyActive = $('[u-filter="tags-mask"]').find('[u-filter="tag"].is-active').length > 0;
  $('[u-filter="tags-mask"]').toggleClass('is-active', anyActive);
}

var offense
var letters
var firstName
var lastName
var yearMin
var yearMax
var ageMin
var ageMax
var discharge
var origin
var offenseType
var country
var religion
var gender

// function for matching the selected items and filters
function uCheck(field) {
  console.log(field)
  var displayFilterText = $("[u-filter='display-text'][u-filter-field='" + field + "']");
  if (language == "en") {
    var selectorItems = $("[u-filter='selector-item'][u-filter-field='" + field + "']");
  } else {
    var selectorItems = $("[u-filter='selector-item'][u-filter-field-french='" + field + "']");
  }
  console.log(displayFilterText)
  // manage ranges
  var range1 = $("[u-filter-range='" + field + "']").eq(0)
  var range2 = $("[u-filter-range='" + field + "']").eq(1);
  if (range1.length > 0 || range2.length > 0) {
    let range1Txt = +range1.text();
    let range2Txt = +range2.text();
    // Loop through each item in displayFilterText
    displayFilterText.each(function (index, item) {
      // Check if the item already has the attribute "u-filter-text-value"
      if (!item.hasAttribute("u-filter-text-value")) {
        // If it doesn't have the attribute, add it with the item's .text value
        item.setAttribute("u-filter-text-value", item.textContent);
      }
    });
    displayFilterText.text(range1Txt + " - " + range2Txt);
    if (displayFilterText.closest("[u-filter='tag']")) {
      displayFilterText.closest("[u-filter='tag']").addClass('is-active');
    };
    displayFilterText.addClass('is-active');
    updateTagsMask();

    if (field == "year-1") {
      yearMin = range1Txt
      yearMax = range2Txt
    }
    else if (field == "age") {
      ageMin = range1Txt
      ageMax = range2Txt
    }

    itemsPerPage = 100
    pageNumber = 1
    getItems()
    scrollTop()
  }

  //manage selectors 
  if (selectorItems.filter(".is-active").length > 0) {
    console.log("true")
    var selectedIndex = selectorItems.filter(".is-active").index();
    /*
    var filterItems = $("[u-filter='filter-item'][u-filter-field='" + field + "']");
    filterItems.eq(selectedIndex).find('input').prop("checked", true);
    */
    if (language == "en") var filterItems = $("[u-filter='selector-item'][u-filter-field='" +
      field + "']");
    else var filterItems = $("[u-filter='selector-item'][u-filter-field-french='" + field + "']");

    var currentTextWrap = filterItems.eq(selectedIndex)[0]
    var currentText = currentTextWrap.firstElementChild.textContent
    console.log(currentText)

    if (field == "offense-type") {
      offenseType = currentText;
    }
    else if (field == "letter") {
      var letter = currentText; // Letter being displayed in the frontend
      letters = "^" + String(currentText).toUpperCase(); // Regex sent for the APi call
    }
    else if (field == "OffStand1") {
      offense = currentText
    }
    else if (field == "country") {
      country = currentText
    }
    else if (field == "religion") {
      religion = currentText
    }
    else if (field == "gender") {
      gender = currentText
    }
    else if (field == "firstName") {
      firstName = currentText
    }
    else if (field == "lastName") {
      lastName = currentText
    }
    else if (field == "EthFull") {
      origin = currentText
    }

    itemsPerPage = 100
    pageNumber = 1
    getItems()
    scrollTop()
    //

    //

    // Loop through each item in displayFilterText
    displayFilterText.each(function (index, item) {
      // Check if the item already has the attribute "u-filter-text-value"
      if (!item.hasAttribute("u-filter-text-value")) {
        // If it doesn't have the attribute, add it with the item's .text value
        item.setAttribute("u-filter-text-value", item.textContent);
      }
    });

    if (field == "offense") displayFilterText.text(offense);
    else if (field == "letter") displayFilterText.text(letter);
    else if (field == "year-1" || field == "year-2") displayFilterText.text(year);
    else if (field == "age") displayFilterText.text(age);
    else if (field == "discharge") displayFilterText.text(discharge);
    else if (field == "occupation") displayFilterText.text(occupation);
    else if (field == "height") displayFilterText.text(height);
    else if (field == "origin") displayFilterText.text(origin);
    else if (field == "gender") displayFilterText.text(gender);

    displayFilterText.text(currentText);
    if (displayFilterText.closest("[u-filter='tag']")) {
      displayFilterText.closest("[u-filter='tag']").addClass('is-active');
    };
    displayFilterText.addClass('is-active');
    updateTagsMask();
  }
}

//funtion for reseting a filter fiel value to "All"
function uReset(field) {
  console.log(field)
  // reseting te value of the variabe depending on the field value
  if (field == "OffStand1") offense = undefined;
  else if (field == "letter") letters = undefined;
  else if (field == "EthFull") origin = undefined;
  else if (field == "gender") gender = undefined;
  else if (field == "religion") religion = undefined;
  else if (field == "country") country = undefined;
  else if (field == "offense-type") offenseType = undefined;
  else if (field == "firstName") firstName = undefined;
  else if (field == "lastName") lastName = undefined;
  else if (field == "year-1") {
    yearMin = undefined;
    yearMax = undefined;
    document.querySelectorAll('[u-filter-range="year-1"]')[0].textContent = 1813
    document.querySelectorAll('[u-filter-range="year-1"]')[1].textContent = 1867
  }
  else if (field == "age") {
    ageMin = undefined;
    ageMax = undefined;
    document.querySelectorAll('[u-filter-range="age"]')[0].textContent = 0
    document.querySelectorAll('[u-filter-range="age"]')[1].textContent = 100
  }
  else if (field == "all") {
    offense = undefined;
    letters = undefined;
    yearMin = undefined;
    yearMax = undefined;
    document.querySelectorAll('[u-filter-range="year-1"]')[0].textContent = 1813
    document.querySelectorAll('[u-filter-range="year-1"]')[1].textContent = 1867
    ageMin = undefined;
    ageMax = undefined;
    /* document.querySelector('[age-min]').value = 0
     document.querySelector('[age-max]').value = 100*/
    document.querySelectorAll('[u-filter-range="age"]')[0].textContent = 0
    document.querySelectorAll('[u-filter-range="age"]')[1].textContent = 100
    origin = undefined;
    religion = undefined;
    discharge = undefined;
    gender = undefined;
    country = undefined;
    search = "";
    featured = false;
    firstName = undefined;
    lastName = undefined;
    $("[u-filter='tag']").removeClass('is-active');
    document.querySelectorAll('[u-filter-field]').forEach(
      el => {
        if (el.classList.contains('is-active')) {
          el.textContent = el.getAttribute('u-filter-text-value')
          el.classList.remove('is-active')
        }
      })
  }
  itemsPerPage = 100
  getItems()
  // Reseting the value of the field 
  document.querySelector('.dashboard_checkbox_dot').classList.remove('is-active')
  document.querySelector('.dashboard_checkbox_side.is-left').classList.add('is-active')
  document.querySelector('.dashboard_checkbox_side.is-right').classList.remove(
    'is-active')
  searchInput.value = "";
  scrollTop()
  $("[u-filter='reset'][u-filter-field='" + field + "']").click();
  var displayFilterText = $("[u-filter='display-text'][u-filter-field='" + field + "']");
  //displayFilterText.text('All');

  displayFilterText.each(function (index, item) {
    // Check if the item already has the attribute "u-filter-text-value"
    if (!item.hasAttribute("u-filter-text-value")) {
      // If it doesn't have the attribute, add it with the item's .text value
      item.setAttribute("u-filter-text-value", item.textContent);
    } else {
      // If it already has the attribute, replace the text with the attribute value
      $(item).text($(item).attr("u-filter-text-value"));
    }
  });
  //
  displayFilterText.removeClass('is-active');
  //removes the active class to tags
  if (displayFilterText.closest("[u-filter='tag']")) {
    displayFilterText.closest("[u-filter='tag']").removeClass('is-active');
  };
  updateTagsMask();
}

// manages the selection active state of items from the vertical lists
function uListSelector() {
  $(document).on("click", "[u-filter-button]", function () {
    if (language == "en") var field = $(this).attr("u-filter-field");
    else var field = $(this).attr("u-filter-field-french");
    var listItems = $("[u-filter-button][u-filter-field='" + field + "']")
    $(listItems).removeClass('is-active');
    var listFrenchItems = $("[u-filter-button][u-filter-field-french='" + field + "']")
    $(listFrenchItems).removeClass('is-active');
    $(this).addClass('is-active');
  });
}

//custom mirror click solution
function uMirrorClick() {
  $(document).on('click', '[u-filter-click-trigger]', function () {
    var triggerValue = $(this).attr('u-filter-click-trigger');
    console.log('triggerValue:', triggerValue);
    var targetElements = $('[u-filter-click-target="' + triggerValue + '"]');
    console.log('targetElements:', targetElements[0]);
    targetElements[0].click();
  });
  $('[u-filter-click-target="offense-modal"]').on('click', function () {
    //alert('Target element clicked!');
  });
}

//modals
function uModals() {
  // open lang modal First
  $('[u-modal-trigger="language"]')[0].click();
  $('[u-modal-target="language"]').show().css({
    'display': 'flex',
    'opacity': '1'
  });
  // Find elements with u-modal-trigger attribute
  $('[u-modal-trigger]').on('click', function () {
    // Get the target modal value
    var targetModal = $(this).attr('u-modal-trigger');

    // Find the modal with the corresponding u-modal-target attribute
    var modalElement = $('[u-modal-target="' + targetModal + '"]');

    // Display the modal and apply additional styles
    if ($(this).attr('[u-filter-click-trigger]')) {
      setTimeout(function () {
        modalElement.show().css({
          'display': 'flex',
          'opacity': '1'
        });
      }, 850);
    } else {
      modalElement.show().css({
        'display': 'flex',
        'opacity': '1'
      });
    }
  });

  // Find elements with u-modal-close-trigger attribute
  $('[u-modal-close-trigger]').on('click', function () {
    // Get the target modal value
    var targetModal = $(this).attr('u-modal-close-trigger');

    // Find the modal with the corresponding u-modal-target attribute
    var modalElement = $('[u-modal-target="' + targetModal + '"]');

    // Hide the modal
    modalElement.show().css({
      'display': 'none',
      'opacity': '0'
    });
    //modalElement.hide();
  });
}

//triggers 
$(document).on("click", "[u-filter='sync-trigger']", function () {
  var fieldAttributeValue = $(this).attr("u-filter-field");
  // Show the clear button
  $("[u-reset-hides='" + fieldAttributeValue + "']").show()
  //sincronize filters results
  uCheck(fieldAttributeValue);
  //make sure text fits
  setTimeout(function () {
    adjustTextSize();
  }, 50);
});

$(document).on("click", "[u-filter='reset-trigger']", function () {
  var fieldAttributeValue = $(this).attr("u-filter-field");
  // Hiding the "clear" button that has been clicked
  $("[u-reset-hides='" + fieldAttributeValue + "']").hide();
  //sincronize filters results
  uReset(fieldAttributeValue);
  //make sure text fits
  setTimeout(function () {
    adjustTextSize();
  }, 50);
});

//this funtion makes sure the modal closes with a webflow animation before closing the modal
function closeWithDelay(closeButtonClass, modalTriggerClass, time) {
  $(document).on("click", `.${closeButtonClass}`, function () {
    var clickedElement = $(this);
    var triggerElement = clickedElement.siblings(`.${modalTriggerClass}`);

    if (triggerElement.length > 0) {
      setTimeout(function () {
        triggerElement.click();
      }, time);
    }
  });
}
// 
closeWithDelay('close-button_button', 'close-button_modal-trigger', 1350);
closeWithDelay('selector_lang-buttom', 'selector_lang-modal-close', 1000);

//run some funtions
uListSelector();
adjustTextSize();
uMirrorClick();
uModals();

// back to intro after some setTimeout

var timeout;
startCounting();
$(document).on('mousemove keypress', function () {
  resetCounting();
});

function startCounting() {
  timeout = setTimeout(function () {
    $('[data-u-intro-back-interaction-trigger]')[0].click();
    console.log($('[data-u-intro-back-interaction-trigger]'));
    setTimeout(function () {
      $('[data-u-intro-back-trigger]')[0].click();
    }, 850); //delay for closing animatin
  }, 300000); // 5 min
}

function resetCounting() {
  clearTimeout(timeout);
  startCounting();
}

$(document).ready(function () {
  //manage the checkbox toggle color change by class addition
  $('.dashboard_checkbox_component input[type="checkbox"]').change(function () {
    var checkboxComponent = $(this).closest('.dashboard_checkbox_component');
    var leftitem = $(checkboxComponent).find('.dashboard_checkbox_side.is-left');
    var rightItem = $(checkboxComponent).find('.dashboard_checkbox_side.is-right');
    var dotItem = $(checkboxComponent).find('.dashboard_checkbox_dot');
    leftitem.addClass('is-active');
    rightItem.removeClass('is-active');
    dotItem.removeClass('is-active');
    if (this.checked) {
      leftitem.removeClass('is-active');
      rightItem.addClass('is-active');
      dotItem.addClass('is-active');
    } else {
      leftitem.addClass('is-active');
      rightItem.removeClass('is-active');
      dotItem.removeClass('is-active');
    }
  });

});

//enables color mode
function checkMode() {
  var triggerButton = $('[color-mode="trigger"]');
  var bodyElement = $('body');
  if (bodyElement.attr('color-mode') === 'dark') {
    $(triggerButton).addClass('is-active');
  } else {
    $(triggerButton).removeClass('is-active');
  }
}

//Funtion for changing to dark mode
function changeMode() {
  var triggerButton = $('[color-mode="trigger"]');
  var bodyElement = $('body');
  if (bodyElement.attr('color-mode') === 'dark') {
    bodyElement.removeAttr('color-mode');
    $(triggerButton).removeClass('is-active');
  } else {
    bodyElement.attr('color-mode', 'dark');
    $(triggerButton).addClass('is-active');
  }
}

$(document).ready(function () {
  checkMode();
  $('[color-mode="trigger"]').click(function () {
    changeMode();
  });
});

/***** Getting data *****/

// Declaring variables 
const sorts = document.querySelectorAll('[u-sort]')
var searchInput = document.querySelector('[searchinput]')
const loader = document.querySelector('[loader]')
const content = document.querySelector('[mainlist]')
var pageNumber = 1
var orderBy = "asc"
var sortingField = "lastName"
var featured = false
var accordions
var itemsPerPage = 100
var search

// Trigger sorting
sort()

function sort() {
  sorts.forEach(el => {
    el.addEventListener('click', (e) => {
      orderBy = e.target.getAttribute('u-sort').split('-')[0]
      sortingField = e.target.getAttribute('u-sort').split('-')[1]
      pageNumber = 1
      itemsPerPage = 100
      scrollTop()
      sorts.forEach(sort => sort.classList.remove('is-active'))
      el.classList.add('is-active')
      el.querySelector('.dashboard_list-header_item-arrow').classList.toggle(
        'is-active')
      if (sortingField == "lastName") {
        getItems()
        if (orderBy == "asc") e.target.setAttribute("u-sort", "desc-lastName")
        else e.target.setAttribute("u-sort", "asc-lastName")
      }
      else if (sortingField == "firstName") {
        getItems()
        if (orderBy == "asc") e.target.setAttribute("u-sort", "desc-firstName")
        else e.target.setAttribute("u-sort", "asc-firstName")
      }
      else if (sortingField == "YearCommitted") {
        getItems()
        if (orderBy == "asc") e.target.setAttribute("u-sort", "desc-YearCommitted")
        else e.target.setAttribute("u-sort", "asc-YearCommitted")
      }

      /* else {
         letters = ""
         document.querySelector('[u-filter-field="letter"][u-filter="reset-trigger"]')
           .click()
         if (orderBy == "asc") e.target.setAttribute("u-sort", "desc-YearCommitted")
         else e.target.setAttribute("u-sort", "asc-YearCommitted")
       }*/
    })
  })
}

// Trigger featured filtering
filterFeatured()

function filterFeatured() {
  document.querySelector('#featured').addEventListener('change', (e) => {
    featured = e.target.checked
    pageNumber = 1
    itemsPerPage = 100
    getItems()
  })
}

// Debounce function to wait to see if another key is pressed within the delay before triggering the API call to filter
let timeoutId;

function debounce(func, delay) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
}

// Trigger main search by keyword
filterSearch()

function filterSearch() {
  searchInput.addEventListener('keyup', (e) => {
    debounce(() => {
      search = (searchInput.value).toLowerCase()
      pageNumber = 1
      getItems()
      document.querySelector('[noresults]').style.display = "none";
      content.style.display = "none"
      loader.style.display = "flex"
      const tag = document.querySelector('[u-filter-field="search-input"]')
      if (search != "") {
        tag.classList.add('is-active')
        tag.textContent = searchInput.value
        tag.closest('[u-filter="tag"]').classList.add('is-active')
        updateTagsMask()
      } else {
        tag.classList.remove('is-active')
        tag.closest('[u-filter="tag"]').classList.remove('is-active')
        updateTagsMask()
      }
    }, 1000)
  })
}

// Getting main offenses
getItems()

async function getItems() {
  try {
    const res = await fetch(
      "https://xbwk-4swk-vecw.n2.xano.io/api:rjk6jzMS/morin_center?itemsPerPage=" +
      itemsPerPage + (search ? "&search=" + search : "") + "&pageNumber=" + pageNumber +
      "&language=" + language +
      "&orderBy=" + orderBy + "&sortingField=" + sortingField + (featured ==
        true ?
        "&featured=" + featured : "") + (offense != undefined ? "&offense=" + offense : "") + (
        firstName != undefined ? "&firstName=" + firstName : "") +
      (lastName != undefined ? "&lastName=" + lastName : "") + (country != undefined ?
        "&country=" + country : "") +
      (gender != undefined ? "&gender=" + gender : "") + (
        religion != undefined ? "&religion=" + religion : "") +
      (offenseType != undefined ? "&offenseType=" + offenseType : "") + (
        yearMin != undefined ? "&yearMin=" + yearMin : "") + (
        yearMax != undefined ? "&yearMax=" + yearMax : "") + (
        ageMin != undefined ? "&ageMin=" + ageMin : "") + (
        ageMax != undefined ? "&ageMax=" + ageMax : "") + (letters != undefined ?
        "&letter=" +
        letters : "") + (origin != undefined ? "&origin=" + origin : ""), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    //console.log(res);
    const data = await res.json()
    //console.log(data);
    const result = await updateList(data);
  }
  catch (error) {
    console.log('error:', error);
    throw error;
  }
}

var firstCall = true
async function updateList(data) {
  if (firstCall == false) {
    // after the first call, we need to remove all item but one to keep a template to clone the new item list
    const list = document.querySelector('.main-list_list')
    while (list.children.length > 1)
      list.removeChild(list.lastChild)
  }
  if (data.items.length != 0) {
    document.querySelector('[noresults]').style.display = "none";
    document.querySelector('.main-list_list-item').style.display = "block";
    const itemTemplate = document.querySelector('[mainitem]')
    const itemList = itemTemplate.parentElement
    const items = data.items.map(({
      id,
      YearCommitted,
      firstName,
      lastName,
      Age_r,
      Occupation_r,
      OffStand1,
      OffStand1_F,
      Sentence_r,
      CommittedBy_r,
      DateCommitted_r,
      Gender,
      DateDischarged_r,
      DischargedBy_r,
      country,
      Remarks_r,
      Height_r,
      IndivTag,
      Featured,
      Complexion_r,
      MaritalStatus_r,
      Education,
      ReligionStand,
      ReligionStand_F,
      Biography_fr,
      Biography,
      EthFull,
      EthFull_F,
      AlcoholUse_r,
      CommittedFor_r,
      NameFullMorrin
    }) => {
      const item = itemTemplate.cloneNode(true)
      const defaultValueEnglish = "Not given"
      const defaultValueFrench = "Vide"
      if (Featured) item.querySelector('[u-data="featured"]').style.display = "flex"
      else item.querySelector('[u-data="featured"]').style.display = "none"
      if (id) item.querySelector('[u-data="itemid"]').textContent =
        id;
      if (IndivTag) item.querySelector('[u-data="tag"]').textContent =
        IndivTag;
      // if (firstName) {
      item.querySelector('[u-data="first-name"]').textContent = firstName ? firstName :
        defaultValueEnglish
      item.querySelector('[u-data="first-name"]').setAttribute('lang-u-simple',
        firstName == "Not given" ? "Vide" : firstName);
      item.querySelector('[u-data="first-name"]').setAttribute('lang-u-original', firstName);
      item.querySelector('[u-data="last-name"]').textContent = lastName ?
        lastName : defaultValueEnglish
      item.querySelector('[u-data="last-name"]').setAttribute('lang-u-simple',
        lastName ? lastName : defaultValueFrench);
      item.querySelector('[u-data="last-name"]').setAttribute('lang-u-original',
        lastName ? lastName : defaultValueEnglish);
      item.querySelector('[u-data="full-name"]').textContent = NameFullMorrin ?
        NameFullMorrin : ""
      item.querySelector('[u-data="year"]').textContent = YearCommitted ?
        YearCommitted : ""
      item.querySelector('[u-data="other-dateDischarged"]').textContent = DateDischarged_r ?
        DateDischarged_r : ""
      item.querySelector('[u-data="other-dischargedBy"]').textContent = DischargedBy_r ?
        DischargedBy_r : ""
      item.querySelector('[u-data="other-dischargedBy"]').setAttribute('lang-u-simple',
        DischargedBy_r ? DischargedBy_r : defaultValueFrench);
      item.querySelector('[u-data="dateCommitted"]').textContent = DateCommitted_r ?
        DateCommitted_r : defaultValueEnglish
      item.querySelector('[u-data="committedFor"]').textContent = CommittedFor_r ?
        CommittedFor_r : defaultValueEnglish
      item.querySelector('[u-data="committedFor"]').setAttribute('lang-u-simple',
        CommittedFor_r ? CommittedFor_r : defaultValueFrench);
      item.querySelector('[u-data="commitedBy"]').textContent = CommittedBy_r ?
        CommittedBy_r : defaultValueEnglish
      item.querySelector('[u-data="sentence"]').textContent = Sentence_r ? Sentence_r :
        defaultValueEnglish
      item.querySelector('[u-data="sentence"]').setAttribute('lang-u-simple', Sentence_r ?
        Sentence_r : defaultValueFrench)
      item.querySelector('[u-data="gender"]').textContent = Gender ? Gender :
        defaultValueEnglish
      item.querySelector('[u-data="gender"]').setAttribute('lang-u-simple', Gender ?
        Gender : defaultValueFrench)
      item.querySelector('[u-data="age"]').textContent = Age_r ? Age_r :
        defaultValueEnglish
      item.querySelector('[u-data="age"]').setAttribute('lang-u-simple', Age_r ?
        Age_r : defaultValueFrench)
      item.querySelector('[u-data="country"]').textContent = country ? country :
        defaultValueEnglish
      item.querySelector('[u-data="country"]').setAttribute('lang-u-simple', country ?
        country : defaultValueFrench)
      if (Complexion_r) item.querySelector('[u-data="complexion"]').textContent =
        Complexion_r;
      else {
        const el = item.querySelector('[u-data="complexion"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }
      if (Height_r) item.querySelector('[u-data="height"]').textContent = Height_r;
      else {
        const el = item.querySelector('[u-data="height"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }
      if (Occupation_r) item.querySelector('[u-data="occupation"]').textContent =
        Occupation_r;
      else {
        const el = item.querySelector('[u-data="occupation"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }
      if (MaritalStatus_r) item.querySelector('[u-data="maritalStatus"]').textContent =
        MaritalStatus_r;
      else {
        const el = item.querySelector('[u-data="maritalStatus"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }
      if (Education) item.querySelector('[u-data="literacy"]').textContent = Education;
      else {
        const el = item.querySelector('[u-data="literacy"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }

      if (AlcoholUse_r) item.querySelector('[u-data="alcoholUse"]').textContent =
        AlcoholUse_r;
      else {
        const el = item.querySelector('[u-data="alcoholUse"]')
        el.closest('.fs_dropdown_list-group').style.display = "none"
      }
      if (Remarks_r) item.querySelector('[u-data="remark"]').textContent = Remarks_r;
      else {
        const el = item.querySelector('[u-data="remark"]')
        el.closest('.fs_dropdown_list-item').style.display = "none"
      }
      if (Biography) item.querySelector('[u-data="biography"]').textContent = Biography;
      if (Biography_fr) item.querySelector('[u-data="biography"]').setAttribute(
        'lang-u-simple', Biography_fr)
      if (!Biography && !Biography_fr) {
        const el = item.querySelector('[u-data="biography"]')
        el.closest('.fs_dropdown_list-item').style.display = "none"
      }
      if (language == "en") {
        item.querySelector('[u-data="offense"]').textContent = OffStand1 ? OffStand1 :
          defaultValueEnglish;
        item.querySelector('[u-data="offense"]').setAttribute('lang-u-simple',
          OffStand1_F ? OffStand1_F : defaultValueFrench);
        item.querySelector('[u-data="origin"]').textContent = EthFull ? EthFull :
          defaultValueEnglish;
        item.querySelector('[u-data="origin"]').setAttribute('lang-u-simple', EthFull_F ?
          EthFull_F : defaultValueFrench);
        if (ReligionStand) {
          item.querySelector('[u-data="religion"]').textContent = ReligionStand;
          item.querySelector('[u-data="religion"]').setAttribute('lang-u-simple',
            ReligionStand_F ? ReligionStand_F : defaultValueFrench);
        }
        else {
          const el = item.querySelector('[u-data="religion"]')
          el.closest('.fs_dropdown_list-group').style.display = "none"
        }
      } else {
        item.querySelector('[u-data="offense"]').textContent = OffStand1_F ? OffStand1_F :
          defaultValueFrench;
        item.querySelector('[u-data="offense"]').setAttribute('lang-u-original',
          OffStand1 ? OffStand1 : defaultValueEnglish);
        item.querySelector('[u-data="offense"]').setAttribute('lang-u-simple',
          OffStand1_F ? OffStand1_F : defaultValueFrench);
        item.querySelector('[u-data="origin"]').textContent = EthFull_F ? EthFull_F :
          defaultValueFrench;
        item.querySelector('[u-data="origin"]').setAttribute('lang-u-simple', EthFull_F ?
          EthFull_F : defaultValueFrench);
        item.querySelector('[u-data="origin"]').setAttribute('lang-u-original', EthFull ?
          EthFull : defaultValueEnglish);
        if (ReligionStand_F) {
          item.querySelector('[u-data="religion"]').textContent = ReligionStand_F;
          item.querySelector('[u-data="religion"]').setAttribute('lang-u-original',
            ReligionStand ? ReligionStand : defaultValueEnglish);
          item.querySelector('[u-data="religion"]').setAttribute('lang-u-simple',
            ReligionStand_F ? ReligionStand_F : defaultValueFrench);
        }
        else {
          const el = item.querySelector('[u-data="religion"]')
          el.closest('.fs_dropdown_list-group').style.display = "none"
        }
      }

      //  } else item.style.display = "none"
      return item
    })
    // Append items to the main list
    itemList.append(...items)
    // Hide the template item, which is the first one in the list
    itemList.firstElementChild.style.display = "none"

    document.querySelector('[results]').innerHTML = data.itemsTotal.toLocaleString(
      'en-US') + "&nbsp;"

    if (language == "fr") {
      console.log("results")
      document.querySelector('[results]').innerHTML = document.querySelector(
        '[results]').innerHTML.replace(/,/g, " ")
    }
    content.style.display = "block"
    loader.style.display = "none"

  } else { // If no results for the search
    loader.style.display = "none"
    document.querySelector('[noresults]').style.display = "flex"
    document.querySelector('[results]').innerHTML = 0 + "&nbsp;"
  }
  // Main dropdowns
  const accordions = document.querySelectorAll('[dropdownwrapper]');
  accordions.forEach(function (accordion, index) {
    const btn = accordion.querySelector('[dropdownheader]');
    const panel = accordion.querySelector('[dropdowncontent]');
    const arrow = accordion.querySelector('[dropdownarrow]');
    const icon = accordion.querySelector('[dropdownicon]');

    btn.addEventListener('click', function (e) {

      // Checking if the item has an IndivTag
      if (e.target.querySelector('[u-data="tag"]') && !e.target.parentElement
        .classList
        .contains('is-active'))
        getOtherItems(e.target.querySelector('[u-data="tag"]').textContent, e.target
          .querySelector(
            '[u-data="itemid"]').textContent, index);
      const isActive = panel.classList.contains('is-active');

      accordions.forEach(function (otherAccordion) {
        const otherBtn = otherAccordion.querySelector('[dropdownheader]');
        const otherPanel = otherAccordion.querySelector('[dropdowncontent]');
        const otherArrow = otherAccordion.querySelector('[dropdownarrow]');
        const otherIcon = otherAccordion.querySelector('[dropdownicon]');

        if (otherAccordion !== accordion) {
          otherBtn.classList.remove('is-active');
          otherPanel.classList.remove('is-active');
          otherArrow.classList.remove('is-active');
          otherIcon.classList.remove('is-active');
          otherAccordion.classList.remove('is-active');
        }
      });

      if (isActive) {
        btn.classList.remove('is-active');
        panel.classList.remove('is-active');
        arrow.classList.remove('is-active');
        icon.classList.remove('is-active');
        accordion.classList.remove('is-active');

      } else {
        setTimeout(() => {
          btn.classList.add('is-active');
          panel.classList.add('is-active');
          arrow.classList.add('is-active');
          icon.classList.add('is-active');
          accordion.classList.add('is-active');
        }, 200)
      };
    });
  });

  firstCall = false
}
// End of API call

// Trigger load more items
const itemsWrapper = document.querySelector('[listwrapper]')
itemsWrapper.addEventListener('scroll', function () {
  if (itemsWrapper.scrollTop + itemsWrapper.clientHeight == itemsWrapper.scrollHeight) {
    if (document.querySelectorAll('[mainitem]').length > 100) {
      itemsPerPage += 100
      //pageNumber++
      getItems()
    }
  }
});

/**** End of getting main items *****/

// Getting other offenses
async function getOtherItems(tag, itemid, index) {
  try {
    const res = await fetch(
      "https://xbwk-4swk-vecw.n2.xano.io/api:rjk6jzMS/morin_center?itemsPerPage=100&pageNumber=1&orderBy=asc&sortingField=id&tag=" +
      tag +
      "&itemid=" + itemid, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    console.log(res);
    const data = await res.json()
    console.log(data);
    const result = await updateOtherList(data, index);
  }
  catch (error) {
    console.log('error:', error);
    throw error;
  }
}

var firstOtherCall = true
async function updateOtherList(data, index) {
  if (firstOtherCall == false) {
    // after the first call, we need to remove all item but one to keep a template to clone the new item list
    const list = document.querySelectorAll('[secondarylist]')[index]
    while (list.children.length > 1)
      list.removeChild(list.lastChild)
  }
  if (data.items.length != 0) {
    document.querySelectorAll('[secondaryitem]')[index].style.display = "block"
    const itemTemplate = document.querySelectorAll('[secondaryitem]')[index]
    const itemList = document.querySelectorAll('[secondarylist]')[index]
    const items = data.items.map(({
      id,
      YearCommitted,
      OffStand1,
      OffStand1_F,
      Sentence_r,
      CommittedBy_r,
      DateCommitted_r,
      DateDischarged_r,
      Remarks_r,
      DischargedBy_r,
      CommittedFor_r
    }) => {
      const item = itemTemplate.cloneNode(true)
      const defaultValueEnglish = "[not given]"
      const defaultValueFrench = "[vide]"
      item.querySelector('[u-data="other-year"]').textContent = YearCommitted ?
        YearCommitted : defaultValueEnglish
      item.querySelector('[u-data="other-dateCommitted"]').textContent = DateCommitted_r ?
        DateCommitted_r : defaultValueEnglish
      item.querySelector('[u-data="other-committedBy"]').textContent = CommittedBy_r ?
        CommittedBy_r : defaultValueEnglish
      item.querySelector('[u-data="other-dateDischarged"]').textContent =
        DateDischarged_r ?
        DateDischarged_r : defaultValueEnglish
      item.querySelector('[u-data="other-dischargedBy"]').textContent = DischargedBy_r ?
        DischargedBy_r : defaultValueEnglish
      item.querySelector('[u-data="other-offense"]').textContent = OffStand1 ?
        OffStand1 : defaultValueEnglish
      item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-simple',
        OffStand1_F ? OffStand1_F : defaultValueFrench);
      item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-original',
        OffStand1 ? OffStand1 : defaultValueEnglish);
      item.querySelector('[u-data="other-committedFor"]').textContent = CommittedFor_r ?
        CommittedFor_r : defaultValueEnglish
      item.querySelector('[u-data="other-committedFor"]').setAttribute('lang-u-simple',
        CommittedFor_r ? CommittedFor_r : defaultValueFrench);
      item.querySelector('[u-data="other-committedFor"]').setAttribute('lang-u-original',
        CommittedFor_r ? CommittedFor_r : defaultValueEnglish);
      item.querySelector('[u-data="other-sentence"]').textContent = Sentence_r ?
        Sentence_r : defaultValueEnglish
      item.querySelector('[u-data="other-sentence"]').setAttribute('lang-u-simple',
        Sentence_r ? Sentence_r : defaultValueFrench);
      item.querySelector('[u-data="other-sentence"]').setAttribute('lang-u-original',
        Sentence_r ? Sentence_r : defaultValueEnglish);
      if (Remarks_r) item.querySelector('[u-data="other-remark"]').textContent =
        Remarks_r;
      else item.querySelector('[u-data="other-remark"]').parentElement.style.display =
        "none"

      if (language == "en") {
        item.querySelector('[u-data="other-offense"]').textContent = OffStand1 ?
          OffStand1 : defaultValueEnglish
        item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-simple',
          OffStand1_F ? OffStand1_F : defaultValueFrench);
        item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-original',
          OffStand1 ? OffStand1 : defaultValueEnglish);
      } else {
        item.querySelector('[u-data="other-offense"]').textContent = OffStand1_F ?
          OffStand1_F : defaultValueEnglish
        item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-simple',
          OffStand1_F ? OffStand1_F : defaultValueFrench);
        item.querySelector('[u-data="other-offense"]').setAttribute('lang-u-original',
          OffStand1 ? OffStand1 : defaultValueEnglish);
      }

      return item
    })
    // Appending items to the list
    itemList.append(...items)
    // Hiding our template item, which is the first one of the list
    itemList.firstElementChild.style.display = "none"

  } else {
    const secondaryList = document.querySelectorAll('[secondarylist]')[index]
    secondaryList.querySelector('[secondaryitem]').style.display = "none"
    document.querySelectorAll('[otheroffenses]')[index].style.display = "none"
  }

  // Sub dropdowns
  const subaccordions = document.querySelectorAll('[subdropdownwrapper]');
  subaccordions.forEach(function (accordion) {
    const btn = accordion.querySelector('[subdropdownheader]');
    const panel = accordion.querySelector('[subdropdowncontent]');
    const arrow = accordion.querySelector('[subdropdownarrow]');
    const icon = accordion.querySelector('[subdropdownicon]');

    btn.addEventListener('click', function (e) {
      const isActive = panel.classList.contains('is-active');

      subaccordions.forEach(function (otherAccordion) {
        const otherBtn = otherAccordion.querySelector('[subdropdownheader]');
        const otherPanel = otherAccordion.querySelector('[subdropdowncontent]');
        const otherArrow = otherAccordion.querySelector('[subdropdownarrow]');
        const otherIcon = otherAccordion.querySelector('[subdropdownicon]');

        if (otherAccordion !== accordion) {
          otherBtn.classList.remove('is-active');
          otherPanel.classList.remove('is-active');
          otherArrow.classList.remove('is-active');
          otherIcon.classList.remove('is-active');
          otherAccordion.classList.remove('is-active');
        }
      });

      if (isActive) {
        btn.classList.remove('is-active');
        panel.classList.remove('is-active');
        arrow.classList.remove('is-active');
        icon.classList.remove('is-active');
        accordion.classList.remove('is-active');

      } else {
        btn.classList.add('is-active');
        panel.classList.add('is-active');
        arrow.classList.add('is-active');
        icon.classList.add('is-active');
        accordion.classList.add('is-active');
      };
    });
  });

  firstOtherCall = false
} // End of getting other offenses

// Getting filters
document.querySelectorAll('[u-filter-list]').forEach(list => {
  getFilters(list, list.getAttribute('u-filter-list'))
  getFilters(list, list.getAttribute('u-filter-list') + "_F")
})

// API call to get filters
async function getFilters(list, filterCategory) {
  try {
    const res = await fetch(
      "https://xbwk-4swk-vecw.n2.xano.io/api:rjk6jzMS/offense_filters?field=" +
      filterCategory,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    //console.log(res);
    const data = await res.json()
    const result = await updateFilter(data, list, filterCategory);
  }
  catch (error) {
    console.log('error:', error);
    throw error;
  }
}

async function updateFilter(data, list, filterCategory) {

  if (data.length != 0) {
    if (filterCategory.endsWith("_F")) {
      const itemTemplate = list.nextElementSibling.firstElementChild
      //const itemList = itemTemplate.parentElement
      const items = data.map((filter) => {
        const item = itemTemplate.cloneNode(true)
        if (filterCategory == "OffStand1_F") item.setAttribute('u-data-value', filter)
        if (filter) item.firstElementChild.textContent = filter

        return item
      })
      //Append items to the list
      list.nextElementSibling.append(...items);
      // Hiding our template item, which is the first one of the list
      list.nextElementSibling.firstElementChild.style.display = "none";
      // Making the first filter of the list active
      list.nextElementSibling.children[1].classList.add('is-active')
    }
    else {
      const itemTemplate = list.firstElementChild
      //const itemList = itemTemplate.parentElement
      const items = data.map((filter) => {
        const item = itemTemplate.cloneNode(true)
        if (filterCategory == "OffStand1") item.setAttribute('u-data-value', filter)
        if (filter) item.firstElementChild.textContent = filter

        return item
      })
      // Appending items to the list
      list.append(...items)
      // Hiding our template item, which is the first one of the list
      list.firstElementChild.style.display = "none"
      // Making the first filter of the list active
      list.children[1].classList.add('is-active')
    }

  }
} // End of get getting filters value

searchFields()
// Trigger field search by keyword
function searchFields() {
  document.querySelectorAll('[u-filter-search]').forEach(el => {
    el.addEventListener('keyup', (e) => {
      debounce(() => {
        const filterCategory = el.getAttribute('u-filter-search');
        if (el.value != "") {
          getSearchResults(el.value, filterCategory, el.value.length)
          document.querySelector(`[u-filter-no-results="${filterCategory}"]`).style
            .display = "none"
          document.querySelector(`[u-filter-loader="${filterCategory}"]`).style
            .display =
            "block"
          document.querySelector(`[u-filter-search-list="${filterCategory}"]`).style
            .display = "none"
        } else {
          const list = document.querySelector("[u-filter-search-list='" + el
            .getAttribute(
              'u-filter-search') + "']")
          while (list.children.length > 1)
            list.removeChild(list.lastChild)
          document.querySelector(`[u-filter-no-results="${filterCategory}"]`).style
            .display = "none"
        }
      }, 1000)
    })
  })
}

// API call to get search results
async function getSearchResults(word, filterCategory, wordLength) {
  try {
    const res = await fetch(
      "https://xbwk-4swk-vecw.n2.xano.io/api:rjk6jzMS/morin_center?searchFieldWord=" +
      word +
      "&searchField=" + filterCategory /* + "&wordLength=" + wordLength*/ ,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    //console.log(res);
    const data = await res.json()
    //console.log(data)
    const result = await updateSearchResults(data, filterCategory);
  }
  catch (error) {
    console.log('error:', error);
    throw error;
  }
}

var firstSearchCall = true
async function updateSearchResults(data, filterCategory) {
  const list = document.querySelector(`[u-filter-search-list="${filterCategory}"]`)
  if (firstSearchCall == false) {
    // after the first call, we need to remove all item but one to keep a template to clone the new item list
    while (list.children.length > 1)
      list.removeChild(list.lastChild)
  }
  console.log(data)
  if (data) {
    const itemTemplate = list.firstElementChild
    itemTemplate.style.display = "block"
    //const itemList = itemTemplate.parentElement
    const items = data.map((firstName) => {
      const item = itemTemplate.cloneNode(true)
      if (firstName) item.firstElementChild.textContent = firstName

      return item
    })
    list.append(...items)
    list.firstElementChild.style.display = "none"
    document.querySelector(`[u-filter-loader="${filterCategory}"]`).style.display = "none"
    document.querySelector(`[u-filter-search-list="${filterCategory}"]`).style.display = "block"
  } else {
    document.querySelector(`[u-filter-no-results="${filterCategory}"]`).style.display = "block"
    document.querySelector(`[u-filter-loader="${filterCategory}"]`).style.display = "none"
  }
  firstSearchCall = false
}

// Filtering the offenses options
filterOffenses()

function filterOffenses() {
  document.querySelector('#offenseSearch').addEventListener('keyup', (e) => {
    console.log(e.target.value)
    document.querySelectorAll('[u-data-value]').forEach(el => {
      if (!(el.getAttribute('u-data-value').toLowerCase()).includes(e.target.value
          .toLowerCase())) el.style.display = "none";
      else {
        console.log("match");
        el.style.display = "flex";
      }
    })
  })
}

// Function to scroll back to top
function scrollTop() {
  document.querySelector('[listwrapper]').scrollTop = 0
}
