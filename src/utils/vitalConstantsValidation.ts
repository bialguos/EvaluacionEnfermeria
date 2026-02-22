// Rangos normales para cada constante vital
export const VITAL_RANGES = {
  tasSistolica: { min: 90, max: 140, unit: 'mmHg' },
  tadDiastolica: { min: 60, max: 90, unit: 'mmHg' },
  fc: { min: 60, max: 100, unit: 'lpm' },
  satO2: { min: 95, max: 100, unit: '%' },
  eva: { min: 0, max: 10, unit: 'puntos' }
};

export type ValidationStatus = 'normal' | 'warning' | 'danger';

export const validateVitalSign = (
  value: number,
  type: keyof typeof VITAL_RANGES
): ValidationStatus => {
  const range = VITAL_RANGES[type];

  if (value < range.min || value > range.max) {
    // Valores muy fuera de rango
    if (type === 'tasSistolica' && (value < 80 || value > 160)) return 'danger';
    if (type === 'tadDiastolica' && (value < 50 || value > 100)) return 'danger';
    if (type === 'fc' && (value < 50 || value > 120)) return 'danger';
    if (type === 'satO2' && value < 90) return 'danger';
    if (type === 'eva' && value > 7) return 'danger';

    return 'warning';
  }

  return 'normal';
};

export const getValidationColor = (status: ValidationStatus): string => {
  switch (status) {
    case 'normal': return '#27ae60';
    case 'warning': return '#f39c12';
    case 'danger': return '#e74c3c';
  }
};
