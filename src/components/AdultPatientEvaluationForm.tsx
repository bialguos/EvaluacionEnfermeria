import React, { useState } from 'react';
import type { AdultPatientEvaluation } from '../types/evaluation';
import { pdf } from '@react-pdf/renderer';
import AdultPatientEvaluationPDF from './AdultPatientEvaluationPDF';
import { mockPatients, mockNurses } from '../data/mockEvaluationData';

interface AdultPatientEvaluationFormProps {
  initialData?: AdultPatientEvaluation;
  onSave: (data: AdultPatientEvaluation) => void;
  onCancel: () => void;
  preloadedPatientId?: string;
  preloadedNurseId?: string;
}

const getEmptyEvaluation = (): Omit<AdultPatientEvaluation, 'id' | 'date'> => ({
  evaluationType: 'adult_patient',
  evaluationName: 'Evaluación de Enfermería al Paciente Hospitalizado Adulto',
  nurse: '',
  patientName: '',
  due: '',
  evaluationDate: new Date().toISOString().slice(0, 10),
  solicitudeNumber: '',
  admissionReason: '',
  medicalDiagnosis: '',
  familyPhone: '',
  temperatura: '',
  tasSistolica: '',
  tadDiastolica: '',
  fc: '',
  fr: '',
  satO2: '',
  noAllergies: true,
  hasAllergies: false,
  allergiesDetails: '',
  personalHistory: '',
  habitualMedication: '',
  respiration: {
    noAlteration: true,
    difficultyBreathing: false,
    tachypnea: false,
    dyspnea: false,
    bradypnea: false,
    productiveCough: false,
    nonproductiveCough: false,
    oxygen: false,
    inhalers: false,
    aerosols: false,
    tracheostomy: false,
    nasalCannula: false,
    maskPercentage: '',
    exSmoker: false,
    smoker: false,
    observations: '',
  },
  feeding: {
    noAlteration: true,
    difficultyChewing: false,
    difficultyDrinking: false,
    difficultySwallowing: false,
    refusesToEat: false,
    dentalProsthesis: false,
    nasogastricTube: false,
    parenteralNutrition: false,
    ostomy: false,
    aspirationRisk: false,
    vomiting: false,
    nausea: false,
    currentWeight: '',
    height: '',
    bmi: '',
    usualWeight: '',
    weightLossPercentage: '',
    intake: 'normal',
    mustScore: '',
    autonomous: true,
    needsHelp: false,
    diet: '',
    dailyLiquidIntake: '',
    observations: '',
  },
  elimination: {
    urinaryPattern: {
      autonomous: true,
      needsHelp: false,
      continent: true,
      incontinent: false,
      retention: false,
      physiological: true,
      urinaryCatheter: false,
      collector: false,
      urocolector: false,
      dialysis: false,
    },
    intestinalPattern: {
      autonomous: true,
      needsHelp: false,
      continent: true,
      incontinent: false,
      retention: false,
      physiological: true,
      ostomy: false,
      diarrhea: false,
      constipation: false,
      laxatives: false,
      laxativesDetails: '',
    },
    lastBowelMovement: '',
  },
  mobilization: {
    autonomous: true,
    dependent: false,
    bedridden: false,
    needsPartialHelp: false,
    needsTotalHelp: false,
    walksAlone: false,
    walksWithHelp: false,
    remainsSeated: false,
    dressesSelf: false,
    needsHelpDressing: false,
    observations: '',
  },
  restAndSleep: {
    normalSleepPattern: true,
    difficultySleeping: false,
    needsHelpMedication: false,
    observations: '',
  },
  skinHygiene: {
    skinIntact: true,
    skinDehydrated: false,
    skinHydrated: false,
    skinClean: true,
    skinDirty: false,
    woundLocation: '',
    bradenScore: '',
    riskHigh: false,
    riskModerate: false,
    riskLow: false,
    pressureUlcersState: '',
    pressureUlcersLocation: '',
    edemas: false,
    noEdemas: true,
    oralHygieneAdequate: true,
    oralHygieneInadequate: false,
    preventiveMeasuresNone: true,
    preventiveMeasuresPositionalChanges: false,
    preventiveMeasuresProtectors: false,
    preventiveMeasuresMattress: false,
    observations: '',
  },
  safety: {
    infectionRisk: false,
    noInfectionRisk: true,
    drainage: false,
    urinaryCatheter: false,
    centralLine: false,
    downtownScore: '',
    physicalRestraint: false,
    bedRails: false,
    urinaryCatheterType: '',
    urinaryCatheterDate: '',
    venousLineType: '',
    venousLineDate: '',
    drainageType: '',
    drainageDate: '',
    selfInjuryRisk: false,
    toxics: false,
    observations: '',
  },
  communication: {
    noAlteration: true,
    oriented: true,
    disoriented: false,
    consciousnessLevel: 'conscious',
    visionAlteration: false,
    hearingAlteration: false,
    speechDifficulty: false,
    languageBarrier: false,
    language: '',
    observations: '',
  },
  beliefsAndValues: {
    hasReligiousCulturalBeliefs: false,
    advanceDirectives: false,
    observations: '',
  },
  workAndLeisure: {
    active: false,
    disability: false,
    retired: false,
    student: false,
    homemaker: false,
    leisureSport: false,
    leisureReading: false,
    leisureMusic: false,
    leisureTV: false,
    leisureOthers: false,
    observations: '',
  },
  comfort: {
    hasPain: false,
    noPain: true,
    painLocation: '',
    painTypeAcute: false,
    painTypeChronic: false,
    painWithMovement: false,
    painIntensity: '',
    painScale: '',
  },
  learning: {
    healthStatus: 'tranquility',
    hasInformation: false,
    informationTargetPatient: false,
    informationTargetFamily: false,
    informationTargetCaregiver: false,
    hasObstacles: false,
    obstacleMemoryLoss: false,
    obstacleIlliterate: false,
    obstacleLowEducation: false,
    obstacleOthers: false,
    knowledgeLevel: 3,
    observations: '',
  },
  psychosocial: {
    calm: true,
    worried: false,
    anxious: false,
    sad: false,
    apathetic: false,
    irritable: false,
    livesAlone: false,
    familySupport: true,
    personalCaregiver: false,
    nightCaregiver: false,
    stableHome: true,
    inResidence: false,
    noResources: false,
    observations: '',
  },
  additionalComments: '',
});

