import React from 'react';

interface PreUrpaSectionProps {
  intervencion: string;
  lateralidad: string;
  enfermeraUrpa: string;
  medicacionPreUrpa: string;
  fechaEntradaUrpa: string;
  fechaSalidaUrpa: string;
  onChangeEnfermera: (value: string) => void;
  onChangeMedicacion: (value: string) => void;
  onChangeFechaEntrada: (value: string) => void;
  onChangeFechaSalida: (value: string) => void;
}

const PreUrpaSection: React.FC<PreUrpaSectionProps> = ({
  intervencion,
  lateralidad,
  enfermeraUrpa,
  medicacionPreUrpa,
  fechaEntradaUrpa,
  fechaSalidaUrpa,
  onChangeEnfermera,
  onChangeMedicacion,
  onChangeFechaEntrada,
  onChangeFechaSalida
}) => {
  return (
    <div className="pre-urpa-section">
      <h3 style={{ margin: '0 0 15px 0', color: '#5dade2', fontSize: '1.1em' }}>
        PRE-URPA
      </h3>

      <div className="form-row" style={{ alignItems: 'flex-start' }}>
        {/* Columna izquierda: Intervención y Lateralidad */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="form-group">
            <label>Intervención</label>
            <input
              type="text"
              value={intervencion}
              readOnly
              className="info-field readonly"
            />
          </div>
          <div className="form-group">
            <label>Lateralidad</label>
            <input
              type="text"
              value={lateralidad}
              readOnly
              className="info-field readonly"
            />
          </div>
        </div>

        {/* Columna derecha: Enfermera, Fecha entrada, Fecha salida */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="form-group">
            <label>Enfermera/o URPA</label>
            <input
              type="text"
              value={enfermeraUrpa}
              onChange={(e) => onChangeEnfermera(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
          <div className="form-group">
            <label>Fecha/hora de entrada</label>
            <input
              type="datetime-local"
              value={fechaEntradaUrpa}
              onChange={(e) => onChangeFechaEntrada(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
          <div className="form-group">
            <label>Fecha/hora de salida</label>
            <input
              type="datetime-local"
              value={fechaSalidaUrpa}
              onChange={(e) => onChangeFechaSalida(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
        </div>
      </div>

      <div className="form-row" style={{ marginTop: '10px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación administrada</label>
          <input
            type="text"
            value={medicacionPreUrpa}
            onChange={(e) => onChangeMedicacion(e.target.value)}
            style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreUrpaSection;
