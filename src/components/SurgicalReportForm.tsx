import React, { useState, useEffect } from 'react';
import type { SurgicalReport } from '../types/surgicalReport';
import HospitalizationSection from './surgical-sections/HospitalizationSection';
import PreUrpaSection from './surgical-sections/PreUrpaSection';
import EditableSections from './surgical-sections/EditableSections';
import QuirofanoSection from './surgical-sections/QuirofanoSection';
import ObservationsSection from './surgical-sections/ObservationsSection';
import UrpaSection from './surgical-sections/UrpaSection';
import MedicalOrdersSection from './surgical-sections/MedicalOrdersSection';
import MedicationSection from './surgical-sections/MedicationSection';
import AdditionalFieldsSection from './surgical-sections/AdditionalFieldsSection';
import SignatureSection from './surgical-sections/SignatureSection';
import VitalConstantsTable from './VitalConstantsTable';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';

interface SurgicalReportFormProps {
  initialData?: SurgicalReport;
  onSave: (report: SurgicalReport) => void;
  onCancel: () => void;
}

const SurgicalReportForm: React.FC<SurgicalReportFormProps> = ({
  initialData,
  onSave,
  onCancel
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<SurgicalReport>(
    initialData || {
      id: `report-${Date.now()}`,
      patientId: '',
      surgeryId: '',
      fechaCreacion: new Date().toISOString(),
      pacienteNombre: '',
      pacienteDireccion: '',
      pacienteNis: '',
      pacienteTelefono: '',
      pacienteFechaNacimiento: '',
      alergias: '',
      medicacionHabitual: '',
      ppcc: '',
      taS: 0,
      taD: 0,
      fc: 0,
      enfermeraPlanta: '',
      intervencion: '',
      lateralidad: '',
      enfermeraUrpa: '',
      medicacionPreUrpa: '',
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
      cirujano: '',
      anestesista: '',
      tipoAnestesia: '',
      fechaEntradaQuirofano: '',
      fechaSalidaQuirofano: '',
      enfermeraQuirofano: '',
      medicacionQuirofano: '',
      observacionesPagina1: '',
      constantesVitales: [],
      anestesistaUrpa: '',
      enfermeraUrpaFinal: '',
      fechaEntradaUrpa: '',
      fechaSalidaUrpa: '',
      ordenesMedicas: '',
      medicacionAdministrada: [],
      viasVenosas: '',
      vendaje: '',
      sondaVesical: '',
      oxigenoterapia: '',
      drenajes: '',
      otros: '',
      apositos: '',
      enfermera: '',
      fechaHoraInforme: new Date().toISOString()
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleCheckboxChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleSaveAndPrint = async () => {
    setGeneratingPDF(true);
    try {
      // Primero guardar el informe
      onSave(formData);

      // Esperar un momento para asegurar que se guarde
      await new Promise(resolve => setTimeout(resolve, 100));

      // Luego generar el PDF
      await generateAndDownloadPDF(formData);
    } catch (error) {
      alert('Error al generar el PDF. El informe se ha guardado correctamente.');
      console.error(error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="surgical-report-form">
      {/* Header */}
      <div className="report-header">
        <div style={{ flex: 1 }}>
          <div className="miks-logo">MIKS</div>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#666' }}>
            Sistema de Información Hospitalaria
          </p>
        </div>
        <div style={{ textAlign: 'center', flex: 2 }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.6em' }}>
            INFORME QUIRÚRGICO DE ENFERMERÍA
          </h2>
          <p style={{ margin: 0, fontSize: '1em', color: '#666', fontWeight: 500 }}>
            PÁGINA: {currentPage}/2
          </p>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
            <strong>Fecha:</strong> {formatDate(formData.fechaCreacion)}
          </p>
        </div>
      </div>

      {/* Patient Info Section */}
      <div className="patient-info-section">
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Paciente</label>
            <input
              type="text"
              value={formData.pacienteNombre}
              readOnly
              className="info-field readonly"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>NIS</label>
            <input
              type="text"
              value={formData.pacienteNis}
              readOnly
              className="info-field readonly"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Dirección</label>
            <input
              type="text"
              value={formData.pacienteDireccion}
              readOnly
              className="info-field readonly"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Teléfono</label>
            <input
              type="text"
              value={formData.pacienteTelefono}
              readOnly
              className="info-field readonly"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha de Nacimiento</label>
            <input
              type="text"
              value={formatDate(formData.pacienteFechaNacimiento)}
              readOnly
              className="info-field readonly"
            />
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 1 ? (
        <>
          <HospitalizationSection
            alergias={formData.alergias}
            medicacionHabitual={formData.medicacionHabitual}
            ppcc={formData.ppcc}
            taS={formData.taS}
            taD={formData.taD}
            fc={formData.fc}
            enfermeraPlanta={formData.enfermeraPlanta}
          />

          <PreUrpaSection
            intervencion={formData.intervencion}
            lateralidad={formData.lateralidad}
            enfermeraUrpa={formData.enfermeraUrpa}
            medicacionPreUrpa={formData.medicacionPreUrpa}
          />

          <EditableSections
            retiradaDispositivos={formData.retiradaDispositivos}
            retiradaDentadura={formData.retiradaDentadura}
            rasuradoZona={formData.rasuradoZona}
            pruebasEcg={formData.pruebasEcg}
            pruebasRx={formData.pruebasRx}
            pruebasAs={formData.pruebasAs}
            pruebasInfExterno={formData.pruebasInfExterno}
            verificacionCirujano={formData.verificacionCirujano}
            verificacionAnestesista={formData.verificacionAnestesista}
            marcaje={formData.marcaje}
            pruebasCruzadas={formData.pruebasCruzadas}
            transfusion={formData.transfusion}
            onChange={handleCheckboxChange}
          />

          <QuirofanoSection
            cirujano={formData.cirujano}
            anestesista={formData.anestesista}
            tipoAnestesia={formData.tipoAnestesia}
            fechaEntradaQuirofano={formData.fechaEntradaQuirofano}
            fechaSalidaQuirofano={formData.fechaSalidaQuirofano}
            enfermeraQuirofano={formData.enfermeraQuirofano}
            medicacionQuirofano={formData.medicacionQuirofano}
            onChangeMedicacion={(value) => handleFieldChange('medicacionQuirofano', value)}
          />

          <ObservationsSection
            observaciones={formData.observacionesPagina1}
            onChange={(value) => handleFieldChange('observacionesPagina1', value)}
          />
        </>
      ) : (
        <>
          <div className="form-section">
            <h3>CONSTANTES VITALES</h3>
            <VitalConstantsTable
              constants={formData.constantesVitales}
              onChange={(constants) => handleFieldChange('constantesVitales', constants)}
            />
          </div>

          <UrpaSection
            anestesistaUrpa={formData.anestesistaUrpa}
            enfermeraUrpaFinal={formData.enfermeraUrpaFinal}
            fechaEntradaUrpa={formData.fechaEntradaUrpa}
            fechaSalidaUrpa={formData.fechaSalidaUrpa}
            onChangeFechaEntrada={(value) => handleFieldChange('fechaEntradaUrpa', value)}
            onChangeFechaSalida={(value) => handleFieldChange('fechaSalidaUrpa', value)}
          />

          <MedicalOrdersSection
            ordenesMedicas={formData.ordenesMedicas}
            onChange={(value) => handleFieldChange('ordenesMedicas', value)}
          />

          <MedicationSection
            medicacion={formData.medicacionAdministrada}
            onChange={(medicacion) => handleFieldChange('medicacionAdministrada', medicacion)}
          />

          <AdditionalFieldsSection
            viasVenosas={formData.viasVenosas}
            vendaje={formData.vendaje}
            sondaVesical={formData.sondaVesical}
            oxigenoterapia={formData.oxigenoterapia}
            drenajes={formData.drenajes}
            otros={formData.otros}
            apositos={formData.apositos}
            onChange={handleFieldChange}
          />

          <SignatureSection
            enfermera={formData.enfermera}
            fechaHoraInforme={formData.fechaHoraInforme}
            onChange={(value) => handleFieldChange('enfermera', value)}
          />
        </>
      )}

      {/* Navigation */}
      <div className="form-navigation">
        <div>
          {currentPage === 2 && (
            <button
              type="button"
              className="cancel-button"
              onClick={() => setCurrentPage(1)}
            >
              ← Anterior
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          {currentPage === 1 ? (
            <button
              type="button"
              className="save-button"
              onClick={() => setCurrentPage(2)}
            >
              Siguiente →
            </button>
          ) : (
            <>
              <button
                type="button"
                className="save-button"
                onClick={handleSave}
                disabled={generatingPDF}
              >
                Guardar Informe
              </button>
              <button
                type="button"
                className="save-button"
                onClick={handleSaveAndPrint}
                disabled={generatingPDF}
                style={{
                  backgroundColor: generatingPDF ? '#95a5a6' : '#9b59b6',
                  cursor: generatingPDF ? 'not-allowed' : 'pointer'
                }}
              >
                {generatingPDF ? 'Generando PDF...' : 'Guardar e Imprimir'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurgicalReportForm;
