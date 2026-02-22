import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { SurgicalShortEvaluation } from '../types/evaluation';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    borderBottomStyle: 'solid',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    flex: 1,
    paddingTop: 2,
  },
  pageIndicator: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    marginTop: 3,
  },
  dateText: {
    fontSize: 7,
    color: '#666',
  },
  patientInfo: {
    backgroundColor: '#f8f9fa',
    padding: 6,
    marginBottom: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderStyle: 'solid',
  },
  section: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  graySection: {
    backgroundColor: '#f8f9fa',
    padding: 6,
    marginBottom: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  field: {
    flex: 1,
    marginRight: 6,
  },
  label: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 1,
  },
  value: {
    fontSize: 7.5,
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 3,
    borderRadius: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 2,
  },
  checkbox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    marginRight: 3,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    marginRight: 3,
    backgroundColor: '#3498db',
  },
  checkboxLabel: {
    fontSize: 7,
  },
  textArea: {
    fontSize: 7.5,
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 4,
    borderRadius: 2,
    minHeight: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    borderTopStyle: 'solid',
    paddingTop: 5,
  },
  footerText: {
    fontSize: 6,
    color: '#666',
    textAlign: 'center',
  },
  signatureSection: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderStyle: 'solid',
    borderRadius: 3,
  },
  signatureField: {
    flex: 1,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 7,
    color: '#004085',
    backgroundColor: '#cce5ff',
    padding: 2,
    borderRadius: 2,
    marginLeft: 5,
  },
});

interface SurgicalShortEvaluationPDFProps {
  evaluation: SurgicalShortEvaluation;
}

