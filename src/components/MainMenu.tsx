import React from 'react';

interface MainMenuProps {
  onSelectEvaluations: () => void;
  onSelectSurgicalReports: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectEvaluations, onSelectSurgicalReports }) => {
  return (
    <div className="main-menu-container">
      <div className="menu-header">
        <h1>Sistema de Evaluaciones de Enfermería</h1>
        <p>Seleccione el módulo con el que desea trabajar</p>
      </div>

      <div className="menu-options">
        <div className="menu-card" onClick={onSelectEvaluations}>
          <div className="menu-card-icon">📋</div>
          <h2>Evaluaciones de Enfermería</h2>
          <p>Gestión de evaluaciones generales de pacientes</p>
        </div>

        <div className="menu-card" onClick={onSelectSurgicalReports}>
          <div className="menu-card-icon">🏥</div>
          <h2>Informe Quirúrgico de Enfermería</h2>
          <p>Registro perioperatorio y seguimiento quirúrgico</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
