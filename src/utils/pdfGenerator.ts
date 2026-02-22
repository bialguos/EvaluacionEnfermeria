import { pdf } from '@react-pdf/renderer';
import type { SurgicalReport } from '../types/surgicalReport';
import SurgicalReportPDF from '../components/SurgicalReportPDF';
import React from 'react';

export const generateAndDownloadPDF = async (report: SurgicalReport) => {
  try {
    // Crear el componente PDF
    const pdfDocument = React.createElement(SurgicalReportPDF, { report }) as any;

    // Generar el blob del PDF
    const blob = await pdf(pdfDocument).toBlob();

    // Crear un nombre de archivo con el nombre del paciente y fecha
    const fileName = `Informe_Quirurgico_${report.pacienteNombre.replace(/[, ]/g, '_')}_${new Date(report.fechaCreacion).toLocaleDateString('es-ES').replace(/\//g, '-')}.pdf`;

    // Crear un enlace temporal y descargarlo
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar el URL temporal
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
};
