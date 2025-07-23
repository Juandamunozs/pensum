import pensum_ingenieria from '../db/Pensum_p231_ingenieria.json';
import pensum_tecnologia from '../db/Pensum_t215_tecnologia.json';
import fmi from '../db/fmi.json';
import './Pensum.css';
import { MdCheckCircle, MdMenuBook, MdAccessTime, MdCancel, MdBarChart, MdTimelapse } from 'react-icons/md';

// npm install react-icons

const manejarDescargaPDF = () => {
  window.print();
};

function tiempoRestante(ms, fechaObjetivo) {
  const objetivo = new Date(fechaObjetivo);

  if (ms <= 0) {
    const fechaStr = objetivo.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `Terminado el ${fechaStr}`;
  }

  const segundosTotales = Math.floor(ms / 1000);
  const minutosTotales = Math.floor(segundosTotales / 60);
  const horasTotales = Math.floor(minutosTotales / 60);
  const diasTotales = Math.floor(horasTotales / 24);

  const años = Math.floor(diasTotales / 365);
  const meses = Math.floor((diasTotales % 365) / 30.44);
  const dias = Math.floor((diasTotales % 365) % 30.44);

  const horas = horasTotales % 24;
  const minutos = minutosTotales % 60;
  const segundos = segundosTotales % 60;

  return años > 0
    ? `En ${años} año${años > 1 ? "s" : ""}, ${meses} mes${meses > 1 ? "es" : ""}, ${dias} día${dias > 1 ? "s" : ""}, ${horas}h, ${minutos}m, ${segundos}s`
    : meses > 0
      ? ` En ${meses} mes${meses > 1 ? "es" : ""}, ${dias} día${dias > 1 ? "s" : ""}, ${horas}h, ${minutos}m, ${segundos}s`
      : dias > 0
        ? `En ${dias} día${dias > 1 ? "s" : ""}, ${horas}h, ${minutos}m, ${segundos}s`
        : horas > 0
          ? `En ${horas}h, ${minutos}m, ${segundos}s`
          : minutos > 0
            ? `En ${minutos}m, ${segundos}s`
            : `En ${segundos}s`;
}

