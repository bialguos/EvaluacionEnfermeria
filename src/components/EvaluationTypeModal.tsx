import type { EvaluationType } from '../types/evaluation';
import { evaluationTypes } from '../types/evaluation';

interface EvaluationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: EvaluationType) => void;
}

const EvaluationTypeModal = ({ isOpen, onClose, onSelect }: EvaluationTypeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Seleccione el Tipo de Evaluación</h2>
        <div className="evaluation-type-list">
          {evaluationTypes.map((evalType) => (
            <div
              key={evalType.type}
              className="evaluation-type-item"
              onClick={() => onSelect(evalType.type)}
            >
              <h4>{evalType.name}</h4>
              <p>{evalType.description}</p>
            </div>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EvaluationTypeModal;
