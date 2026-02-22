import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { SurgicalReport } from '../types/surgicalReport';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
  pageIndicator: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
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
    borderRadius: 3,
  },
  blueSection: {
    backgroundColor: '#d6eaf8',
    padding: 6,
    marginBottom: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#5dade2',
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
  editableValue: {
    fontSize: 7.5,
    color: '#333',
    backgroundColor: '#fff9e6',
    padding: 3,
    borderRadius: 2,
  },
  checkboxSection: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkboxColumn: {
    flex: 1,
    marginRight: 6,
  },
  checkboxGroup: {
    marginBottom: 4,
  },
  checkboxGroupLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  checkbox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    marginRight: 4,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    marginRight: 4,
    backgroundColor: '#3498db',
  },
  checkboxLabel: {
    fontSize: 7,
  },
  table: {
    marginTop: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    minHeight: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8f4fc',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    fontWeight: 'bold',
    minHeight: 18,
  },
  tableCell: {
    flex: 1,
    padding: 3,
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    justifyContent: 'center',
  },
  tableCellLast: {
    flex: 1,
    padding: 3,
    fontSize: 7,
    justifyContent: 'center',
  },
  footer: {
    marginTop: 10,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopStyle: 'solid',
  },
  signatureArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  signatureBox: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 7,
    color: '#999',
    fontStyle: 'italic',
  },
});

interface SurgicalReportPDFProps {
  report: SurgicalReport;
}

