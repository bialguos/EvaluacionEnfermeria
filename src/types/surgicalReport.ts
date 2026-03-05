// Constante vital individual
export interface VitalConstant {
  id: string;
  hora: string;
  tasSistolica: number;
  tadDiastolica: number;
  fc: number;
  satO2: number;
  eva: number;
  origen: 'planta' | 'quirofano';
}

// Fila de medicación administrada
export interface MedicationRow {
  id: string;
  hora: string;
  medicacion: string;
  dosis: string;
}

// Fila de registro antibiótico
export interface AntibioticRow {
  id: string;
  antibiotico: string;
  dosis: string;
  horaAdministracion: string;
  prescritoPor: string;
}

// Datos del paciente mock
export interface MockPatient {
  id: string;
  nombre: string;
  direccion: string;
  nis: string;
  telefono: string;
  fechaNacimiento: string;
  alergias: string;
  medicacionHabitual: string;
  ppcc: string;
  taS: number;
  taD: number;
  fc: number;
  enfermeraPlanta: string;
}

// Datos de la cirugía mock
export interface MockSurgery {
  id: string;
  patientId: string;
  intervencion: string;
  lateralidad: string;
  cirujano: string;
  anestesista: string;
  tipoAnestesia: string;
  fechaEntradaQuirofano: string;
  fechaSalidaQuirofano: string;
  enfermeraQuirofano: string;
  medicacionQuirofano: string;
  anestesistaUrpa: string;
  enfermeraUrpa: string;
  medicacionPreUrpa: string;
  fechaEntradaUrpa: string;
  fechaSalidaUrpa: string;
}

// Informe quirúrgico completo
export interface SurgicalReport {
  id: string;
  patientId: string;
  surgeryId: string;
  fechaCreacion: string;

  // Datos del paciente (readonly, vienen del mock)
  pacienteNombre: string;
  pacienteDireccion: string;
  pacienteNis: string;
  pacienteTelefono: string;
  pacienteFechaNacimiento: string;

  // Hospitalización (readonly)
  alergias: string;
  medicacionHabitual: string;
  ppcc: string;
  taS: number;
  taD: number;
  fc: number;
  enfermeraPlanta: string;

  // PRE-URPA (readonly)
  intervencion: string;
  lateralidad: string;
  enfermeraUrpa: string;
  medicacionPreUrpa: string;
  registroAntibiotico: AntibioticRow[];

  // Checkboxes editables - Página 1
  retiradaDispositivos: boolean;  // SI para "Retirada dispositivos/dentadura"
  retiradaDentadura: boolean;     // NO para "Retirada dispositivos/dentadura"
  rasuradoZona: boolean;          // SI
  rasuradoZonaNo: boolean;        // NO
  rasuradoZonaNp: boolean;        // N/P

  pruebasEcg: boolean;
  pruebasRx: boolean;
  pruebasAs: boolean;
  pruebasInfExterno: boolean;

  verificacionCirujano: boolean;     // SI Cirujano
  verificacionCirujanoNo: boolean;   // NO Cirujano
  verificacionAnestesista: boolean;  // SI Anestesista
  verificacionAnestesistaNo: boolean; // NO Anestesista

  marcaje: boolean;           // SI
  marcajeNo: boolean;         // NO
  marcajeNp: boolean;         // N/P
  pruebasCruzadas: boolean;   // SI
  pruebasCruzadasNo: boolean; // NO
  pruebasCruzadasNp: boolean; // N/P
  uReservadas: string;
  transfusion: boolean;       // SI
  transfusionNo: boolean;     // NO
  transfusionNp: boolean;     // N/P

  // Quirófano (readonly)
  cirujano: string;
  anestesista: string;
  tipoAnestesia: string;
  fechaEntradaQuirofano: string;
  fechaSalidaQuirofano: string;
  enfermeraQuirofano: string;
  medicacionQuirofano: string;

  // Observaciones página 1
  observacionesPagina1: string;

  // Constantes vitales
  constantesVitales: VitalConstant[];

  // URPA - Página 2 (algunos editables)
  anestesistaUrpa: string;
  enfermeraUrpaFinal: string;
  fechaEntradaUrpa: string; // EDITABLE
  fechaSalidaUrpa: string;  // EDITABLE

  // Órdenes médicas
  ordenesMedicas: string;

  // Medicación administrada
  medicacionAdministrada: MedicationRow[];

  // Campos adicionales - Página 2
  viasVenosas: string;
  vendaje: string;
  sondaVesical: string;
  oxigenoterapia: string;
  drenajes: string;
  otros: string;
  apositos: string;

  // Firma
  enfermera: string;
  fechaHoraInforme: string;
}
