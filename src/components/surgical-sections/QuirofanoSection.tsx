import React from 'react';

interface QuirofanoSectionProps {
  cirujano: string;
  anestesista: string;
  tipoAnestesia: string;
  fechaEntradaQuirofano: string;
  fechaSalidaQuirofano: string;
  enfermeraQuirofano: string;
  medicacionQuirofano: string;
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
  onChangeMedicacion
}) => {
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          <label>Fecha y Hora Entrada Quirófano</label>
          <input
            type="text"
            value={formatDateTime(fechaEntradaQuirofano)}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha y Hora Salida Quirófano</label>
          <input
            type="text"
            value={formatDateTime(fechaSalidaQuirofano)}
            readOnly
            className="info-field readonly"
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
        * Campo editable
      </p>
    </div>
  );
};

export default QuirofanoSection;
