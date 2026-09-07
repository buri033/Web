const numeros: number[] = [15, 42, 68, 23, 89, 12, 54, 77, 31, 95];

const mayoresA50 = numeros.filter(numero => numero > 50);

console.log('Números mayores a 50:');
for (const numero of mayoresA50) {
    console.log(numero);
}