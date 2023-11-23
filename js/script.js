document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navigation = document.querySelector(".navigation");
  
    hamburger.addEventListener("click", function () {
      navigation.classList.toggle("show");
    });
  
    const navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("show");
      });
    });
  });