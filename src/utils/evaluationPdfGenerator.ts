import { pdf } from '@react-pdf/renderer';
import type { SurgicalShortEvaluation, AdultPatientEvaluation } from '../types/evaluation';
import SurgicalShortEvaluationPDF from '../components/SurgicalShortEvaluationPDF';
import AdultPatientEvaluationPDF from '../components/AdultPatientEvaluationPDF';
import React from 'react';

const downloadBlob = async (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateAndDownloadEvaluationPDF = async (evaluation: SurgicalShortEvaluation) => {
  try {
    const pdfDocument = React.createElement(SurgicalShortEvaluationPDF, { evaluation }) as any;
    const blob = await pdf(pdfDocument).toBlob();
    const fileName = `Evaluacion_Corta_Estancia_${evaluation.patientName.replace(/[, ]/g, '_')}_${evaluation.evaluationDate.replace(/\//g, '-')}.pdf`;
    await downloadBlob(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
};

export const generateAndDownloadAdultPatientPDF = async (evaluation: AdultPatientEvaluation) => {
  try {
    const pdfDocument = React.createElement(AdultPatientEvaluationPDF, { evaluation }) as any;
    const blob = await pdf(pdfDocument).toBlob();
    const fileName = `Evaluacion_Paciente_Adulto_${evaluation.patientName.replace(/[, ]/g, '_')}_${evaluation.evaluationDate.replace(/\//g, '-')}.pdf`;
    await downloadBlob(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
};
