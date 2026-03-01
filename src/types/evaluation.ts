// Tipos para las Evaluaciones de Enfermería

export type EvaluationType = 'surgical_short' | 'cma' | 'adult_patient';

export interface BaseEvaluation {
  id: string;
  date: string;
  evaluationType: EvaluationType;
  evaluationName: string;
  nurse: string;
  patientName: string;
}

// Evaluación de Enfermería al Paciente Quirúrgico de Corta Estancia
export interface SurgicalShortEvaluation extends BaseEvaluation {
  evaluationType: 'surgical_short';

  // Patient information (preloaded, readonly)
  patientAddress: string;
  patientNIS: string;
  patientPhone: string;
  patientDateOfBirth: string;
  nurseCollegiateNumber: string;

  // Evaluation metadata (preloaded)
  evaluationDate: string;
  evaluationTime: string;

  // Vital constants (preloaded from last registered values)
  temperature: string;
  viaAnular: string;
  tasSistolica: string;
  tadDiastolica: string;
  fc: string;
  fr: string;
  satO2: string;
  aireAmb: string;

  // Intervención y lateralidad
  intervencion: string;
  lateralidad: string;

  // Allergies
  hasAllergies: boolean;
  allergiesDetails: string;

  // Personal history
  personalHistory: string;

  // Habitual medication
  habitualMedication: string;

  // Signature fields
  signedBy: string;
  reportDate: string;
  reportTime: string;

  // Necesidad de Respiración
  respiration: {
    noAlteration: boolean;
    difficultyBreathing: boolean;
    tachypnea: boolean;
    dyspnea: boolean;
    bradypnea: boolean;
    observations: string;
  };

  // Necesidad de Alimentación
  feeding: {
    noAlteration: boolean;
    difficultyChewing: boolean;
    difficultyDrinking: boolean;
    difficultySwallowing: boolean;
    refusesToEat: boolean;
    dentalProsthesis: boolean;
    nasogastricTube: boolean;
    parenteralNutrition: boolean;
    ostomy: boolean;
    aspirationRisk: boolean;
    vomiting: boolean;
    nausea: boolean;
    // Screening nutricional
    currentWeight: string;
    height: string;
    bmi: string;
    usualWeight: string;
    weightLossPercentage: string;
    intake: 'normal' | 'half' | 'almost_nothing';
    mustScore: string;
    autonomous: boolean;
    needsHelp: boolean;
    diet: string;
    dailyLiquidIntake: string;
    observations: string;
  };

  // Necesidad de Eliminación
  elimination: {
    urinaryPattern: {
      autonomous: boolean;
      needsHelp: boolean;
      physiological: boolean;
      urinaryCatheter: boolean;
    };
    intestinalPattern: {
      autonomous: boolean;
      needsHelp: boolean;
      physiological: boolean;
      ostomy: boolean;
    };
  };

  // Necesidad de Movilización
  mobilization: {
    autonomous: boolean;
    dependent: boolean;
    bedridden: boolean;
    needsPartialHelp: boolean;
    needsTotalHelp: boolean;
    observations: string;
  };

  // Necesidad de Reposo y Sueño
  restAndSleep: {
    normalSleepPattern: boolean;
    difficultySleeping: boolean;
    needsHelpMedication: boolean;
    observations: string;
  };

  // Necesidad de Seguridad
  safety: {
    infectionRisk: boolean;
    noInfectionRisk: boolean;
    drainage: boolean;
    urinaryCatheter: boolean;
    centralLine: boolean;
    fallRiskScore: string;
    protectionProtocol: boolean;
    observations: string;
  };

  // Necesidad de Comunicación
  communication: {
    noAlteration: boolean;
    visionAlteration: boolean;
    hearingAlteration: boolean;
    speechDifficulty: boolean;
    languageBarrier: boolean;
    language: string;
    observations: string;
  };

  // Necesidad de Creencias y Valores
  beliefsAndValues: {
    hasReligiousCulturalBeliefs: boolean;
    advanceDirectives: boolean;
    observations: string;
  };

  // Necesidad de Confort
  comfort: {
    hasPain: boolean;
    painLocation: string;
    painTypeAcute: boolean;
    painTypeChronic: boolean;
    painWithMovement: boolean;
    painIntensity: string;
    painScale: string;
  };

