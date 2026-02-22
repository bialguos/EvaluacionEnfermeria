import React, { useState } from 'react';
import { mockPatients, mockNurses } from '../data/mockEvaluationData';
import type { MockPatientForEvaluation, MockNurse } from '../data/mockEvaluationData';

interface PatientNurseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (patientId: string, nurseId: string) => void;
}

const PatientNurseSelectionModal: React.FC<PatientNurseSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [selectedPatient, setSelectedPatient] = useState<MockPatientForEvaluation | null>(null);

  if (!isOpen) return null;

  const handleSelectPatient = (patient: MockPatientForEvaluation) => {
    setSelectedPatient(patient);
  };

  const handleSelectNurse = (nurse: MockNurse) => {
    if (selectedPatient) {
      onSelect(selectedPatient.id, nurse.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedPatient(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <h2>{!selectedPatient ? 'Seleccionar Paciente' : 'Seleccionar Enfermera/o'}</h2>

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
                      <strong>Fecha Nacimiento:</strong> {patient.fechaNacimiento}
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
                NIS: {selectedPatient.nis} | Tel: {selectedPatient.telefono}
              </p>
            </div>

            <div className="patient-list">
              {mockNurses.map(nurse => (
                <div
                  key={nurse.id}
                  className="surgery-item"
                  onClick={() => handleSelectNurse(nurse)}
                >
                  <div>
                    <h4 style={{ margin: '0 0 8px 0' }}>{nurse.nombre}</h4>
                    <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
                      <strong>Nº Colegiado:</strong> {nurse.numeroColegiado}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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

export default PatientNurseSelectionModal;
