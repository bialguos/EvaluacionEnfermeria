import React from 'react';

interface UrpaSectionProps {
  anestesistaUrpa: string;
  enfermeraUrpaFinal: string;
  fechaEntradaUrpa: string;
  fechaSalidaUrpa: string;
  onChangeFechaEntrada: (value: string) => void;
  onChangeFechaSalida: (value: string) => void;
}

const UrpaSection: React.FC<UrpaSectionProps> = ({
  anestesistaUrpa,
  enfermeraUrpaFinal,
  fechaEntradaUrpa,
  fechaSalidaUrpa,
  onChangeFechaEntrada,
  onChangeFechaSalida
}) => {
  return (
    <div className="form-section">
      <h3>URPA (Unidad de Recuperación Post-Anestésica)</h3>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Anestesista URPA</label>
          <input
            type="text"
            value={anestesistaUrpa}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o URPA</label>
          <input
            type="text"
            value={enfermeraUrpaFinal}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha y Hora Entrada URPA *</label>
          <input
            type="datetime-local"
            value={fechaEntradaUrpa}
            onChange={(e) => onChangeFechaEntrada(e.target.value)}
            style={{ backgroundColor: '#fff9e6' }}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha y Hora Salida URPA *</label>
          <input
            type="datetime-local"
            value={fechaSalidaUrpa}
            onChange={(e) => onChangeFechaSalida(e.target.value)}
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

export default UrpaSection;
