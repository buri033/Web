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

for (const producto of productos) {
    console.log(`Producto: ${producto.nombre} - Precio: $${producto.precio}`);
}