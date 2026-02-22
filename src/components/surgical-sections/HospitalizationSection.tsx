import React from 'react';

interface HospitalizationSectionProps {
  alergias: string;
  medicacionHabitual: string;
  ppcc: string;
  taS: number;
  taD: number;
  fc: number;
  enfermeraPlanta: string;
}

const HospitalizationSection: React.FC<HospitalizationSectionProps> = ({
  alergias,
  medicacionHabitual,
  ppcc,
  taS,
  taD,
  fc,
  enfermeraPlanta
}) => {
  return (
    <div className="hospitalization-section">
      <h3 style={{ margin: '0 0 15px 0', color: '#5dade2', fontSize: '1.1em' }}>
        HOSPITALIZACIÓN
      </h3>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Alergias</label>
          <input
            type="text"
            value={alergias}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación Habitual</label>
          <textarea
            value={medicacionHabitual}
            readOnly
            className="info-field readonly"
            rows={2}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>PPCC (Problemas de Salud)</label>
          <input
            type="text"
            value={ppcc}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: '0 0 150px' }}>
          <label>TA S/D (mmHg)</label>
          <input
            type="text"
            value={`${taS}/${taD}`}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: '0 0 120px' }}>
          <label>FC (lpm)</label>
          <input
            type="number"
            value={fc}
            readOnly
            className="info-field readonly"
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o Planta</label>
          <input
            type="text"
            value={enfermeraPlanta}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalizationSection;
