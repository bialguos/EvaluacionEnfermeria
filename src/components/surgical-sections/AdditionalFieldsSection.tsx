import React from 'react';

interface AdditionalFieldsSectionProps {
  viasVenosas: string;
  vendaje: string;
  sondaVesical: string;
  oxigenoterapia: string;
  drenajes: string;
  otros: string;
  apositos: string;
  onChange: (field: string, value: string) => void;
}

const AdditionalFieldsSection: React.FC<AdditionalFieldsSectionProps> = ({
  viasVenosas,
  vendaje,
  sondaVesical,
  oxigenoterapia,
  drenajes,
  otros,
  apositos,
  onChange
}) => {
  return (
    <div className="form-section">
      <h3>INFORMACIÓN ADICIONAL</h3>

      <div className="additional-fields-grid">
        {/* Columna Izquierda */}
        <div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Vías venosas</label>
            <input
              type="text"
              value={viasVenosas}
              onChange={(e) => onChange('viasVenosas', e.target.value)}
              placeholder="Ej: VVP en brazo derecho, catéter central..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Vendaje</label>
            <input
              type="text"
              value={vendaje}
              onChange={(e) => onChange('vendaje', e.target.value)}
              placeholder="Descripción del vendaje..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Sonda vesical</label>
            <input
              type="text"
              value={sondaVesical}
              onChange={(e) => onChange('sondaVesical', e.target.value)}
              placeholder="Ej: Sonda Foley nº14..."
            />
          </div>
        </div>

        {/* Columna Derecha */}
        <div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Oxigenoterapia</label>
            <input
              type="text"
              value={oxigenoterapia}
              onChange={(e) => onChange('oxigenoterapia', e.target.value)}
              placeholder="Ej: Gafas nasales 2L/min..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Drenajes</label>
            <input
              type="text"
              value={drenajes}
              onChange={(e) => onChange('drenajes', e.target.value)}
              placeholder="Descripción de drenajes..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Otros</label>
            <input
              type="text"
              value={otros}
              onChange={(e) => onChange('otros', e.target.value)}
              placeholder="Otras observaciones..."
            />
          </div>
        </div>
      </div>

      {/* Apósitos - Campo completo */}
      <div className="form-group">
        <label>Apósitos</label>
        <textarea
          value={apositos}
          onChange={(e) => onChange('apositos', e.target.value)}
          placeholder="Descripción de apósitos aplicados..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default AdditionalFieldsSection;
