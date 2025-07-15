import pensum_ingenieria from '../db/Pensum_p231_ingenieria.json';
import pensum_tecnologia from '../db/Pensum_t215_tecnologia.json';
import './Pensum.css';

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
      <div className="estado-resumen grid gap-2 text-sm font-semibold mb-6 text-center">
        <p className="text-green-700">
          ✅ Aprobadas: {totalAprobadasIngenieria} ({porcentajeIngenieria(totalAprobadasIngenieria)}%)
        </p>
        <p className="text-blue-700">
          📘 Matriculadas: {totalMatriculadasIngenieria} ({porcentajeIngenieria(totalMatriculadasIngenieria)}%)
        </p>
        <p className="text-yellow-700">
          🕓 Pendientes: {totalPendientesIngenieria} ({porcentajeIngenieria(totalPendientesIngenieria)}%)
        </p>
        <p className="text-red-700">
          ❌ Reprobadas: {totalDesaprobadasIngenieria} ({porcentajeIngenieria(totalDesaprobadasIngenieria)}%)
        </p>
        <p className="text-gray-600">
          📊 Total de materias: {totalMateriasIngenieria}
        </p>
      </div>

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

      <div className="estado-resumen grid gap-2 text-sm font-semibold mb-6 text-center">
        <p className="text-green-700">
          ✅ Aprobadas: {totalAprobadasTecnologia} ({porcentajeTecnologia(totalAprobadasTecnologia)}%)
        </p>
        <p className="text-blue-700">
          📘 Matriculadas: {totalMatriculadasTecnologia} ({porcentajeTecnologia(totalMatriculadasTecnologia)}%)
        </p>
        <p className="text-yellow-700">
          🕓 Pendientes: {totalPendientesTecnologia} ({porcentajeTecnologia(totalPendientesTecnologia)}%)
        </p>
        <p className="text-red-700">
          ❌ Reprobadas: {totalDesaprobadasTecnologia} ({porcentajeTecnologia(totalDesaprobadasTecnologia)}%)
        </p>
        <p className="text-gray-600">
          📊 Total de materias: {totalMateriasTecnologia}
        </p>
      </div>
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
