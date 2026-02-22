import { useEffect, useState } from 'react';

import PatientHeader from './PatientHeader';
import type { SurgicalShortEvaluation } from '../types/evaluation';

interface SurgicalShortFormProps {
  initialData?: SurgicalShortEvaluation;
  onSave: (data: SurgicalShortEvaluation) => void;
  onCancel: () => void;
}

const getEmptyEvaluation = (): Omit<SurgicalShortEvaluation, 'id' | 'date'> => ({
  evaluationType: 'surgical_short',
  evaluationName: 'Evaluación al Paciente Quirúrgico de Corta Estancia',
  nurse: '',
  patientName: 'Juan Pérez',
  respiration: {
    noAlteration: true,
    difficultyBreathing: false,
    tachypnea: false,
    dyspnea: false,
    bradypnea: false,
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
      physiological: true,
      urinaryCatheter: false,
    },
    intestinalPattern: {
      autonomous: true,
      needsHelp: false,
      physiological: true,
      ostomy: false,
    },
  },
  mobilization: {
    autonomous: true,
    dependent: false,
    bedridden: false,
    needsPartialHelp: false,
    needsTotalHelp: false,
    observations: '',
  },
  restAndSleep: {
    normalSleepPattern: true,
    difficultySleeping: false,
    needsHelpMedication: false,
    observations: '',
  },
  safety: {
    infectionRisk: false,
    noInfectionRisk: true,
    drainage: false,
    urinaryCatheter: false,
    centralLine: false,
    fallRiskScore: '',
    protectionProtocol: false,
    observations: '',
  },
  communication: {
    noAlteration: true,
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
  comfort: {
    hasPain: false,
    painLocation: '',
    painTypeAcute: false,
    painTypeChronic: false,
    painWithMovement: false,
    painIntensity: '',
    painScale: '',
  },
  learning: {
    healthStatus: 'tranquility',
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
  },
  additionalComments: '',
});

