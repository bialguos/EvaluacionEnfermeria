import { useState, useEffect } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import PatientHeader from './components/PatientHeader';
import EvaluationsList from './components/EvaluationsList';
import EvaluationTypeModal from './components/EvaluationTypeModal';
import SurgicalShortForm from './components/SurgicalShortForm';
import CMAEvaluationForm from './components/CMAEvaluationForm';
import SurgicalReportsList from './components/SurgicalReportsList';
import PatientSurgerySelectionModal from './components/PatientSurgerySelectionModal';
import PatientNurseSelectionModal from './components/PatientNurseSelectionModal';
import SurgicalReportForm from './components/SurgicalReportForm';
import type { NursingEvaluation, EvaluationType, SurgicalShortEvaluation, CMAEvaluation } from './types/evaluation';
import type { SurgicalReport } from './types/surgicalReport';
import { getPatientById, getSurgeryById, mockVitalConstants } from './data/mockSurgicalData';

type AppView = 'menu' | 'evaluations' | 'surgical-reports';

function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<AppView>('menu');

  // Evaluations state
  const [evaluations, setEvaluations] = useState<NursingEvaluation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPatientNurseModalOpen, setIsPatientNurseModalOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState<EvaluationType | null>(null);
  const [editingEvaluation, setEditingEvaluation] = useState<NursingEvaluation | undefined>(undefined);
  const [preloadedPatientId, setPreloadedPatientId] = useState<string | undefined>(undefined);
  const [preloadedNurseId, setPreloadedNurseId] = useState<string | undefined>(undefined);

  // Surgical reports state
  const [surgicalReports, setSurgicalReports] = useState<SurgicalReport[]>([]);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isSurgicalFormVisible, setIsSurgicalFormVisible] = useState(false);
  const [editingSurgicalReport, setEditingSurgicalReport] = useState<SurgicalReport | undefined>(undefined);

  // Cargar evaluaciones del localStorage al iniciar
  useEffect(() => {
    const savedEvaluations = localStorage.getItem('nursingEvaluations');
    if (savedEvaluations) {
      setEvaluations(JSON.parse(savedEvaluations));
    }
  }, []);

  // Guardar evaluaciones en localStorage cuando cambien
  useEffect(() => {
    if (evaluations.length > 0) {
      localStorage.setItem('nursingEvaluations', JSON.stringify(evaluations));
    }
  }, [evaluations]);

  // Cargar informes quirúrgicos del localStorage al iniciar
  useEffect(() => {
    const savedReports = localStorage.getItem('surgicalReports');
    if (savedReports) {
      setSurgicalReports(JSON.parse(savedReports));
    }
  }, []);

  // Guardar informes quirúrgicos en localStorage cuando cambien
  useEffect(() => {
    if (surgicalReports.length > 0) {
      localStorage.setItem('surgicalReports', JSON.stringify(surgicalReports));
    }
  }, [surgicalReports]);

  const handleNewEvaluation = () => {
    setIsModalOpen(true);
  };

  const handleSelectEvaluationType = (type: EvaluationType) => {
    setSelectedEvaluationType(type);
    setIsModalOpen(false);

    // For surgical_short, show patient/nurse selection modal first
    if (type === 'surgical_short') {
      setIsPatientNurseModalOpen(true);
    } else {
      // For other types, go directly to form
      setEditingEvaluation(undefined);
      setIsFormVisible(true);
    }
  };

  const handleSelectPatientNurse = (patientId: string, nurseId: string) => {
    setPreloadedPatientId(patientId);
    setPreloadedNurseId(nurseId);
    setIsPatientNurseModalOpen(false);
    setEditingEvaluation(undefined);
    setIsFormVisible(true);
  };

  const handleEditEvaluation = (evaluation: NursingEvaluation) => {
    setSelectedEvaluationType(evaluation.evaluationType);
    setEditingEvaluation(evaluation);
    setIsFormVisible(true);
  };

  const handleDeleteEvaluation = (id: string) => {
    setEvaluations(evals => evals.filter(e => e.id !== id));
  };

  const handleSaveEvaluation = (evaluation: NursingEvaluation) => {
    if (editingEvaluation) {
      // Actualizar evaluación existente
      setEvaluations(evals => evals.map(e => e.id === evaluation.id ? evaluation : e));
    } else {
      // Añadir nueva evaluación
      setEvaluations(evals => [evaluation, ...evals]);
    }
    setIsFormVisible(false);
    setEditingEvaluation(undefined);
    setSelectedEvaluationType(null);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingEvaluation(undefined);
    setSelectedEvaluationType(null);
    setPreloadedPatientId(undefined);
    setPreloadedNurseId(undefined);
  };

  // Surgical reports handlers
  const handleNewSurgicalReport = () => {
    setIsPatientModalOpen(true);
  };

  const handleSelectPatientSurgery = (patientId: string, surgeryId: string) => {
    // Precargar datos del paciente y cirugía
    const patient = getPatientById(patientId);
    const surgery = getSurgeryById(surgeryId);

    if (!patient || !surgery) return;

    // Crear un nuevo informe con datos prellenados
    const newReport: SurgicalReport = {
      id: `report-${Date.now()}`,
      patientId,
      surgeryId,
      fechaCreacion: new Date().toISOString(),

      // Datos del paciente
      pacienteNombre: patient.nombre,
      pacienteDireccion: patient.direccion,
      pacienteNis: patient.nis,
      pacienteTelefono: patient.telefono,
      pacienteFechaNacimiento: patient.fechaNacimiento,

      // Hospitalización
      alergias: patient.alergias,
      medicacionHabitual: patient.medicacionHabitual,
      ppcc: patient.ppcc,
      taS: patient.taS,
      taD: patient.taD,
      fc: patient.fc,
      enfermeraPlanta: patient.enfermeraPlanta,

      // PRE-URPA
      intervencion: surgery.intervencion,
      lateralidad: surgery.lateralidad,
      enfermeraUrpa: surgery.enfermeraUrpa,
      medicacionPreUrpa: surgery.medicacionPreUrpa,

      // Checkboxes editables - por defecto false
      retiradaDispositivos: false,
      retiradaDentadura: false,
      rasuradoZona: false,
      pruebasEcg: false,
      pruebasRx: false,
      pruebasAs: false,
      pruebasInfExterno: false,
      verificacionCirujano: false,
      verificacionAnestesista: false,
      marcaje: false,
      pruebasCruzadas: false,
      transfusion: false,

      // Quirófano
      cirujano: surgery.cirujano,
      anestesista: surgery.anestesista,
      tipoAnestesia: surgery.tipoAnestesia,
      fechaEntradaQuirofano: surgery.fechaEntradaQuirofano,
      fechaSalidaQuirofano: surgery.fechaSalidaQuirofano,
      enfermeraQuirofano: surgery.enfermeraQuirofano,
      medicacionQuirofano: surgery.medicacionQuirofano,

      // Observaciones
      observacionesPagina1: '',

      // Constantes vitales (precargadas de planta)
      constantesVitales: [...mockVitalConstants],

      // URPA
      anestesistaUrpa: surgery.anestesistaUrpa,
      enfermeraUrpaFinal: surgery.enfermeraUrpa,
      fechaEntradaUrpa: surgery.fechaEntradaUrpa,
      fechaSalidaUrpa: surgery.fechaSalidaUrpa,

      // Órdenes médicas
      ordenesMedicas: '',

      // Medicación administrada
      medicacionAdministrada: [],

      // Campos adicionales
      viasVenosas: '',
      vendaje: '',
      sondaVesical: '',
      oxigenoterapia: '',
      drenajes: '',
      otros: '',
      apositos: '',

      // Firma
      enfermera: '',
      fechaHoraInforme: new Date().toISOString()
    };

    setEditingSurgicalReport(newReport);
    setIsSurgicalFormVisible(true);
    setIsPatientModalOpen(false);
  };

  const handleEditSurgicalReport = (report: SurgicalReport) => {
    setEditingSurgicalReport(report);
    setIsSurgicalFormVisible(true);
  };

  const handleDeleteSurgicalReport = (id: string) => {
    setSurgicalReports(reports => reports.filter(r => r.id !== id));
  };

  const handleSaveSurgicalReport = (report: SurgicalReport) => {
    const existingIndex = surgicalReports.findIndex(r => r.id === report.id);

    if (existingIndex >= 0) {
      // Actualizar existente
      setSurgicalReports(reports =>
        reports.map(r => r.id === report.id ? report : r)
      );
    } else {
      // Añadir nuevo
      setSurgicalReports(reports => [report, ...reports]);
    }

    setIsSurgicalFormVisible(false);
    setEditingSurgicalReport(undefined);
  };

  const handleCancelSurgicalForm = () => {
    setIsSurgicalFormVisible(false);
    setEditingSurgicalReport(undefined);
  };

  const renderForm = () => {
    switch (selectedEvaluationType) {
      case 'surgical_short':
        return (
          <SurgicalShortForm
            initialData={editingEvaluation as SurgicalShortEvaluation | undefined}
            onSave={handleSaveEvaluation}
            onCancel={handleCancelForm}
            preloadedPatientId={preloadedPatientId}
            preloadedNurseId={preloadedNurseId}
          />
        );
      case 'cma':
        return (
          <CMAEvaluationForm
            initialData={editingEvaluation as CMAEvaluation | undefined}
            onSave={handleSaveEvaluation}
            onCancel={handleCancelForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {currentView === 'menu' && (
        <MainMenu
          onSelectEvaluations={() => setCurrentView('evaluations')}
          onSelectSurgicalReports={() => setCurrentView('surgical-reports')}
        />
      )}

      {currentView === 'evaluations' && (
        <>
          {!isFormVisible && (
            <button className="back-to-menu-button" onClick={() => setCurrentView('menu')}>
              ← Volver al Menú Principal
            </button>
          )}

          {!isFormVisible && <PatientHeader />}

          <main>
            {!isFormVisible ? (
              <div className="records-section">
                <div className="section-header">
                  <h2>Evaluaciones de Enfermería</h2>
                  <button className="new-record-button" onClick={handleNewEvaluation}>
                    Nueva Evaluación
                  </button>
                </div>
                <EvaluationsList
                  evaluations={evaluations}
                  onEdit={handleEditEvaluation}
                  onDelete={handleDeleteEvaluation}
                />
              </div>
            ) : (
              <div className="form-section-container">
                {renderForm()}
              </div>
            )}
          </main>

          <EvaluationTypeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={handleSelectEvaluationType}
          />

          <PatientNurseSelectionModal
            isOpen={isPatientNurseModalOpen}
            onClose={() => setIsPatientNurseModalOpen(false)}
            onSelect={handleSelectPatientNurse}
          />
        </>
      )}

      {currentView === 'surgical-reports' && (
        <>
          <button className="back-to-menu-button" onClick={() => setCurrentView('menu')}>
            ← Volver al Menú Principal
          </button>

          <main>
            {!isSurgicalFormVisible ? (
              <div className="records-section">
                <div className="section-header">
                  <h2>Informes Quirúrgicos de Enfermería</h2>
                  <button className="new-record-button" onClick={handleNewSurgicalReport}>
                    Nuevo Informe Quirúrgico
                  </button>
                </div>
                <SurgicalReportsList
                  reports={surgicalReports}
                  onEdit={handleEditSurgicalReport}
                  onDelete={handleDeleteSurgicalReport}
                />
              </div>
            ) : (
              <div className="form-section-container">
                <SurgicalReportForm
                  initialData={editingSurgicalReport}
                  onSave={handleSaveSurgicalReport}
                  onCancel={handleCancelSurgicalForm}
                />
              </div>
            )}
          </main>

          <PatientSurgerySelectionModal
            isOpen={isPatientModalOpen}
            onClose={() => setIsPatientModalOpen(false)}
            onSelect={handleSelectPatientSurgery}
          />
        </>
      )}
    </div>
  );
}

export default App;
