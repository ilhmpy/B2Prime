$(() => {
  // constants

  const headerMenu = $(".header__menu");
  const header = $(".header");
  const headerLinks = $(".header__nav-link");

  // показать / убрать меню у хедера

  $(".header__nav-links").on("click", e => {

    // для закрытия меню

    if (e.target.className == "header__nav-link activeLink") {
        changeState({"background":"", "backdrop-filter":"blur(0px)"});
        headerMenu.slideUp();
        headerLinks.removeClass("activeLink");
    }

    // для открытия

    else if (e.target.className == "header__nav-link" || e.target.tagName == "I") {
      headerLinks.removeClass("activeLink");
      if (e.target.className == "header__nav-link") {
        $(e.target).addClass("activeLink");
      }
      changeState();
      headerMenu.slideDown();
    }
  })
})

// сменить css элемента
let  changeState = (
  cssObj = {"background": "rgba(62, 61, 61, 0.1)","backdrop-filter": "blur(80px)"},
  change = $(".header")
) => change.css(cssObj);
