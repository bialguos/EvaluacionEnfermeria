import React, { useState } from 'react';
import { mockPatients, getSurgeriesByPatientId } from '../data/mockSurgicalData';
import type { MockPatient, MockSurgery } from '../types/surgicalReport';

interface PatientSurgerySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (patientId: string, surgeryId: string) => void;
}

const PatientSurgerySelectionModal: React.FC<PatientSurgerySelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [selectedPatient, setSelectedPatient] = useState<MockPatient | null>(null);
  const [surgeries, setSurgeries] = useState<MockSurgery[]>([]);

  if (!isOpen) return null;

  const handleSelectPatient = (patient: MockPatient) => {
    setSelectedPatient(patient);
    const patientSurgeries = getSurgeriesByPatientId(patient.id);
    setSurgeries(patientSurgeries);
  };

  const handleSelectSurgery = (surgery: MockSurgery) => {
    if (selectedPatient) {
      onSelect(selectedPatient.id, surgery.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedPatient(null);
    setSurgeries([]);
    onClose();
  };

  const handleBack = () => {
    setSelectedPatient(null);
    setSurgeries([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <h2>{!selectedPatient ? 'Seleccionar Paciente' : 'Seleccionar Intervención'}</h2>

        {!selectedPatient ? (
          <>
            <div className="patient-list">
              {mockPatients.map(patient => (
                <div
                  key={patient.id}
                  className="surgery-item"
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div>
                    <h4 style={{ margin: '0 0 8px 0' }}>{patient.nombre}</h4>
                    <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                      <strong>NIS:</strong> {patient.nis}
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                      <strong>Alergias:</strong> {patient.alergias}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="modal-close" onClick={handleClose}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <div className="patient-info-header" style={{
              background: '#e8f4fc',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{selectedPatient.nombre}</h3>
              <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                NIS: {selectedPatient.nis}
              </p>
            </div>

            {surgeries.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                No hay cirugías disponibles para este paciente
              </p>
            ) : (
              <div className="patient-list">
                {surgeries.map(surgery => (
                  <div
                    key={surgery.id}
                    className="surgery-item"
                    onClick={() => handleSelectSurgery(surgery)}
                  >
                    <div>
                      <h4 style={{ margin: '0 0 8px 0' }}>{surgery.intervencion}</h4>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                        <strong>Cirujano:</strong> {surgery.cirujano}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                        <strong>Anestesista:</strong> {surgery.anestesista}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                        <strong>Fecha:</strong> {new Date(surgery.fechaEntradaQuirofano).toLocaleString('es-ES')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                className="modal-close"
                onClick={handleBack}
                style={{ flex: 1, background: '#7f8c8d' }}
              >
                ← Volver a Pacientes
              </button>
              <button className="modal-close" onClick={handleClose} style={{ flex: 1 }}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientSurgerySelectionModal;
