import React from 'react';

interface SignatureSectionProps {
  enfermera: string;
  fechaHoraInforme: string;
  onChange: (value: string) => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  enfermera,
  fechaHoraInforme,
  onChange
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
      <h3>FIRMA Y VALIDACIÓN</h3>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Enfermera/o responsable</label>
          <input
            type="text"
            value={enfermera}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Nombre completo de la enfermera/o"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: '0 0 200px' }}>
          <label>Firmado</label>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '30px 10px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            color: '#999',
            fontStyle: 'italic'
          }}>
            [Espacio para firma]
          </div>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Fecha y hora del informe</label>
          <input
            type="text"
            value={formatDateTime(fechaHoraInforme)}
            readOnly
            className="info-field readonly"
          />
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