const SurgicalShortEvaluationPDF: React.FC<SurgicalShortEvaluationPDFProps> = ({ evaluation }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString;
  };

  const CheckboxComponent = ({ checked, label }: { checked: boolean; label: string }) => (
    <View style={styles.checkboxItem}>
      <View style={checked ? styles.checkboxChecked : styles.checkbox} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2 }}>
              <Text style={styles.title}>
                EVALUACIÓN DE ENFERMERÍA AL PACIENTE{'\n'}QUIRÚRGICO DE CORTA ESTANCIA
              </Text>
              <Text style={styles.pageIndicator}>PÁGINA: 1/2</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.dateText}>Fecha: {formatDate(evaluation.evaluationDate)}</Text>
            </View>
          </View>
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfo}>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 6 }}>
              <Text style={styles.label}>Paciente</Text>
              <Text style={styles.value}>{evaluation.patientName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NIS</Text>
              <Text style={styles.value}>{evaluation.patientNIS}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 6 }}>
              <Text style={styles.label}>Dirección</Text>
              <Text style={styles.value}>{evaluation.patientAddress}</Text>
            </View>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.value}>{evaluation.patientPhone}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <Text style={styles.value}>{evaluation.patientDateOfBirth}</Text>
            </View>
          </View>
        </View>

        {/* DUE y Nº Colegiado */}
        <View style={styles.row}>
          <View style={{ flex: 2, marginRight: 6 }}>
            <Text style={styles.label}>DUE</Text>
            <Text style={styles.value}>{evaluation.nurse}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Nº Colegiado</Text>
            <Text style={styles.value}>{evaluation.nurseCollegiateNumber}</Text>
          </View>
        </View>

        {/* Constantes Vitales */}
        <View style={styles.graySection}>
          <Text style={[styles.label, { marginBottom: 3, fontSize: 7, fontStyle: 'italic', color: '#d32f2f' }]}>
            Últimos valores registrados en constantes
          </Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Temp.</Text>
              <Text style={styles.value}>{evaluation.temperature}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Vía</Text>
              <Text style={styles.value}>{evaluation.viaAnular}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>TAS/TAD</Text>
              <Text style={styles.value}>{evaluation.tasSistolica}/{evaluation.tadDiastolica}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>FC</Text>
              <Text style={styles.value}>{evaluation.fc}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>FR</Text>
              <Text style={styles.value}>{evaluation.fr}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>SatO2</Text>
              <Text style={styles.value}>{evaluation.satO2}</Text>
            </View>
          </View>
        </View>

        {/* Alergias */}
        <View style={[styles.row, { alignItems: 'center', marginBottom: 6 }]}>
          <Text style={[styles.label, { marginRight: 5 }]}>Alergias:</Text>
          <CheckboxComponent checked={!evaluation.hasAllergies} label="NO" />
          <CheckboxComponent checked={evaluation.hasAllergies} label="SI" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>Especificar:</Text>
            <Text style={styles.value}>{evaluation.allergiesDetails}</Text>
          </View>
        </View>

        {/* Antecedentes personales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Antecedentes personales:</Text>
          <Text style={styles.textArea}>{evaluation.personalHistory}</Text>
        </View>

        {/* Medicación habitual */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medicación habitual:</Text>
          <Text style={styles.textArea}>{evaluation.habitualMedication}</Text>
        </View>

        {/* NECESIDAD DE RESPIRACIÓN */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={styles.sectionTitle}>NECESIDAD DE RESPIRACIÓN</Text>
            {evaluation.respiration.noAlteration && (
              <Text style={styles.badgeText}>Sin alteración observada</Text>
            )}
          </View>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.respiration.difficultyBreathing} label="Dif. Respirar" />
            <CheckboxComponent checked={evaluation.respiration.tachypnea} label="Taquipnea" />
            <CheckboxComponent checked={evaluation.respiration.dyspnea} label="Disnea" />
            <CheckboxComponent checked={evaluation.respiration.bradypnea} label="Bradipnea" />
          </View>
          {evaluation.respiration.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.respiration.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDADES DE ALIMENTACIÓN */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={styles.sectionTitle}>NECESIDADES DE ALIMENTACIÓN</Text>
            {evaluation.feeding.noAlteration && (
              <Text style={styles.badgeText}>Sin alteración observada</Text>
            )}
          </View>
          <Text style={[styles.label, { marginBottom: 2 }]}>Dificultad para:</Text>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.feeding.difficultyChewing} label="Masticar" />
            <CheckboxComponent checked={evaluation.feeding.difficultyDrinking} label="Beber" />
            <CheckboxComponent checked={evaluation.feeding.difficultySwallowing} label="Tragar" />
            <CheckboxComponent checked={evaluation.feeding.refusesToEat} label="Se niega a comer" />
            <CheckboxComponent checked={evaluation.feeding.dentalProsthesis} label="Prótesis dental" />
          </View>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.feeding.nasogastricTube} label="Sonda" />
            <CheckboxComponent checked={evaluation.feeding.parenteralNutrition} label="Alim. parenteral" />
            <CheckboxComponent checked={evaluation.feeding.ostomy} label="Ostomía" />
            <CheckboxComponent checked={evaluation.feeding.aspirationRisk} label="Riesgo aspiración" />
            <CheckboxComponent checked={evaluation.feeding.nausea} label="Náuseas" />
            <CheckboxComponent checked={evaluation.feeding.vomiting} label="Vómitos" />
          </View>
          <Text style={[styles.label, { marginTop: 3, marginBottom: 2 }]}>Screening nutricional:</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={[styles.label, { fontSize: 6 }]}>Peso actual</Text>
              <Text style={styles.value}>{evaluation.feeding.currentWeight}</Text>
            </View>
            <View style={styles.field}>
              <Text style={[styles.label, { fontSize: 6 }]}>Talla</Text>
              <Text style={styles.value}>{evaluation.feeding.height}</Text>
            </View>
            <View style={styles.field}>
              <Text style={[styles.label, { fontSize: 6 }]}>IMC</Text>
              <Text style={styles.value}>{evaluation.feeding.bmi}</Text>
            </View>
            <View style={styles.field}>
              <Text style={[styles.label, { fontSize: 6 }]}>Peso habitual</Text>
              <Text style={styles.value}>{evaluation.feeding.usualWeight}</Text>
            </View>
            <View style={styles.field}>
              <Text style={[styles.label, { fontSize: 6 }]}>% Pérdida</Text>
              <Text style={styles.value}>{evaluation.feeding.weightLossPercentage}</Text>
            </View>
          </View>
          <Text style={[styles.label, { marginTop: 2 }]}>Puntuación MUST: {evaluation.feeding.mustScore}</Text>
          {evaluation.feeding.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.feeding.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE ELIMINACIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE ELIMINACIÓN</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={[styles.label, { marginBottom: 2 }]}>Patrón urinario:</Text>
              <CheckboxComponent checked={evaluation.elimination.urinaryPattern.autonomous} label="Autónomo" />
              <CheckboxComponent checked={evaluation.elimination.urinaryPattern.needsHelp} label="Precisa ayuda" />
              <CheckboxComponent checked={evaluation.elimination.urinaryPattern.physiological} label="Vía fisiológica" />
              <CheckboxComponent checked={evaluation.elimination.urinaryPattern.urinaryCatheter} label="Sonda vesical" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { marginBottom: 2 }]}>Patrón intestinal:</Text>
              <CheckboxComponent checked={evaluation.elimination.intestinalPattern.autonomous} label="Autónomo" />
              <CheckboxComponent checked={evaluation.elimination.intestinalPattern.needsHelp} label="Precisa ayuda" />
              <CheckboxComponent checked={evaluation.elimination.intestinalPattern.physiological} label="Vía fisiológica" />
              <CheckboxComponent checked={evaluation.elimination.intestinalPattern.ostomy} label="Ostomía" />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hospital MIKS Orotálea</Text>
          <Text style={styles.footerText}>Calle Duque de Wellington nº 35, Vitoria-Gasteiz, Araba</Text>
          <Text style={styles.footerText}>Tel: +34 945 252-0977 | www.hospitalmiks.com</Text>
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2 }}>
              <Text style={styles.title}>
                EVALUACIÓN DE ENFERMERÍA AL PACIENTE{'\n'}QUIRÚRGICO DE CORTA ESTANCIA
              </Text>
              <Text style={styles.pageIndicator}>PÁGINA: 2/2</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.dateText}>Fecha: {formatDate(evaluation.evaluationDate)}</Text>
            </View>
          </View>
        </View>

        {/* Patient Info (repetido en página 2) */}
        <View style={styles.patientInfo}>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 6 }}>
              <Text style={styles.label}>Paciente</Text>
              <Text style={styles.value}>{evaluation.patientName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NIS</Text>
              <Text style={styles.value}>{evaluation.patientNIS}</Text>
            </View>
          </View>
        </View>

        {/* NECESIDAD DE MOVILIZACIÓN */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={styles.sectionTitle}>NECESIDAD DE MOVILIZACIÓN</Text>
            {evaluation.mobilization.autonomous && (
              <Text style={styles.badgeText}>Autónomo</Text>
            )}
          </View>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.mobilization.dependent} label="Dependiente" />
            <CheckboxComponent checked={evaluation.mobilization.bedridden} label="Encamado" />
            <CheckboxComponent checked={evaluation.mobilization.needsPartialHelp} label="Ayuda parcial" />
            <CheckboxComponent checked={evaluation.mobilization.needsTotalHelp} label="Ayuda total" />
          </View>
          {evaluation.mobilization.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.mobilization.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE REPOSO Y SUEÑO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE REPOSO Y SUEÑO</Text>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.restAndSleep.normalSleepPattern} label="Patrón normal" />
            <CheckboxComponent checked={evaluation.restAndSleep.difficultySleeping} label="Dificultad para dormir" />
            <CheckboxComponent checked={evaluation.restAndSleep.needsHelpMedication} label="Necesita ayuda/medicación" />
          </View>
          {evaluation.restAndSleep.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.restAndSleep.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE SEGURIDAD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE SEGURIDAD</Text>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={[styles.label, { marginRight: 5 }]}>Riesgo de infección:</Text>
            <CheckboxComponent checked={!evaluation.safety.infectionRisk} label="NO" />
            <CheckboxComponent checked={evaluation.safety.infectionRisk} label="SI" />
          </View>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.safety.drainage} label="Drenaje" />
            <CheckboxComponent checked={evaluation.safety.urinaryCatheter} label="Sonda vesical" />
            <CheckboxComponent checked={evaluation.safety.centralLine} label="Vía central" />
          </View>
          <Text style={[styles.label, { marginTop: 2 }]}>
            Puntuación Downton: {evaluation.safety.fallRiskScore}
          </Text>
          <CheckboxComponent checked={evaluation.safety.protectionProtocol} label="Protocolo de protección > 2" />
          {evaluation.safety.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.safety.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE COMUNICACIÓN */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={styles.sectionTitle}>NECESIDAD DE COMUNICACIÓN</Text>
            {evaluation.communication.noAlteration && (
              <Text style={styles.badgeText}>Sin alteración observada</Text>
            )}
          </View>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.communication.visionAlteration} label="Alt. visión" />
            <CheckboxComponent checked={evaluation.communication.hearingAlteration} label="Alt. audición" />
            <CheckboxComponent checked={evaluation.communication.speechDifficulty} label="Dif. habla" />
          </View>
          <View style={[styles.row, { alignItems: 'center', marginTop: 2 }]}>
            <Text style={[styles.label, { marginRight: 5 }]}>Barrera idiomática:</Text>
            <CheckboxComponent checked={!evaluation.communication.languageBarrier} label="NO" />
            <CheckboxComponent checked={evaluation.communication.languageBarrier} label="SI" />
            {evaluation.communication.languageBarrier && (
              <Text style={[styles.value, { marginLeft: 5 }]}>Idioma: {evaluation.communication.language}</Text>
            )}
          </View>
          {evaluation.communication.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.communication.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE CREENCIAS Y VALORES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE CREENCIAS Y VALORES</Text>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={[styles.label, { marginRight: 5, flex: 1 }]}>¿Creencia religiosa/cultural?</Text>
            <CheckboxComponent checked={!evaluation.beliefsAndValues.hasReligiousCulturalBeliefs} label="NO" />
            <CheckboxComponent checked={evaluation.beliefsAndValues.hasReligiousCulturalBeliefs} label="SI" />
          </View>
          <View style={[styles.row, { alignItems: 'center', marginTop: 2 }]}>
            <Text style={[styles.label, { marginRight: 5 }]}>Voluntades anticipadas:</Text>
            <CheckboxComponent checked={!evaluation.beliefsAndValues.advanceDirectives} label="NO" />
            <CheckboxComponent checked={evaluation.beliefsAndValues.advanceDirectives} label="SI" />
          </View>
          {evaluation.beliefsAndValues.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.beliefsAndValues.observations}</Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE CONFORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE CONFORT</Text>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={[styles.label, { marginRight: 5 }]}>Dolor:</Text>
            <CheckboxComponent checked={!evaluation.comfort.hasPain} label="NO" />
            <CheckboxComponent checked={evaluation.comfort.hasPain} label="SI" />
          </View>
          {evaluation.comfort.hasPain && (
            <>
              <View style={styles.row}>
                <View style={styles.field}>
                  <Text style={styles.label}>Localización</Text>
                  <Text style={styles.value}>{evaluation.comfort.painLocation}</Text>
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Intensidad</Text>
                  <Text style={styles.value}>{evaluation.comfort.painIntensity}</Text>
                </View>
              </View>
              <View style={styles.checkboxRow}>
                <CheckboxComponent checked={evaluation.comfort.painTypeAcute} label="Agudo" />
                <CheckboxComponent checked={evaluation.comfort.painTypeChronic} label="Crónico" />
                <CheckboxComponent checked={evaluation.comfort.painWithMovement} label="Con movimiento" />
              </View>
              <Text style={[styles.label, { marginTop: 2 }]}>
                Escala utilizada: {evaluation.comfort.painScale}
              </Text>
            </>
          )}
        </View>

        {/* NECESIDAD DE APRENDIZAJE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NECESIDAD DE APRENDIZAJE</Text>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={[styles.label, { marginRight: 5 }]}>Estado de salud:</Text>
            <CheckboxComponent checked={evaluation.learning.healthStatus === 'tranquility'} label="Tranquilidad" />
            <CheckboxComponent checked={evaluation.learning.healthStatus === 'worry'} label="Preocupación" />
            <CheckboxComponent checked={evaluation.learning.healthStatus === 'anguish'} label="Angustia" />
            <CheckboxComponent checked={evaluation.learning.healthStatus === 'fear'} label="Temor" />
          </View>
          <Text style={[styles.label, { marginTop: 2 }]}>
            Grado de conocimiento (1-5): {evaluation.learning.knowledgeLevel}
          </Text>
          {evaluation.learning.observations && (
            <>
              <Text style={[styles.label, { marginTop: 2 }]}>Observaciones:</Text>
              <Text style={styles.textArea}>{evaluation.learning.observations}</Text>
            </>
          )}
        </View>

        {/* VALORACIÓN PSICOSOCIAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VALORACIÓN PSICO SOCIAL</Text>
          <View style={styles.checkboxRow}>
            <CheckboxComponent checked={evaluation.psychosocial.calm} label="Tranquilo" />
            <CheckboxComponent checked={evaluation.psychosocial.worried} label="Preocupado" />
            <CheckboxComponent checked={evaluation.psychosocial.anxious} label="Ansioso" />
            <CheckboxComponent checked={evaluation.psychosocial.sad} label="Triste" />
            <CheckboxComponent checked={evaluation.psychosocial.apathetic} label="Apático" />
            <CheckboxComponent checked={evaluation.psychosocial.irritable} label="Irritable" />
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureField}>
            <Text style={styles.label}>ENFERMERA:</Text>
            <Text style={styles.value}>{evaluation.signedBy || evaluation.nurse}</Text>
          </View>
          <View style={styles.signatureField}>
            <Text style={styles.label}>FIRMADO:</Text>
            <View style={{ height: 20, borderBottomWidth: 1, borderBottomColor: '#000', borderBottomStyle: 'solid' }} />
          </View>
          <View style={styles.signatureField}>
            <Text style={styles.label}>FECHA INFORME:</Text>
            <Text style={styles.value}>{evaluation.reportDate}</Text>
          </View>
          <View style={styles.signatureField}>
            <Text style={styles.label}>HORA INFORME:</Text>
            <Text style={styles.value}>{evaluation.reportTime}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hospital MIKS Orotálea</Text>
          <Text style={styles.footerText}>Calle Duque de Wellington nº 35, Vitoria-Gasteiz, Araba</Text>
          <Text style={styles.footerText}>Tel: +34 945 252-0977 | www.hospitalmiks.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SurgicalShortEvaluationPDF;
