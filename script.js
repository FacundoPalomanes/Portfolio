(function () {
  //ocultar navbar al subir y bajar
  var bar = document.querySelector(".container-navbar");
  if (bar) {
    var lastScrollY = window.scrollY;
    var edgePx = 8;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        var dy = y - lastScrollY;
        if (y < 48) {
          bar.classList.remove("is-header-hidden");
        } else if (dy > edgePx) {
          bar.classList.add("is-header-hidden");
        } else if (dy < -edgePx) {
          bar.classList.remove("is-header-hidden");
        }
        lastScrollY = y;
      },
      { passive: true }
    );
  }


  // Modo oscuro
  var toggleDark = document.getElementById("dark-mode-toggle");

  function aplicarDarkMode(activo) {
    if (activo) {
      document.body.classList.add("dark-mode");
      if (toggleDark) toggleDark.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      if (toggleDark) toggleDark.textContent = "🌙";
    }
  }

  var guardado = localStorage.getItem("darkMode") === "true";
  aplicarDarkMode(guardado);

  function alternarDark(e) {
    if (e) e.preventDefault();
    document.body.classList.toggle("dark-mode");
    var ahora = document.body.classList.contains("dark-mode");
    aplicarDarkMode(ahora);
    localStorage.setItem("darkMode", ahora ? "true" : "false");
  }

  if (toggleDark) toggleDark.addEventListener("click", alternarDark);


  // --- Año en footer ---
  var anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();

})();
