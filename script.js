const btn = document.querySelector
("#boton");

const menu = document.querySelector
("#menucito");

btn.addEventListener("click", () => {
menu.classList.toggle("activo");
});


const botones = document.querySelectorAll(".btn-agregar");
const mensajito = document.getElementById("mensajito");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    mensajito.textContent = "🌸 Adquirido! Agradecemos su compra 🌻";
    mensajito.style.display = "block";
 
    setTimeout(() => {
      mensajito.style.display = "none";
    }, 3000);
  });
});

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Mensaje enviado correctamente ✔");

  formulario.reset();
});

