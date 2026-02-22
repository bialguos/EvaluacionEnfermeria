import type { NursingEvaluation } from '../types/evaluation';

interface EvaluationsListProps {
  evaluations: NursingEvaluation[];
  onEdit: (evaluation: NursingEvaluation) => void;
  onDelete: (id: string) => void;
}

const EvaluationsList = ({ evaluations, onEdit, onDelete }: EvaluationsListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (evaluations.length === 0) {
    return (
      <div className="no-records">
        <p>No hay evaluaciones de enfermería registradas.</p>
        <p>Haga clic en "Nueva Evaluación" para crear una.</p>
      </div>
    );
  }

  return (
    <div className="evaluations-list">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo de Evaluación</th>
            <th>Paciente</th>
            <th>Enfermera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation.id}>
              <td>{formatDate(evaluation.date)}</td>
              <td>{evaluation.evaluationName}</td>
              <td>{evaluation.patientName}</td>
              <td>{evaluation.nurse}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => onEdit(evaluation)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    if (window.confirm('¿Está seguro de eliminar esta evaluación?')) {
                      onDelete(evaluation.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationsList;
