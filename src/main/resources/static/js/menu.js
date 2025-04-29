const menuBtns = document.querySelectorAll('.menu-btn');
const foodItems = document.querySelectorAll('.food-item');

let activeBtn = "entradas";

// Mostrar el menú activo al cargar la página
showFoodMenu(activeBtn);

// Agregar el evento de click para cada botón del menú
menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        resetActiveBtn();
        showFoodMenu(btn.id);
        btn.classList.add('active-btn');
    });
});

// Función para restablecer el botón activo
function resetActiveBtn(){
    menuBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}

// Función para mostrar los ítems del menú según la categoría seleccionada
function showFoodMenu(newMenuBtn){
    activeBtn = newMenuBtn;
    foodItems.forEach((item) => {
        if(item.classList.contains(activeBtn)){
            item.style.display = "grid";
        } else {
            item.style.display = "none";
        }
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Obtener carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya existe, solo aumentamos la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizamos el contador del carrito en el navbar
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito en el navbar
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('carrito-count').textContent = cantidadTotal;
}

// Al cargar la página, actualizamos el contador de carrito
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
