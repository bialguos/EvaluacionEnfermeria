// Mock data for short-stay evaluations patient preloading

export interface MockPatientForEvaluation {
  id: string;
  nombre: string;
  direccion: string;
  nis: string;
  telefono: string;
  fechaNacimiento: string;
  alergias: string;
  antecedentesPersonales: string;
  medicacionHabitual: string;

  // Last registered vital constants
  temperatura: string;
  viaAnular: string;
  tasSistolica: string;
  tadDiastolica: string;
  fc: string;
  fr: string;
  satO2: string;
  aireAmb: string;
}

export interface MockNurse {
  id: string;
  nombre: string;
  numeroColegiado: string;
}

export const mockPatients: MockPatientForEvaluation[] = [
  {
    id: 'pat-eval-juan',
    nombre: 'Juan Pérez García',
    direccion: 'Calle Portales 12, 2° A, Vitoria-Gasteiz',
    nis: '100001',
    telefono: '945111222',
    fechaNacimiento: '12/05/1970',
    alergias: 'No conocidas',
    antecedentesPersonales: 'Sin antecedentes relevantes.',
    medicacionHabitual: 'No toma medicación habitual',
    temperatura: '36.5',
    viaAnular: 'Oral',
    tasSistolica: '120',
    tadDiastolica: '75',
    fc: '70',
    fr: '15',
    satO2: '98',
    aireAmb: 'Aire ambiente',
  },
  {
    id: 'pat-eval-1',
    nombre: 'María García López',
    direccion: 'Calle Mayor 45, 3º B, Vitoria-Gasteiz',
    nis: '307535',
    telefono: '943991234',
    fechaNacimiento: '15/08/1965',
    alergias: 'Penicilina, Polen',
    antecedentesPersonales: 'Hipertensión arterial controlada con medicación. Diabetes Mellitus tipo 2. Colecistectomía en 2018.',
    medicacionHabitual: 'Enalapril 10mg (1-0-0), Metformina 850mg (1-0-1), Atorvastatina 20mg (0-0-1)',
    temperatura: '36.5',
    viaAnular: 'Oral',
    tasSistolica: '135',
    tadDiastolica: '85',
    fc: '78',
    fr: '16',
    satO2: '98',
    aireAmb: 'Aire ambiente',
  },
  {
    id: 'pat-eval-2',
    nombre: 'Juan Martínez Rodríguez',
    direccion: 'Avenida de los Fueros 23, 1º A, Vitoria-Gasteiz',
    nis: '412789',
    telefono: '945123456',
    fechaNacimiento: '22/03/1978',
    alergias: 'No conocidas',
    antecedentesPersonales: 'Fumador activo (10 cigarrillos/día). Apendicectomía en la infancia. Sin otras patologías relevantes.',
    medicacionHabitual: 'No toma medicación habitual',
    temperatura: '36.7',
    viaAnular: 'Oral',
    tasSistolica: '128',
    tadDiastolica: '82',
    fc: '72',
    fr: '14',
    satO2: '97',
    aireAmb: 'Aire ambiente',
  },
  {
    id: 'pat-eval-3',
    nombre: 'Carmen Fernández Sánchez',
    direccion: 'Plaza del Machete 8, 4º D, Vitoria-Gasteiz',
    nis: '523456',
    telefono: '943887766',
    fechaNacimiento: '10/11/1982',
    alergias: 'Látex, AINEs',
    antecedentesPersonales: 'Asma bronquial. Migraña crónica. Cesárea en 2015.',
    medicacionHabitual: 'Salbutamol inhalador (a demanda), Montelukast 10mg (0-0-1), Topiramate 50mg (1-0-1)',
    temperatura: '36.3',
    viaAnular: 'Oral',
    tasSistolica: '118',
    tadDiastolica: '75',
    fc: '68',
    fr: '15',
    satO2: '99',
    aireAmb: 'Aire ambiente',
  },
  {
    id: 'pat-eval-4',
    nombre: 'Pedro Gómez Álvarez',
    direccion: 'Calle San Prudencio 67, Bajo, Vitoria-Gasteiz',
    nis: '634521',
    telefono: '945998877',
    fechaNacimiento: '05/06/1955',
    alergias: 'Contraste yodado',
    antecedentesPersonales: 'Cardiopatía isquémica. Stent coronario en 2020. Dislipemia. Hernia inguinal bilateral operada.',
    medicacionHabitual: 'AAS 100mg (1-0-0), Clopidogrel 75mg (1-0-0), Atorvastatina 40mg (0-0-1), Bisoprolol 5mg (1-0-0), Ramipril 5mg (1-0-0)',
    temperatura: '36.8',
    viaAnular: 'Oral',
    tasSistolica: '142',
    tadDiastolica: '88',
    fc: '65',
    fr: '16',
    satO2: '96',
    aireAmb: 'Aire ambiente',
  },
];

export const mockNurses: MockNurse[] = [
  {
    id: 'nurse-1',
    nombre: 'Miren Sánchez',
    numeroColegiado: '12345',
  },
  {
    id: 'nurse-2',
    nombre: 'Ana Pérez García',
    numeroColegiado: '23456',
  },
  {
    id: 'nurse-3',
    nombre: 'Luis Fernández',
    numeroColegiado: '34567',
  },
];

export const getPatientById = (id: string): MockPatientForEvaluation | undefined => {
  return mockPatients.find(p => p.id === id);
};

export const getNurseById = (id: string): MockNurse | undefined => {
  return mockNurses.find(n => n.id === id);
};
