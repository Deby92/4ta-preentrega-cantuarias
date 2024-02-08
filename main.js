function agregarAlCarrito(producto) {
    producto.precio = parseFloat(producto.precio);
    carrito.push(producto);
    mostrarCarrito();
    actualizarLocalStorage();
    mostrarCostoTotal();

    mostrarCostoTotalBtn.disabled = false;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarLocalStorage();
    mostrarCostoTotal();

    mostrarCostoTotalBtn.disabled = carrito.length === 0;
}

// Función para mostrar los productos en la lista y en el carrito
function mostrarCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    const carritoElement = document.getElementById('carrito');
    const mostrarCostoTotalBtn = document.getElementById('mostrarCostoTotalBtn');

    mostrarCostoTotalBtn.disabled = carrito.length === 0;

    // Limpiar las listas
    listaProductos.innerHTML = '';
    carritoElement.innerHTML = '';

    // Mostrar productos disponibles
    productos.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio} pesos`;
        listItem.addEventListener('click', () => agregarAlCarrito(producto));
        listaProductos.appendChild(listItem);
    });

    // Mostrar productos en el carrito
    carrito.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio} pesos`;
        listItem.addEventListener('click', () => eliminarDelCarrito(index));
        carritoElement.appendChild(listItem);
    });
}

// Función para actualizar el localStorage con el carrito actual
function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar el costo total en el carrito
function mostrarCostoTotal() {
    const costoTotal = carrito.reduce((total, producto) => {
        const precioProducto = typeof producto.precio === 'number' ? producto.precio : 0;
        return total + precioProducto;
    }, 0);

    const costoTotalElement = document.getElementById('costoTotal');
    costoTotalElement.textContent = `Costo total del carrito: ${costoTotal.toFixed(4)} pesos`; // Redondear a 2 decimales
    const mostrarCostoTotalBtn = document.getElementById('mostrarCostoTotalBtn');
    mostrarCostoTotalBtn.disabled = carrito.length === 0;
    console.log(costoTotalElement.innerHTML);
}

// Inicializar carrito desde localStorage o crear un carrito vacío
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let productos = [];

// Obtener datos desde un JSON local usando fetch y promesas
fetch('datos-mascotas.json')
    .then(response => response.json())
    .then(data => {
        // Asignar datos al arreglo de productos
        productos = data.productos; // Corrección aquí
        // Mostrar la lista de productos y el carrito al cargar la página
        mostrarCarrito();
        mostrarCostoTotal();
    })
    .catch(error => console.error('Error al cargar datos:', error));
