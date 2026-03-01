import React from 'react';

interface HospitalizationSectionProps {
  alergias: string;
  medicacionHabitual: string;
  ppcc: string;
  taS: number;
  taD: number;
  fc: number;
  enfermeraPlanta: string;
  onChange: (field: string, value: any) => void;
}

const HospitalizationSection: React.FC<HospitalizationSectionProps> = ({
  alergias,
  medicacionHabitual,
  ppcc,
  taS,
  taD,
  fc,
  enfermeraPlanta,
  onChange
}) => {
  const editableStyle = {
    backgroundColor: '#fff9e6',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

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
            onChange={(e) => onChange('alergias', e.target.value)}
            style={editableStyle}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o Hospitalización</label>
          <input
            type="text"
            value={enfermeraPlanta}
            onChange={(e) => onChange('enfermeraPlanta', e.target.value)}
            style={editableStyle}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación Habitual</label>
          <textarea
            value={medicacionHabitual}
            onChange={(e) => onChange('medicacionHabitual', e.target.value)}
            rows={2}
            style={{ ...editableStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>PPCC (Problemas de Salud)</label>
          <input
            type="text"
            value={ppcc}
            onChange={(e) => onChange('ppcc', e.target.value)}
            style={editableStyle}
          />
        </div>
      </div>

      <div className="form-row" style={{ alignItems: 'flex-end' }}>
        <div className="form-group" style={{ flex: '0 0 auto' }}>
          <label>TA S/D (mmHg)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="number"
              value={taS}
              onChange={(e) => onChange('taS', Number(e.target.value))}
              style={{ ...editableStyle, width: '70px' }}
              placeholder="PAS"
            />
            <span style={{ fontWeight: 600, color: '#555' }}>/</span>
            <input
              type="number"
              value={taD}
              onChange={(e) => onChange('taD', Number(e.target.value))}
              style={{ ...editableStyle, width: '70px' }}
              placeholder="PAD"
            />
          </div>
        </div>

        <div className="form-group" style={{ flex: '0 0 120px' }}>
          <label>FC (lpm)</label>
          <input
            type="number"
            value={fc}
            onChange={(e) => onChange('fc', Number(e.target.value))}
            style={editableStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalizationSection;
