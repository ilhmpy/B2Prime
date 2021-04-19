$(() => {

  // constants

  const headerMenu = $(".header__menu");
  const header = $(".header");
  const headerLinks = $(".header__nav-link");
  const headerMenuTab = document.querySelectorAll(".header__menu-tab");
  const headerMenuTabs = $(".header__menu-tabs");
  const sliderSwitcher = $(".slider__switcher");

  // показать / убрать меню у хедера

  $(".header__nav-links").on("click", e => {

    // для закрытия меню

    if (e.target.className == "header__nav-link activeLink") {
        setTimeout(changeState, 250);
        headerMenu.slideUp();
        headerLinks.removeClass("activeLink");
    }

    // для открытия

    else if (e.target.className == "header__nav-link") {
      headerLinks.removeClass("activeLink");
      if (e.target.className == "header__nav-link") {
        $(e.target).addClass("activeLink");
      }
      changeState({"background": "rgba(62, 61, 61, 0.1)","backdrop-filter": "blur(80px)"});
      headerMenu.slideDown();
      headerMenuTab.forEach(tab => {
        tab.style.display = "none";
        if (e.target.id == tab.id + "Link") {

          // в случае если пользователь зашёл с телефона назначается дисплей блок
          // (потому что блок имеет другую расстановку на мобильной версии)

          if (screen.width > 1024) {
            tab.style.display = "grid";
          } else {
            tab.style.display = "block";
          }
        }
      })
    }
  })

  // изменение слайдера с помощью переключателей
  $(".slider__switchers").on("click", e => {
    if (e.target.className == "slider__switcher") {
      sliderSwitcher.removeClass("activeSwitcher");
      $(e.target).addClass("activeSwitcher");
    }
  })

  // изменение кнопок прогресса пролистывания по сайту
  document.addEventListener("scroll", e => {
      if (pageYOffset > 551 || pageYOffset == 551) changePaginationProgress("markets");
   })
})

// сменить css элемента
let changeState = (
  cssObj = {"background": "","backdrop-filter": "blur(0px)"},
  change = $(".header")
) => change.css(cssObj);

const paginationBtn = document.querySelectorAll(".pagination__btn");
const paginationBtns = $(".pagination__btn");

// сменить пагинацию
function changePaginationProgress(
  addPagination,
  deletePaginations = $(".pagination__btn"),
  addPaginationBtn = document.querySelectorAll(".pagination__btn")
) {
  deletePaginations.removeClass("activeBtn");
  addPaginationBtn.forEach(btn => {
    if (btn.id == addPagination) btn.classList.add("activeBtn");
  });
}
