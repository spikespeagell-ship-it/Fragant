const btn = document.querySelector("#boton");
const menu = document.querySelector("#menucito");

btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

const mensajito = document.getElementById("mensajito");

// 🔥 MOSTRAR PERFUMES DESDE BACKEND
fetch("http://localhost:3000/perfumes")
.then(res => res.json())
.then(data => {

    const contenedor = document.getElementById("lista-perfumes");

    data.forEach(perfume => {

        const div = document.createElement("div");
        div.classList.add("perfume");

        div.innerHTML = `
            <h4>${perfume.nombre}</h4>
            <p>Precio: $${perfume.precio}</p>
            <button class="btn-agregar">Comprar</button>
        `;

        contenedor.appendChild(div);
    });

    // EVENTOS DE BOTONES
    document.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", () => {
            mensajito.textContent = "🌸 Adquirido! Agradecemos su compra 🌻";
            mensajito.style.display = "block";

            setTimeout(() => {
                mensajito.style.display = "none";
            }, 3000);
        });
    });

});

// FORMULARIO
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente ✔");
    formulario.reset();
});