export default function Pensum() {

  const materiasPlanIngenieria = pensum_ingenieria.flatMap(sem => sem.materias);
  const totalMateriasIngenieria = materiasPlanIngenieria.length;

  const totalAprobadasIngenieria = materiasPlanIngenieria.filter(m => m.estado.toLowerCase() === 'aprobada').length;
  const totalMatriculadasIngenieria = materiasPlanIngenieria.filter(m => m.estado.toLowerCase() === 'matriculada').length;
  const totalPendientesIngenieria = materiasPlanIngenieria.filter(m => m.estado.toLowerCase() === 'pendiente').length;
  const totalDesaprobadasIngenieria = materiasPlanIngenieria.filter(m => m.estado.toLowerCase() === 'desaprobada').length;
  const porcentajeIngenieria = (cantidad) => ((cantidad / totalMateriasIngenieria) * 100).toFixed(1);

  const materiasPlanTecnologia = pensum_tecnologia.flatMap(sem => sem.materias);
  const totalMateriasTecnologia = materiasPlanTecnologia.length;
  const totalAprobadasTecnologia = materiasPlanTecnologia.filter(m => m.estado.toLowerCase() === 'aprobada').length;
  const totalMatriculadasTecnologia = materiasPlanTecnologia.filter(m => m.estado.toLowerCase() === 'matriculada').length;
  const totalPendientesTecnologia = materiasPlanTecnologia.filter(m => m.estado.toLowerCase() === 'pendiente').length;
  const totalDesaprobadasTecnologia = materiasPlanTecnologia.filter(m => m.estado.toLowerCase() === 'desaprobada').length;
  const porcentajeTecnologia = (cantidad) => ((cantidad / totalMateriasTecnologia) * 100).toFixed(1);

  const materiasfmi = fmi.flatMap(sem => sem.materias);
  const totalMateriasfmi = materiasfmi.length;
  const totalAprobadasfmi = materiasfmi.filter(m => m.estado.toLowerCase() === 'aprobada').length;
  const totalMatriculadasfmi = materiasfmi.filter(m => m.estado.toLowerCase() === 'matriculada').length;
  const totalPendientesfmi = materiasfmi.filter(m => m.estado.toLowerCase() === 'pendiente').length;
  const totalDesaprobadasfmi = materiasfmi.filter(m => m.estado.toLowerCase() === 'desaprobada').length;
  const porcentajefmi = (cantidad) => ((cantidad / totalMateriasfmi) * 100).toFixed(1);

  const now = new Date();
  const pensumTecnologia = new Date("2024-11-30");
  const pensumIngenieria = new Date("2028-05-30");

  const tiempoRestanteTecnologia = tiempoRestante(pensumTecnologia - now, pensumTecnologia);
  const tiempoRestanteIngenieria = tiempoRestante(pensumIngenieria - now, pensumIngenieria);


  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Plan de Estudios Ingeniería de Sistemas</h3>
      <p className="mb-6"></p>
      <div className="pensum-grid">
        {pensum_ingenieria.map((semestre, index) => (
          <div key={index} className="semestre-card">
            <h4 className="semestre-titulo">{semestre.semestre}</h4>
            <ul className="grid gap-2">
              {semestre.materias.map((materia, i) => (
                <li key={i} className={`materia ${materia.estado}`}>
                  {materia.nombre}
                  <br />
                  <strong>{materia.estado}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="estado-resumen grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold mb-10">
        <div className="flex items-center gap-3 bg-green-100 text-green-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCheckCircle className="text-green-600 text-2xl leading-none" />
          <span className="leading-tight">
            Aprobadas: {totalAprobadasIngenieria} ({porcentajeIngenieria(totalAprobadasIngenieria)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdMenuBook className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            Matriculadas: {totalMatriculadasIngenieria} ({porcentajeIngenieria(totalMatriculadasIngenieria)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-sm">
          <MdAccessTime className="text-yellow-600 text-2xl leading-none" />
          <span className="leading-tight">
            Pendientes: {totalPendientesIngenieria} ({porcentajeIngenieria(totalPendientesIngenieria)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-red-100 text-red-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCancel className="text-red-600 text-2xl leading-none" />
          <span className="leading-tight">
            Reprobadas: {totalDesaprobadasIngenieria} ({porcentajeIngenieria(totalDesaprobadasIngenieria)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm col-span-full justify-center">
          <MdBarChart className="text-gray-600 text-2xl leading-none" />
          <span className="leading-tight">
            Total de materias: {totalMateriasIngenieria}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdTimelapse className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            {tiempoRestanteIngenieria}
          </span>
        </div>

        {/* <div className="flex items-center gap-3 bg-purple-100 text-purple-800 px-4 py-3 rounded-lg shadow-sm">
          <FaGraduationCap className="text-purple-600 text-2xl leading-none" />
          <span className="leading-tight">
            Tiempo hasta el grado: {tiempoRestanteIngenieria}
          </span>
        </div> */}
      </section>

      <div class="linea-horizontal"></div>

      <h3 className="text-2xl font-bold mb-4">Plan de Estudios Tecnología en Sistemas de Información</h3>
      <p className="mb-6"></p>
      <div className="pensum-grid">
        {pensum_tecnologia.map((semestre, index) => (
          <div key={index} className="semestre-card">
            <h4 className="semestre-titulo">{semestre.semestre}</h4>
            <ul className="grid gap-2">
              {semestre.materias.map((materia, i) => (
                <li key={i} className={`materia ${materia.estado}`}>
                  {materia.nombre}
                  <br />
                  <strong>{materia.estado}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section className="estado-resumen grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold mb-10">
        <div className="flex items-center gap-3 bg-green-100 text-green-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCheckCircle className="text-green-600 text-2xl leading-none" />
          <span className="leading-tight">
            Aprobadas: {totalAprobadasTecnologia} ({porcentajeTecnologia(totalAprobadasTecnologia)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdMenuBook className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            Matriculadas: {totalMatriculadasTecnologia} ({porcentajeTecnologia(totalMatriculadasTecnologia)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-sm">
          <MdAccessTime className="text-yellow-600 text-2xl leading-none" />
          <span className="leading-tight">
            Pendientes: {totalPendientesTecnologia} ({porcentajeTecnologia(totalPendientesTecnologia)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-red-100 text-red-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCancel className="text-red-600 text-2xl leading-none" />
          <span className="leading-tight">
            Reprobadas: {totalDesaprobadasTecnologia} ({porcentajeTecnologia(totalDesaprobadasTecnologia)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm col-span-full justify-center">
          <MdBarChart className="text-gray-600 text-2xl leading-none" />
          <span className="leading-tight">
            Total de materias: {totalMateriasTecnologia}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdTimelapse className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            {tiempoRestanteTecnologia}
          </span>
        </div>
      </section>

      <div class="linea-horizontal"></div>

      <h3 className="text-2xl font-bold mb-4">Formación Integral Mixta USC</h3>
      <p className="mb-6"></p>
      <div className="pensum-grid-fmi">
        {fmi.map((semestre, index) => (
          <div key={index} className="semestre-card">
            <h4 className="semestre-titulo">{semestre.semestre}</h4>
            <ul className="grid gap-2">
              {semestre.materias.map((materia, i) => (
                <li key={i} className={`materia ${materia.estado}`}>
                  {materia.nombre}
                  <br />
                  <strong>{materia.estado}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section className="estado-resumen grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold mb-10">
        <div className="flex items-center gap-3 bg-green-100 text-green-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCheckCircle className="text-green-600 text-2xl leading-none" />
          <span className="leading-tight">
            Aprobadas: {totalAprobadasfmi} ({porcentajefmi(totalAprobadasfmi)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdMenuBook className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            Matriculadas: {totalMatriculadasfmi} ({porcentajefmi(totalMatriculadasfmi)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-sm">
          <MdAccessTime className="text-yellow-600 text-2xl leading-none" />
          <span className="leading-tight">
            Pendientes: {totalPendientesfmi} ({porcentajefmi(totalPendientesfmi)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-red-100 text-red-800 px-4 py-3 rounded-lg shadow-sm">
          <MdCancel className="text-red-600 text-2xl leading-none" />
          <span className="leading-tight">
            Reprobadas: {totalDesaprobadasfmi} ({porcentajefmi(totalDesaprobadasfmi)}%)
          </span>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm col-span-full justify-center">
          <MdBarChart className="text-gray-600 text-2xl leading-none" />
          <span className="leading-tight">
            Total de materias: {totalMateriasfmi}
          </span>
        </div>

        {/* <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
          <MdTimelapse className="text-blue-600 text-2xl leading-none" />
          <span className="leading-tight">
            {tiempoRestanteTecnologia}
          </span>
        </div> */}
      </section>

      <div className="btn-container">
        <button
          onClick={manejarDescargaPDF}
          className="btn-descarga"
          title="Descargar como PDF"
        >
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
}
