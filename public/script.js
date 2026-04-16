const btn = document.querySelector("#boton");
const menu = document.querySelector("#menucito");

btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

const mensajito = document.getElementById("mensajito");

// 🔥 MOSTRAR PERFUMES DESDE BACKEND
fetch("/contacto")
.then(res => res.json())
.then(data => {

    const contenedor = document.getElementById("lista-de-perfumes");

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

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {

        const mensajito = document.getElementById("mensajito");

        mensajito.textContent = "🌸 Adquirido! Gracias por tu compra 🌻";
        mensajito.style.display = "block";

        setTimeout(() => {
            mensajito.style.display = "none";
        }, 3000);
    }
});

});

// FORMULARIO
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;

    try {
        const res = await fetch("/contacto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, email, mensaje })
        });

        const data = await res.json();

        alert("Mensaje enviado y guardado ✔");
        formulario.reset();

    } catch (error) {
        alert("Error al enviar mensaje");
    }
});