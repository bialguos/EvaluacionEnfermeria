import { Tooltip } from 'react-tooltip';

interface PatientHeaderProps {
  patientName?: string;
  gender?: string;
  age?: number;
  historyNumber?: string;
  admissionDate?: string;
  admissionDay?: string;
  carePoint?: string;
  allergies?: string[];
  alerts?: string[];
  history?: string[];
}

const PatientHeader = ({
  patientName = 'Juan Pérez',
  gender = 'Masculino',
  age = 45,
  historyNumber = '123456',
  admissionDate = '01/01/2025',
  admissionDay = 'Lunes',
  carePoint = 'Sala 3',
  allergies = ['Penicilina', 'Polen', 'Mariscos'],
  alerts = ['Riesgo de caídas', 'Diabético'],
  history = ['Hipertensión', 'Diabetes tipo 2'],
}: PatientHeaderProps) => {
  return (
    <div className="patient-header">
      <div className="header-left">
        <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h1 className="header-title">Evaluaciones de Enfermería</h1>
      </div>

      <div className="header-center">
        <h2 className="patient-name">{patientName}</h2>
        <p className="patient-info">
          {gender} {age} años | His: {historyNumber} | {admissionDate}
        </p>
        <p className="patient-info">
          Día Ingreso: {admissionDay} | Punto Atención: {carePoint}
        </p>
      </div>

      <div className="header-right">
        <button
          className="header-button allergies-button"
          data-tooltip-id="allergiesPatientTooltip"
        >
          Alergias
          {allergies.length > 0 && (
            <span className="button-badge">{allergies.length}</span>
          )}
        </button>
        <Tooltip id="allergiesPatientTooltip" place="left">
          <ul className="tooltip-list">
            {allergies.map((allergy, index) => (
              <li key={index}>{allergy}</li>
            ))}
          </ul>
        </Tooltip>

        <button
          className="header-button alerts-button"
          data-tooltip-id="alertsPatientTooltip"
        >
          Alertas
          {alerts.length > 0 && (
            <span className="button-badge">{alerts.length}</span>
          )}
        </button>
        <Tooltip id="alertsPatientTooltip" place="left">
          <ul className="tooltip-list">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </Tooltip>

        <button
          className="header-button history-button"
          data-tooltip-id="historyPatientTooltip"
        >
          Antecedentes
          {history.length > 0 && (
            <span className="button-badge">{history.length}</span>
          )}
        </button>
        <Tooltip id="historyPatientTooltip" place="left">
          <ul className="tooltip-list">
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Tooltip>
      </div>
    </div>
  );
};

export default PatientHeader;