  // Necesidad de Aprendizaje
  learning: {
    healthStatus: 'tranquility' | 'worry' | 'anguish' | 'fear';
    knowledgeLevel: number; // 1-5
    observations: string;
  };

  // Valoración Psicosocial
  psychosocial: {
    calm: boolean;
    worried: boolean;
    anxious: boolean;
    sad: boolean;
    apathetic: boolean;
    irritable: boolean;
  };

  // Comentarios adicionales
  additionalComments: string;
}

// Evaluación de Enfermería Cirugía Mayor Ambulatoria (CMA)
export interface CMAEvaluation extends BaseEvaluation {
  evaluationType: 'cma';

  // Datos del Registro
  registrationDate: string;    // Fecha
  collegiateNumber: string;    // Nº Col.
  intervencion: string;        // Intervención
  lateralidad: string;         // Lateralidad
  noAllergies: boolean;        // Alergias: No
  hasAllergies: boolean;       // Alergias: Si
  allergiesDetails: string;    // Especificar alergias
  patientAccompanied: boolean; // El paciente viene acompañado

  // Signos vitales
  tasSistolica: string;
  tadDiastolica: string;
  satO2: string;
  temperatura: string;
  glucemia: string;
  fc: string;
  fr: string;

  // Medicación habitual
  habitualMedication: string;

  // 1. Necesidad de Respiración
  respiration: {
    noAlteration: boolean;
    dyspnea: boolean;
    tachypnea: boolean;
    bradypnea: boolean;
    retractions: boolean; // Tiraje
    difficultyBreathing: boolean;
    observations: string;
  };

  // 2. Necesidad de Alimentación
  feeding: {
    fasting: boolean;
    lastIntakeTime: string;
    observations: string;
  };

  // 3. Necesidad de Eliminación
  elimination: {
    noAlteration: boolean;
    urinaryPattern: {
      continent: boolean;
      incontinent: boolean;
      urinaryCatheter: boolean;
      other: string;
    };
    intestinalPattern: {
      continent: boolean;
      incontinent: boolean;
      ostomies: boolean;
      other: string;
    };
    observations: string;
  };

  // 4. Necesidad de Movilización
  mobilization: {
    autonomous: boolean;
    dependent: boolean;
    bedridden: boolean;
    needsPartialHelp: boolean;
    needsTotalHelp: boolean;
    observations: string;
  };

  // 5. Necesidad de Reposo y Sueño
  restAndSleep: {
    normalPattern: boolean;
    difficulty: boolean;
    needsHelpMedication: boolean;
    observations: string;
  };

  // 6. Necesidad de Seguridad
  safety: {
    fallRiskScore: string;
    riskLevel: 'no_risk' | 'with_risk';
    visionAlteration: boolean;
    hearingAlteration: boolean;
    memoryAlteration: boolean;
    speechDifficulty: boolean;
    observations: string;
  };

  // 7. Necesidad de Comunicación
  communication: {
    noAlteration: boolean;
    emotionalState: {
      calm: boolean;
      worried: boolean;
      anxious: boolean;
      sad: boolean;
      apathetic: boolean;
      irritable: boolean;
    };
    consciousnessLevel: 'alert' | 'conscious' | 'stuporous' | 'coma';
    oriented: boolean;
    languageBarrier: boolean;
    language: string;
    observations: string;
  };

  // 8. Necesidad de Confort
  comfort: {
    hasPain: boolean;
    painLocation: string;
    painTypeAcute: boolean;
    painTypeChronic: boolean;
    painWithMovement: boolean;
    painIntensity: string;
    painScale: string;
  };

  // 9. Necesidad de Aprendizaje
  learning: {
    hasObstacles: boolean;
    obstaclesDescription: string;
    knowledgeLevel: number; // 1-5
    observations: string;
  };

