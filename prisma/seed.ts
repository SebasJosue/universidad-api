// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Ejecutando seed GENERAL...");

  // -------------------------------------------------------
  //   1. CARRERA
  // -------------------------------------------------------
  const carrera = await prisma.carrera.create({
    data: { nombre: "Carrera Base" },
  });

  // -------------------------------------------------------
  //   2. CURSO
  // -------------------------------------------------------
  const curso = await prisma.curso.create({
    data: {
      nombre: "Curso Base",
      carreraId: carrera.id,
    },
  });

  // -------------------------------------------------------
  //   3. PROFESORES
  // -------------------------------------------------------
  const profesor1 = await prisma.profesor.create({
    data: {
      nombre: "Profesor Base",
      email: "profesor.base@example.com",
    },
  });

  const profesor2 = await prisma.profesor.create({
    data: {
      nombre: "Profesor Secundario",
      email: "profesor.secundario@example.com",
    },
  });

  // -------------------------------------------------------
  //   4. TITULOS
  // -------------------------------------------------------
  await prisma.titulo.create({
    data: {
      nombre: "Título Base del Profesor 1",
      profesorId: profesor1.id,
    },
  });

  await prisma.titulo.create({
    data: {
      nombre: "Certificación Avanzada del Profesor 2",
      profesorId: profesor2.id,
    },
  });

  // -------------------------------------------------------
  //   5. MATERIA
  // -------------------------------------------------------
  const materia = await prisma.materia.create({
    data: {
      nombre: "Materia Base",
      codigo: "GEN001",
      profesorId: profesor1.id,
      cursoId: curso.id,
      carreraId: carrera.id,
    },
  });

  // -------------------------------------------------------
  //   6. ESTUDIANTE
  // -------------------------------------------------------
  const estudiante = await prisma.estudiante.create({
    data: {
      nombre: "Estudiante Base",
      email: "estudiante.base@example.com",
      nroIdentificacion: "0000000000",
      carreraId: carrera.id,
    },
  });

  // -------------------------------------------------------
  //   7. INSCRIPCION
  // -------------------------------------------------------
  await prisma.inscripcion.create({
    data: {
      estudianteId: estudiante.id,
      materiaId: materia.id,
      nota: 0,
    },
  });

  console.log("Seed general ejecutado correctamente.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
