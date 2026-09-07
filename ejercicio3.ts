const numeros: number[] = [15, 42, 68, 23, 89, 12, 54, 77, 31, 95];

let sumaTotal = 0;
for (const numero of numeros) {
    sumaTotal += numero;
}

console.log(`La suma total es: ${sumaTotal}`);