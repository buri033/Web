interface Persona {
    nombre: string;
    edad: number;
    ciudad: string;
}

const persona: Persona = {
    nombre: 'María López',
    edad: 28,
    ciudad: 'Medellín'
};

console.log(`Nombre: ${persona.nombre}`);
console.log(`Edad: ${persona.edad}`);
console.log(`Ciudad: ${persona.ciudad}`);