const SurgicalReportPDF: React.FC<SurgicalReportPDFProps> = ({ report }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Document>
      {/* PÁGINA 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>MIKS</Text>
            <Text style={{ fontSize: 8, color: '#666' }}>Sistema de Información Hospitalaria</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.title}>INFORME QUIRÚRGICO DE ENFERMERÍA</Text>
            <Text style={styles.pageIndicator}>PÁGINA: 1/2</Text>
          </View>
          <View>
            <Text style={{ fontSize: 8, color: '#666' }}>
              <Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {formatDate(report.fechaCreacion)}
            </Text>
          </View>
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfo}>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 10 }}>
              <Text style={styles.label}>Paciente</Text>
              <Text style={styles.value}>{report.pacienteNombre}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NIS</Text>
              <Text style={styles.value}>{report.pacienteNis}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 10 }}>
              <Text style={styles.label}>Dirección</Text>
              <Text style={styles.value}>{report.pacienteDireccion}</Text>
            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.value}>{report.pacienteTelefono}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <Text style={styles.value}>{formatDate(report.pacienteFechaNacimiento)}</Text>
            </View>
          </View>
        </View>

        {/* Hospitalización */}
        <View style={styles.blueSection}>
          <Text style={styles.sectionTitle}>HOSPITALIZACIÓN</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>Alergias</Text>
            <Text style={styles.value}>{report.alergias}</Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>Medicación Habitual</Text>
            <Text style={styles.value}>{report.medicacionHabitual}</Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>PPCC</Text>
            <Text style={styles.value}>{report.ppcc}</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>TA S/D (mmHg)</Text>
              <Text style={styles.value}>{report.taS}/{report.taD}</Text>
            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>FC (lpm)</Text>
              <Text style={styles.value}>{report.fc}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.label}>Enfermera/o Planta</Text>
              <Text style={styles.value}>{report.enfermeraPlanta}</Text>
            </View>
          </View>
        </View>

        {/* PRE-URPA */}
        <View style={styles.blueSection}>
          <Text style={styles.sectionTitle}>PRE-URPA</Text>
          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 10 }}>
              <Text style={styles.label}>Intervención</Text>
              <Text style={styles.value}>{report.intervencion}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Lateralidad</Text>
              <Text style={styles.value}>{report.lateralidad}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>Enfermera/o URPA</Text>
            <Text style={styles.value}>{report.enfermeraUrpa}</Text>
          </View>
          <View>
            <Text style={styles.label}>Medicación Pre-URPA</Text>
            <Text style={styles.value}>{report.medicacionPreUrpa}</Text>
          </View>
        </View>

        {/* Checkboxes */}
        <View style={styles.section}>
          <View style={styles.checkboxSection}>
            <View style={styles.checkboxColumn}>
              <View style={styles.checkboxGroup}>
                <Text style={styles.checkboxGroupLabel}>Retirada:</Text>
                <View style={styles.checkboxItem}>
                  <View style={report.retiradaDispositivos ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Dispositivos</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.retiradaDentadura ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Dentadura</Text>
                </View>
              </View>

              <View style={styles.checkboxGroup}>
                <Text style={styles.checkboxGroupLabel}>Rasurado zona quirúrgica:</Text>
                <View style={styles.checkboxItem}>
                  <View style={report.rasuradoZona ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Sí</Text>
                </View>
              </View>

              <View style={styles.checkboxGroup}>
                <Text style={styles.checkboxGroupLabel}>Verificación médica:</Text>
                <View style={styles.checkboxItem}>
                  <View style={report.verificacionCirujano ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Cirujano</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.verificacionAnestesista ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Anestesista</Text>
                </View>
              </View>
            </View>

            <View style={styles.checkboxColumn}>
              <View style={styles.checkboxGroup}>
                <Text style={styles.checkboxGroupLabel}>Pruebas complementarias:</Text>
                <View style={styles.checkboxItem}>
                  <View style={report.pruebasEcg ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>ECG</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.pruebasRx ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>RX</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.pruebasAs ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>AS</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.pruebasInfExterno ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>INF EXTERNO</Text>
                </View>
              </View>

              <View style={styles.checkboxGroup}>
                <Text style={styles.checkboxGroupLabel}>Otros:</Text>
                <View style={styles.checkboxItem}>
                  <View style={report.marcaje ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Marcaje</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.pruebasCruzadas ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Pruebas cruzadas</Text>
                </View>
                <View style={styles.checkboxItem}>
                  <View style={report.transfusion ? styles.checkboxChecked : styles.checkbox} />
                  <Text style={styles.checkboxLabel}>Transfusión</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quirófano */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUIRÓFANO</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Cirujano</Text>
              <Text style={styles.value}>{report.cirujano}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Anestesista</Text>
              <Text style={styles.value}>{report.anestesista}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>Tipo de Anestesia</Text>
            <Text style={styles.value}>{report.tipoAnestesia}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Fecha Entrada Quirófano</Text>
              <Text style={styles.value}>{formatDateTime(report.fechaEntradaQuirofano)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Fecha Salida Quirófano</Text>
              <Text style={styles.value}>{formatDateTime(report.fechaSalidaQuirofano)}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.label}>Enfermera/o Quirófano</Text>
            <Text style={styles.value}>{report.enfermeraQuirofano}</Text>
          </View>
          <View>
            <Text style={styles.label}>Medicación Quirófano</Text>
            <Text style={styles.editableValue}>{report.medicacionQuirofano}</Text>
          </View>
        </View>

        {/* Observaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OBSERVACIONES</Text>
          <Text style={styles.editableValue}>{report.observacionesPagina1 || 'Sin observaciones'}</Text>
        </View>
      </Page>

      {/* PÁGINA 2 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>MIKS</Text>
            <Text style={{ fontSize: 8, color: '#666' }}>Sistema de Información Hospitalaria</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.title}>INFORME QUIRÚRGICO DE ENFERMERÍA</Text>
            <Text style={styles.pageIndicator}>PÁGINA: 2/2</Text>
          </View>
          <View>
            <Text style={{ fontSize: 8, color: '#666' }}>
              <Text style={{ fontWeight: 'bold' }}>Paciente:</Text> {report.pacienteNombre}
            </Text>
          </View>
        </View>

        {/* Constantes Vitales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONSTANTES VITALES</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>HORA</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>TAS/TAD</Text>
              <Text style={[styles.tableCell, { flex: 0.7 }]}>FC</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>SAT O2</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>EVA</Text>
              <Text style={[styles.tableCellLast, { flex: 0.8 }]}>Origen</Text>
            </View>
            {report.constantesVitales.map((constant, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>{constant.hora}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{constant.tasSistolica}/{constant.tadDiastolica}</Text>
                <Text style={[styles.tableCell, { flex: 0.7 }]}>{constant.fc}</Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>{constant.satO2}%</Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>{constant.eva}</Text>
                <Text style={[styles.tableCellLast, { flex: 0.8 }]}>
                  {constant.origen === 'planta' ? 'Planta' : 'Quirófano'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* URPA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>URPA</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Anestesista URPA</Text>
              <Text style={styles.value}>{report.anestesistaUrpa}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Enfermera/o URPA</Text>
              <Text style={styles.value}>{report.enfermeraUrpaFinal}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Fecha Entrada URPA</Text>
              <Text style={styles.editableValue}>{formatDateTime(report.fechaEntradaUrpa)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Fecha Salida URPA</Text>
              <Text style={styles.editableValue}>{formatDateTime(report.fechaSalidaUrpa)}</Text>
            </View>
          </View>
        </View>

        {/* Órdenes Médicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ÓRDENES Y PRESCRIPCIONES MÉDICAS</Text>
          <Text style={styles.editableValue}>{report.ordenesMedicas || 'Sin órdenes médicas'}</Text>
        </View>

        {/* Medicación Administrada */}
        {report.medicacionAdministrada.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MEDICACIÓN ADMINISTRADA</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>HORA</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>MEDICACIÓN</Text>
                <Text style={[styles.tableCellLast, { flex: 1 }]}>DOSIS</Text>
              </View>
              {report.medicacionAdministrada.map((med, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 0.8 }]}>{med.hora}</Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{med.medicacion}</Text>
                  <Text style={[styles.tableCellLast, { flex: 1 }]}>{med.dosis}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Información Adicional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN ADICIONAL</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Vías venosas</Text>
              <Text style={styles.editableValue}>{report.viasVenosas || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Oxigenoterapia</Text>
              <Text style={styles.editableValue}>{report.oxigenoterapia || '-'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Vendaje</Text>
              <Text style={styles.editableValue}>{report.vendaje || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Drenajes</Text>
              <Text style={styles.editableValue}>{report.drenajes || '-'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Sonda vesical</Text>
              <Text style={styles.editableValue}>{report.sondaVesical || '-'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Otros</Text>
              <Text style={styles.editableValue}>{report.otros || '-'}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Apósitos</Text>
            <Text style={styles.editableValue}>{report.apositos || '-'}</Text>
          </View>
        </View>

        {/* Firma */}
        <View style={styles.footer}>
          <Text style={styles.sectionTitle}>FIRMA Y VALIDACIÓN</Text>
          <View style={styles.signatureArea}>
            <View>
              <Text style={styles.label}>Enfermera/o responsable:</Text>
              <Text style={{ fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                {report.enfermera || '[Sin firmar]'}
              </Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>[Espacio para firma]</Text>
            </View>
            <View>
              <Text style={styles.label}>Fecha y hora:</Text>
              <Text style={{ fontSize: 9, marginTop: 5 }}>
                {formatDateTime(report.fechaHoraInforme)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SurgicalReportPDF;
