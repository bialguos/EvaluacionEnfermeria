import React from 'react';
import type { MedicationRow } from '../../types/surgicalReport';

interface MedicationSectionProps {
  medicacion: MedicationRow[];
  onChange: (medicacion: MedicationRow[]) => void;
}

const MedicationSection: React.FC<MedicationSectionProps> = ({ medicacion, onChange }) => {
  const addRow = () => {
    const now = new Date();
    const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRow: MedicationRow = {
      id: `med-${Date.now()}`,
      hora,
      medicacion: '',
      dosis: ''
    };

    onChange([...medicacion, newRow]);
  };

  const removeRow = (id: string) => {
    onChange(medicacion.filter(m => m.id !== id));
  };

  const updateRow = (id: string, field: keyof MedicationRow, value: string) => {
    onChange(medicacion.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  return (
    <div className="form-section">
      <h3>MEDICACIÓN ADMINISTRADA</h3>

      <button
        type="button"
        className="save-button"
        onClick={addRow}
        style={{ fontSize: '0.9em', padding: '6px 12px', marginBottom: '15px' }}
      >
        + Añadir Medicación
      </button>

      {medicacion.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="constants-table">
            <thead>
              <tr>
                <th>HORA</th>
                <th>MEDICACIÓN</th>
                <th>DOSIS</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicacion.map(row => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="time"
                      value={row.hora}
                      onChange={(e) => updateRow(row.id, 'hora', e.target.value)}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.medicacion}
                      onChange={(e) => updateRow(row.id, 'medicacion', e.target.value)}
                      placeholder="Nombre del medicamento"
                      style={{ width: '100%', minWidth: '200px' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.dosis}
                      onChange={(e) => updateRow(row.id, 'dosis', e.target.value)}
                      placeholder="Ej: 1g IV"
                      style={{ width: '100%', minWidth: '120px' }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => removeRow(row.id)}
                      style={{ fontSize: '0.85em', padding: '4px 8px' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicationSection;
