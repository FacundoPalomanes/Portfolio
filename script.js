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

  // --- Formulario de contacto (EmailJS, como La Gran Esquina) ---
  var contactForm = document.getElementById("contact-form");
  if (contactForm && typeof emailjs !== "undefined") {
    emailjs.init("qujuwaFg6Ka9_Azl0");

    function setResponse(html) {
      var response = document.getElementById("response");
      if (response) response.innerHTML = html;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      var regexTelefono = /^\d{10}$/;
      var regexNombreApellido = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/;

      var formValid = true;
      var errors = [];

      var emailInput = document.getElementById("email");
      var numeroInput = document.getElementById("numero");
      var nombreInput = document.getElementById("nombre");
      var apellidoInput = document.getElementById("apellido");
      var consultaInput = document.getElementById("consulta");

      if (!regexEmail.test(emailInput.value)) {
        errors.push("Hay un error en el email");
        emailInput.value = "";
        formValid = false;
      }

      if (!regexTelefono.test(numeroInput.value)) {
        errors.push("Hay un error en el teléfono, no ingresar con puntos ni guiones");
        numeroInput.value = "";
        formValid = false;
      }

      if (
        !regexNombreApellido.test(nombreInput.value) ||
        !regexNombreApellido.test(apellidoInput.value)
      ) {
        errors.push("Hay un error en el nombre y apellido, no ingresar números ni símbolos");
        nombreInput.value = "";
        apellidoInput.value = "";
        formValid = false;
      }

      if (formValid) {
        var params = {
          from_name: nombreInput.value + " " + apellidoInput.value,
          message:
            "Email: " +
            emailInput.value +
            ", Numero De Telefono: " +
            numeroInput.value +
            ", Consulta: " +
            consultaInput.value,
        };

        emailjs
          .send("service_jnl3jqq", "template_4jxp403", params)
          .then(function () {
            contactForm.reset();
            setResponse(
              '<div class="form-alert form-alert--success" role="alert">Mensaje enviado correctamente.</div>'
            );
          })
          .catch(function (error) {
            setResponse(
              '<div class="form-alert form-alert--error" role="alert">Hubo un error intentando mandar el formulario.</div>'
            );
            console.error(error);
          });
      } else {
        var textResponse = errors
          .map(function (err, index) {
            return index === 0 ? err : err.toLowerCase();
          })
          .join(", ");
        setResponse(
          '<div class="form-alert form-alert--error" role="alert">' + textResponse + "</div>"
        );
      }
    });
  }

})();
