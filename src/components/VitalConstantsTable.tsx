import React, { useState } from 'react';
import type { VitalConstant } from '../types/surgicalReport';
import VitalConstantsGraphs from './VitalConstantsGraphs';
import { validateVitalSign, getValidationColor } from '../utils/vitalConstantsValidation';

interface VitalConstantsTableProps {
  constants: VitalConstant[];
  onChange: (constants: VitalConstant[]) => void;
}

const VitalConstantsTable: React.FC<VitalConstantsTableProps> = ({ constants, onChange }) => {
  const [showGraphs, setShowGraphs] = useState(false);

  const addNewConstant = () => {
    const now = new Date();
    const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newConstant: VitalConstant = {
      id: `vc-${Date.now()}`,
      hora,
      tasSistolica: 120,
      tadDiastolica: 80,
      fc: 75,
      satO2: 98,
      eva: 0,
      origen: 'quirofano'
    };

    onChange([...constants, newConstant]);
  };

  const removeConstant = (id: string) => {
    onChange(constants.filter(c => c.id !== id));
  };

  const updateConstant = (id: string, field: keyof VitalConstant, value: string | number) => {
    onChange(constants.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const getCellStyle = (value: number, type: 'tasSistolica' | 'tadDiastolica' | 'fc' | 'satO2' | 'eva') => {
    const status = validateVitalSign(value, type);
    const color = getValidationColor(status);
    return {
      backgroundColor: status !== 'normal' ? `${color}20` : 'transparent',
      color: status !== 'normal' ? color : '#333',
      fontWeight: status === 'danger' ? 'bold' : 'normal'
    } as React.CSSProperties;
  };

  return (
    <div className="constants-table-wrapper">
      <div className="constants-actions">
        <button
          className="save-button"
          onClick={addNewConstant}
          style={{ fontSize: '0.9em', padding: '6px 12px' }}
        >
          + Añadir Constante
        </button>
        <button
          className="scale-button"
          onClick={() => setShowGraphs(!showGraphs)}
          style={{ fontSize: '0.9em', padding: '6px 12px' }}
        >
          {showGraphs ? 'Ocultar Gráficos' : 'Ver Gráficos'}
        </button>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '15px' }}>
        <table className="constants-table">
          <thead>
            <tr>
              <th>HORA</th>
              <th>TAS/TAD (mmHg)</th>
              <th>FC (lpm)</th>
              <th>SAT O2 (%)</th>
              <th>EVA</th>
              <th>Origen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {constants.map(constant => (
              <tr key={constant.id}>
                <td>
                  <input
                    type="time"
                    value={constant.hora}
                    onChange={(e) => updateConstant(constant.id, 'hora', e.target.value)}
                    style={{ width: '80px', textAlign: 'center' }}
                  />
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <input
                      type="number"
                      value={constant.tasSistolica}
                      onChange={(e) => updateConstant(constant.id, 'tasSistolica', Number(e.target.value))}
                      style={{ width: '60px', textAlign: 'center', ...getCellStyle(constant.tasSistolica, 'tasSistolica') }}
                    />
                    <span>/</span>
                    <input
                      type="number"
                      value={constant.tadDiastolica}
                      onChange={(e) => updateConstant(constant.id, 'tadDiastolica', Number(e.target.value))}
                      style={{ width: '60px', textAlign: 'center', ...getCellStyle(constant.tadDiastolica, 'tadDiastolica') }}
                    />
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    value={constant.fc}
                    onChange={(e) => updateConstant(constant.id, 'fc', Number(e.target.value))}
                    style={{ width: '60px', textAlign: 'center', ...getCellStyle(constant.fc, 'fc') }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={constant.satO2}
                    onChange={(e) => updateConstant(constant.id, 'satO2', Number(e.target.value))}
                    style={{ width: '60px', textAlign: 'center', ...getCellStyle(constant.satO2, 'satO2') }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={constant.eva}
                    onChange={(e) => updateConstant(constant.id, 'eva', Number(e.target.value))}
                    style={{ width: '50px', textAlign: 'center', ...getCellStyle(constant.eva, 'eva') }}
                  />
                </td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.85em',
                    backgroundColor: constant.origen === 'planta' ? '#e8f4fc' : '#fff3cd',
                    color: constant.origen === 'planta' ? '#3498db' : '#856404'
                  }}>
                    {constant.origen === 'planta' ? 'Planta' : 'Quirófano'}
                  </span>
                </td>
                <td>
                  {constant.origen === 'quirofano' && (
                    <button
                      className="delete-button"
                      onClick={() => removeConstant(constant.id)}
                      style={{ fontSize: '0.85em', padding: '4px 8px' }}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showGraphs && (
        <div style={{ marginTop: '30px' }}>
          <VitalConstantsGraphs constants={constants} />
        </div>
      )}
    </div>
  );
};

export default VitalConstantsTable;
