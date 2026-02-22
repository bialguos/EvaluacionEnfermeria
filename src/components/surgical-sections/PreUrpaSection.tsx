import React from 'react';

interface PreUrpaSectionProps {
  intervencion: string;
  lateralidad: string;
  enfermeraUrpa: string;
  medicacionPreUrpa: string;
}

const PreUrpaSection: React.FC<PreUrpaSectionProps> = ({
  intervencion,
  lateralidad,
  enfermeraUrpa,
  medicacionPreUrpa
}) => {
  return (
    <div className="pre-urpa-section">
      <h3 style={{ margin: '0 0 15px 0', color: '#5dade2', fontSize: '1.1em' }}>
        PRE-URPA
      </h3>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Intervención</label>
          <input
            type="text"
            value={intervencion}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: '0 0 200px' }}>
          <label>Lateralidad</label>
          <input
            type="text"
            value={lateralidad}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o URPA</label>
          <input
            type="text"
            value={enfermeraUrpa}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación Pre-URPA</label>
          <input
            type="text"
            value={medicacionPreUrpa}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>
    </div>
  );
};

export default PreUrpaSection;
