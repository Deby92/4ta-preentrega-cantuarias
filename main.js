function agregarAlCarrito(producto) {
    producto.precio = parseFloat(producto.precio);
    carrito.push(producto);
    mostrarCarrito();
    actualizarLocalStorage();
    mostrarCostoTotal();

    mostrarCostoTotalBtn.disabled = false;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarLocalStorage();
    mostrarCostoTotal();

    mostrarCostoTotalBtn.disabled = carrito.length === 0;
}

function mostrarCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    const carritoElement = document.getElementById('carrito');
    const mostrarCostoTotalBtn = document.getElementById('mostrarCostoTotalBtn');

    mostrarCostoTotalBtn.disabled = carrito.length === 0;

    listaProductos.innerHTML = '';
    carritoElement.innerHTML = '';
    listaProductos.style.display = 'grid';
    listaProductos.style.gridTemplateColumns = 'repeat(2, 1fr)';
    listaProductos.style.gap = '20px';

    productos.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio} pesos`;
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        listItem.appendChild(imagenProducto);

        listItem.addEventListener('click', () => agregarAlCarrito(producto));
        listaProductos.appendChild(listItem);
    });

    carrito.forEach((producto, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio} pesos`;
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        listItem.appendChild(imagenProducto);
        imagenProducto.style.width = '100%';
        imagenProducto.style.height = 'auto';

        listItem.appendChild(imagenProducto);
        
        listItem.addEventListener('click', () => eliminarDelCarrito(index));
        carritoElement.appendChild(listItem);
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
    const mostrarCostoTotalBtn = document.getElementById('mostrarCostoTotalBtn');
    mostrarCostoTotalBtn.disabled = carrito.length === 0;
    console.log(costoTotalElement.innerHTML);
}

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let productos = [];

fetch('datos-mascotas.json')
    .then(response => response.json())
    .then(data => {
        productos = data.productos;
        mostrarCarrito();
        mostrarCostoTotal();
    })
    .catch(error => console.error('Error al cargar datos:', error));
