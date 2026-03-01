import React from 'react';

interface EditableSectionsProps {
  // Retirada dispositivos/dentadura
  retiradaDispositivos: boolean;  // SI
  retiradaDentadura: boolean;     // NO
  // Rasurado zona QX
  rasuradoZona: boolean;
  rasuradoZonaNo: boolean;
  rasuradoZonaNp: boolean;
  // Pruebas complementarias
  pruebasEcg: boolean;
  pruebasRx: boolean;
  pruebasAs: boolean;
  pruebasInfExterno: boolean;
  // Verificación médica
  verificacionCirujano: boolean;
  verificacionCirujanoNo: boolean;
  verificacionAnestesista: boolean;
  verificacionAnestesistaNo: boolean;
  // Marcaje
  marcaje: boolean;
  marcajeNo: boolean;
  marcajeNp: boolean;
  // Pruebas cruzadas
  pruebasCruzadas: boolean;
  pruebasCruzadasNo: boolean;
  pruebasCruzadasNp: boolean;
  uReservadas: string;
  // Transfusión
  transfusion: boolean;
  transfusionNo: boolean;
  transfusionNp: boolean;
  // Handler
  onChange: (field: string, value: any) => void;
}

const CB: React.FC<{
  label: string;
  checked: boolean;
  field: string;
  onChange: (field: string, value: boolean) => void;
}> = ({ label, checked, field, onChange }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
    <span style={{ fontWeight: 500, fontSize: '0.9em' }}>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(field, e.target.checked)}
      style={{ width: '14px', height: '14px', cursor: 'pointer' }}
    />
  </span>
);

const tdLabel: React.CSSProperties = {
  padding: '6px 10px',
  borderRight: '1px solid #999',
  fontWeight: 600,
  fontSize: '0.9em',
  verticalAlign: 'middle',
  width: '220px',
  backgroundColor: '#f5f5f5',
};

const tdCell: React.CSSProperties = {
  padding: '6px 10px',
  borderRight: '1px solid #999',
  verticalAlign: 'middle',
  textAlign: 'center',
};

const tdCellLast: React.CSSProperties = {
  padding: '6px 10px',
  verticalAlign: 'middle',
  textAlign: 'center',
};

