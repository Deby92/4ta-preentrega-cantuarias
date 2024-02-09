const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = [];

function agregarAlCarrito(producto) {
    const productoCopiado = {...producto};
    productoCopiado.precio = parseFloat(productoCopiado.precio);
    carrito.push(productoCopiado);
    mostrarCarrito();
    actualizarLocalStorage();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarLocalStorage();
}

function mostrarCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    const carritoElement = document.getElementById('carrito');
    const mostrarCostoTotalBtn = document.getElementById('mostrarCostoTotalBtn');

    mostrarCostoTotalBtn.disabled = carrito.length === 0;

    listaProductos.innerHTML = '';
    carritoElement.innerHTML = '';
    carritoElement.style.display = 'grid';
    carritoElement.style.gridTemplateColumns = 'repeat(2, 1fr)';
    carritoElement.style.gap = '20px';

    productos.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio} pesos`;
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;

        listItem.appendChild(imagenProducto);

        listItem.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
        listaProductos.appendChild(listItem);

        imagenProducto.style.width = '100%';
        imagenProducto.style.height = 'auto';

    });

    carrito.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio.toFixed(3)} pesos`;
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        listItem.appendChild(imagenProducto);

        listItem.addEventListener('click', () => eliminarDelCarrito(index));
        carritoElement.appendChild(listItem);
    });
}

function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCostoTotal() {
    const costoTotal = carrito.reduce((total, producto) => {
        const precioProducto = typeof producto.precio === 'number' ? producto.precio : 0;
        return total + precioProducto;
    }, 0);

    const costoTotalElement = document.getElementById('costoTotal');
    costoTotalElement.textContent = `Costo total del carrito: ${costoTotal} pesos`;


    if (carrito.length > 0 && costoTotal > 0) {
        Swal.fire({
            title: 'Compra completada!',
            text: `Total: ${costoTotal.toFixed(3)} pesos`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            reiniciarCarrito();
        });
    }
}

function reiniciarCarrito() {
    carrito.length = 0;
    mostrarCarrito();
    actualizarLocalStorage();
}
document.getElementById('mostrarCostoTotalBtn').addEventListener('click', mostrarCostoTotal);

function cargarProductos() {
    fetch('datos-mascotas.json')
        .then(response => response.json())
        .then(data => {
            productos = data.productos;
            mostrarCarrito();
        })
        .catch(error => console.error('Error al cargar datos:', error));
}

cargarProductos();