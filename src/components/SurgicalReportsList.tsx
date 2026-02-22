import React, { useState } from 'react';
import type { SurgicalReport } from '../types/surgicalReport';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';

interface SurgicalReportsListProps {
  reports: SurgicalReport[];
  onEdit: (report: SurgicalReport) => void;
  onDelete: (id: string) => void;
}

const SurgicalReportsList: React.FC<SurgicalReportsListProps> = ({ reports, onEdit, onDelete }) => {
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null);

  if (reports.length === 0) {
    return (
      <div className="no-records">
        <p>No hay informes quirúrgicos registrados</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = async (report: SurgicalReport) => {
    setGeneratingPDF(report.id);
    try {
      await generateAndDownloadPDF(report);
    } catch (error) {
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
      console.error(error);
    } finally {
      setGeneratingPDF(null);
    }
  };

  return (
    <div className="evaluations-list">
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Intervención</th>
            <th>Enfermera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.pacienteNombre}</td>
              <td>{formatDate(report.fechaCreacion)}</td>
              <td>{report.intervencion}</td>
              <td>{report.enfermera || 'Sin asignar'}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(report)}>
                  Editar
                </button>
                <button
                  className="details-button"
                  onClick={() => handlePrint(report)}
                  disabled={generatingPDF === report.id}
                  style={{ backgroundColor: '#9b59b6', borderColor: '#9b59b6' }}
                >
                  {generatingPDF === report.id ? 'Generando...' : 'Imprimir PDF'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    if (window.confirm('¿Está seguro de eliminar este informe quirúrgico?')) {
                      onDelete(report.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurgicalReportsList;