  // 10. Checklist Prequirúrgico
  presurgicalChecklist: {
    identificationBracelet: 'yes' | 'no';
    patientIdentificationVerified: 'yes' | 'no';
    scheduledSurgery: 'yes' | 'no';
    anesthesiaConsent: 'yes' | 'no' | 'np';
    surgeryConsent: 'yes' | 'no';
    preoperativeCompleted: 'yes' | 'no' | 'np';
    surgicalAreaPrepared: 'yes' | 'no' | 'np';
    metallicObjectsRemoved: 'yes' | 'no' | 'np';
    prosthesisRemoved: 'yes' | 'no' | 'np';
    intestinalPreparation: 'yes' | 'no' | 'np';
    intestinalPreparationDetails: string;
    peripheralLineInserted: 'yes' | 'no' | 'np';
    premedication: 'yes' | 'no' | 'np';
    premedicationDetails: string;
  };
}

// Evaluación de Enfermería al Paciente Hospitalizado Adulto
export interface AdultPatientEvaluation extends BaseEvaluation {
  evaluationType: 'adult_patient';

  // Datos del registro
  due: string;
  evaluationDate: string;
  solicitudeNumber: string;
  admissionReason: string;
  medicalDiagnosis: string;
  familyPhone: string;

  // Signos vitales
  temperatura: string;
  tasSistolica: string;
  tadDiastolica: string;
  fc: string;
  fr: string;
  satO2: string;

  // Alergias
  noAllergies: boolean;
  hasAllergies: boolean;
  allergiesDetails: string;

  // Antecedentes y medicación
  personalHistory: string;
  habitualMedication: string;

  // 1. Necesidad de Respiración
  respiration: {
    noAlteration: boolean;
    difficultyBreathing: boolean;
    tachypnea: boolean;
    dyspnea: boolean;
    bradypnea: boolean;
    productiveCough: boolean;
    nonproductiveCough: boolean;
    oxygen: boolean;
    inhalers: boolean;
    aerosols: boolean;
    tracheostomy: boolean;
    nasalCannula: boolean;
    maskPercentage: string;
    exSmoker: boolean;
    smoker: boolean;
    observations: string;
  };

  // 2. Necesidad de Alimentación
  feeding: {
    noAlteration: boolean;
    difficultyChewing: boolean;
    difficultyDrinking: boolean;
    difficultySwallowing: boolean;
    refusesToEat: boolean;
    dentalProsthesis: boolean;
    nasogastricTube: boolean;
    parenteralNutrition: boolean;
    ostomy: boolean;
    aspirationRisk: boolean;
    vomiting: boolean;
    nausea: boolean;
    currentWeight: string;
    height: string;
    bmi: string;
    usualWeight: string;
    weightLossPercentage: string;
    intake: 'normal' | 'half' | 'almost_nothing';
    mustScore: string;
    autonomous: boolean;
    needsHelp: boolean;
    diet: string;
    dailyLiquidIntake: string;
    observations: string;
  };

  // 3. Necesidad de Eliminación
  elimination: {
    urinaryPattern: {
      autonomous: boolean;
      needsHelp: boolean;
      continent: boolean;
      incontinent: boolean;
      retention: boolean;
      physiological: boolean;
      urinaryCatheter: boolean;
      collector: boolean;
      urocolector: boolean;
      dialysis: boolean;
    };
    intestinalPattern: {
      autonomous: boolean;
      needsHelp: boolean;
      continent: boolean;
      incontinent: boolean;
      retention: boolean;
      physiological: boolean;
      ostomy: boolean;
      diarrhea: boolean;
      constipation: boolean;
      laxatives: boolean;
      laxativesDetails: string;
    };
    lastBowelMovement: string;
  };

  // 4. Necesidad de Movilización
  mobilization: {
    autonomous: boolean;
    dependent: boolean;
    bedridden: boolean;
    needsPartialHelp: boolean;
    needsTotalHelp: boolean;
    walksAlone: boolean;
    walksWithHelp: boolean;
    remainsSeated: boolean;
    dressesSelf: boolean;
    needsHelpDressing: boolean;
    observations: string;
  };

  // 5. Necesidad de Reposo y Sueño
  restAndSleep: {
    normalSleepPattern: boolean;
    difficultySleeping: boolean;
    needsHelpMedication: boolean;
    observations: string;
  };

