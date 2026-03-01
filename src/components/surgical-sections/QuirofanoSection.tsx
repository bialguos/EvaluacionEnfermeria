import React from 'react';

interface QuirofanoSectionProps {
  cirujano: string;
  anestesista: string;
  tipoAnestesia: string;
  fechaEntradaQuirofano: string;
  fechaSalidaQuirofano: string;
  enfermeraQuirofano: string;
  medicacionQuirofano: string;
  onChangeFechaEntrada: (value: string) => void;
  onChangeFechaSalida: (value: string) => void;
  onChangeMedicacion: (value: string) => void;
}

const QuirofanoSection: React.FC<QuirofanoSectionProps> = ({
  cirujano,
  anestesista,
  tipoAnestesia,
  fechaEntradaQuirofano,
  fechaSalidaQuirofano,
  enfermeraQuirofano,
  medicacionQuirofano,
  onChangeFechaEntrada,
  onChangeFechaSalida,
  onChangeMedicacion
}) => {
  return (
    <div className="form-section">
      <h3>QUIRÓFANO</h3>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Cirujano</label>
          <input
            type="text"
            value={cirujano}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Anestesista</label>
          <input
            type="text"
            value={anestesista}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Tipo de Anestesia</label>
          <input
            type="text"
            value={tipoAnestesia}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha/hora de entrada *</label>
          <input
            type="datetime-local"
            value={fechaEntradaQuirofano}
            onChange={(e) => onChangeFechaEntrada(e.target.value)}
            style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha/hora de salida *</label>
          <input
            type="datetime-local"
            value={fechaSalidaQuirofano}
            onChange={(e) => onChangeFechaSalida(e.target.value)}
            style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o Quirófano</label>
          <input
            type="text"
            value={enfermeraQuirofano}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación Quirófano *</label>
          <textarea
            value={medicacionQuirofano}
            onChange={(e) => onChangeMedicacion(e.target.value)}
            placeholder="Medicación administrada en quirófano..."
            rows={2}
            style={{ backgroundColor: '#fff9e6' }}
          />
        </div>
      </div>

      <p style={{ fontSize: '0.85em', color: '#666', fontStyle: 'italic', margin: '5px 0 0 0' }}>
        * Campos editables
      </p>
    </div>
  );
};

export default QuirofanoSection;
