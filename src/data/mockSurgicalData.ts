import type { MockPatient, MockSurgery, VitalConstant } from '../types/surgicalReport';

// Pacientes mock
export const mockPatients: MockPatient[] = [
  {
    id: 'patient-juan',
    nombre: 'Pérez García, Juan',
    direccion: 'Calle Portales 12, 2° A, Madrid',
    nis: '100001',
    telefono: '912111222',
    fechaNacimiento: '1970-05-12',
    alergias: 'Sin alergias conocidas',
    medicacionHabitual: 'No toma medicación habitual',
    ppcc: 'Sin antecedentes relevantes',
    taS: 120,
    taD: 75,
    fc: 70,
    enfermeraPlanta: 'Miren Sánchez'
  },
  {
    id: 'patient-001',
    nombre: 'García López, María',
    direccion: 'Calle Mayor 45, 3°B, Madrid',
    nis: '280654789123',
    telefono: '912345678',
    fechaNacimiento: '1965-03-15',
    alergias: 'Penicilina, Contraste yodado',
    medicacionHabitual: 'Enalapril 10mg (1-0-0), Atorvastatina 20mg (0-0-1), Omeprazol 20mg (1-0-0)',
    ppcc: 'HTA, Dislipemia',
    taS: 135,
    taD: 85,
    fc: 78,
    enfermeraPlanta: 'Ana Martínez Ruiz'
  },
  {
    id: 'patient-002',
    nombre: 'Rodríguez Sánchez, Juan Carlos',
    direccion: 'Avenida de la Constitución 128, Barcelona',
    nis: '080987654321',
    telefono: '934567890',
    fechaNacimiento: '1958-11-22',
    alergias: 'Sin alergias conocidas',
    medicacionHabitual: 'Metformina 850mg (1-0-1), Bisoprolol 5mg (1-0-0), AAS 100mg (0-0-1)',
    ppcc: 'DM tipo 2, Cardiopatía isquémica',
    taS: 128,
    taD: 78,
    fc: 68,
    enfermeraPlanta: 'Carmen González Pérez'
  },
  {
    id: 'patient-003',
    nombre: 'Fernández Muñoz, Isabel',
    direccion: 'Calle del Prado 67, 1°A, Valencia',
    nis: '460123456789',
    telefono: '963456789',
    fechaNacimiento: '1972-07-08',
    alergias: 'Látex',
    medicacionHabitual: 'Levotiroxina 75mcg (1-0-0), Paracetamol 1g si dolor',
    ppcc: 'Hipotiroidismo',
    taS: 118,
    taD: 72,
    fc: 72,
    enfermeraPlanta: 'Laura Jiménez Torres'
  },
  {
    id: 'patient-004',
    nombre: 'Martín Hernández, Pedro',
    direccion: 'Plaza de España 12, 4°C, Sevilla',
    nis: '410567891234',
    telefono: '954123456',
    fechaNacimiento: '1980-01-30',
    alergias: 'Sin alergias conocidas',
    medicacionHabitual: 'Ibuprofeno 600mg si dolor',
    ppcc: 'Sin antecedentes relevantes',
    taS: 122,
    taD: 76,
    fc: 70,
    enfermeraPlanta: 'Marta Rodríguez Silva'
  }
];