const EditableSections: React.FC<EditableSectionsProps> = ({
  retiradaDispositivos,
  retiradaDentadura,
  rasuradoZona,
  rasuradoZonaNo,
  rasuradoZonaNp,
  pruebasEcg,
  pruebasRx,
  pruebasAs,
  pruebasInfExterno,
  verificacionCirujano,
  verificacionCirujanoNo,
  verificacionAnestesista,
  verificacionAnestesistaNo,
  marcaje,
  marcajeNo,
  marcajeNp,
  pruebasCruzadas,
  pruebasCruzadasNo,
  pruebasCruzadasNp,
  uReservadas,
  transfusion,
  transfusionNo,
  transfusionNp,
  onChange
}) => {
  return (
    <div className="form-section" style={{ backgroundColor: 'white', padding: '10px 0' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #999',
        fontSize: '0.9em',
      }}>
        <tbody>
          {/* Fila 1: Retirada dispositivos/dentadura */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={tdLabel}>
              <strong>Retirada dispositivos/dentadura:</strong>
            </td>
            <td style={tdCell}>
              <CB label="SI" checked={retiradaDispositivos} field="retiradaDispositivos" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="NO" checked={retiradaDentadura} field="retiradaDentadura" onChange={onChange} />
            </td>
            <td style={tdCell}></td>
            <td style={tdCellLast}></td>
          </tr>

          {/* Fila 2: Rasurado zona QX */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={tdLabel}>
              <strong>Rasurado zona QX:</strong>
            </td>
            <td style={tdCell}>
              <CB label="SI" checked={rasuradoZona} field="rasuradoZona" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="NO" checked={rasuradoZonaNo} field="rasuradoZonaNo" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="N/P" checked={rasuradoZonaNp} field="rasuradoZonaNp" onChange={onChange} />
            </td>
            <td style={tdCellLast}></td>
          </tr>

          {/* Fila 3: Pruebas Complementarias */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={tdLabel}>
              <strong>Pruebas Complementarias:</strong>
            </td>
            <td style={tdCell}>
              <CB label="ECG" checked={pruebasEcg} field="pruebasEcg" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="RX" checked={pruebasRx} field="pruebasRx" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="AS" checked={pruebasAs} field="pruebasAs" onChange={onChange} />
            </td>
            <td style={tdCellLast}>
              <CB label="INF EXTERNO" checked={pruebasInfExterno} field="pruebasInfExterno" onChange={onChange} />
            </td>
          </tr>

          {/* Fila 4: Verificación médica - Cirujano */}
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <td style={{ ...tdLabel, borderBottom: 'none', paddingBottom: '3px' }}>
              <strong>Verificación médica:</strong>
              <br />
              <span style={{ fontWeight: 400, paddingLeft: '8px' }}>Cirujano:</span>
            </td>
            <td style={{ ...tdCell, borderBottom: 'none', paddingBottom: '3px' }}>
              <CB label="SI" checked={verificacionCirujano} field="verificacionCirujano" onChange={onChange} />
            </td>
            <td style={{ ...tdCell, borderBottom: 'none', paddingBottom: '3px' }}>
              <CB label="NO" checked={verificacionCirujanoNo} field="verificacionCirujanoNo" onChange={onChange} />
            </td>
            <td style={{ ...tdCell, borderBottom: 'none' }}></td>
            <td style={{ ...tdCellLast, borderBottom: 'none' }}></td>
          </tr>

          {/* Fila 4b: Verificación médica - Anestesista */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={{ ...tdLabel, paddingTop: '3px', fontWeight: 400 }}>
              <span style={{ paddingLeft: '8px' }}>Anestesista:</span>
            </td>
            <td style={{ ...tdCell, paddingTop: '3px' }}>
              <CB label="SI" checked={verificacionAnestesista} field="verificacionAnestesista" onChange={onChange} />
            </td>
            <td style={{ ...tdCell, paddingTop: '3px' }}>
              <CB label="NO" checked={verificacionAnestesistaNo} field="verificacionAnestesistaNo" onChange={onChange} />
            </td>
            <td style={tdCell}></td>
            <td style={tdCellLast}></td>
          </tr>

          {/* Fila 5: Marcaje */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={tdLabel}>
              <strong>Marcaje:</strong>
            </td>
            <td style={tdCell}>
              <CB label="SI" checked={marcaje} field="marcaje" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="NO" checked={marcajeNo} field="marcajeNo" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="N/P" checked={marcajeNp} field="marcajeNp" onChange={onChange} />
            </td>
            <td style={tdCellLast}></td>
          </tr>

          {/* Fila 6: Pruebas Cruzadas */}
          <tr style={{ borderBottom: '1px solid #999' }}>
            <td style={tdLabel}>
              <strong>Pruebas Cruzadas:</strong>
            </td>
            <td style={tdCell}>
              <CB label="SI" checked={pruebasCruzadas} field="pruebasCruzadas" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="NO" checked={pruebasCruzadasNo} field="pruebasCruzadasNo" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="N/P" checked={pruebasCruzadasNp} field="pruebasCruzadasNp" onChange={onChange} />
            </td>
            <td style={tdCellLast}>
              <span style={{ fontWeight: 600, fontSize: '0.85em', marginRight: '6px' }}>U RESERVADAS:</span>
              <input
                type="text"
                value={uReservadas}
                onChange={(e) => onChange('uReservadas', e.target.value)}
                style={{
                  width: '90px',
                  padding: '3px 6px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  fontSize: '0.9em',
                  backgroundColor: '#fff9e6',
                }}
              />
            </td>
          </tr>

          {/* Fila 7: Transfusión */}
          <tr>
            <td style={tdLabel}>
              <strong>Transfusión:</strong>
            </td>
            <td style={tdCell}>
              <CB label="SI" checked={transfusion} field="transfusion" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="NO" checked={transfusionNo} field="transfusionNo" onChange={onChange} />
            </td>
            <td style={tdCell}>
              <CB label="N/P" checked={transfusionNp} field="transfusionNp" onChange={onChange} />
            </td>
            <td style={tdCellLast}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableSections;
