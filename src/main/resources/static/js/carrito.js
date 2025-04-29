// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tablaBody = document.querySelector('#tabla-carrito tbody');
    const totalCarrito = document.getElementById('total-carrito');
    const carritoCount = document.getElementById('carrito-count');

    tablaBody.innerHTML = ''; // Limpiar tabla
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += producto.cantidad;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>S/ ${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>S/ ${subtotal.toFixed(2)}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tablaBody.appendChild(fila);
    });

    totalCarrito.textContent = total.toFixed(2);
    carritoCount.textContent = cantidadTotal;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el producto en el índice dado
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito(); // Recargar la tabla
}

// Función para mostrar el formulario de compra
function procesarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    // Mostrar modal
    document.getElementById('modal-formulario').style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal-formulario').style.display = 'none';
}

// Función para mostrar los campos de pago según la opción seleccionada
function mostrarCamposPago() {
    const metodoPago = document.getElementById('metodo-pago').value;

    const tarjetaPago = document.getElementById('tarjeta-pago');
    const yapePago = document.getElementById('yape-pago');

    // Ocultar todos y quitar 'required'
    tarjetaPago.style.display = 'none';
    yapePago.style.display = 'none';

    document.getElementById('numero-tarjeta').required = false;
    document.getElementById('fecha-vencimiento').required = false;
    document.getElementById('cvv').required = false;
    document.getElementById('yape-numero').required = false;

    // Mostrar y agregar 'required' según selección
    if (metodoPago === 'tarjeta') {
        tarjetaPago.style.display = 'block';
        document.getElementById('numero-tarjeta').required = true;
        document.getElementById('fecha-vencimiento').required = true;
        document.getElementById('cvv').required = true;
    } else if (metodoPago === 'yape') {
        yapePago.style.display = 'block';
        document.getElementById('yape-numero').required = true;
    }
}


// Función para enviar el formulario
function enviarFormularioCompra(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const metodoPago = document.getElementById('metodo-pago').value;

    // Validar los campos obligatorios
    if (!nombre || !correo || !telefono || !direccion || !metodoPago) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    // Validar los campos de tarjeta si se seleccionó tarjeta como método de pago
    if (metodoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const fechaVencimiento = document.getElementById('fecha-vencimiento').value;
        const cvv = document.getElementById('cvv').value;

        if (!numeroTarjeta || !fechaVencimiento || !cvv) {
            alert('Por favor, completa todos los campos de la tarjeta.');
            return;
        }
    }

    // Validar los campos de Yape si se seleccionó Yape como método de pago
    if (metodoPago === 'yape') {
        const yapeNumero = document.getElementById('yape-numero').value;
        if (!yapeNumero) {
            alert('Por favor, ingresa tu número de Yape/Plin.');
            return;
        }
    }

    // Si el método de pago es "efectivo", no hay validaciones adicionales
    if (metodoPago === 'efectivo') {
        alert('¡Gracias por tu compra, ' + nombre + '!');
    }

    // Aquí podrías enviar la información al servidor
    console.log('Información del comprador:', { nombre, correo, telefono, direccion, metodoPago });

    localStorage.removeItem('carrito'); // Vaciar carrito
    alert('¡Gracias por tu compra, ' + nombre + '!');
    window.location.href = "/"; // Redirigir al inicio
}

// Cuando cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito(); // Mostrar carrito

    // Evento para procesar la compra
    const procesarCompraBtn = document.getElementById('procesar-compra-btn');
    if (procesarCompraBtn) {
        procesarCompraBtn.addEventListener('click', procesarCompra);
    }

    // Evento para cerrar el modal
    const closeModalBtn = document.querySelector('.close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', cerrarModal);
    }

    // Evento para mostrar campos de pago según el método seleccionado
    const metodoPagoSelect = document.getElementById('metodo-pago');
    if (metodoPagoSelect) {
        metodoPagoSelect.addEventListener('change', mostrarCamposPago);
    }

    // Evento para enviar el formulario de compra
    const formularioCompra = document.getElementById('formulario-compra');
    if (formularioCompra) {
        formularioCompra.addEventListener('submit', enviarFormularioCompra);
    }

    // Llamar a la función de mostrar campos de pago cuando la página carga
    mostrarCamposPago();
});
