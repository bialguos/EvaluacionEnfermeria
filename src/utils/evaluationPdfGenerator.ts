import { pdf } from '@react-pdf/renderer';
import type { SurgicalShortEvaluation } from '../types/evaluation';
import SurgicalShortEvaluationPDF from '../components/SurgicalShortEvaluationPDF';
import React from 'react';

export const generateAndDownloadEvaluationPDF = async (evaluation: SurgicalShortEvaluation) => {
  try {
    // Crear el componente PDF
    const pdfDocument = React.createElement(SurgicalShortEvaluationPDF, { evaluation }) as any;

    // Generar el blob del PDF
    const blob = await pdf(pdfDocument).toBlob();

    // Crear un nombre de archivo con el nombre del paciente y fecha
    const fileName = `Evaluacion_Corta_Estancia_${evaluation.patientName.replace(/[, ]/g, '_')}_${evaluation.evaluationDate.replace(/\//g, '-')}.pdf`;

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
