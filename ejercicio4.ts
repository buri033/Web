const numeros: number[] = [];

for (let i = 0; i < 1500; i++) {
    numeros.push(Math.round(Math.random() * 100));
}

const sumaTotal = numeros.reduce((acumulador, numero) => acumulador + numero, 0);

console.log(`Cantidad de números generados: ${numeros.length}`);
console.log(`La suma total es: ${sumaTotal}`);