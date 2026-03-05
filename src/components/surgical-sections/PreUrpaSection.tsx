import React from 'react';
import type { AntibioticRow } from '../../types/surgicalReport';

interface PreUrpaSectionProps {
  intervencion: string;
  lateralidad: string;
  enfermeraUrpa: string;
  medicacionPreUrpa: string;
  fechaEntradaUrpa: string;
  fechaSalidaUrpa: string;
  registroAntibiotico?: AntibioticRow[];
  onChangeEnfermera: (value: string) => void;
  onChangeMedicacion: (value: string) => void;
  onChangeFechaEntrada: (value: string) => void;
  onChangeFechaSalida: (value: string) => void;
  onChangeRegistroAntibiotico: (rows: AntibioticRow[]) => void;
}

const PreUrpaSection: React.FC<PreUrpaSectionProps> = ({
  intervencion,
  lateralidad,
  enfermeraUrpa,
  medicacionPreUrpa,
  fechaEntradaUrpa,
  fechaSalidaUrpa,
  registroAntibiotico,
  onChangeEnfermera,
  onChangeMedicacion,
  onChangeFechaEntrada,
  onChangeFechaSalida,
  onChangeRegistroAntibiotico
}) => {
  const antibioticos = registroAntibiotico ?? [];

  const addAntibioticRow = () => {
    const now = new Date();
    const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newRow: AntibioticRow = {
      id: `ab-${Date.now()}`,
      antibiotico: '',
      dosis: '',
      horaAdministracion: hora,
      prescritoPor: ''
    };
    onChangeRegistroAntibiotico([...antibioticos, newRow]);
  };

  const removeAntibioticRow = (id: string) => {
    onChangeRegistroAntibiotico(antibioticos.filter(r => r.id !== id));
  };

  const updateAntibioticRow = (id: string, field: keyof AntibioticRow, value: string) => {
    onChangeRegistroAntibiotico(antibioticos.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="pre-urpa-section">
      <h3 style={{ margin: '0 0 15px 0', color: '#5dade2', fontSize: '1.1em' }}>
        PRE-URPA
      </h3>

      <div className="form-row" style={{ alignItems: 'flex-start' }}>
        {/* Columna izquierda: Intervención y Lateralidad */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="form-group">
            <label>Intervención</label>
            <input
              type="text"
              value={intervencion}
              readOnly
              className="info-field readonly"
            />
          </div>
          <div className="form-group">
            <label>Lateralidad</label>
            <input
              type="text"
              value={lateralidad}
              readOnly
              className="info-field readonly"
            />
          </div>
        </div>

        {/* Columna derecha: Enfermera, Fecha entrada, Fecha salida */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="form-group">
            <label>Enfermera/o URPA</label>
            <input
              type="text"
              value={enfermeraUrpa}
              onChange={(e) => onChangeEnfermera(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
          <div className="form-group">
            <label>Fecha/hora de entrada</label>
            <input
              type="datetime-local"
              value={fechaEntradaUrpa}
              onChange={(e) => onChangeFechaEntrada(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
          <div className="form-group">
            <label>Fecha/hora de salida</label>
            <input
              type="datetime-local"
              value={fechaSalidaUrpa}
              onChange={(e) => onChangeFechaSalida(e.target.value)}
              style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
            />
          </div>
        </div>
      </div>

      <div className="form-row" style={{ marginTop: '10px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Medicación administrada</label>
          <input
            type="text"
            value={medicacionPreUrpa}
            onChange={(e) => onChangeMedicacion(e.target.value)}
            style={{ backgroundColor: '#fff9e6', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1em' }}
          />
        </div>
      </div>

      {/* Registro Antibiótico */}
      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.95em', color: '#2c3e50' }}>
            Registro antibiótico prescrito
          </label>
          <button
            type="button"
            className="save-button"
            onClick={addAntibioticRow}
            style={{ fontSize: '0.85em', padding: '4px 10px' }}
          >
            + Añadir antibiótico
          </button>
        </div>

        {antibioticos.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table className="constants-table">
              <thead>
                <tr>
                  <th>ANTIBIÓTICO</th>
                  <th>DOSIS</th>
                  <th>HORA ADMINISTRACIÓN</th>
                  <th>PRESCRITO POR</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {antibioticos.map(row => (
                  <tr key={row.id}>
                    <td>
                      <input
                        type="text"
                        value={row.antibiotico}
                        onChange={(e) => updateAntibioticRow(row.id, 'antibiotico', e.target.value)}
                        placeholder="Nombre del antibiótico"
                        style={{ width: '100%', minWidth: '160px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.dosis}
                        onChange={(e) => updateAntibioticRow(row.id, 'dosis', e.target.value)}
                        placeholder="Ej: 1g IV"
                        style={{ width: '100%', minWidth: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={row.horaAdministracion}
                        onChange={(e) => updateAntibioticRow(row.id, 'horaAdministracion', e.target.value)}
                        style={{ width: '90px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.prescritoPor}
                        onChange={(e) => updateAntibioticRow(row.id, 'prescritoPor', e.target.value)}
                        placeholder="Nombre del prescriptor"
                        style={{ width: '100%', minWidth: '160px' }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => removeAntibioticRow(row.id)}
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
    </div>
  );
};

export default PreUrpaSection;
