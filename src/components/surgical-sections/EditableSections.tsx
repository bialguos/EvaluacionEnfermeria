import React from 'react';

interface EditableSectionsProps {
  // Dispositivos
  retiradaDispositivos: boolean;
  retiradaDentadura: boolean;
  rasuradoZona: boolean;
  // Pruebas
  pruebasEcg: boolean;
  pruebasRx: boolean;
  pruebasAs: boolean;
  pruebasInfExterno: boolean;
  // Verificación
  verificacionCirujano: boolean;
  verificacionAnestesista: boolean;
  // Otros
  marcaje: boolean;
  pruebasCruzadas: boolean;
  transfusion: boolean;
  // Handlers
  onChange: (field: string, value: boolean) => void;
}

const EditableSections: React.FC<EditableSectionsProps> = ({
  retiradaDispositivos,
  retiradaDentadura,
  rasuradoZona,
  pruebasEcg,
  pruebasRx,
  pruebasAs,
  pruebasInfExterno,
  verificacionCirujano,
  verificacionAnestesista,
  marcaje,
  pruebasCruzadas,
  transfusion,
  onChange
}) => {
  return (
    <div className="form-section" style={{ backgroundColor: 'white' }}>
      <div className="checkbox-grid">
        {/* Columna Izquierda */}
        <div className="checkbox-column">
          {/* Retirada */}
          <div className="checkbox-row">
            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Retirada:
            </label>
            <div className="checkbox-options">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={retiradaDispositivos}
                  onChange={(e) => onChange('retiradaDispositivos', e.target.checked)}
                  id="dispositivos"
                />
                <label htmlFor="dispositivos">Dispositivos</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={retiradaDentadura}
                  onChange={(e) => onChange('retiradaDentadura', e.target.checked)}
                  id="dentadura"
                />
                <label htmlFor="dentadura">Dentadura</label>
              </div>
            </div>
          </div>

          {/* Rasurado */}
          <div className="checkbox-row">
            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Rasurado zona quirúrgica:
            </label>
            <div className="checkbox-options">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={rasuradoZona}
                  onChange={(e) => onChange('rasuradoZona', e.target.checked)}
                  id="rasurado"
                />
                <label htmlFor="rasurado">Sí</label>
              </div>
            </div>
          </div>

          {/* Verificación médica */}
          <div className="checkbox-row">
            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Verificación médica:
            </label>
            <div className="checkbox-options">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={verificacionCirujano}
                  onChange={(e) => onChange('verificacionCirujano', e.target.checked)}
                  id="cirujano"
                />
                <label htmlFor="cirujano">Cirujano</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={verificacionAnestesista}
                  onChange={(e) => onChange('verificacionAnestesista', e.target.checked)}
                  id="anestesista"
                />
                <label htmlFor="anestesista">Anestesista</label>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="checkbox-column">
          {/* Pruebas complementarias */}
          <div className="checkbox-row">
            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Pruebas complementarias:
            </label>
            <div className="checkbox-options">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={pruebasEcg}
                  onChange={(e) => onChange('pruebasEcg', e.target.checked)}
                  id="ecg"
                />
                <label htmlFor="ecg">ECG</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={pruebasRx}
                  onChange={(e) => onChange('pruebasRx', e.target.checked)}
                  id="rx"
                />
                <label htmlFor="rx">RX</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={pruebasAs}
                  onChange={(e) => onChange('pruebasAs', e.target.checked)}
                  id="as"
                />
                <label htmlFor="as">AS</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={pruebasInfExterno}
                  onChange={(e) => onChange('pruebasInfExterno', e.target.checked)}
                  id="infExterno"
                />
                <label htmlFor="infExterno">INF EXTERNO</label>
              </div>
            </div>
          </div>

          {/* Marcaje, Pruebas cruzadas, Transfusión */}
          <div className="checkbox-row">
            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Otros:
            </label>
            <div className="checkbox-options">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={marcaje}
                  onChange={(e) => onChange('marcaje', e.target.checked)}
                  id="marcaje"
                />
                <label htmlFor="marcaje">Marcaje</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={pruebasCruzadas}
                  onChange={(e) => onChange('pruebasCruzadas', e.target.checked)}
                  id="pruebasCruzadas"
                />
                <label htmlFor="pruebasCruzadas">Pruebas cruzadas</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  checked={transfusion}
                  onChange={(e) => onChange('transfusion', e.target.checked)}
                  id="transfusion"
                />
                <label htmlFor="transfusion">Transfusión</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableSections;