  // 6. Necesidad de Higiene Corporal. Integridad de la Piel
  skinHygiene: {
    skinIntact: boolean;
    skinDehydrated: boolean;
    skinHydrated: boolean;
    skinClean: boolean;
    skinDirty: boolean;
    woundLocation: string;
    bradenScore: string;
    riskHigh: boolean;
    riskModerate: boolean;
    riskLow: boolean;
    pressureUlcersState: string;
    pressureUlcersLocation: string;
    edemas: boolean;
    noEdemas: boolean;
    oralHygieneAdequate: boolean;
    oralHygieneInadequate: boolean;
    preventiveMeasuresNone: boolean;
    preventiveMeasuresPositionalChanges: boolean;
    preventiveMeasuresProtectors: boolean;
    preventiveMeasuresMattress: boolean;
    observations: string;
  };

  // 7. Necesidad de Seguridad
  safety: {
    infectionRisk: boolean;
    noInfectionRisk: boolean;
    drainage: boolean;
    urinaryCatheter: boolean;
    centralLine: boolean;
    downtownScore: string;
    physicalRestraint: boolean;
    bedRails: boolean;
    urinaryCatheterType: string;
    urinaryCatheterDate: string;
    venousLineType: string;
    venousLineDate: string;
    drainageType: string;
    drainageDate: string;
    selfInjuryRisk: boolean;
    toxics: boolean;
    observations: string;
  };

  // 8. Necesidad de Comunicación
  communication: {
    noAlteration: boolean;
    oriented: boolean;
    disoriented: boolean;
    consciousnessLevel: 'conscious' | 'drowsy' | 'clouded' | 'stuporous' | 'comatose';
    visionAlteration: boolean;
    hearingAlteration: boolean;
    speechDifficulty: boolean;
    languageBarrier: boolean;
    language: string;
    observations: string;
  };

  // 9. Necesidad de Creencias y Valores
  beliefsAndValues: {
    hasReligiousCulturalBeliefs: boolean;
    advanceDirectives: boolean;
    observations: string;
  };

  // 10. Necesidad de Trabajo y Ocio
  workAndLeisure: {
    active: boolean;
    disability: boolean;
    retired: boolean;
    student: boolean;
    homemaker: boolean;
    leisureSport: boolean;
    leisureReading: boolean;
    leisureMusic: boolean;
    leisureTV: boolean;
    leisureOthers: boolean;
    observations: string;
  };

  // 11. Necesidad de Confort
  comfort: {
    hasPain: boolean;
    noPain: boolean;
    painLocation: string;
    painTypeAcute: boolean;
    painTypeChronic: boolean;
    painWithMovement: boolean;
    painIntensity: string;
    painScale: string;
  };

  // 12. Necesidad de Aprendizaje
  learning: {
    healthStatus: 'tranquility' | 'worry' | 'anguish' | 'fear';
    hasInformation: boolean;
    informationTargetPatient: boolean;
    informationTargetFamily: boolean;
    informationTargetCaregiver: boolean;
    hasObstacles: boolean;
    obstacleMemoryLoss: boolean;
    obstacleIlliterate: boolean;
    obstacleLowEducation: boolean;
    obstacleOthers: boolean;
    knowledgeLevel: number;
    observations: string;
  };

  // 13. Valoración Psico Social
  psychosocial: {
    calm: boolean;
    worried: boolean;
    anxious: boolean;
    sad: boolean;
    apathetic: boolean;
    irritable: boolean;
    livesAlone: boolean;
    familySupport: boolean;
    personalCaregiver: boolean;
    nightCaregiver: boolean;
    stableHome: boolean;
    inResidence: boolean;
    noResources: boolean;
    observations: string;
  };

  // Comentarios adicionales
  additionalComments: string;
}

export type NursingEvaluation = SurgicalShortEvaluation | CMAEvaluation | AdultPatientEvaluation;

export const evaluationTypes: { type: EvaluationType; name: string; description: string }[] = [
  {
    type: 'surgical_short',
    name: 'Evaluación al Paciente Quirúrgico de Corta Estancia',
    description: 'Evaluación completa para pacientes quirúrgicos de corta estancia hospitalaria',
  },
  {
    type: 'cma',
    name: 'Evaluación de Enfermería Cirugía Mayor Ambulatoria',
    description: 'Evaluación para pacientes de Cirugía Mayor Ambulatoria (CMA)',
  },
  {
    type: 'adult_patient',
    name: 'Evaluación al Paciente Hospitalizado Adulto',
    description: 'Evaluación de enfermería completa para pacientes hospitalizados adultos',
  },
];
