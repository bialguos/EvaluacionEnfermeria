import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { VitalConstant } from '../types/surgicalReport';

interface VitalConstantsGraphsProps {
  constants: VitalConstant[];
}

const VitalConstantsGraphs: React.FC<VitalConstantsGraphsProps> = ({ constants }) => {
  if (constants.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No hay datos suficientes para mostrar gráficos
      </div>
    );
  }

  // Preparar datos para los gráficos
  const chartData = constants.map(c => ({
    hora: c.hora,
    TAS: c.tasSistolica,
    TAD: c.tadDiastolica,
    FC: c.fc,
    'SAT O2': c.satO2
  }));

  return (
    <div className="vital-constants-graphs">
      <h4 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Gráficos de Constantes Vitales</h4>

      <div className="graph-container">
        <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Presión Arterial (mmHg)</h5>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis domain={[0, 200]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="TAS" stroke="#e74c3c" strokeWidth={2} name="Sistólica" />
            <Line type="monotone" dataKey="TAD" stroke="#3498db" strokeWidth={2} name="Diastólica" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-container">
        <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Frecuencia Cardíaca (lpm)</h5>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis domain={[0, 150]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="FC" stroke="#27ae60" strokeWidth={2} name="FC" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-container">
        <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Saturación de O2 (%)</h5>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SAT O2" stroke="#9b59b6" strokeWidth={2} name="SAT O2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VitalConstantsGraphs;
