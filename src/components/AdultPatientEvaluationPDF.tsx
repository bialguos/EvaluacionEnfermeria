import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { AdultPatientEvaluation } from '../types/evaluation';

interface Props {
  evaluation: AdultPatientEvaluation;
}

const styles = StyleSheet.create({
  page: { fontSize: 8, padding: 20, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 6 },
  headerTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', textAlign: 'center', flex: 2 },
  headerLogo: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#2c3e50', flex: 1 },
  headerRight: { flex: 1 },
  sectionHeader: { backgroundColor: '#2c3e50', color: '#fff', padding: 4, marginBottom: 6, marginTop: 8, fontSize: 8, fontFamily: 'Helvetica-Bold' },
  sectionHeaderText: { color: '#fff', fontFamily: 'Helvetica-Bold', fontSize: 8 },
  row: { flexDirection: 'row', marginBottom: 4, gap: 8, flexWrap: 'wrap' },
  col: { flex: 1 },
  label: { fontSize: 7, color: '#555', marginBottom: 1, fontFamily: 'Helvetica-Bold' },
  value: { fontSize: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 2, minHeight: 14 },
  checkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  checkbox: { width: 8, height: 8, borderWidth: 1, borderColor: '#333', marginRight: 3 },
  checkboxChecked: { width: 8, height: 8, borderWidth: 1, borderColor: '#333', marginRight: 3, backgroundColor: '#2c3e50' },
  checkLabel: { fontSize: 7 },
  patientBox: { border: '1 solid #2c3e50', padding: 6, marginBottom: 8, borderRadius: 2 },
  patientBoxTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#2c3e50', marginBottom: 4 },
  subLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#333', marginBottom: 3 },
  textArea: { borderWidth: 1, borderColor: '#ccc', padding: 3, minHeight: 20, fontSize: 7 },
  radioItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  radioCircle: { width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#333', marginRight: 3 },
  radioCircleFilled: { width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#333', backgroundColor: '#2c3e50', marginRight: 3 },
});

const Checkbox = ({ label, checked }: { label: string; checked: boolean }) => (
  <View style={styles.checkItem}>
    <View style={checked ? styles.checkboxChecked : styles.checkbox} />
    <Text style={styles.checkLabel}>{label}</Text>
  </View>
);

const Radio = ({ label, checked }: { label: string; checked: boolean }) => (
  <View style={styles.radioItem}>
    <View style={checked ? styles.radioCircleFilled : styles.radioCircle} />
    <Text style={styles.checkLabel}>{label}</Text>
  </View>
);

const Field = ({ label, value, flex = 1 }: { label: string; value: string; flex?: number }) => (
  <View style={[styles.col, { flex }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || ' '}</Text>
  </View>
);

const AdultPatientEvaluationPDF: React.FC<Props> = ({ evaluation: e }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLogo}>MIKS</Text>
          <Text style={{ fontSize: 6, color: '#666' }}>Sistema de Información Hospitalaria</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>EVALUACIÓN DE ENFERMERÍA AL PACIENTE HOSPITALIZADO ADULTO</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>

      {/* DATOS DEL PACIENTE */}
      <View style={styles.patientBox}>
        <Text style={styles.patientBoxTitle}>DATOS DEL PACIENTE</Text>
        <View style={styles.row}>
          <Field label="Paciente" value={e.patientName} flex={3} />
          <Field label="DUE" value={e.due} flex={1} />
          <Field label="Fecha" value={e.evaluationDate} flex={1} />
          <Field label="Nº sol." value={e.solicitudeNumber} flex={1} />
        </View>
        <View style={styles.row}>
          <Field label="Motivo de Ingreso" value={e.admissionReason} flex={2} />
          <Field label="Diagnóstico médico" value={e.medicalDiagnosis} flex={2} />
          <Field label="Teléfono de familiar" value={e.familyPhone} flex={1} />
        </View>
        <View style={styles.row}>
          <Field label="Temperatura" value={e.temperatura} />
          <Field label="T.A. Sistólica" value={e.tasSistolica} />
          <Field label="T.A. Diastólica" value={e.tadDiastolica} />
          <Field label="F.C." value={e.fc} />
          <Field label="F.R." value={e.fr} />
          <Field label="SAT O2" value={e.satO2} />
        </View>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <Text style={[styles.label, { marginRight: 6, marginBottom: 0 }]}>Alergias:</Text>
          <Checkbox label="No" checked={e.noAllergies} />
          <Checkbox label="Sí" checked={e.hasAllergies} />
          <View style={[styles.col, { flex: 3 }]}>
            <Text style={styles.label}>Especificar alergias</Text>
            <Text style={styles.value}>{e.allergiesDetails || ' '}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, { flex: 1 }]}>
            <Text style={styles.label}>Antecedentes personales</Text>
            <Text style={[styles.value, { minHeight: 30 }]}>{e.personalHistory || ' '}</Text>
          </View>
          <View style={[styles.col, { flex: 1 }]}>
            <Text style={styles.label}>Medicación habitual</Text>
            <Text style={[styles.value, { minHeight: 30 }]}>{e.habitualMedication || ' '}</Text>
          </View>
        </View>
      </View>

      {/* 1. RESPIRACIÓN */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>1. NECESIDAD DE RESPIRACIÓN</Text>
      </View>
      <View style={styles.checkRow}>
        <Checkbox label="Sin alteración observada" checked={e.respiration.noAlteration} />
        <Checkbox label="Dificultad Respirar" checked={e.respiration.difficultyBreathing} />
        <Checkbox label="Taquipnea" checked={e.respiration.tachypnea} />
        <Checkbox label="Disnea" checked={e.respiration.dyspnea} />
        <Checkbox label="Bradipnea" checked={e.respiration.bradypnea} />
        <Checkbox label="Tos Productiva" checked={e.respiration.productiveCough} />
        <Checkbox label="Tos no productiva" checked={e.respiration.nonproductiveCough} />
        <Checkbox label="Oxígeno" checked={e.respiration.oxygen} />
        <Checkbox label="Inhaladores" checked={e.respiration.inhalers} />
        <Checkbox label="Aerosoles" checked={e.respiration.aerosols} />
        <Checkbox label="Traqueostomía" checked={e.respiration.tracheostomy} />
        <Checkbox label="Gafas nasales" checked={e.respiration.nasalCannula} />
        <View style={styles.checkItem}>
          <Text style={[styles.checkLabel, { marginRight: 3 }]}>Mascarilla %: </Text>
          <Text style={[styles.checkLabel, { borderBottomWidth: 1, borderBottomColor: '#333', minWidth: 30 }]}>{e.respiration.maskPercentage}</Text>
        </View>
        <Checkbox label="Ex-Fumador" checked={e.respiration.exSmoker} />
        <Checkbox label="Fumador" checked={e.respiration.smoker} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.respiration.observations || ' '}</Text>
      </View>

      {/* 2. ALIMENTACIÓN */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>2. NECESIDAD DE ALIMENTACIÓN</Text>
      </View>
      <View style={styles.checkRow}>
        <Checkbox label="Sin alteración observada" checked={e.feeding.noAlteration} />
        <Checkbox label="DA Masticar" checked={e.feeding.difficultyChewing} />
        <Checkbox label="DA Beber" checked={e.feeding.difficultyDrinking} />
        <Checkbox label="DA Tragar" checked={e.feeding.difficultySwallowing} />
        <Checkbox label="Se niega a comer" checked={e.feeding.refusesToEat} />
        <Checkbox label="Prótesis dental" checked={e.feeding.dentalProsthesis} />
        <Checkbox label="Sonda nasogástrica" checked={e.feeding.nasogastricTube} />
        <Checkbox label="Alimentación parenteral" checked={e.feeding.parenteralNutrition} />
        <Checkbox label="Ostomía" checked={e.feeding.ostomy} />
        <Checkbox label="Riesgo de aspiración" checked={e.feeding.aspirationRisk} />
        <Checkbox label="Vómitos" checked={e.feeding.vomiting} />
        <Checkbox label="Náuseas" checked={e.feeding.nausea} />
      </View>
      <View style={{ border: '1 solid #ddd', padding: 4, marginBottom: 4, backgroundColor: '#f9f9f9' }}>
        <Text style={[styles.label, { marginBottom: 4 }]}>SCREENING NUTRICIONAL</Text>
        <View style={styles.row}>
          <Field label="Peso actual (kg)" value={e.feeding.currentWeight} />
          <Field label="Talla (cm)" value={e.feeding.height} />
          <Field label="IMC (Anexo)" value={e.feeding.bmi} />
          <Field label="Peso habitual (kg)" value={e.feeding.usualWeight} />
          <Field label="% pérdida de peso" value={e.feeding.weightLossPercentage} />
        </View>
        <View style={[styles.checkRow, { alignItems: 'center' }]}>
          <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Ingesta:</Text>
          <Radio label="Normal" checked={e.feeding.intake === 'normal'} />
          <Radio label="Aprox. la mitad" checked={e.feeding.intake === 'half'} />
          <Radio label="Casi nada o absoluta" checked={e.feeding.intake === 'almost_nothing'} />
          <View style={[styles.col, { flex: 2 }]}>
            <Text style={styles.label}>Puntuación Riesgo MUST (Anexo)</Text>
            <Text style={styles.value}>{e.feeding.mustScore || ' '}</Text>
          </View>
        </View>
        <View style={[styles.row, { alignItems: 'center', marginTop: 4 }]}>
          <Checkbox label="Autónomo" checked={e.feeding.autonomous} />
          <Checkbox label="Necesita ayuda" checked={e.feeding.needsHelp} />
          <Field label="Dieta" value={e.feeding.diet} flex={2} />
          <Field label="Ingesta diaria de líquidos" value={e.feeding.dailyLiquidIntake} flex={2} />
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.feeding.observations || ' '}</Text>
      </View>

      {/* 3. ELIMINACIÓN */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>3. NECESIDAD DE ELIMINACIÓN</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.col, { flex: 1 }]}>
          <Text style={[styles.label, { marginBottom: 4 }]}>PATRÓN URINARIO</Text>
          <View style={styles.checkRow}>
            <Checkbox label="Autónomo" checked={e.elimination.urinaryPattern.autonomous} />
            <Checkbox label="Precisa ayuda" checked={e.elimination.urinaryPattern.needsHelp} />
            <Checkbox label="Continente" checked={e.elimination.urinaryPattern.continent} />
            <Checkbox label="Incontinente" checked={e.elimination.urinaryPattern.incontinent} />
            <Checkbox label="Retención" checked={e.elimination.urinaryPattern.retention} />
            <Checkbox label="Vía fisiológica" checked={e.elimination.urinaryPattern.physiological} />
            <Checkbox label="Sonda vesical" checked={e.elimination.urinaryPattern.urinaryCatheter} />
            <Checkbox label="Colector" checked={e.elimination.urinaryPattern.collector} />
            <Checkbox label="Urocolector" checked={e.elimination.urinaryPattern.urocolector} />
            <Checkbox label="Diálisis" checked={e.elimination.urinaryPattern.dialysis} />
          </View>
        </View>
        <View style={[styles.col, { flex: 1 }]}>
          <Text style={[styles.label, { marginBottom: 4 }]}>PATRÓN INTESTINAL</Text>
          <View style={styles.checkRow}>
            <Checkbox label="Autónomo" checked={e.elimination.intestinalPattern.autonomous} />
            <Checkbox label="Precisa ayuda" checked={e.elimination.intestinalPattern.needsHelp} />
            <Checkbox label="Continente" checked={e.elimination.intestinalPattern.continent} />
            <Checkbox label="Incontinente" checked={e.elimination.intestinalPattern.incontinent} />
            <Checkbox label="Retención" checked={e.elimination.intestinalPattern.retention} />
            <Checkbox label="Vía fisiológica" checked={e.elimination.intestinalPattern.physiological} />
            <Checkbox label="Ostomía" checked={e.elimination.intestinalPattern.ostomy} />
            <Checkbox label="Diarrea" checked={e.elimination.intestinalPattern.diarrhea} />
            <Checkbox label="Estreñimiento" checked={e.elimination.intestinalPattern.constipation} />
            <Checkbox label="Laxantes" checked={e.elimination.intestinalPattern.laxatives} />
            <View style={styles.checkItem}>
              <Text style={[styles.checkLabel, { marginRight: 3 }]}>Cuáles: </Text>
              <Text style={[styles.checkLabel, { borderBottomWidth: 1, borderBottomColor: '#333', minWidth: 60 }]}>{e.elimination.intestinalPattern.laxativesDetails}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>¿Cuándo fue la última deposición?</Text>
        <Text style={styles.value}>{e.elimination.lastBowelMovement || ' '}</Text>
      </View>

      {/* 4. MOVILIZACIÓN */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>4. NECESIDAD DE MOVILIZACIÓN</Text>
      </View>
      <View style={styles.checkRow}>
        <Checkbox label="Autónomo" checked={e.mobilization.autonomous} />
        <Checkbox label="Dependiente" checked={e.mobilization.dependent} />
        <Checkbox label="Encamado" checked={e.mobilization.bedridden} />
        <Checkbox label="Ayuda parcial" checked={e.mobilization.needsPartialHelp} />
        <Checkbox label="Ayuda total" checked={e.mobilization.needsTotalHelp} />
        <Checkbox label="Camina sólo" checked={e.mobilization.walksAlone} />
        <Checkbox label="Camina con ayuda" checked={e.mobilization.walksWithHelp} />
        <Checkbox label="Se mantiene sentado" checked={e.mobilization.remainsSeated} />
        <Checkbox label="Se viste sólo" checked={e.mobilization.dressesSelf} />
        <Checkbox label="Necesita ayuda para vestirse" checked={e.mobilization.needsHelpDressing} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.mobilization.observations || ' '}</Text>
      </View>

      {/* 5. REPOSO Y SUEÑO */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>5. NECESIDAD DE REPOSO Y SUEÑO</Text>
      </View>
      <View style={styles.checkRow}>
        <Checkbox label="Patrón de sueño normal" checked={e.restAndSleep.normalSleepPattern} />
        <Checkbox label="Dificultad para dormir" checked={e.restAndSleep.difficultySleeping} />
        <Checkbox label="Necesita ayuda/medicación" checked={e.restAndSleep.needsHelpMedication} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.restAndSleep.observations || ' '}</Text>
      </View>

      {/* 6. HIGIENE CORPORAL */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>6. NECESIDAD DE HIGIENE CORPORAL. INTEGRIDAD DE LA PIEL</Text>
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Estado de la piel:</Text>
        <Checkbox label="Íntegra" checked={e.skinHygiene.skinIntact} />
        <Checkbox label="Deshidratada" checked={e.skinHygiene.skinDehydrated} />
        <Checkbox label="Hidratada" checked={e.skinHygiene.skinHydrated} />
        <Checkbox label="Limpia" checked={e.skinHygiene.skinClean} />
        <Checkbox label="Sucia" checked={e.skinHygiene.skinDirty} />
      </View>
      <View style={styles.row}>
        <Field label="Heridas: Localización" value={e.skinHygiene.woundLocation} flex={2} />
        <Field label="Riesgo U.P.P. BRADEM (Anexo)" value={e.skinHygiene.bradenScore} flex={1} />
        <View style={[styles.col, { flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 12 }]}>
          <Checkbox label="Alto" checked={e.skinHygiene.riskHigh} />
          <Checkbox label="Moderado" checked={e.skinHygiene.riskModerate} />
          <Checkbox label="Bajo" checked={e.skinHygiene.riskLow} />
        </View>
      </View>
      <View style={styles.row}>
        <Field label="Úlceras por presión: Estado" value={e.skinHygiene.pressureUlcersState} />
        <Field label="Localización" value={e.skinHygiene.pressureUlcersLocation} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Edemas:</Text>
        <Checkbox label="Sí" checked={e.skinHygiene.edemas} />
        <Checkbox label="No" checked={e.skinHygiene.noEdemas} />
        <Text style={[styles.label, { marginLeft: 10, marginRight: 4, marginBottom: 0 }]}>Higiene bucal:</Text>
        <Checkbox label="Adecuada" checked={e.skinHygiene.oralHygieneAdequate} />
        <Checkbox label="Inadecuada" checked={e.skinHygiene.oralHygieneInadequate} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Medidas preventivas:</Text>
        <Checkbox label="No precisa" checked={e.skinHygiene.preventiveMeasuresNone} />
        <Checkbox label="Cambios posturales" checked={e.skinHygiene.preventiveMeasuresPositionalChanges} />
        <Checkbox label="Protectores" checked={e.skinHygiene.preventiveMeasuresProtectors} />
        <Checkbox label="Colchón anti escaras" checked={e.skinHygiene.preventiveMeasuresMattress} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.skinHygiene.observations || ' '}</Text>
      </View>

      {/* 7. SEGURIDAD */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>7. NECESIDAD DE SEGURIDAD</Text>
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Riesgo de infección:</Text>
        <Checkbox label="Sí" checked={e.safety.infectionRisk} />
        <Checkbox label="No" checked={e.safety.noInfectionRisk} />
        <Checkbox label="Drenaje" checked={e.safety.drainage} />
        <Checkbox label="Sonda vesical" checked={e.safety.urinaryCatheter} />
        <Checkbox label="Vía central" checked={e.safety.centralLine} />
      </View>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <Field label="Riesgo de caídas. Puntuación Downton (Anexo)" value={e.safety.downtownScore} flex={2} />
        <View style={[styles.col, { flex: 2, flexDirection: 'row', paddingTop: 12 }]}>
          <Checkbox label="Precisa restricción física" checked={e.safety.physicalRestraint} />
          <Checkbox label="Barandillas cama" checked={e.safety.bedRails} />
        </View>
      </View>
      <View style={styles.row}>
        <Field label="Sonda vesical: Tipo" value={e.safety.urinaryCatheterType} />
        <Field label="Fecha de colocación" value={e.safety.urinaryCatheterDate} />
        <Field label="Vía venosa: Tipo" value={e.safety.venousLineType} />
        <Field label="Fecha de colocación" value={e.safety.venousLineDate} />
      </View>
      <View style={styles.row}>
        <Field label="Drenajes: Tipo" value={e.safety.drainageType} />
        <Field label="Fecha de colocación" value={e.safety.drainageDate} />
        <View style={[styles.col, { flex: 2, flexDirection: 'row', alignItems: 'center', paddingTop: 12 }]}>
          <Checkbox label="Riesgo de autolesión" checked={e.safety.selfInjuryRisk} />
          <Checkbox label="Tóxicos" checked={e.safety.toxics} />
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.safety.observations || ' '}</Text>
      </View>

      {/* 8. COMUNICACIÓN */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>8. NECESIDAD DE COMUNICACIÓN</Text>
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Checkbox label="Sin alteración observada" checked={e.communication.noAlteration} />
        <Text style={[styles.label, { marginLeft: 8, marginRight: 4, marginBottom: 0 }]}>Orientación:</Text>
        <Checkbox label="Orientado" checked={e.communication.oriented} />
        <Checkbox label="Desorientado" checked={e.communication.disoriented} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Nivel de conciencia:</Text>
        <Radio label="Consciente" checked={e.communication.consciousnessLevel === 'conscious'} />
        <Radio label="Somnoliento" checked={e.communication.consciousnessLevel === 'drowsy'} />
        <Radio label="Obnubilado" checked={e.communication.consciousnessLevel === 'clouded'} />
        <Radio label="Estuporoso" checked={e.communication.consciousnessLevel === 'stuporous'} />
        <Radio label="Comatoso" checked={e.communication.consciousnessLevel === 'comatose'} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Alteración:</Text>
        <Checkbox label="Alteración de la visión" checked={e.communication.visionAlteration} />
        <Checkbox label="Alteración de la audición" checked={e.communication.hearingAlteration} />
        <Checkbox label="Dificultad para el habla" checked={e.communication.speechDifficulty} />
      </View>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Barrera idiomática:</Text>
        <Checkbox label="No" checked={!e.communication.languageBarrier} />
        <Checkbox label="Sí" checked={e.communication.languageBarrier} />
        <Field label="Idioma" value={e.communication.language} flex={3} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.communication.observations || ' '}</Text>
      </View>

      {/* 9. CREENCIAS Y VALORES */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>9. NECESIDAD DE CREENCIAS Y VALORES</Text>
      </View>
      <View style={[styles.row, { marginBottom: 4 }]}>
        <View style={[styles.col, { flex: 2 }]}>
          <Text style={styles.label}>¿Tiene alguna creencia religiosa o cultural que le gustaría que tuviésemos en cuenta durante su estancia?</Text>
          <View style={[styles.checkRow, { marginTop: 3 }]}>
            <Radio label="Sí" checked={e.beliefsAndValues.hasReligiousCulturalBeliefs} />
            <Radio label="No" checked={!e.beliefsAndValues.hasReligiousCulturalBeliefs} />
          </View>
        </View>
        <View style={[styles.col, { flex: 1 }]}>
          <Text style={styles.label}>Voluntades anticipadas</Text>
          <View style={[styles.checkRow, { marginTop: 3 }]}>
            <Radio label="Sí" checked={e.beliefsAndValues.advanceDirectives} />
            <Radio label="No" checked={!e.beliefsAndValues.advanceDirectives} />
          </View>
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones a destacar</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.beliefsAndValues.observations || ' '}</Text>
      </View>

      {/* 10. TRABAJO Y OCIO */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>10. NECESIDAD DE TRABAJO Y OCIO</Text>
      </View>
      <View style={styles.checkRow}>
        <Checkbox label="Activo/trabaja" checked={e.workAndLeisure.active} />
        <Checkbox label="Invalidez" checked={e.workAndLeisure.disability} />
        <Checkbox label="Jubilado" checked={e.workAndLeisure.retired} />
        <Checkbox label="Estudiante" checked={e.workAndLeisure.student} />
        <Checkbox label="Ama de casa" checked={e.workAndLeisure.homemaker} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Actividades de ocio:</Text>
        <Checkbox label="Deporte" checked={e.workAndLeisure.leisureSport} />
        <Checkbox label="Lectura" checked={e.workAndLeisure.leisureReading} />
        <Checkbox label="Música" checked={e.workAndLeisure.leisureMusic} />
        <Checkbox label="TV" checked={e.workAndLeisure.leisureTV} />
        <Checkbox label="Otros" checked={e.workAndLeisure.leisureOthers} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.workAndLeisure.observations || ' '}</Text>
      </View>

      {/* 11. CONFORT */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>11. NECESIDAD CONFORT</Text>
      </View>
      <View style={[styles.row, { alignItems: 'center', marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Dolor:</Text>
        <Checkbox label="Sí" checked={e.comfort.hasPain} />
        <Checkbox label="No" checked={e.comfort.noPain} />
        <Field label="Localización" value={e.comfort.painLocation} flex={3} />
      </View>
      <View style={[styles.row, { alignItems: 'center' }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Tipo:</Text>
        <Checkbox label="Agudo" checked={e.comfort.painTypeAcute} />
        <Checkbox label="Crónico" checked={e.comfort.painTypeChronic} />
        <Checkbox label="Con el movimiento" checked={e.comfort.painWithMovement} />
        <Field label="Intensidad del dolor" value={e.comfort.painIntensity} flex={2} />
        <Field label="Escala (Anexo)" value={e.comfort.painScale} flex={2} />
      </View>

      {/* 12. APRENDIZAJE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>12. NECESIDAD DE APRENDIZAJE</Text>
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>¿Cómo vive su estado de salud?</Text>
        <Radio label="Tranquilidad" checked={e.learning.healthStatus === 'tranquility'} />
        <Radio label="Preocupación" checked={e.learning.healthStatus === 'worry'} />
        <Radio label="Angustia" checked={e.learning.healthStatus === 'anguish'} />
        <Radio label="Temor" checked={e.learning.healthStatus === 'fear'} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Tiene información y educación para mejorar su salud:</Text>
        <Radio label="Sí" checked={e.learning.hasInformation} />
        <Radio label="No" checked={!e.learning.hasInformation} />
        {e.learning.hasInformation && (
          <>
            <Text style={[styles.label, { marginLeft: 6, marginRight: 4, marginBottom: 0 }]}>Dirigida a:</Text>
            <Checkbox label="Paciente" checked={e.learning.informationTargetPatient} />
            <Checkbox label="Familia" checked={e.learning.informationTargetFamily} />
            <Checkbox label="Cuidador" checked={e.learning.informationTargetCaregiver} />
          </>
        )}
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Obstáculos para aprender:</Text>
        <Radio label="Sí" checked={e.learning.hasObstacles} />
        <Radio label="No" checked={!e.learning.hasObstacles} />
        {e.learning.hasObstacles && (
          <>
            <Checkbox label="Pérdida de memoria" checked={e.learning.obstacleMemoryLoss} />
            <Checkbox label="No sabe leer o escribir" checked={e.learning.obstacleIlliterate} />
            <Checkbox label="Nivel educativo bajo" checked={e.learning.obstacleLowEducation} />
            <Checkbox label="Otros" checked={e.learning.obstacleOthers} />
          </>
        )}
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Grado de conocimiento (1=Ninguno; 5=Extenso):</Text>
        {[1, 2, 3, 4, 5].map(n => <Radio key={n} label={String(n)} checked={e.learning.knowledgeLevel === n} />)}
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={[styles.value, { minHeight: 16 }]}>{e.learning.observations || ' '}</Text>
      </View>

      {/* 13. VALORACIÓN PSICO SOCIAL */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>13. VALORACIÓN PSICO SOCIAL</Text>
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Estado de ánimo/emocional:</Text>
        <Checkbox label="Tranquilo" checked={e.psychosocial.calm} />
        <Checkbox label="Preocupado" checked={e.psychosocial.worried} />
        <Checkbox label="Ansioso" checked={e.psychosocial.anxious} />
        <Checkbox label="Triste" checked={e.psychosocial.sad} />
        <Checkbox label="Apático" checked={e.psychosocial.apathetic} />
        <Checkbox label="Irritable" checked={e.psychosocial.irritable} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Vive sólo:</Text>
        <Radio label="Sí" checked={e.psychosocial.livesAlone} />
        <Radio label="No" checked={!e.psychosocial.livesAlone} />
        <Text style={[styles.label, { marginLeft: 8, marginRight: 4, marginBottom: 0 }]}>Tiene apoyo familiar:</Text>
        <Radio label="Sí" checked={e.psychosocial.familySupport} />
        <Radio label="No" checked={!e.psychosocial.familySupport} />
        <Checkbox label="Tiene cuidador personal, no familiar" checked={e.psychosocial.personalCaregiver} />
      </View>
      <View style={[styles.checkRow, { marginBottom: 4 }]}>
        <Text style={[styles.label, { marginRight: 4, marginBottom: 0 }]}>Tiene cuidador apoyo/nocturno:</Text>
        <Radio label="Sí" checked={e.psychosocial.nightCaregiver} />
        <Radio label="No" checked={!e.psychosocial.nightCaregiver} />
        <Checkbox label="Tiene domicilio estable" checked={e.psychosocial.stableHome} />
        <Checkbox label="Vive en residencia" checked={e.psychosocial.inResidence} />
        <Checkbox label="Sin recursos" checked={e.psychosocial.noResources} />
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Observaciones (En caso de detectar problemas para planificar el alta indicar aquí)</Text>
        <Text style={[styles.value, { minHeight: 20 }]}>{e.psychosocial.observations || ' '}</Text>
      </View>

      {/* COMENTARIOS ADICIONALES */}
      <View style={{ border: '2 solid #2c3e50', padding: 6, marginTop: 10, borderRadius: 2 }}>
        <Text style={[styles.label, { color: '#2c3e50', fontSize: 8, marginBottom: 4 }]}>
          ¿DESEA AÑADIR ALGO QUE NO SE HAYA HABLADO Y CONSIDERE IMPORTANTE?
        </Text>
        <Text style={[styles.value, { minHeight: 40 }]}>{e.additionalComments || ' '}</Text>
      </View>
    </Page>
  </Document>
);

export default AdultPatientEvaluationPDF;
