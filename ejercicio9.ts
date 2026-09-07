interface Producto {
    nombre: string;
    precio: number;
}

const productos: Producto[] = [
    { nombre: 'Laptop', precio: 3500000 },
    { nombre: 'Mouse', precio: 80000 },
    { nombre: 'Teclado', precio: 150000 },
    { nombre: 'Monitor', precio: 950000 },
    { nombre: 'Audífonos', precio: 220000 }
];

let productoMayorPrecio = productos[0];

for (const producto of productos) {
    if (producto.precio > productoMayorPrecio.precio) {
        productoMayorPrecio = producto;
    }
}

console.log(`El producto con mayor precio es ${productoMayorPrecio.nombre} con un precio de $${productoMayorPrecio.precio}`);