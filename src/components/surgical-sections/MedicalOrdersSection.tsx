import React from 'react';

interface MedicalOrdersSectionProps {
  ordenesMedicas: string;
  onChange: (value: string) => void;
}

const MedicalOrdersSection: React.FC<MedicalOrdersSectionProps> = ({ ordenesMedicas, onChange }) => {
  return (
    <div className="form-section">
      <h3>ÓRDENES Y PRESCRIPCIONES MÉDICAS</h3>

      <div className="form-group">
        <textarea
          value={ordenesMedicas}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escriba aquí las órdenes y prescripciones médicas..."
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default MedicalOrdersSection;
