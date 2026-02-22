import { useEffect, useState } from 'react';

import PatientHeader from './PatientHeader';
import type { CMAEvaluation } from '../types/evaluation';

interface CMAEvaluationFormProps {
  initialData?: CMAEvaluation;
  onSave: (data: CMAEvaluation) => void;
  onCancel: () => void;
}

const getEmptyEvaluation = (): Omit<CMAEvaluation, 'id' | 'date'> => ({
  evaluationType: 'cma',
  evaluationName: 'Evaluación de Enfermería Cirugía Mayor Ambulatoria',
  nurse: 'María García López',
  patientName: 'Juan Pérez',
  habitualMedication: '',
  respiration: {
    noAlteration: true,
    dyspnea: false,
    tachypnea: false,
    bradypnea: false,
    retractions: false,
    difficultyBreathing: false,
    observations: '',
  },
  feeding: {
    fasting: false,
    lastIntakeTime: '',
    observations: '',
  },
  elimination: {
    noAlteration: true,
    urinaryPattern: {
      continent: true,
      incontinent: false,
      urinaryCatheter: false,
      other: '',
    },
    intestinalPattern: {
      continent: true,
      incontinent: false,
      ostomies: false,
      other: '',
    },
    observations: '',
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
    normalPattern: true,
    difficulty: false,
    needsHelpMedication: false,
    observations: '',
  },
  safety: {
    fallRiskScore: '',
    riskLevel: 'no_risk',
    visionAlteration: false,
    hearingAlteration: false,
    memoryAlteration: false,
    speechDifficulty: false,
    observations: '',
  },
  communication: {
    noAlteration: true,
    emotionalState: {
      calm: true,
      worried: false,
      anxious: false,
      sad: false,
      apathetic: false,
      irritable: false,
    },
    consciousnessLevel: 'alert',
    oriented: true,
    languageBarrier: false,
    language: '',
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
    hasObstacles: false,
    obstaclesDescription: '',
    knowledgeLevel: 3,
    observations: '',
  },
  presurgicalChecklist: {
    identificationBracelet: 'yes',
    patientIdentificationVerified: 'yes',
    scheduledSurgery: 'yes',
    anesthesiaConsent: 'yes',
    surgeryConsent: 'yes',
    preoperativeCompleted: 'yes',
    surgicalAreaPrepared: 'yes',
    metallicObjectsRemoved: 'yes',
    prosthesisRemoved: 'np',
    intestinalPreparation: 'np',
    intestinalPreparationDetails: '',
    peripheralLineInserted: 'yes',
    premedication: 'np',
    premedicationDetails: '',
  },
});

