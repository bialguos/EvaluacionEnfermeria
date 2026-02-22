# Changelog - Sistema de Informes Quirúrgicos

## [1.1.0] - 2026-02-22

### ✨ Nuevas Funcionalidades

#### Generación de PDF
- **Botón "Imprimir PDF" en la lista de informes**
  - Genera PDF de 2 páginas con formato profesional
  - Descarga automática con nombre descriptivo
  - Estado visual mientras se genera (botón "Generando...")

- **Botón "Guardar e Imprimir" en el formulario**
  - Guarda el informe en localStorage
  - Genera y descarga el PDF automáticamente
  - Ubicado junto al botón "Guardar Informe" en página 2

#### Diseño del PDF
- **Página 1:**
  - Header con logo MIKS y título
  - Información del paciente
  - Sección Hospitalización (fondo azul)
  - Sección PRE-URPA (fondo azul)
  - Checkboxes en grid 2 columnas
  - Datos de quirófano
  - Observaciones

- **Página 2:**
  - Header con logo MIKS y nombre del paciente
  - Tabla de constantes vitales completa
  - Datos URPA con fechas
  - Órdenes médicas
  - Tabla de medicación administrada
  - Información adicional (vías, vendajes, etc.)
  - Firma y validación

#### Características del PDF
- ✅ Formato A4 profesional
- ✅ Campos editables resaltados en amarillo claro
- ✅ Checkboxes marcados visualmente
- ✅ Tablas con bordes negros
- ✅ Secciones con colores corporativos
- ✅ Firma con espacio reservado
- ✅ Fechas formateadas en español

### 🔧 Cambios Técnicos

#### Dependencias Añadidas
- `@react-pdf/renderer@^4.3.2` - Librería para generación de PDFs

#### Nuevos Archivos
1. `src/components/SurgicalReportPDF.tsx` - Componente de renderizado PDF
2. `src/utils/pdfGenerator.ts` - Utilidad para generar y descargar PDFs

#### Archivos Modificados
1. `src/components/SurgicalReportsList.tsx`
   - Añadido botón "Imprimir PDF"
   - Handler para generación de PDF
   - Estado de carga durante generación

2. `src/components/SurgicalReportForm.tsx`
   - Añadido botón "Guardar e Imprimir"
   - Handler `handleSaveAndPrint`
   - Estado `generatingPDF`

3. `src/App.css`
   - Estilos para botones de impresión
   - Estados disabled y hover
   - Colores corporativos

4. `package.json`
   - Dependencia @react-pdf/renderer

### 📊 Métricas

- **Bundle size:** 2.35 MB (incremento por librería PDF)
- **Componentes nuevos:** 2
- **Líneas de código añadidas:** ~700
- **Build time:** ~21 segundos

### 🎯 Uso

```bash
# Desde la lista de informes
Click en "Imprimir PDF" → PDF se descarga automáticamente

# Desde el formulario (página 2)
Click en "Guardar e Imprimir" → Guarda + genera PDF
```

### 📝 Formato del Archivo PDF

**Nombre:** `Informe_Quirurgico_[Nombre_Paciente]_[Fecha].pdf`

**Ejemplo:** `Informe_Quirurgico_García_López_María_22-02-2026.pdf`

### ⚠️ Notas

- La generación del PDF puede tardar 1-3 segundos dependiendo de la complejidad
- El PDF se descarga directamente sin necesidad de preview
- El navegador puede bloquear la descarga si no tiene permisos
- El PDF es completamente autónomo y no requiere conexión

### 🐛 Correcciones

- Tipo de dato corregido con type assertion para compatibilidad TypeScript
- Import de Font eliminado (no utilizado)
- Build optimizado para producción

---

## [1.0.0] - 2026-02-22

### Implementación Inicial

- Sistema completo de Informes Quirúrgicos de Enfermería
- Formulario de 2 páginas
- Constantes vitales con gráficos
- Almacenamiento en localStorage
- 4 pacientes mock con cirugías precargadas