const SurgicalShortForm = ({ initialData, onSave, onCancel }: SurgicalShortFormProps) => {
  const [formData, setFormData] = useState<Omit<SurgicalShortEvaluation, 'id' | 'date'>>(
    initialData ? { ...initialData } : getEmptyEvaluation()
  );

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nurse.trim()) {
      alert('Por favor ingrese el nombre de la enfermera');
      return;
    }

    const evaluation: SurgicalShortEvaluation = {
      ...formData,
      id: initialData?.id || `eval-${Date.now()}`,
      date: initialData?.date || new Date().toISOString(),
    };

    onSave(evaluation);
  };

  return (
    <div className="evaluation-form">
      <PatientHeader />

      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Evaluación de Enfermería al Paciente Quirúrgico de Corta Estancia</h2>
        </div>

        {/* Datos de la enfermera */}
        <div className="form-section">
          <h3>Datos del Registro</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Enfermera que realiza la evaluación:</label>
              <input
                type="text"
                value={formData.nurse}
                onChange={(e) => setFormData({ ...formData, nurse: e.target.value })}
                placeholder="Nombre de la enfermera"
                style={{ width: '300px' }}
              />
            </div>
          </div>
        </div>

        {/* NECESIDAD DE RESPIRACIÓN */}
        <div className="form-section">
          <h3>
            NECESIDAD DE RESPIRACIÓN
            {formData.respiration.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-noAlt"
                checked={formData.respiration.noAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  respiration: {
                    ...formData.respiration,
                    noAlteration: e.target.checked,
                    difficultyBreathing: e.target.checked ? false : formData.respiration.difficultyBreathing,
                    tachypnea: e.target.checked ? false : formData.respiration.tachypnea,
                    dyspnea: e.target.checked ? false : formData.respiration.dyspnea,
                    bradypnea: e.target.checked ? false : formData.respiration.bradypnea,
                  }
                })}
              />
              <label htmlFor="resp-noAlt">Sin alteración</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-diff"
                checked={formData.respiration.difficultyBreathing}
                onChange={(e) => setFormData({
                  ...formData,
                  respiration: { ...formData.respiration, difficultyBreathing: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="resp-diff">Dificultad Respirar</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-tach"
                checked={formData.respiration.tachypnea}
                onChange={(e) => setFormData({
                  ...formData,
                  respiration: { ...formData.respiration, tachypnea: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="resp-tach">Taquipnea</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-disp"
                checked={formData.respiration.dyspnea}
                onChange={(e) => setFormData({
                  ...formData,
                  respiration: { ...formData.respiration, dyspnea: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="resp-disp">Dispnea</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-brad"
                checked={formData.respiration.bradypnea}
                onChange={(e) => setFormData({
                  ...formData,
                  respiration: { ...formData.respiration, bradypnea: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="resp-brad">Bradipnea</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.respiration.observations}
              onChange={(e) => setFormData({
                ...formData,
                respiration: { ...formData.respiration, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE ALIMENTACIÓN */}
        <div className="form-section">
          <h3>
            NECESIDAD DE ALIMENTACIÓN
            {formData.feeding.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <p style={{ fontWeight: '500', marginBottom: '10px' }}>Dificultad para:</p>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-chew"
                checked={formData.feeding.difficultyChewing}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, difficultyChewing: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="feed-chew">Dif. Masticar</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-drink"
                checked={formData.feeding.difficultyDrinking}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, difficultyDrinking: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="feed-drink">Dif. Beber</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-swallow"
                checked={formData.feeding.difficultySwallowing}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, difficultySwallowing: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="feed-swallow">Dif. Tragar</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-refuse"
                checked={formData.feeding.refusesToEat}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, refusesToEat: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="feed-refuse">Se niega a comer</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-prosthesis"
                checked={formData.feeding.dentalProsthesis}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, dentalProsthesis: e.target.checked }
                })}
              />
              <label htmlFor="feed-prosthesis">Prótesis dental</label>
            </div>
          </div>
          <div className="checkbox-group" style={{ marginTop: '10px' }}>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-ngt"
                checked={formData.feeding.nasogastricTube}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, nasogastricTube: e.target.checked }
                })}
              />
              <label htmlFor="feed-ngt">Sonda nasogástrica</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-parenteral"
                checked={formData.feeding.parenteralNutrition}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, parenteralNutrition: e.target.checked }
                })}
              />
              <label htmlFor="feed-parenteral">Alimentación parenteral</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-ostomy"
                checked={formData.feeding.ostomy}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, ostomy: e.target.checked }
                })}
              />
              <label htmlFor="feed-ostomy">Ostomía</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-aspiration"
                checked={formData.feeding.aspirationRisk}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, aspirationRisk: e.target.checked }
                })}
              />
              <label htmlFor="feed-aspiration">Riesgo de aspiración</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-vomiting"
                checked={formData.feeding.vomiting}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, vomiting: e.target.checked }
                })}
              />
              <label htmlFor="feed-vomiting">Vómitos</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-nausea"
                checked={formData.feeding.nausea}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, nausea: e.target.checked }
                })}
              />
              <label htmlFor="feed-nausea">Náuseas</label>
            </div>
          </div>

          <p style={{ fontWeight: '500', marginTop: '15px', marginBottom: '10px' }}>Screening nutricional:</p>
          <div className="form-row">
            <div className="form-group">
              <label>Peso actual:</label>
              <input
                type="text"
                value={formData.feeding.currentWeight}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, currentWeight: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
            <div className="form-group">
              <label>Talla:</label>
              <input
                type="text"
                value={formData.feeding.height}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, height: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
            <div className="form-group">
              <label>IMC :</label>
              <input
                type="text"
                value={formData.feeding.bmi}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, bmi: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
            <div className="form-group">
              <label>Peso habitual:</label>
              <input
                type="text"
                value={formData.feeding.usualWeight}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, usualWeight: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
            <div className="form-group">
              <label>% pérdida de peso:</label>
              <input
                type="text"
                value={formData.feeding.weightLossPercentage}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, weightLossPercentage: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ingesta:</label>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="intake-normal"
                    name="intake"
                    checked={formData.feeding.intake === 'normal'}
                    onChange={() => setFormData({
                      ...formData,
                      feeding: { ...formData.feeding, intake: 'normal' }
                    })}
                  />
                  <label htmlFor="intake-normal">Normal</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="intake-half"
                    name="intake"
                    checked={formData.feeding.intake === 'half'}
                    onChange={() => setFormData({
                      ...formData,
                      feeding: { ...formData.feeding, intake: 'half' }
                    })}
                  />
                  <label htmlFor="intake-half">Aprox. la mitad</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="intake-nothing"
                    name="intake"
                    checked={formData.feeding.intake === 'almost_nothing'}
                    onChange={() => setFormData({
                      ...formData,
                      feeding: { ...formData.feeding, intake: 'almost_nothing' }
                    })}
                  />
                  <label htmlFor="intake-nothing">Casi nada o absoluta</label>
                </div>
              </div>
            </div>
            <div className="form-group inline">
              <label>Puntuación Riesgo MUST:</label>
              <input
                type="text"
                value={formData.feeding.mustScore}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, mustScore: e.target.value }
                })}
                style={{ width: '100px' }}
              />
              <button
                type="button"
                className="scale-button"
                onClick={() => {/* TODO: Abrir escala MUST */}}
              >
                Abrir Escala
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-auto"
                checked={formData.feeding.autonomous}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, autonomous: e.target.checked, needsHelp: e.target.checked ? false : formData.feeding.needsHelp }
                })}
              />
              <label htmlFor="feed-auto">Autónomo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="feed-help"
                checked={formData.feeding.needsHelp}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, needsHelp: e.target.checked, autonomous: e.target.checked ? false : formData.feeding.autonomous }
                })}
              />
              <label htmlFor="feed-help">Necesita ayuda</label>
            </div>
            <div className="form-group">
              <label>Dieta:</label>
              <input
                type="text"
                value={formData.feeding.diet}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, diet: e.target.value }
                })}
                style={{ width: '200px' }}
              />
            </div>
            <div className="form-group">
              <label>Ingesta diaria de líquidos:</label>
              <input
                type="text"
                value={formData.feeding.dailyLiquidIntake}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, dailyLiquidIntake: e.target.value }
                })}
                style={{ width: '150px' }}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.feeding.observations}
              onChange={(e) => setFormData({
                ...formData,
                feeding: { ...formData.feeding, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE ELIMINACIÓN */}
        <div className="form-section">
          <h3>NECESIDAD DE ELIMINACIÓN</h3>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '500', marginBottom: '10px' }}>Patrón urinario:</p>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-auto"
                    checked={formData.elimination.urinaryPattern.autonomous}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        urinaryPattern: { ...formData.elimination.urinaryPattern, autonomous: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="urin-auto">Autónomo</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-help"
                    checked={formData.elimination.urinaryPattern.needsHelp}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        urinaryPattern: { ...formData.elimination.urinaryPattern, needsHelp: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="urin-help">Precisa ayuda</label>
                </div>
              </div>
              <div className="checkbox-group" style={{ marginTop: '10px' }}>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-physio"
                    checked={formData.elimination.urinaryPattern.physiological}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        urinaryPattern: { ...formData.elimination.urinaryPattern, physiological: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="urin-physio">Vía fisiológica</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-catheter"
                    checked={formData.elimination.urinaryPattern.urinaryCatheter}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        urinaryPattern: { ...formData.elimination.urinaryPattern, urinaryCatheter: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="urin-catheter">Sonda vesical</label>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '500', marginBottom: '10px' }}>Patrón intestinal:</p>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-auto"
                    checked={formData.elimination.intestinalPattern.autonomous}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        intestinalPattern: { ...formData.elimination.intestinalPattern, autonomous: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="intest-auto">Autónomo</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-help"
                    checked={formData.elimination.intestinalPattern.needsHelp}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        intestinalPattern: { ...formData.elimination.intestinalPattern, needsHelp: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="intest-help">Precisa ayuda</label>
                </div>
              </div>
              <div className="checkbox-group" style={{ marginTop: '10px' }}>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-physio"
                    checked={formData.elimination.intestinalPattern.physiological}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        intestinalPattern: { ...formData.elimination.intestinalPattern, physiological: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="intest-physio">Vía fisiológica</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-ostomy"
                    checked={formData.elimination.intestinalPattern.ostomy}
                    onChange={(e) => setFormData({
                      ...formData,
                      elimination: {
                        ...formData.elimination,
                        intestinalPattern: { ...formData.elimination.intestinalPattern, ostomy: e.target.checked }
                      }
                    })}
                  />
                  <label htmlFor="intest-ostomy">Ostomía</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NECESIDAD DE MOVILIZACIÓN */}
        <div className="form-section">
          <h3>
            NECESIDAD DE MOVILIZACIÓN
            {formData.mobilization.autonomous && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Autónomo</span>
            )}
          </h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-dep"
                checked={formData.mobilization.dependent}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, dependent: e.target.checked, autonomous: e.target.checked ? false : formData.mobilization.autonomous }
                })}
              />
              <label htmlFor="mob-dep">Dependiente</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-bed"
                checked={formData.mobilization.bedridden}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, bedridden: e.target.checked }
                })}
              />
              <label htmlFor="mob-bed">Encamado</label>
            </div>
            <span style={{ fontWeight: '500' }}>Necesita:</span>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-partial"
                checked={formData.mobilization.needsPartialHelp}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, needsPartialHelp: e.target.checked, autonomous: e.target.checked ? false : formData.mobilization.autonomous }
                })}
              />
              <label htmlFor="mob-partial">Ayuda parcial</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-total"
                checked={formData.mobilization.needsTotalHelp}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, needsTotalHelp: e.target.checked, autonomous: e.target.checked ? false : formData.mobilization.autonomous }
                })}
              />
              <label htmlFor="mob-total">Ayuda total</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.mobilization.observations}
              onChange={(e) => setFormData({
                ...formData,
                mobilization: { ...formData.mobilization, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE REPOSO Y SUEÑO */}
        <div className="form-section">
          <h3>NECESIDAD DE REPOSO Y SUEÑO</h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-normal"
                checked={formData.restAndSleep.normalSleepPattern}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, normalSleepPattern: e.target.checked }
                })}
              />
              <label htmlFor="sleep-normal">Patrón de sueño normal</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-diff"
                checked={formData.restAndSleep.difficultySleeping}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, difficultySleeping: e.target.checked }
                })}
              />
              <label htmlFor="sleep-diff">Dificultad para dormir</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-med"
                checked={formData.restAndSleep.needsHelpMedication}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, needsHelpMedication: e.target.checked }
                })}
              />
              <label htmlFor="sleep-med">Necesita ayuda/medicación</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.restAndSleep.observations}
              onChange={(e) => setFormData({
                ...formData,
                restAndSleep: { ...formData.restAndSleep, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE SEGURIDAD */}
        <div className="form-section">
          <h3>NECESIDAD DE SEGURIDAD</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Riesgo de infección:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="infec-yes"
                name="infectionRisk"
                checked={formData.safety.infectionRisk}
                onChange={() => setFormData({
                  ...formData,
                  safety: { ...formData.safety, infectionRisk: true, noInfectionRisk: false }
                })}
              />
              <label htmlFor="infec-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="infec-no"
                name="infectionRisk"
                checked={formData.safety.noInfectionRisk}
                onChange={() => setFormData({
                  ...formData,
                  safety: { ...formData.safety, infectionRisk: false, noInfectionRisk: true }
                })}
              />
              <label htmlFor="infec-no">No</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-drain"
                checked={formData.safety.drainage}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, drainage: e.target.checked }
                })}
              />
              <label htmlFor="safety-drain">Drenaje</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-catheter"
                checked={formData.safety.urinaryCatheter}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, urinaryCatheter: e.target.checked }
                })}
              />
              <label htmlFor="safety-catheter">Sonda vesical</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-central"
                checked={formData.safety.centralLine}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, centralLine: e.target.checked }
                })}
              />
              <label htmlFor="safety-central">Vía central</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <div className="form-group inline">
              <label>Riesgo de caídas. Puntuación Downton:</label>
              <input
                type="text"
                value={formData.safety.fallRiskScore}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, fallRiskScore: e.target.value }
                })}
                style={{ width: '80px' }}
              />
              <button
                type="button"
                className="scale-button"
                onClick={() => {/* TODO: Abrir escala Downton */}}
              >
                Abrir Escala
              </button>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-protocol"
                checked={formData.safety.protectionProtocol}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, protectionProtocol: e.target.checked }
                })}
              />
              <label htmlFor="safety-protocol">Protocolo de protección {'>'}2</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.safety.observations}
              onChange={(e) => setFormData({
                ...formData,
                safety: { ...formData.safety, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE COMUNICACIÓN */}
        <div className="form-section">
          <h3>
            NECESIDAD DE COMUNICACIÓN
            {formData.communication.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Alteración:</span>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="comm-vision"
                checked={formData.communication.visionAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  communication: { ...formData.communication, visionAlteration: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="comm-vision">Alteración de la visión</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="comm-hearing"
                checked={formData.communication.hearingAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  communication: { ...formData.communication, hearingAlteration: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="comm-hearing">Alteración de la audición</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="comm-speech"
                checked={formData.communication.speechDifficulty}
                onChange={(e) => setFormData({
                  ...formData,
                  communication: { ...formData.communication, speechDifficulty: e.target.checked, noAlteration: false }
                })}
              />
              <label htmlFor="comm-speech">Dificultad para el habla</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: '500' }}>Barrera idiomática:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="lang-no"
                name="languageBarrier"
                checked={!formData.communication.languageBarrier}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, languageBarrier: false }
                })}
              />
              <label htmlFor="lang-no">No</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="lang-yes"
                name="languageBarrier"
                checked={formData.communication.languageBarrier}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, languageBarrier: true }
                })}
              />
              <label htmlFor="lang-yes">Sí</label>
            </div>
            {formData.communication.languageBarrier && (
              <div className="form-group inline">
                <label>Idioma:</label>
                <input
                  type="text"
                  value={formData.communication.language}
                  onChange={(e) => setFormData({
                    ...formData,
                    communication: { ...formData.communication, language: e.target.value }
                  })}
                  style={{ width: '150px' }}
                />
              </div>
            )}
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.communication.observations}
              onChange={(e) => setFormData({
                ...formData,
                communication: { ...formData.communication, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE CREENCIAS Y VALORES */}
        <div className="form-section">
          <h3>NECESIDAD DE CREENCIAS Y VALORES</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>¿Tiene alguna creencia religiosa o cultural que le gustaría que tuviésemos en cuenta durante su estancia?</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="beliefs-yes"
                name="beliefs"
                checked={formData.beliefsAndValues.hasReligiousCulturalBeliefs}
                onChange={() => setFormData({
                  ...formData,
                  beliefsAndValues: { ...formData.beliefsAndValues, hasReligiousCulturalBeliefs: true }
                })}
              />
              <label htmlFor="beliefs-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="beliefs-no"
                name="beliefs"
                checked={!formData.beliefsAndValues.hasReligiousCulturalBeliefs}
                onChange={() => setFormData({
                  ...formData,
                  beliefsAndValues: { ...formData.beliefsAndValues, hasReligiousCulturalBeliefs: false }
                })}
              />
              <label htmlFor="beliefs-no">No</label>
            </div>
            <span style={{ fontWeight: '500', marginLeft: '20px' }}>Voluntades anticipadas:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="directives-yes"
                name="directives"
                checked={formData.beliefsAndValues.advanceDirectives}
                onChange={() => setFormData({
                  ...formData,
                  beliefsAndValues: { ...formData.beliefsAndValues, advanceDirectives: true }
                })}
              />
              <label htmlFor="directives-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="directives-no"
                name="directives"
                checked={!formData.beliefsAndValues.advanceDirectives}
                onChange={() => setFormData({
                  ...formData,
                  beliefsAndValues: { ...formData.beliefsAndValues, advanceDirectives: false }
                })}
              />
              <label htmlFor="directives-no">No</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones a destacar:</label>
            <textarea
              value={formData.beliefsAndValues.observations}
              onChange={(e) => setFormData({
                ...formData,
                beliefsAndValues: { ...formData.beliefsAndValues, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* NECESIDAD DE CONFORT */}
        <div className="form-section">
          <h3>NECESIDAD CONFORT</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Dolor:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="pain-yes"
                name="pain"
                checked={formData.comfort.hasPain}
                onChange={() => setFormData({
                  ...formData,
                  comfort: { ...formData.comfort, hasPain: true }
                })}
              />
              <label htmlFor="pain-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="pain-no"
                name="pain"
                checked={!formData.comfort.hasPain}
                onChange={() => setFormData({
                  ...formData,
                  comfort: { ...formData.comfort, hasPain: false }
                })}
              />
              <label htmlFor="pain-no">No</label>
            </div>
            {formData.comfort.hasPain && (
              <>
                <div className="form-group inline">
                  <label>Localización:</label>
                  <input
                    type="text"
                    value={formData.comfort.painLocation}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painLocation: e.target.value }
                    })}
                    style={{ width: '150px' }}
                  />
                </div>
                <span style={{ fontWeight: '500' }}>Tipo:</span>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="pain-acute"
                    checked={formData.comfort.painTypeAcute}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painTypeAcute: e.target.checked }
                    })}
                  />
                  <label htmlFor="pain-acute">Agudo</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="pain-chronic"
                    checked={formData.comfort.painTypeChronic}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painTypeChronic: e.target.checked }
                    })}
                  />
                  <label htmlFor="pain-chronic">Crónico</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="pain-movement"
                    checked={formData.comfort.painWithMovement}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painWithMovement: e.target.checked }
                    })}
                  />
                  <label htmlFor="pain-movement">Con el movimiento</label>
                </div>
              </>
            )}
          </div>
          {formData.comfort.hasPain && (
            <div className="form-row" style={{ marginTop: '10px' }}>
              <div className="form-group inline">
                <label>Intensidad del dolor:</label>
                <input
                  type="text"
                  value={formData.comfort.painIntensity}
                  onChange={(e) => setFormData({
                    ...formData,
                    comfort: { ...formData.comfort, painIntensity: e.target.value }
                  })}
                  style={{ width: '80px' }}
                />
              </div>
              <div className="form-group inline">
                <label>Escala utilizada para medir la intensidad :</label>
                <input
                  type="text"
                  value={formData.comfort.painScale}
                  onChange={(e) => setFormData({
                    ...formData,
                    comfort: { ...formData.comfort, painScale: e.target.value }
                  })}
                  style={{ width: '200px' }}
                />
                <button
                  type="button"
                  className="scale-button"
                  onClick={() => {/* TODO: Abrir escala de dolor */}}
                >
                  Abrir Escala
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NECESIDAD DE APRENDIZAJE */}
        <div className="form-section">
          <h3>NECESIDAD DE APRENDIZAJE</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>¿Cómo vive su estado de salud?</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="health-tranquil"
                name="healthStatus"
                checked={formData.learning.healthStatus === 'tranquility'}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, healthStatus: 'tranquility' }
                })}
              />
              <label htmlFor="health-tranquil">Tranquilidad</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="health-worry"
                name="healthStatus"
                checked={formData.learning.healthStatus === 'worry'}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, healthStatus: 'worry' }
                })}
              />
              <label htmlFor="health-worry">Preocupación</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="health-anguish"
                name="healthStatus"
                checked={formData.learning.healthStatus === 'anguish'}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, healthStatus: 'anguish' }
                })}
              />
              <label htmlFor="health-anguish">Angustia</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="health-fear"
                name="healthStatus"
                checked={formData.learning.healthStatus === 'fear'}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, healthStatus: 'fear' }
                })}
              />
              <label htmlFor="health-fear">Temor</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: '500' }}>Grado de conocimiento de su problema (1= Ninguno; 5=Extenso):</span>
            {[1, 2, 3, 4, 5].map((level) => (
              <div className="checkbox-item" key={level}>
                <input
                  type="radio"
                  id={`knowledge-${level}`}
                  name="knowledgeLevel"
                  checked={formData.learning.knowledgeLevel === level}
                  onChange={() => setFormData({
                    ...formData,
                    learning: { ...formData.learning, knowledgeLevel: level }
                  })}
                />
                <label htmlFor={`knowledge-${level}`}>{level}</label>
              </div>
            ))}
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.learning.observations}
              onChange={(e) => setFormData({
                ...formData,
                learning: { ...formData.learning, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* VALORACIÓN PSICOSOCIAL */}
        <div className="form-section">
          <h3>VALORACIÓN PSICO SOCIAL</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Estado de ánimo/emocional:</span>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-calm"
                checked={formData.psychosocial.calm}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, calm: e.target.checked }
                })}
              />
              <label htmlFor="psico-calm">Tranquilo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-worried"
                checked={formData.psychosocial.worried}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, worried: e.target.checked }
                })}
              />
              <label htmlFor="psico-worried">Preocupado</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-anxious"
                checked={formData.psychosocial.anxious}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, anxious: e.target.checked }
                })}
              />
              <label htmlFor="psico-anxious">Ansioso</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-sad"
                checked={formData.psychosocial.sad}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, sad: e.target.checked }
                })}
              />
              <label htmlFor="psico-sad">Triste</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-apathetic"
                checked={formData.psychosocial.apathetic}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, apathetic: e.target.checked }
                })}
              />
              <label htmlFor="psico-apathetic">Apático</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="psico-irritable"
                checked={formData.psychosocial.irritable}
                onChange={(e) => setFormData({
                  ...formData,
                  psychosocial: { ...formData.psychosocial, irritable: e.target.checked }
                })}
              />
              <label htmlFor="psico-irritable">Irritable</label>
            </div>
          </div>
        </div>

        {/* COMENTARIOS ADICIONALES */}
        <div className="form-section">
          <h3>¿DESEA AÑADIR ALGO QUE NO SE HAYA HABLADO Y CONSIDERE IMPORTANTE?</h3>
          <div className="form-group">
            <textarea
              value={formData.additionalComments}
              onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
              style={{ minHeight: '100px' }}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            Guardar Evaluación
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurgicalShortForm;