const CMAEvaluationForm = ({ initialData, onSave, onCancel }: CMAEvaluationFormProps) => {
  const [formData, setFormData] = useState<Omit<CMAEvaluation, 'id' | 'date'>>(
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

    const evaluation: CMAEvaluation = {
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
          <h2>Evaluación de Enfermería Cirugía Mayor Ambulatoria</h2>
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

        {/* MEDICACIÓN HABITUAL */}
        <div className="form-section">
          <h3>MEDICACIÓN HABITUAL (INDICAR ÚLTIMA TOMA CUANDO CORRESPONDA)</h3>
          <div className="form-group">
            <textarea
              value={formData.habitualMedication}
              onChange={(e) => setFormData({ ...formData, habitualMedication: e.target.value })}
              placeholder="Indique la medicación habitual del paciente..."
              style={{ minHeight: '100px' }}
            />
          </div>
        </div>

        {/* 1. NECESIDAD DE RESPIRACIÓN */}
        <div className="form-section">
          <h3>
            1. NECESIDAD DE RESPIRACIÓN
            {formData.respiration.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-dyspnea"
                checked={formData.respiration.dyspnea}
                onChange={(e) => {
                  const newDyspnea = e.target.checked;
                  const hasAnyAlteration = newDyspnea || formData.respiration.tachypnea || formData.respiration.bradypnea || formData.respiration.retractions || formData.respiration.difficultyBreathing;
                  setFormData({
                    ...formData,
                    respiration: { ...formData.respiration, dyspnea: newDyspnea, noAlteration: !hasAnyAlteration }
                  });
                }}
              />
              <label htmlFor="resp-dyspnea">Dispnea</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-tachypnea"
                checked={formData.respiration.tachypnea}
                onChange={(e) => {
                  const newTachypnea = e.target.checked;
                  const hasAnyAlteration = formData.respiration.dyspnea || newTachypnea || formData.respiration.bradypnea || formData.respiration.retractions || formData.respiration.difficultyBreathing;
                  setFormData({
                    ...formData,
                    respiration: { ...formData.respiration, tachypnea: newTachypnea, noAlteration: !hasAnyAlteration }
                  });
                }}
              />
              <label htmlFor="resp-tachypnea">Taquipnea</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-bradypnea"
                checked={formData.respiration.bradypnea}
                onChange={(e) => {
                  const newBradypnea = e.target.checked;
                  const hasAnyAlteration = formData.respiration.dyspnea || formData.respiration.tachypnea || newBradypnea || formData.respiration.retractions || formData.respiration.difficultyBreathing;
                  setFormData({
                    ...formData,
                    respiration: { ...formData.respiration, bradypnea: newBradypnea, noAlteration: !hasAnyAlteration }
                  });
                }}
              />
              <label htmlFor="resp-bradypnea">Bradipnea</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-retractions"
                checked={formData.respiration.retractions}
                onChange={(e) => {
                  const newRetractions = e.target.checked;
                  const hasAnyAlteration = formData.respiration.dyspnea || formData.respiration.tachypnea || formData.respiration.bradypnea || newRetractions || formData.respiration.difficultyBreathing;
                  setFormData({
                    ...formData,
                    respiration: { ...formData.respiration, retractions: newRetractions, noAlteration: !hasAnyAlteration }
                  });
                }}
              />
              <label htmlFor="resp-retractions">Tiraje</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resp-difficulty"
                checked={formData.respiration.difficultyBreathing}
                onChange={(e) => {
                  const newDifficulty = e.target.checked;
                  const hasAnyAlteration = formData.respiration.dyspnea || formData.respiration.tachypnea || formData.respiration.bradypnea || formData.respiration.retractions || newDifficulty;
                  setFormData({
                    ...formData,
                    respiration: { ...formData.respiration, difficultyBreathing: newDifficulty, noAlteration: !hasAnyAlteration }
                  });
                }}
              />
              <label htmlFor="resp-difficulty">Dificultad Respirar</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.respiration.observations}
              onChange={(e) => setFormData({
                ...formData,
                respiration: { ...formData.respiration, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 2. NECESIDAD DE ALIMENTACIÓN */}
        <div className="form-section">
          <h3>2. NECESIDAD DE ALIMENTACIÓN</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Ayunas:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="fasting-yes"
                name="fasting"
                checked={formData.feeding.fasting}
                onChange={() => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, fasting: true }
                })}
              />
              <label htmlFor="fasting-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="fasting-no"
                name="fasting"
                checked={!formData.feeding.fasting}
                onChange={() => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, fasting: false }
                })}
              />
              <label htmlFor="fasting-no">No</label>
            </div>
            <div className="form-group inline" style={{ marginLeft: '20px' }}>
              <label>Hora última ingesta:</label>
              <input
                type="text"
                value={formData.feeding.lastIntakeTime}
                onChange={(e) => setFormData({
                  ...formData,
                  feeding: { ...formData.feeding, lastIntakeTime: e.target.value }
                })}
                style={{ width: '100px' }}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.feeding.observations}
              onChange={(e) => setFormData({
                ...formData,
                feeding: { ...formData.feeding, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 3. NECESIDAD DE ELIMINACIÓN */}
        <div className="form-section">
          <h3>
            3. NECESIDAD DE ELIMINACIÓN
            {formData.elimination.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '500', marginBottom: '10px' }}>Patrón urinario:</p>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-continent"
                    checked={formData.elimination.urinaryPattern.continent}
                    onChange={(e) => {
                      const newContinent = e.target.checked;
                      const hasUrinaryAlteration = !newContinent || formData.elimination.urinaryPattern.incontinent || formData.elimination.urinaryPattern.urinaryCatheter;
                      const hasIntestinalAlteration = !formData.elimination.intestinalPattern.continent || formData.elimination.intestinalPattern.incontinent || formData.elimination.intestinalPattern.ostomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          urinaryPattern: { ...formData.elimination.urinaryPattern, continent: newContinent },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="urin-continent">Continente</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-incontinent"
                    checked={formData.elimination.urinaryPattern.incontinent}
                    onChange={(e) => {
                      const newIncontinent = e.target.checked;
                      const hasUrinaryAlteration = !formData.elimination.urinaryPattern.continent || newIncontinent || formData.elimination.urinaryPattern.urinaryCatheter;
                      const hasIntestinalAlteration = !formData.elimination.intestinalPattern.continent || formData.elimination.intestinalPattern.incontinent || formData.elimination.intestinalPattern.ostomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          urinaryPattern: { ...formData.elimination.urinaryPattern, incontinent: newIncontinent },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="urin-incontinent">Incontinente</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="urin-catheter"
                    checked={formData.elimination.urinaryPattern.urinaryCatheter}
                    onChange={(e) => {
                      const newCatheter = e.target.checked;
                      const hasUrinaryAlteration = !formData.elimination.urinaryPattern.continent || formData.elimination.urinaryPattern.incontinent || newCatheter;
                      const hasIntestinalAlteration = !formData.elimination.intestinalPattern.continent || formData.elimination.intestinalPattern.incontinent || formData.elimination.intestinalPattern.ostomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          urinaryPattern: { ...formData.elimination.urinaryPattern, urinaryCatheter: newCatheter },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="urin-catheter">Sonda Vesical</label>
                </div>
              </div>
              <div className="form-group inline" style={{ marginTop: '10px' }}>
                <label>Otros:</label>
                <input
                  type="text"
                  value={formData.elimination.urinaryPattern.other}
                  onChange={(e) => setFormData({
                    ...formData,
                    elimination: {
                      ...formData.elimination,
                      urinaryPattern: { ...formData.elimination.urinaryPattern, other: e.target.value }
                    }
                  })}
                  style={{ width: '200px' }}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '500', marginBottom: '10px' }}>Patrón intestinal:</p>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-continent"
                    checked={formData.elimination.intestinalPattern.continent}
                    onChange={(e) => {
                      const newContinent = e.target.checked;
                      const hasUrinaryAlteration = !formData.elimination.urinaryPattern.continent || formData.elimination.urinaryPattern.incontinent || formData.elimination.urinaryPattern.urinaryCatheter;
                      const hasIntestinalAlteration = !newContinent || formData.elimination.intestinalPattern.incontinent || formData.elimination.intestinalPattern.ostomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          intestinalPattern: { ...formData.elimination.intestinalPattern, continent: newContinent },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="intest-continent">Continente</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-incontinent"
                    checked={formData.elimination.intestinalPattern.incontinent}
                    onChange={(e) => {
                      const newIncontinent = e.target.checked;
                      const hasUrinaryAlteration = !formData.elimination.urinaryPattern.continent || formData.elimination.urinaryPattern.incontinent || formData.elimination.urinaryPattern.urinaryCatheter;
                      const hasIntestinalAlteration = !formData.elimination.intestinalPattern.continent || newIncontinent || formData.elimination.intestinalPattern.ostomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          intestinalPattern: { ...formData.elimination.intestinalPattern, incontinent: newIncontinent },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="intest-incontinent">Incontinente</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="intest-ostomies"
                    checked={formData.elimination.intestinalPattern.ostomies}
                    onChange={(e) => {
                      const newOstomies = e.target.checked;
                      const hasUrinaryAlteration = !formData.elimination.urinaryPattern.continent || formData.elimination.urinaryPattern.incontinent || formData.elimination.urinaryPattern.urinaryCatheter;
                      const hasIntestinalAlteration = !formData.elimination.intestinalPattern.continent || formData.elimination.intestinalPattern.incontinent || newOstomies;
                      setFormData({
                        ...formData,
                        elimination: {
                          ...formData.elimination,
                          intestinalPattern: { ...formData.elimination.intestinalPattern, ostomies: newOstomies },
                          noAlteration: !hasUrinaryAlteration && !hasIntestinalAlteration
                        }
                      });
                    }}
                  />
                  <label htmlFor="intest-ostomies">Ostomías</label>
                </div>
              </div>
              <div className="form-group inline" style={{ marginTop: '10px' }}>
                <label>Otros:</label>
                <input
                  type="text"
                  value={formData.elimination.intestinalPattern.other}
                  onChange={(e) => setFormData({
                    ...formData,
                    elimination: {
                      ...formData.elimination,
                      intestinalPattern: { ...formData.elimination.intestinalPattern, other: e.target.value }
                    }
                  })}
                  style={{ width: '200px' }}
                />
              </div>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.elimination.observations}
              onChange={(e) => setFormData({
                ...formData,
                elimination: { ...formData.elimination, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 4. NECESIDAD DE MOVILIZACIÓN */}
        <div className="form-section">
          <h3>4. NECESIDAD DE MOVILIZACIÓN</h3>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-autonomous"
                checked={formData.mobilization.autonomous}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: {
                    ...formData.mobilization,
                    autonomous: e.target.checked,
                    dependent: e.target.checked ? false : formData.mobilization.dependent,
                    needsPartialHelp: e.target.checked ? false : formData.mobilization.needsPartialHelp,
                    needsTotalHelp: e.target.checked ? false : formData.mobilization.needsTotalHelp
                  }
                })}
              />
              <label htmlFor="mob-autonomous">Autónomo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-dependent"
                checked={formData.mobilization.dependent}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, dependent: e.target.checked, autonomous: e.target.checked ? false : formData.mobilization.autonomous }
                })}
              />
              <label htmlFor="mob-dependent">Dependiente</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mob-bedridden"
                checked={formData.mobilization.bedridden}
                onChange={(e) => setFormData({
                  ...formData,
                  mobilization: { ...formData.mobilization, bedridden: e.target.checked }
                })}
              />
              <label htmlFor="mob-bedridden">Encamado</label>
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
              <label htmlFor="mob-total">Ayuda Total</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.mobilization.observations}
              onChange={(e) => setFormData({
                ...formData,
                mobilization: { ...formData.mobilization, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 5. NECESIDAD DE REPOSO Y SUEÑO */}
        <div className="form-section">
          <h3>5. NECESIDAD DE REPOSO Y SUEÑO</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Patrón de sueño habitual:</span>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-normal"
                checked={formData.restAndSleep.normalPattern}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, normalPattern: e.target.checked }
                })}
              />
              <label htmlFor="sleep-normal">Normal</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-difficulty"
                checked={formData.restAndSleep.difficulty}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, difficulty: e.target.checked }
                })}
              />
              <label htmlFor="sleep-difficulty">Dificultad</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="sleep-medication"
                checked={formData.restAndSleep.needsHelpMedication}
                onChange={(e) => setFormData({
                  ...formData,
                  restAndSleep: { ...formData.restAndSleep, needsHelpMedication: e.target.checked }
                })}
              />
              <label htmlFor="sleep-medication">Necesita ayuda/medicación</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.restAndSleep.observations}
              onChange={(e) => setFormData({
                ...formData,
                restAndSleep: { ...formData.restAndSleep, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 6. NECESIDAD DE SEGURIDAD */}
        <div className="form-section">
          <h3>6. NECESIDAD DE SEGURIDAD</h3>
          <div className="form-row">
            <div className="form-group inline">
              <label>Riesgo de caídas. Escala Downton:</label>
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
            <span style={{ fontWeight: '500', marginLeft: '20px' }}>RIESGO DE CAÍDA: MÁS DE 2 PUNTOS</span>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: '500' }}>Nivel de riesgo:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="risk-no"
                name="riskLevel"
                checked={formData.safety.riskLevel === 'no_risk'}
                onChange={() => setFormData({
                  ...formData,
                  safety: { ...formData.safety, riskLevel: 'no_risk' }
                })}
              />
              <label htmlFor="risk-no">Sin riesgo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="risk-yes"
                name="riskLevel"
                checked={formData.safety.riskLevel === 'with_risk'}
                onChange={() => setFormData({
                  ...formData,
                  safety: { ...formData.safety, riskLevel: 'with_risk' }
                })}
              />
              <label htmlFor="risk-yes">Con Riesgo</label>
            </div>
          </div>
          <div className="checkbox-group" style={{ marginTop: '10px' }}>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-vision"
                checked={formData.safety.visionAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, visionAlteration: e.target.checked }
                })}
              />
              <label htmlFor="safety-vision">Alteración de la visión</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-hearing"
                checked={formData.safety.hearingAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, hearingAlteration: e.target.checked }
                })}
              />
              <label htmlFor="safety-hearing">Alteración auditiva</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-memory"
                checked={formData.safety.memoryAlteration}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, memoryAlteration: e.target.checked }
                })}
              />
              <label htmlFor="safety-memory">Alteración de la memoria</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="safety-speech"
                checked={formData.safety.speechDifficulty}
                onChange={(e) => setFormData({
                  ...formData,
                  safety: { ...formData.safety, speechDifficulty: e.target.checked }
                })}
              />
              <label htmlFor="safety-speech">Dificultad en el habla</label>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Observaciones:</label>
            <textarea
              value={formData.safety.observations}
              onChange={(e) => setFormData({
                ...formData,
                safety: { ...formData.safety, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 7. NECESIDAD DE COMUNICACIÓN */}
        <div className="form-section">
          <h3>
            7. NECESIDAD DE COMUNICACIÓN
            {formData.communication.noAlteration && (
              <span className="no-alteration-badge" style={{ marginLeft: '15px' }}>Sin alteración observada</span>
            )}
          </h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Estado de ánimo/emocional:</span>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-calm"
                checked={formData.communication.emotionalState.calm}
                onChange={(e) => {
                  const newCalm = e.target.checked;
                  const { worried, anxious, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || apathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, calm: newCalm },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-calm">Tranquilo</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-worried"
                checked={formData.communication.emotionalState.worried}
                onChange={(e) => {
                  const newWorried = e.target.checked;
                  const { anxious, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = newWorried || anxious || sad || apathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, worried: newWorried },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-worried">Preocupado</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-anxious"
                checked={formData.communication.emotionalState.anxious}
                onChange={(e) => {
                  const newAnxious = e.target.checked;
                  const { worried, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || newAnxious || sad || apathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, anxious: newAnxious },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-anxious">Ansioso</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-sad"
                checked={formData.communication.emotionalState.sad}
                onChange={(e) => {
                  const newSad = e.target.checked;
                  const { worried, anxious, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || newSad || apathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, sad: newSad },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-sad">Triste</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-apathetic"
                checked={formData.communication.emotionalState.apathetic}
                onChange={(e) => {
                  const newApathetic = e.target.checked;
                  const { worried, anxious, sad, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || newApathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, apathetic: newApathetic },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-apathetic">Apático</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="mood-irritable"
                checked={formData.communication.emotionalState.irritable}
                onChange={(e) => {
                  const newIrritable = e.target.checked;
                  const { worried, anxious, sad, apathetic } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || apathetic || newIrritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: {
                      ...formData.communication,
                      emotionalState: { ...formData.communication.emotionalState, irritable: newIrritable },
                      noAlteration: !hasEmotionalAlteration && !hasOtherAlteration
                    }
                  });
                }}
              />
              <label htmlFor="mood-irritable">Irritable</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: '500' }}>Nivel de conciencia:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="conscious-alert"
                name="consciousnessLevel"
                checked={formData.communication.consciousnessLevel === 'alert'}
                onChange={() => {
                  const { worried, anxious, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || apathetic || irritable;
                  const hasOtherAlteration = !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: { ...formData.communication, consciousnessLevel: 'alert', noAlteration: !hasEmotionalAlteration && !hasOtherAlteration }
                  });
                }}
              />
              <label htmlFor="conscious-alert">Alerta</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="conscious-conscious"
                name="consciousnessLevel"
                checked={formData.communication.consciousnessLevel === 'conscious'}
                onChange={() => {
                  const { worried, anxious, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || apathetic || irritable;
                  const hasOtherAlteration = !formData.communication.oriented || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: { ...formData.communication, consciousnessLevel: 'conscious', noAlteration: !hasEmotionalAlteration && !hasOtherAlteration }
                  });
                }}
              />
              <label htmlFor="conscious-conscious">Consciente</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="conscious-stuporous"
                name="consciousnessLevel"
                checked={formData.communication.consciousnessLevel === 'stuporous'}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, consciousnessLevel: 'stuporous', noAlteration: false }
                })}
              />
              <label htmlFor="conscious-stuporous">Estuporoso/a</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="conscious-coma"
                name="consciousnessLevel"
                checked={formData.communication.consciousnessLevel === 'coma'}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, consciousnessLevel: 'coma', noAlteration: false }
                })}
              />
              <label htmlFor="conscious-coma">Coma</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: '500' }}>Orientado:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="oriented-yes"
                name="oriented"
                checked={formData.communication.oriented}
                onChange={() => {
                  const { worried, anxious, sad, apathetic, irritable } = formData.communication.emotionalState;
                  const hasEmotionalAlteration = worried || anxious || sad || apathetic || irritable;
                  const hasOtherAlteration = formData.communication.consciousnessLevel === 'stuporous' || formData.communication.consciousnessLevel === 'coma' || formData.communication.languageBarrier;
                  setFormData({
                    ...formData,
                    communication: { ...formData.communication, oriented: true, noAlteration: !hasEmotionalAlteration && !hasOtherAlteration }
                  });
                }}
              />
              <label htmlFor="oriented-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="oriented-no"
                name="oriented"
                checked={!formData.communication.oriented}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, oriented: false, noAlteration: false }
                })}
              />
              <label htmlFor="oriented-no">No</label>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: '500' }}>Barrera idiomática:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="lang-barrier-no"
                name="languageBarrier"
                checked={!formData.communication.languageBarrier}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, languageBarrier: false }
                })}
              />
              <label htmlFor="lang-barrier-no">No</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="lang-barrier-yes"
                name="languageBarrier"
                checked={formData.communication.languageBarrier}
                onChange={() => setFormData({
                  ...formData,
                  communication: { ...formData.communication, languageBarrier: true }
                })}
              />
              <label htmlFor="lang-barrier-yes">Sí</label>
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
            <label>Observaciones:</label>
            <textarea
              value={formData.communication.observations}
              onChange={(e) => setFormData({
                ...formData,
                communication: { ...formData.communication, observations: e.target.value }
              })}
            />
          </div>
        </div>

        {/* 8. NECESIDAD CONFORT */}
        <div className="form-section">
          <h3>8. NECESIDAD CONFORT</h3>
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
                    id="pain-type-acute"
                    checked={formData.comfort.painTypeAcute}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painTypeAcute: e.target.checked }
                    })}
                  />
                  <label htmlFor="pain-type-acute">Agudo</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="pain-type-chronic"
                    checked={formData.comfort.painTypeChronic}
                    onChange={(e) => setFormData({
                      ...formData,
                      comfort: { ...formData.comfort, painTypeChronic: e.target.checked }
                    })}
                  />
                  <label htmlFor="pain-type-chronic">Crónico</label>
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
                <label>Escala utilizada para medir la intensidad:</label>
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

        {/* 9. NECESIDAD DE APRENDIZAJE */}
        <div className="form-section">
          <h3>9. NECESIDAD DE APRENDIZAJE</h3>
          <div className="form-row">
            <span style={{ fontWeight: '500' }}>Obstáculos para aprender:</span>
            <div className="checkbox-item">
              <input
                type="radio"
                id="obstacles-yes"
                name="obstacles"
                checked={formData.learning.hasObstacles}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, hasObstacles: true }
                })}
              />
              <label htmlFor="obstacles-yes">Sí</label>
            </div>
            <div className="checkbox-item">
              <input
                type="radio"
                id="obstacles-no"
                name="obstacles"
                checked={!formData.learning.hasObstacles}
                onChange={() => setFormData({
                  ...formData,
                  learning: { ...formData.learning, hasObstacles: false }
                })}
              />
              <label htmlFor="obstacles-no">No</label>
            </div>
            {formData.learning.hasObstacles && (
              <div className="form-group inline">
                <label>¿Cuáles?</label>
                <input
                  type="text"
                  value={formData.learning.obstaclesDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    learning: { ...formData.learning, obstaclesDescription: e.target.value }
                  })}
                  style={{ width: '300px' }}
                />
              </div>
            )}
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

        {/* 10. CHECKLIST PREQUIRÚRGICO */}
        <div className="form-section">
          <h3>10. CHECKLIST PREQUIRÚRGICO</h3>
          <div className="checklist-table">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {/* Pulsera identificativa */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="bracelet-yes"
                          name="bracelet"
                          checked={formData.presurgicalChecklist.identificationBracelet === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, identificationBracelet: 'yes' }
                          })}
                        />
                        <label htmlFor="bracelet-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="bracelet-no"
                          name="bracelet"
                          checked={formData.presurgicalChecklist.identificationBracelet === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, identificationBracelet: 'no' }
                          })}
                        />
                        <label htmlFor="bracelet-no">No</label>
                      </div>
                    </div>
                    <span>Pulsera identificativa colocada</span>
                  </td>
                </tr>

                {/* Identificación del paciente verificada */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="patientid-yes"
                          name="patientid"
                          checked={formData.presurgicalChecklist.patientIdentificationVerified === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, patientIdentificationVerified: 'yes' }
                          })}
                        />
                        <label htmlFor="patientid-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="patientid-no"
                          name="patientid"
                          checked={formData.presurgicalChecklist.patientIdentificationVerified === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, patientIdentificationVerified: 'no' }
                          })}
                        />
                        <label htmlFor="patientid-no">No</label>
                      </div>
                    </div>
                    <span>Identificación del paciente verificada con dos indicadores</span>
                  </td>
                </tr>

                {/* Cirugía programada */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="scheduled-yes"
                          name="scheduled"
                          checked={formData.presurgicalChecklist.scheduledSurgery === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, scheduledSurgery: 'yes' }
                          })}
                        />
                        <label htmlFor="scheduled-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="scheduled-no"
                          name="scheduled"
                          checked={formData.presurgicalChecklist.scheduledSurgery === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, scheduledSurgery: 'no' }
                          })}
                        />
                        <label htmlFor="scheduled-no">No</label>
                      </div>
                    </div>
                    <span>Cirugía programada</span>
                  </td>
                </tr>

                {/* Consentimiento informado de anestesia */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="anesthesia-yes"
                          name="anesthesia"
                          checked={formData.presurgicalChecklist.anesthesiaConsent === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, anesthesiaConsent: 'yes' }
                          })}
                        />
                        <label htmlFor="anesthesia-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="anesthesia-no"
                          name="anesthesia"
                          checked={formData.presurgicalChecklist.anesthesiaConsent === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, anesthesiaConsent: 'no' }
                          })}
                        />
                        <label htmlFor="anesthesia-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="anesthesia-np"
                          name="anesthesia"
                          checked={formData.presurgicalChecklist.anesthesiaConsent === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, anesthesiaConsent: 'np' }
                          })}
                        />
                        <label htmlFor="anesthesia-np">NP</label>
                      </div>
                    </div>
                    <span>Consentimiento informado de anestesia correcto</span>
                  </td>
                </tr>

                {/* Consentimiento informado de cirugía */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="surgery-consent-yes"
                          name="surgeryConsent"
                          checked={formData.presurgicalChecklist.surgeryConsent === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, surgeryConsent: 'yes' }
                          })}
                        />
                        <label htmlFor="surgery-consent-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="surgery-consent-no"
                          name="surgeryConsent"
                          checked={formData.presurgicalChecklist.surgeryConsent === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, surgeryConsent: 'no' }
                          })}
                        />
                        <label htmlFor="surgery-consent-no">No</label>
                      </div>
                    </div>
                    <span>Consentimiento informado de cirugía correcto</span>
                  </td>
                </tr>

                {/* Preoperatorio realizado */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="preop-yes"
                          name="preop"
                          checked={formData.presurgicalChecklist.preoperativeCompleted === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, preoperativeCompleted: 'yes' }
                          })}
                        />
                        <label htmlFor="preop-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="preop-no"
                          name="preop"
                          checked={formData.presurgicalChecklist.preoperativeCompleted === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, preoperativeCompleted: 'no' }
                          })}
                        />
                        <label htmlFor="preop-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="preop-np"
                          name="preop"
                          checked={formData.presurgicalChecklist.preoperativeCompleted === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, preoperativeCompleted: 'np' }
                          })}
                        />
                        <label htmlFor="preop-np">NP</label>
                      </div>
                    </div>
                    <span>Preoperatorio realizado</span>
                  </td>
                </tr>

                {/* Zona quirúrgica preparada */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="surgical-area-yes"
                          name="surgicalArea"
                          checked={formData.presurgicalChecklist.surgicalAreaPrepared === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, surgicalAreaPrepared: 'yes' }
                          })}
                        />
                        <label htmlFor="surgical-area-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="surgical-area-no"
                          name="surgicalArea"
                          checked={formData.presurgicalChecklist.surgicalAreaPrepared === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, surgicalAreaPrepared: 'no' }
                          })}
                        />
                        <label htmlFor="surgical-area-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="surgical-area-np"
                          name="surgicalArea"
                          checked={formData.presurgicalChecklist.surgicalAreaPrepared === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, surgicalAreaPrepared: 'np' }
                          })}
                        />
                        <label htmlFor="surgical-area-np">NP</label>
                      </div>
                    </div>
                    <span>Zona quirúrgica preparada</span>
                  </td>
                </tr>

                {/* Retirada de objetos metálicos */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="metallic-yes"
                          name="metallic"
                          checked={formData.presurgicalChecklist.metallicObjectsRemoved === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, metallicObjectsRemoved: 'yes' }
                          })}
                        />
                        <label htmlFor="metallic-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="metallic-no"
                          name="metallic"
                          checked={formData.presurgicalChecklist.metallicObjectsRemoved === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, metallicObjectsRemoved: 'no' }
                          })}
                        />
                        <label htmlFor="metallic-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="metallic-np"
                          name="metallic"
                          checked={formData.presurgicalChecklist.metallicObjectsRemoved === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, metallicObjectsRemoved: 'np' }
                          })}
                        />
                        <label htmlFor="metallic-np">NP</label>
                      </div>
                    </div>
                    <span>Retirada de objetos metálicos</span>
                  </td>
                </tr>

                {/* Retirada de prótesis */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="prosthesis-yes"
                          name="prosthesis"
                          checked={formData.presurgicalChecklist.prosthesisRemoved === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, prosthesisRemoved: 'yes' }
                          })}
                        />
                        <label htmlFor="prosthesis-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="prosthesis-no"
                          name="prosthesis"
                          checked={formData.presurgicalChecklist.prosthesisRemoved === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, prosthesisRemoved: 'no' }
                          })}
                        />
                        <label htmlFor="prosthesis-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="prosthesis-np"
                          name="prosthesis"
                          checked={formData.presurgicalChecklist.prosthesisRemoved === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, prosthesisRemoved: 'np' }
                          })}
                        />
                        <label htmlFor="prosthesis-np">NP</label>
                      </div>
                    </div>
                    <span>Retirada de prótesis</span>
                  </td>
                </tr>

                {/* Preparación intestinal */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="intestinal-yes"
                          name="intestinal"
                          checked={formData.presurgicalChecklist.intestinalPreparation === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, intestinalPreparation: 'yes' }
                          })}
                        />
                        <label htmlFor="intestinal-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="intestinal-no"
                          name="intestinal"
                          checked={formData.presurgicalChecklist.intestinalPreparation === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, intestinalPreparation: 'no' }
                          })}
                        />
                        <label htmlFor="intestinal-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="intestinal-np"
                          name="intestinal"
                          checked={formData.presurgicalChecklist.intestinalPreparation === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, intestinalPreparation: 'np' }
                          })}
                        />
                        <label htmlFor="intestinal-np">NP</label>
                      </div>
                    </div>
                    <span>Preparación intestinal.</span>
                    {formData.presurgicalChecklist.intestinalPreparation === 'yes' && (
                      <div className="form-group inline">
                        <label>Especificar:</label>
                        <input
                          type="text"
                          value={formData.presurgicalChecklist.intestinalPreparationDetails}
                          onChange={(e) => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, intestinalPreparationDetails: e.target.value }
                          })}
                          style={{ width: '200px' }}
                        />
                      </div>
                    )}
                  </td>
                </tr>

                {/* Vía periférica canalizada */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="peripheral-yes"
                          name="peripheral"
                          checked={formData.presurgicalChecklist.peripheralLineInserted === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, peripheralLineInserted: 'yes' }
                          })}
                        />
                        <label htmlFor="peripheral-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="peripheral-no"
                          name="peripheral"
                          checked={formData.presurgicalChecklist.peripheralLineInserted === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, peripheralLineInserted: 'no' }
                          })}
                        />
                        <label htmlFor="peripheral-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="peripheral-np"
                          name="peripheral"
                          checked={formData.presurgicalChecklist.peripheralLineInserted === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, peripheralLineInserted: 'np' }
                          })}
                        />
                        <label htmlFor="peripheral-np">NP</label>
                      </div>
                    </div>
                    <span>Vía periférica canalizada</span>
                  </td>
                </tr>

                {/* Premedicación */}
                <tr>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="premed-yes"
                          name="premed"
                          checked={formData.presurgicalChecklist.premedication === 'yes'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, premedication: 'yes' }
                          })}
                        />
                        <label htmlFor="premed-yes">Sí</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="premed-no"
                          name="premed"
                          checked={formData.presurgicalChecklist.premedication === 'no'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, premedication: 'no' }
                          })}
                        />
                        <label htmlFor="premed-no">No</label>
                      </div>
                      <div className="checkbox-item">
                        <input
                          type="radio"
                          id="premed-np"
                          name="premed"
                          checked={formData.presurgicalChecklist.premedication === 'np'}
                          onChange={() => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, premedication: 'np' }
                          })}
                        />
                        <label htmlFor="premed-np">NP</label>
                      </div>
                    </div>
                    <span>Premedicación.</span>
                    {formData.presurgicalChecklist.premedication === 'yes' && (
                      <div className="form-group inline">
                        <label>Especificar:</label>
                        <input
                          type="text"
                          value={formData.presurgicalChecklist.premedicationDetails}
                          onChange={(e) => setFormData({
                            ...formData,
                            presurgicalChecklist: { ...formData.presurgicalChecklist, premedicationDetails: e.target.value }
                          })}
                          style={{ width: '200px' }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
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

export default CMAEvaluationForm;
