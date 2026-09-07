interface Materia {
    nombre: string;
    nota: number;
}

interface Estudiante {
    nombre: string;
    semestre: number;
    materias: Materia[];
}

const estudiantes: Estudiante[] = [
    {
        nombre: 'Juan Pérez',
        semestre: 4,
        materias: [
            { nombre: 'Matemáticas', nota: 4.2 },
            { nombre: 'Programación', nota: 4.8 },
            { nombre: 'Bases de Datos', nota: 3.9 }
        ]
    },
    {
        nombre: 'Sofia Gómez',
        semestre: 2,
        materias: [
            { nombre: 'Álgebra', nota: 3.2 },
            { nombre: 'Lógica', nota: 3.5 },
            { nombre: 'Inglés', nota: 3.0 }
        ]
    },
    {
        nombre: 'Camilo Rodríguez',
        semestre: 6,
        materias: [
            { nombre: 'Redes', nota: 4.5 },
            { nombre: 'Sistemas Operativos', nota: 4.0 },
            { nombre: 'Física', nota: 4.7 }
        ]
    },
    {
        nombre: 'Laura Torres',
        semestre: 3,
        materias: [
            { nombre: 'Estadística', nota: 2.8 },
            { nombre: 'Programación Web', nota: 3.2 },
            { nombre: 'Contabilidad', nota: 3.0 }
        ]
    }
];

console.log('Estudiantes con promedio mayor a 3.5:');

for (const estudiante of estudiantes) {
    const sumaNotas = estudiante.materias.reduce((acc, materia) => acc + materia.nota, 0);
    const promedio = sumaNotas / estudiante.materias.length;

    if (promedio > 3.5) {
        console.log(`- ${estudiante.nombre} (Promedio: ${promedio.toFixed(2)})`);
    }
}