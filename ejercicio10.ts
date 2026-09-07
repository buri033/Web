interface ProductoInventario {
    nombre: string;
    precio: number;
    unidadesDisponibles: number;
}

const inventario: ProductoInventario[] = [
    { nombre: 'Laptop', precio: 3500000, unidadesDisponibles: 10 },
    { nombre: 'Mouse', precio: 80000, unidadesDisponibles: 45 },
    { nombre: 'Teclado', precio: 150000, unidadesDisponibles: 25 },
    { nombre: 'Monitor', precio: 950000, unidadesDisponibles: 12 },
    { nombre: 'Audífonos', precio: 220000, unidadesDisponibles: 30 }
];

let valorTotalInventario = 0;

for (const producto of inventario) {
    valorTotalInventario += producto.precio * producto.unidadesDisponibles;
}

console.log(`El valor total del inventario es: $${valorTotalInventario}`);