const AdultPatientEvaluationForm: React.FC<AdultPatientEvaluationFormProps> = ({
  initialData,
  onSave,
  onCancel,
  preloadedPatientId,
  preloadedNurseId,
}) => {
  const [formData, setFormData] = useState<Omit<AdultPatientEvaluation, 'id' | 'date'>>(() => {
    if (initialData) return { ...initialData };

    const empty = getEmptyEvaluation();

    if (preloadedPatientId) {
      const patient = mockPatients.find(p => p.id === preloadedPatientId);
      if (patient) {
        empty.patientName = patient.nombre;
        empty.noAllergies = patient.alergias === 'No conocidas';
        empty.hasAllergies = patient.alergias !== 'No conocidas';
        empty.allergiesDetails = patient.alergias !== 'No conocidas' ? patient.alergias : '';
        empty.personalHistory = patient.antecedentesPersonales;
        empty.habitualMedication = patient.medicacionHabitual;
        empty.temperatura = patient.temperatura;
        empty.tasSistolica = patient.tasSistolica;
        empty.tadDiastolica = patient.tadDiastolica;
        empty.fc = patient.fc;
        empty.fr = patient.fr;
        empty.satO2 = patient.satO2;
      }
    }

    if (preloadedNurseId) {
      const nurse = mockNurses.find(n => n.id === preloadedNurseId);
      if (nurse) {
        empty.nurse = nurse.nombre;
        empty.due = nurse.nombre;
      }
    }

    return empty;
  });
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const update = (path: string, value: unknown) => {
    setFormData(prev => {
      const keys = path.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      }
      if (keys.length === 2) {
        const section = prev[keys[0] as keyof typeof prev] as Record<string, unknown>;
        return { ...prev, [keys[0]]: { ...section, [keys[1]]: value } };
      }
      if (keys.length === 3) {
        const section = prev[keys[0] as keyof typeof prev] as Record<string, unknown>;
        const subsection = section[keys[1]] as Record<string, unknown>;
        return { ...prev, [keys[0]]: { ...section, [keys[1]]: { ...subsection, [keys[2]]: value } } };
      }
      return prev;
    });
  };

  const cb = (path: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    update(path, e.target.type === 'checkbox' ? e.target.checked : e.target.value);

  const handleSave = () => {
    const evaluation: AdultPatientEvaluation = {
      ...formData,
      id: initialData?.id || `adult-${Date.now()}`,
      date: initialData?.date || new Date().toISOString(),
    };
    onSave(evaluation);
  };

  const handleSaveAndPrint = async () => {
    setGeneratingPDF(true);
    try {
      const evaluation: AdultPatientEvaluation = {
        ...formData,
        id: initialData?.id || `adult-${Date.now()}`,
        date: initialData?.date || new Date().toISOString(),
      };
      onSave(evaluation);
      await new Promise(resolve => setTimeout(resolve, 100));
      const blob = await pdf(<AdultPatientEvaluationPDF evaluation={evaluation} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `evaluacion-paciente-adulto-${evaluation.patientName.replace(/\s+/g, '-')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error al generar el PDF. La evaluación se ha guardado correctamente.');
      console.error(error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const inputStyle = { backgroundColor: '#fff9e6', border: '1px solid #ccc', padding: '4px 8px', borderRadius: '4px', width: '100%', boxSizing: 'border-box' as const };
  const sectionHeaderStyle: React.CSSProperties = {
    backgroundColor: '#2c3e50', color: 'white', padding: '6px 12px',
    fontWeight: 'bold', fontSize: '0.9em', marginBottom: '10px', borderRadius: '4px',
  };

  const CheckboxField = ({ label, path, value }: { label: string; path: string; value: boolean }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9em' }}>
      <input type="checkbox" checked={value} onChange={cb(path)} />
      {label}
    </label>
  );

  return (
    <div className="surgical-report-form">
      {/* HEADER */}
      <div className="report-header">
        <div style={{ flex: 1 }}>
          <div className="miks-logo">MIKS</div>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#666' }}>Sistema de Información Hospitalaria</p>
        </div>
        <div style={{ textAlign: 'center', flex: 2 }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.4em' }}>
            EVALUACIÓN DE ENFERMERÍA AL PACIENTE HOSPITALIZADO ADULTO
          </h2>
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* DATOS DEL PACIENTE */}
      <div className="patient-info-section" style={{ border: '2px solid #2c3e50', borderRadius: '4px', padding: '10px', marginBottom: '15px' }}>
        <div style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '8px', fontSize: '0.95em' }}>DATOS DEL PACIENTE</div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 3 }}>
            <label>Paciente</label>
            <input type="text" style={inputStyle} value={formData.patientName} onChange={e => update('patientName', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>DUE</label>
            <input type="text" style={inputStyle} value={formData.due} onChange={e => update('due', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha</label>
            <input type="date" style={inputStyle} value={formData.evaluationDate} onChange={e => update('evaluationDate', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Nº sol.</label>
            <input type="text" style={inputStyle} value={formData.solicitudeNumber} onChange={e => update('solicitudeNumber', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Motivo de Ingreso</label>
            <input type="text" style={inputStyle} value={formData.admissionReason} onChange={e => update('admissionReason', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 2 }}>
            <label>Diagnóstico médico</label>
            <input type="text" style={inputStyle} value={formData.medicalDiagnosis} onChange={e => update('medicalDiagnosis', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Teléfono de familiar</label>
            <input type="text" style={inputStyle} value={formData.familyPhone} onChange={e => update('familyPhone', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Temperatura</label>
            <input type="text" style={inputStyle} value={formData.temperatura} onChange={e => update('temperatura', e.target.value)} placeholder="ºC" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>T.A. Sistólica</label>
            <input type="text" style={inputStyle} value={formData.tasSistolica} onChange={e => update('tasSistolica', e.target.value)} placeholder="mmHg" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>T.A. Diastólica</label>
            <input type="text" style={inputStyle} value={formData.tadDiastolica} onChange={e => update('tadDiastolica', e.target.value)} placeholder="mmHg" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>F.C.</label>
            <input type="text" style={inputStyle} value={formData.fc} onChange={e => update('fc', e.target.value)} placeholder="lpm" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>F.R.</label>
            <input type="text" style={inputStyle} value={formData.fr} onChange={e => update('fr', e.target.value)} placeholder="rpm" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>SAT O2</label>
            <input type="text" style={inputStyle} value={formData.satO2} onChange={e => update('satO2', e.target.value)} placeholder="%" />
          </div>
        </div>
        <div className="form-row" style={{ alignItems: 'center', gap: '15px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Alergias:</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" checked={formData.noAllergies} onChange={e => { update('noAllergies', e.target.checked); if (e.target.checked) update('hasAllergies', false); }} /> No
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" checked={formData.hasAllergies} onChange={e => { update('hasAllergies', e.target.checked); if (e.target.checked) update('noAllergies', false); }} /> Sí
          </label>
          <div style={{ flex: 1 }}>
            <input type="text" style={inputStyle} placeholder="Especificar alergias..." value={formData.allergiesDetails} onChange={e => update('allergiesDetails', e.target.value)} disabled={!formData.hasAllergies} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Antecedentes personales</label>
            <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={formData.personalHistory} onChange={e => update('personalHistory', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Medicación habitual</label>
            <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={formData.habitualMedication} onChange={e => update('habitualMedication', e.target.value)} />
          </div>
        </div>
      </div>

      {/* 1. RESPIRACIÓN */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          1. NECESIDAD DE RESPIRACIÓN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Sin alteración observada" path="respiration.noAlteration" value={formData.respiration.noAlteration} />
          <CheckboxField label="Dificultad Respirar" path="respiration.difficultyBreathing" value={formData.respiration.difficultyBreathing} />
          <CheckboxField label="Taquipnea" path="respiration.tachypnea" value={formData.respiration.tachypnea} />
          <CheckboxField label="Disnea" path="respiration.dyspnea" value={formData.respiration.dyspnea} />
          <CheckboxField label="Bradipnea" path="respiration.bradypnea" value={formData.respiration.bradypnea} />
          <CheckboxField label="Tos Productiva" path="respiration.productiveCough" value={formData.respiration.productiveCough} />
          <CheckboxField label="Tos no productiva" path="respiration.nonproductiveCough" value={formData.respiration.nonproductiveCough} />
          <CheckboxField label="Oxígeno" path="respiration.oxygen" value={formData.respiration.oxygen} />
          <CheckboxField label="Inhaladores" path="respiration.inhalers" value={formData.respiration.inhalers} />
          <CheckboxField label="Aerosoles" path="respiration.aerosols" value={formData.respiration.aerosols} />
          <CheckboxField label="Traqueostomía" path="respiration.tracheostomy" value={formData.respiration.tracheostomy} />
          <CheckboxField label="Gafas nasales" path="respiration.nasalCannula" value={formData.respiration.nasalCannula} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            Mascarilla %
            <input type="text" value={formData.respiration.maskPercentage} onChange={e => update('respiration.maskPercentage', e.target.value)} style={{ ...inputStyle, width: '60px' }} />
          </label>
          <CheckboxField label="Ex-Fumador" path="respiration.exSmoker" value={formData.respiration.exSmoker} />
          <CheckboxField label="Fumador" path="respiration.smoker" value={formData.respiration.smoker} />
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.respiration.observations} onChange={e => update('respiration.observations', e.target.value)} />
        </div>
      </div>

      {/* 2. ALIMENTACIÓN */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          2. NECESIDAD DE ALIMENTACIÓN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Sin alteración observada" path="feeding.noAlteration" value={formData.feeding.noAlteration} />
          <CheckboxField label="DA Masticar" path="feeding.difficultyChewing" value={formData.feeding.difficultyChewing} />
          <CheckboxField label="DA Beber" path="feeding.difficultyDrinking" value={formData.feeding.difficultyDrinking} />
          <CheckboxField label="DA Tragar" path="feeding.difficultySwallowing" value={formData.feeding.difficultySwallowing} />
          <CheckboxField label="Se niega a comer" path="feeding.refusesToEat" value={formData.feeding.refusesToEat} />
          <CheckboxField label="Prótesis dental" path="feeding.dentalProsthesis" value={formData.feeding.dentalProsthesis} />
          <CheckboxField label="Sonda nasogástrica" path="feeding.nasogastricTube" value={formData.feeding.nasogastricTube} />
          <CheckboxField label="Alimentación parenteral" path="feeding.parenteralNutrition" value={formData.feeding.parenteralNutrition} />
          <CheckboxField label="Ostomía" path="feeding.ostomy" value={formData.feeding.ostomy} />
          <CheckboxField label="Riesgo de aspiración" path="feeding.aspirationRisk" value={formData.feeding.aspirationRisk} />
          <CheckboxField label="Vómitos" path="feeding.vomiting" value={formData.feeding.vomiting} />
          <CheckboxField label="Náuseas" path="feeding.nausea" value={formData.feeding.nausea} />
        </div>
        <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '10px', marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.85em', color: '#2c3e50', marginBottom: '8px' }}>SCREENING NUTRICIONAL</div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Peso actual (kg)</label>
              <input type="text" style={inputStyle} value={formData.feeding.currentWeight} onChange={e => update('feeding.currentWeight', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Talla (cm)</label>
              <input type="text" style={inputStyle} value={formData.feeding.height} onChange={e => update('feeding.height', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>IMC (Anexo)</label>
              <input type="text" style={inputStyle} value={formData.feeding.bmi} onChange={e => update('feeding.bmi', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Peso habitual (kg)</label>
              <input type="text" style={inputStyle} value={formData.feeding.usualWeight} onChange={e => update('feeding.usualWeight', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>% pérdida de peso</label>
              <input type="text" style={inputStyle} value={formData.feeding.weightLossPercentage} onChange={e => update('feeding.weightLossPercentage', e.target.value)} />
            </div>
          </div>
          <div className="form-row" style={{ alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Ingesta:</span>
            {(['normal', 'half', 'almost_nothing'] as const).map(val => (
              <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
                <input type="radio" name="intake" value={val} checked={formData.feeding.intake === val} onChange={() => update('feeding.intake', val)} />
                {val === 'normal' ? 'Normal' : val === 'half' ? 'Aprox. la mitad' : 'Casi nada o absoluta'}
              </label>
            ))}
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Puntuación Riesgo MUST (Anexo)</label>
              <input type="text" style={inputStyle} value={formData.feeding.mustScore} onChange={e => update('feeding.mustScore', e.target.value)} />
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '8px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <CheckboxField label="Autónomo" path="feeding.autonomous" value={formData.feeding.autonomous} />
            <CheckboxField label="Necesita ayuda" path="feeding.needsHelp" value={formData.feeding.needsHelp} />
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Dieta</label>
              <input type="text" style={inputStyle} value={formData.feeding.diet} onChange={e => update('feeding.diet', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Ingesta diaria de líquidos</label>
              <input type="text" style={inputStyle} value={formData.feeding.dailyLiquidIntake} onChange={e => update('feeding.dailyLiquidIntake', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.feeding.observations} onChange={e => update('feeding.observations', e.target.value)} />
        </div>
      </div>

      {/* 3. ELIMINACIÓN */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>3. NECESIDAD DE ELIMINACIÓN</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.85em', color: '#2c3e50', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>PATRÓN URINARIO</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <CheckboxField label="Autónomo" path="elimination.urinaryPattern.autonomous" value={formData.elimination.urinaryPattern.autonomous} />
              <CheckboxField label="Precisa ayuda" path="elimination.urinaryPattern.needsHelp" value={formData.elimination.urinaryPattern.needsHelp} />
              <CheckboxField label="Continente" path="elimination.urinaryPattern.continent" value={formData.elimination.urinaryPattern.continent} />
              <CheckboxField label="Incontinente" path="elimination.urinaryPattern.incontinent" value={formData.elimination.urinaryPattern.incontinent} />
              <CheckboxField label="Retención" path="elimination.urinaryPattern.retention" value={formData.elimination.urinaryPattern.retention} />
              <CheckboxField label="Vía fisiológica" path="elimination.urinaryPattern.physiological" value={formData.elimination.urinaryPattern.physiological} />
              <CheckboxField label="Sonda vesical" path="elimination.urinaryPattern.urinaryCatheter" value={formData.elimination.urinaryPattern.urinaryCatheter} />
              <CheckboxField label="Colector" path="elimination.urinaryPattern.collector" value={formData.elimination.urinaryPattern.collector} />
              <CheckboxField label="Urocolector" path="elimination.urinaryPattern.urocolector" value={formData.elimination.urinaryPattern.urocolector} />
              <CheckboxField label="Diálisis" path="elimination.urinaryPattern.dialysis" value={formData.elimination.urinaryPattern.dialysis} />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.85em', color: '#2c3e50', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>PATRÓN INTESTINAL</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <CheckboxField label="Autónomo" path="elimination.intestinalPattern.autonomous" value={formData.elimination.intestinalPattern.autonomous} />
              <CheckboxField label="Precisa ayuda" path="elimination.intestinalPattern.needsHelp" value={formData.elimination.intestinalPattern.needsHelp} />
              <CheckboxField label="Continente" path="elimination.intestinalPattern.continent" value={formData.elimination.intestinalPattern.continent} />
              <CheckboxField label="Incontinente" path="elimination.intestinalPattern.incontinent" value={formData.elimination.intestinalPattern.incontinent} />
              <CheckboxField label="Retención" path="elimination.intestinalPattern.retention" value={formData.elimination.intestinalPattern.retention} />
              <CheckboxField label="Vía fisiológica" path="elimination.intestinalPattern.physiological" value={formData.elimination.intestinalPattern.physiological} />
              <CheckboxField label="Ostomía" path="elimination.intestinalPattern.ostomy" value={formData.elimination.intestinalPattern.ostomy} />
              <CheckboxField label="Diarrea" path="elimination.intestinalPattern.diarrhea" value={formData.elimination.intestinalPattern.diarrhea} />
              <CheckboxField label="Estreñimiento" path="elimination.intestinalPattern.constipation" value={formData.elimination.intestinalPattern.constipation} />
              <CheckboxField label="Laxantes" path="elimination.intestinalPattern.laxatives" value={formData.elimination.intestinalPattern.laxatives} />
              <div style={{ width: '100%' }}>
                <label style={{ fontSize: '0.85em' }}>Cuáles:</label>
                <input type="text" style={inputStyle} value={formData.elimination.intestinalPattern.laxativesDetails} onChange={e => update('elimination.intestinalPattern.laxativesDetails', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group" style={{ marginTop: '10px' }}>
          <label>¿Cuándo fue la última deposición?</label>
          <input type="text" style={inputStyle} value={formData.elimination.lastBowelMovement} onChange={e => update('elimination.lastBowelMovement', e.target.value)} />
        </div>
      </div>

      {/* 4. MOVILIZACIÓN */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          4. NECESIDAD DE MOVILIZACIÓN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Autónomo" path="mobilization.autonomous" value={formData.mobilization.autonomous} />
          <CheckboxField label="Dependiente" path="mobilization.dependent" value={formData.mobilization.dependent} />
          <CheckboxField label="Encamado" path="mobilization.bedridden" value={formData.mobilization.bedridden} />
          <CheckboxField label="Ayuda parcial" path="mobilization.needsPartialHelp" value={formData.mobilization.needsPartialHelp} />
          <CheckboxField label="Ayuda total" path="mobilization.needsTotalHelp" value={formData.mobilization.needsTotalHelp} />
          <CheckboxField label="Camina sólo" path="mobilization.walksAlone" value={formData.mobilization.walksAlone} />
          <CheckboxField label="Camina con ayuda" path="mobilization.walksWithHelp" value={formData.mobilization.walksWithHelp} />
          <CheckboxField label="Se mantiene sentado" path="mobilization.remainsSeated" value={formData.mobilization.remainsSeated} />
          <CheckboxField label="Se viste sólo" path="mobilization.dressesSelf" value={formData.mobilization.dressesSelf} />
          <CheckboxField label="Necesita ayuda para vestirse" path="mobilization.needsHelpDressing" value={formData.mobilization.needsHelpDressing} />
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.mobilization.observations} onChange={e => update('mobilization.observations', e.target.value)} />
        </div>
      </div>

      {/* 5. REPOSO Y SUEÑO */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>5. NECESIDAD DE REPOSO Y SUEÑO</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Patrón de sueño normal" path="restAndSleep.normalSleepPattern" value={formData.restAndSleep.normalSleepPattern} />
          <CheckboxField label="Dificultad para dormir" path="restAndSleep.difficultySleeping" value={formData.restAndSleep.difficultySleeping} />
          <CheckboxField label="Necesita ayuda/medicación" path="restAndSleep.needsHelpMedication" value={formData.restAndSleep.needsHelpMedication} />
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.restAndSleep.observations} onChange={e => update('restAndSleep.observations', e.target.value)} />
        </div>
      </div>

      {/* 6. HIGIENE CORPORAL E INTEGRIDAD DE LA PIEL */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>6. NECESIDAD DE HIGIENE CORPORAL. INTEGRIDAD DE LA PIEL</span>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.85em', color: '#555', marginBottom: '5px' }}>Estado de la piel:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <CheckboxField label="Íntegra" path="skinHygiene.skinIntact" value={formData.skinHygiene.skinIntact} />
            <CheckboxField label="Deshidratada" path="skinHygiene.skinDehydrated" value={formData.skinHygiene.skinDehydrated} />
            <CheckboxField label="Hidratada" path="skinHygiene.skinHydrated" value={formData.skinHygiene.skinHydrated} />
            <CheckboxField label="Limpia" path="skinHygiene.skinClean" value={formData.skinHygiene.skinClean} />
            <CheckboxField label="Sucia" path="skinHygiene.skinDirty" value={formData.skinHygiene.skinDirty} />
          </div>
        </div>
        <div className="form-row" style={{ alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 2 }}>
            <label>Heridas: Localización</label>
            <input type="text" style={inputStyle} value={formData.skinHygiene.woundLocation} onChange={e => update('skinHygiene.woundLocation', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Riesgo U.P.P. BRADEM (Anexo)</label>
            <input type="text" style={inputStyle} value={formData.skinHygiene.bradenScore} onChange={e => update('skinHygiene.bradenScore', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '18px' }}>
            <CheckboxField label="Alto" path="skinHygiene.riskHigh" value={formData.skinHygiene.riskHigh} />
            <CheckboxField label="Moderado" path="skinHygiene.riskModerate" value={formData.skinHygiene.riskModerate} />
            <CheckboxField label="Bajo" path="skinHygiene.riskLow" value={formData.skinHygiene.riskLow} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Úlceras por presión: Estado</label>
            <input type="text" style={inputStyle} value={formData.skinHygiene.pressureUlcersState} onChange={e => update('skinHygiene.pressureUlcersState', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Localización</label>
            <input type="text" style={inputStyle} value={formData.skinHygiene.pressureUlcersLocation} onChange={e => update('skinHygiene.pressureUlcersLocation', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Edemas:</span>
          <CheckboxField label="Sí" path="skinHygiene.edemas" value={formData.skinHygiene.edemas} />
          <CheckboxField label="No" path="skinHygiene.noEdemas" value={formData.skinHygiene.noEdemas} />
          <span style={{ fontWeight: 'bold', fontSize: '0.85em', marginLeft: '15px' }}>Higiene bucal:</span>
          <CheckboxField label="Adecuada" path="skinHygiene.oralHygieneAdequate" value={formData.skinHygiene.oralHygieneAdequate} />
          <CheckboxField label="Inadecuada" path="skinHygiene.oralHygieneInadequate" value={formData.skinHygiene.oralHygieneInadequate} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.85em', color: '#555', marginBottom: '5px' }}>Uso de medidas preventivas:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <CheckboxField label="No precisa" path="skinHygiene.preventiveMeasuresNone" value={formData.skinHygiene.preventiveMeasuresNone} />
            <CheckboxField label="Cambios posturales" path="skinHygiene.preventiveMeasuresPositionalChanges" value={formData.skinHygiene.preventiveMeasuresPositionalChanges} />
            <CheckboxField label="Protectores" path="skinHygiene.preventiveMeasuresProtectors" value={formData.skinHygiene.preventiveMeasuresProtectors} />
            <CheckboxField label="Colchón anti escaras" path="skinHygiene.preventiveMeasuresMattress" value={formData.skinHygiene.preventiveMeasuresMattress} />
          </div>
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.skinHygiene.observations} onChange={e => update('skinHygiene.observations', e.target.value)} />
        </div>
      </div>

      {/* 7. SEGURIDAD */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          7. NECESIDAD DE SEGURIDAD
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Riesgo de infección:</span>
          <CheckboxField label="Sí" path="safety.infectionRisk" value={formData.safety.infectionRisk} />
          <CheckboxField label="No" path="safety.noInfectionRisk" value={formData.safety.noInfectionRisk} />
          <CheckboxField label="Drenaje" path="safety.drainage" value={formData.safety.drainage} />
          <CheckboxField label="Sonda vesical" path="safety.urinaryCatheter" value={formData.safety.urinaryCatheter} />
          <CheckboxField label="Vía central" path="safety.centralLine" value={formData.safety.centralLine} />
        </div>
        <div className="form-row" style={{ alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Riesgo de caídas. Puntuación Downton (Anexo)</label>
            <input type="text" style={inputStyle} value={formData.safety.downtownScore} onChange={e => update('safety.downtownScore', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '18px' }}>
            <CheckboxField label="Precisa restricción física" path="safety.physicalRestraint" value={formData.safety.physicalRestraint} />
            <CheckboxField label="Barandillas cama" path="safety.bedRails" value={formData.safety.bedRails} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Sonda vesical: Tipo</label>
            <input type="text" style={inputStyle} value={formData.safety.urinaryCatheterType} onChange={e => update('safety.urinaryCatheterType', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha de colocación</label>
            <input type="date" style={inputStyle} value={formData.safety.urinaryCatheterDate} onChange={e => update('safety.urinaryCatheterDate', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Vía venosa: Tipo</label>
            <input type="text" style={inputStyle} value={formData.safety.venousLineType} onChange={e => update('safety.venousLineType', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha de colocación</label>
            <input type="date" style={inputStyle} value={formData.safety.venousLineDate} onChange={e => update('safety.venousLineDate', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Drenajes: Tipo</label>
            <input type="text" style={inputStyle} value={formData.safety.drainageType} onChange={e => update('safety.drainageType', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha de colocación</label>
            <input type="date" style={inputStyle} value={formData.safety.drainageDate} onChange={e => update('safety.drainageDate', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '22px', flex: 2 }}>
            <CheckboxField label="Riesgo de autolesión" path="safety.selfInjuryRisk" value={formData.safety.selfInjuryRisk} />
            <CheckboxField label="Tóxicos" path="safety.toxics" value={formData.safety.toxics} />
          </div>
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.safety.observations} onChange={e => update('safety.observations', e.target.value)} />
        </div>
      </div>

      {/* 8. COMUNICACIÓN */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          8. NECESIDAD DE COMUNICACIÓN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Sin alteración observada" path="communication.noAlteration" value={formData.communication.noAlteration} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Orientación:</span>
          <CheckboxField label="Orientado" path="communication.oriented" value={formData.communication.oriented} />
          <CheckboxField label="Desorientado" path="communication.disoriented" value={formData.communication.disoriented} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Nivel de conciencia:</span>
          {(['conscious', 'drowsy', 'clouded', 'stuporous', 'comatose'] as const).map(level => (
            <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="consciousnessLevel" value={level} checked={formData.communication.consciousnessLevel === level} onChange={() => update('communication.consciousnessLevel', level)} />
              {level === 'conscious' ? 'Consciente' : level === 'drowsy' ? 'Somnoliento' : level === 'clouded' ? 'Obnubilado' : level === 'stuporous' ? 'Estuporoso' : 'Comatoso'}
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Alteración:</span>
          <CheckboxField label="Alteración de la visión" path="communication.visionAlteration" value={formData.communication.visionAlteration} />
          <CheckboxField label="Alteración de la audición" path="communication.hearingAlteration" value={formData.communication.hearingAlteration} />
          <CheckboxField label="Dificultad para el habla" path="communication.speechDifficulty" value={formData.communication.speechDifficulty} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Barrera idiomática:</span>
          <CheckboxField label="No" path="communication.languageBarrier" value={!formData.communication.languageBarrier} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            <input type="checkbox" checked={formData.communication.languageBarrier} onChange={e => update('communication.languageBarrier', e.target.checked)} /> Sí
          </label>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Idioma</label>
            <input type="text" style={inputStyle} value={formData.communication.language} onChange={e => update('communication.language', e.target.value)} disabled={!formData.communication.languageBarrier} />
          </div>
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.communication.observations} onChange={e => update('communication.observations', e.target.value)} />
        </div>
      </div>

      {/* 9. CREENCIAS Y VALORES */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>9. NECESIDAD DE CREENCIAS Y VALORES</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '8px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.9em' }}>¿Tiene alguna creencia religiosa o cultural que le gustaría que tuviésemos en cuenta durante su estancia?</span>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
                <input type="radio" name="religiousBeliefs" checked={formData.beliefsAndValues.hasReligiousCulturalBeliefs} onChange={() => update('beliefsAndValues.hasReligiousCulturalBeliefs', true)} /> Sí
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
                <input type="radio" name="religiousBeliefs" checked={!formData.beliefsAndValues.hasReligiousCulturalBeliefs} onChange={() => update('beliefsAndValues.hasReligiousCulturalBeliefs', false)} /> No
              </label>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.9em' }}>Voluntades anticipadas:</span>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
                <input type="radio" name="advanceDirectives" checked={formData.beliefsAndValues.advanceDirectives} onChange={() => update('beliefsAndValues.advanceDirectives', true)} /> Sí
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
                <input type="radio" name="advanceDirectives" checked={!formData.beliefsAndValues.advanceDirectives} onChange={() => update('beliefsAndValues.advanceDirectives', false)} /> No
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Observaciones a destacar</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.beliefsAndValues.observations} onChange={e => update('beliefsAndValues.observations', e.target.value)} />
        </div>
      </div>

      {/* 10. TRABAJO Y OCIO */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>10. NECESIDAD DE TRABAJO Y OCIO</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Activo/trabaja" path="workAndLeisure.active" value={formData.workAndLeisure.active} />
          <CheckboxField label="Invalidez" path="workAndLeisure.disability" value={formData.workAndLeisure.disability} />
          <CheckboxField label="Jubilado" path="workAndLeisure.retired" value={formData.workAndLeisure.retired} />
          <CheckboxField label="Estudiante" path="workAndLeisure.student" value={formData.workAndLeisure.student} />
          <CheckboxField label="Ama de casa" path="workAndLeisure.homemaker" value={formData.workAndLeisure.homemaker} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Actividades de ocio:</span>
          <CheckboxField label="Deporte" path="workAndLeisure.leisureSport" value={formData.workAndLeisure.leisureSport} />
          <CheckboxField label="Lectura" path="workAndLeisure.leisureReading" value={formData.workAndLeisure.leisureReading} />
          <CheckboxField label="Música" path="workAndLeisure.leisureMusic" value={formData.workAndLeisure.leisureMusic} />
          <CheckboxField label="TV" path="workAndLeisure.leisureTV" value={formData.workAndLeisure.leisureTV} />
          <CheckboxField label="Otros" path="workAndLeisure.leisureOthers" value={formData.workAndLeisure.leisureOthers} />
        </div>
        <div className="form-group">
          <label>Observaciones</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.workAndLeisure.observations} onChange={e => update('workAndLeisure.observations', e.target.value)} />
        </div>
      </div>

      {/* 11. CONFORT */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>11. NECESIDAD CONFORT</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Dolor:</span>
          <CheckboxField label="Sí" path="comfort.hasPain" value={formData.comfort.hasPain} />
          <CheckboxField label="No" path="comfort.noPain" value={formData.comfort.noPain} />
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Localización</label>
            <input type="text" style={inputStyle} value={formData.comfort.painLocation} onChange={e => update('comfort.painLocation', e.target.value)} disabled={!formData.comfort.hasPain} />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Tipo:</span>
          <CheckboxField label="Agudo" path="comfort.painTypeAcute" value={formData.comfort.painTypeAcute} />
          <CheckboxField label="Crónico" path="comfort.painTypeChronic" value={formData.comfort.painTypeChronic} />
          <CheckboxField label="Con el movimiento" path="comfort.painWithMovement" value={formData.comfort.painWithMovement} />
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Intensidad del dolor</label>
            <input type="text" style={inputStyle} value={formData.comfort.painIntensity} onChange={e => update('comfort.painIntensity', e.target.value)} disabled={!formData.comfort.hasPain} />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Escala utilizada para medir la intensidad (Anexo)</label>
            <input type="text" style={inputStyle} value={formData.comfort.painScale} onChange={e => update('comfort.painScale', e.target.value)} disabled={!formData.comfort.hasPain} />
          </div>
        </div>
      </div>

      {/* 12. APRENDIZAJE */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>12. NECESIDAD DE APRENDIZAJE</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>¿Cómo vive su estado de salud?</span>
          {(['tranquility', 'worry', 'anguish', 'fear'] as const).map(status => (
            <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="healthStatus" value={status} checked={formData.learning.healthStatus === status} onChange={() => update('learning.healthStatus', status)} />
              {status === 'tranquility' ? 'Tranquilidad' : status === 'worry' ? 'Preocupación' : status === 'anguish' ? 'Angustia' : 'Temor'}
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Tiene información y educación para mejorar su salud:</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            <input type="radio" name="hasInformation" checked={formData.learning.hasInformation} onChange={() => update('learning.hasInformation', true)} /> Sí
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            <input type="radio" name="hasInformation" checked={!formData.learning.hasInformation} onChange={() => update('learning.hasInformation', false)} /> No
          </label>
          {formData.learning.hasInformation && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85em' }}>Dirigida a:</span>
              <CheckboxField label="Paciente" path="learning.informationTargetPatient" value={formData.learning.informationTargetPatient} />
              <CheckboxField label="Familia" path="learning.informationTargetFamily" value={formData.learning.informationTargetFamily} />
              <CheckboxField label="Cuidador" path="learning.informationTargetCaregiver" value={formData.learning.informationTargetCaregiver} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Obstáculos para aprender:</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            <input type="radio" name="hasObstacles" checked={formData.learning.hasObstacles} onChange={() => update('learning.hasObstacles', true)} /> Sí
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
            <input type="radio" name="hasObstacles" checked={!formData.learning.hasObstacles} onChange={() => update('learning.hasObstacles', false)} /> No
          </label>
          {formData.learning.hasObstacles && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CheckboxField label="Pérdida de memoria" path="learning.obstacleMemoryLoss" value={formData.learning.obstacleMemoryLoss} />
              <CheckboxField label="No sabe leer o escribir" path="learning.obstacleIlliterate" value={formData.learning.obstacleIlliterate} />
              <CheckboxField label="Nivel educativo bajo" path="learning.obstacleLowEducation" value={formData.learning.obstacleLowEducation} />
              <CheckboxField label="Otros" path="learning.obstacleOthers" value={formData.learning.obstacleOthers} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Grado de conocimiento de su problema (1=Ninguno; 5=Extenso):</span>
          {[1, 2, 3, 4, 5].map(n => (
            <label key={n} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.9em' }}>
              <input type="radio" name="knowledgeLevel" value={n} checked={formData.learning.knowledgeLevel === n} onChange={() => update('learning.knowledgeLevel', n)} />
              {n}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label>Observaciones</label>
          <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }} value={formData.learning.observations} onChange={e => update('learning.observations', e.target.value)} />
        </div>
      </div>

      {/* 13. VALORACIÓN PSICO SOCIAL */}
      <div className="form-section" style={{ marginBottom: '15px' }}>
        <div style={sectionHeaderStyle}>
          <span>13. VALORACIÓN PSICO SOCIAL</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.85em' }}>Estado de ánimo/emocional:</span>
          <CheckboxField label="Tranquilo" path="psychosocial.calm" value={formData.psychosocial.calm} />
          <CheckboxField label="Preocupado" path="psychosocial.worried" value={formData.psychosocial.worried} />
          <CheckboxField label="Ansioso" path="psychosocial.anxious" value={formData.psychosocial.anxious} />
          <CheckboxField label="Triste" path="psychosocial.sad" value={formData.psychosocial.sad} />
          <CheckboxField label="Apático" path="psychosocial.apathetic" value={formData.psychosocial.apathetic} />
          <CheckboxField label="Irritable" path="psychosocial.irritable" value={formData.psychosocial.irritable} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>Vive sólo:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="livesAlone" checked={formData.psychosocial.livesAlone} onChange={() => update('psychosocial.livesAlone', true)} /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="livesAlone" checked={!formData.psychosocial.livesAlone} onChange={() => update('psychosocial.livesAlone', false)} /> No
            </label>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>Tiene apoyo familiar:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="familySupport" checked={formData.psychosocial.familySupport} onChange={() => update('psychosocial.familySupport', true)} /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="familySupport" checked={!formData.psychosocial.familySupport} onChange={() => update('psychosocial.familySupport', false)} /> No
            </label>
          </div>
          <CheckboxField label="Tiene cuidador personal, no familiar" path="psychosocial.personalCaregiver" value={formData.psychosocial.personalCaregiver} />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>Tiene cuidador apoyo/nocturno:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="nightCaregiver" checked={formData.psychosocial.nightCaregiver} onChange={() => update('psychosocial.nightCaregiver', true)} /> Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9em' }}>
              <input type="radio" name="nightCaregiver" checked={!formData.psychosocial.nightCaregiver} onChange={() => update('psychosocial.nightCaregiver', false)} /> No
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <CheckboxField label="Tiene domicilio estable" path="psychosocial.stableHome" value={formData.psychosocial.stableHome} />
          <CheckboxField label="Vive en residencia" path="psychosocial.inResidence" value={formData.psychosocial.inResidence} />
          <CheckboxField label="Sin recursos" path="psychosocial.noResources" value={formData.psychosocial.noResources} />
        </div>
        <div className="form-group">
          <label>Observaciones (En caso de detectar problemas para planificar el alta indicar aquí)</label>
          <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={formData.psychosocial.observations} onChange={e => update('psychosocial.observations', e.target.value)} />
        </div>
      </div>

      {/* COMENTARIOS ADICIONALES */}
      <div className="form-section" style={{ marginBottom: '15px', border: '2px solid #2c3e50', borderRadius: '4px', padding: '10px' }}>
        <div style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '8px', fontSize: '0.95em' }}>
          ¿DESEA AÑADIR ALGO QUE NO SE HAYA HABLADO Y CONSIDERE IMPORTANTE?
        </div>
        <textarea
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          value={formData.additionalComments}
          onChange={e => update('additionalComments', e.target.value)}
        />
      </div>

      {/* NAVIGATION */}
      <div className="form-navigation">
        <div />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
          <button type="button" className="save-button" onClick={handleSave} disabled={generatingPDF}>Guardar Evaluación</button>
          <button
            type="button"
            className="save-button"
            onClick={handleSaveAndPrint}
            disabled={generatingPDF}
            style={{ backgroundColor: generatingPDF ? '#95a5a6' : '#9b59b6', cursor: generatingPDF ? 'not-allowed' : 'pointer' }}
          >
            {generatingPDF ? 'Generando PDF...' : 'Guardar e Imprimir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdultPatientEvaluationForm;