// Cirugías mock
export const mockSurgeries: MockSurgery[] = [
  {
    id: 'surgery-juan',
    patientId: 'patient-juan',
    intervencion: 'Herniorrafia umbilical',
    lateralidad: 'No aplica',
    cirujano: 'Dr. Antonio López Ruiz',
    anestesista: 'Dra. María González Torres',
    tipoAnestesia: 'General balanceada',
    fechaEntradaQuirofano: '2026-02-22T08:00',
    fechaSalidaQuirofano: '2026-02-22T09:30',
    enfermeraQuirofano: 'Beatriz Sánchez López',
    medicacionQuirofano: 'Propofol 150mg, Fentanilo 100mcg, Paracetamol 1g IV',
    anestesistaUrpa: 'Dra. María González Torres',
    enfermeraUrpa: 'Miren Sánchez',
    medicacionPreUrpa: 'Metoclopramida 10mg IV',
    fechaEntradaUrpa: '2026-02-22T09:30',
    fechaSalidaUrpa: '2026-02-22T11:30'
  },
  {
    id: 'surgery-001',
    patientId: 'patient-001',
    intervencion: 'Colecistectomía laparoscópica',
    lateralidad: 'No aplica',
    cirujano: 'Dr. Ramón Pérez Castillo',
    anestesista: 'Dra. Elena Moreno Díaz',
    tipoAnestesia: 'General balanceada',
    fechaEntradaQuirofano: '2026-02-22T08:30',
    fechaSalidaQuirofano: '2026-02-22T10:15',
    enfermeraQuirofano: 'Beatriz Sánchez López',
    medicacionQuirofano: 'Propofol 200mg, Fentanilo 100mcg, Rocuronio 50mg, Paracetamol 1g IV',
    anestesistaUrpa: 'Dra. Elena Moreno Díaz',
    enfermeraUrpa: 'Cristina Fernández Ruiz',
    medicacionPreUrpa: 'Metoclopramida 10mg IV',
    fechaEntradaUrpa: '2026-02-22T10:15',
    fechaSalidaUrpa: '2026-02-22T12:30'
  },
  {
    id: 'surgery-002',
    patientId: 'patient-002',
    intervencion: 'Hernioplastia inguinal derecha',
    lateralidad: 'Derecha',
    cirujano: 'Dr. Carlos Jiménez Martín',
    anestesista: 'Dr. Miguel Ángel Torres Vega',
    tipoAnestesia: 'Raquídea',
    fechaEntradaQuirofano: '2026-02-22T09:00',
    fechaSalidaQuirofano: '2026-02-22T10:30',
    enfermeraQuirofano: 'Sara Martínez Gómez',
    medicacionQuirofano: 'Bupivacaína hiperbara 15mg intratecal, Metamizol 2g IV',
    anestesistaUrpa: 'Dr. Miguel Ángel Torres Vega',
    enfermeraUrpa: 'Patricia López Muñoz',
    medicacionPreUrpa: 'Ondansetrón 4mg IV',
    fechaEntradaUrpa: '2026-02-22T10:30',
    fechaSalidaUrpa: '2026-02-22T13:00'
  },
  {
    id: 'surgery-003',
    patientId: 'patient-003',
    intervencion: 'Tiroidectomía total',
    lateralidad: 'Bilateral',
    cirujano: 'Dra. Lucía Romero Santos',
    anestesista: 'Dr. Javier Ruiz Hernández',
    tipoAnestesia: 'General balanceada',
    fechaEntradaQuirofano: '2026-02-22T10:45',
    fechaSalidaQuirofano: '2026-02-22T13:00',
    enfermeraQuirofano: 'María José García Díaz',
    medicacionQuirofano: 'Propofol 180mg, Remifentanilo perfusión, Rocuronio 40mg, Dexametasona 8mg IV',
    anestesistaUrpa: 'Dr. Javier Ruiz Hernández',
    enfermeraUrpa: 'Isabel Sánchez Moreno',
    medicacionPreUrpa: 'Tramadol 100mg IV, Dexketoprofeno 50mg IV',
    fechaEntradaUrpa: '2026-02-22T13:00',
    fechaSalidaUrpa: '2026-02-22T15:30'
  },
  {
    id: 'surgery-004',
    patientId: 'patient-004',
    intervencion: 'Artroscopia de rodilla izquierda - Meniscectomía',
    lateralidad: 'Izquierda',
    cirujano: 'Dr. Alberto Navarro Prieto',
    anestesista: 'Dra. Carmen Silva Ortega',
    tipoAnestesia: 'Raquídea + sedación',
    fechaEntradaQuirofano: '2026-02-22T11:30',
    fechaSalidaQuirofano: '2026-02-22T12:45',
    enfermeraQuirofano: 'Elena Morales Pérez',
    medicacionQuirofano: 'Bupivacaína hiperbara 12mg intratecal, Midazolam 2mg IV, Paracetamol 1g IV',
    anestesistaUrpa: 'Dra. Carmen Silva Ortega',
    enfermeraUrpa: 'Raquel Díaz Fernández',
    medicacionPreUrpa: 'Ketorolaco 30mg IM',
    fechaEntradaUrpa: '2026-02-22T12:45',
    fechaSalidaUrpa: '2026-02-22T14:30'
  }
];

// Constantes vitales de ejemplo (datos de planta)
export const mockVitalConstants: VitalConstant[] = [
  {
    id: 'vc-001',
    hora: '07:00',
    tasSistolica: 130,
    tadDiastolica: 82,
    fc: 76,
    satO2: 97,
    eva: 2,
    origen: 'planta'
  },
  {
    id: 'vc-002',
    hora: '08:00',
    tasSistolica: 135,
    tadDiastolica: 85,
    fc: 78,
    satO2: 98,
    eva: 1,
    origen: 'planta'
  }
];

// Función helper para obtener paciente por ID
export const getPatientById = (id: string): MockPatient | undefined => {
  return mockPatients.find(p => p.id === id);
};

// Función helper para obtener cirugía por ID
export const getSurgeryById = (id: string): MockSurgery | undefined => {
  return mockSurgeries.find(s => s.id === id);
};

// Función helper para obtener cirugías de un paciente
export const getSurgeriesByPatientId = (patientId: string): MockSurgery[] => {
  return mockSurgeries.filter(s => s.patientId === patientId);
};
