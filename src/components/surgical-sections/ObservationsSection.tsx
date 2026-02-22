import React from 'react';

interface ObservationsSectionProps {
  observaciones: string;
  onChange: (value: string) => void;
}

const ObservationsSection: React.FC<ObservationsSectionProps> = ({ observaciones, onChange }) => {
  return (
    <div className="form-section">
      <h3>OBSERVACIONES</h3>

      <div className="form-group">
        <textarea
          value={observaciones}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escriba aquí las observaciones..."
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default ObservationsSection;
