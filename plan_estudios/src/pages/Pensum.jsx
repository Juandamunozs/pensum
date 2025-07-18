import pensum_ingenieria from '../db/Pensum_p231_ingenieria.json';
import pensum_tecnologia from '../db/Pensum_t215_tecnologia.json';
import './Pensum.css';
import { MdCheckCircle, MdMenuBook, MdAccessTime, MdCancel, MdBarChart } from 'react-icons/md';

// npm install react-icons

const manejarDescargaPDF = () => {
  window.print();
};

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
      </section>

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
