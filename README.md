# Sistema de Evaluaciones de Enfermería

Sistema completo de gestión de evaluaciones de enfermería incluyendo evaluaciones generales y informes quirúrgicos.

## Características

### Módulo de Evaluaciones de Enfermería
- Evaluaciones quirúrgicas cortas
- Evaluaciones CMA (Cirugía Mayor Ambulatoria)
- Gestión completa de pacientes
- Almacenamiento local persistente

### Módulo de Informe Quirúrgico de Enfermería
- **Página 1:**
  - Datos del paciente (precargados)
  - Sección de hospitalización (alergias, medicación habitual, PPCC)
  - Sección PRE-URPA
  - Checkboxes editables (retirada dispositivos, pruebas complementarias, verificaciones)
  - Datos de quirófano
  - Observaciones

- **Página 2:**
  - Constantes vitales (tabla editable con gráficos interactivos)
  - Datos URPA (fechas editables)
  - Órdenes y prescripciones médicas
  - Medicación administrada
  - Información adicional (vías venosas, vendajes, drenajes, etc.)
  - Firma y validación

## Tecnologías Utilizadas

- React 19
- TypeScript
- Vite
- Recharts (gráficos)
- date-fns (manejo de fechas)
- @react-pdf/renderer (generación de PDFs)
- LocalStorage (persistencia de datos)

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── surgical-sections/       # Secciones del formulario quirúrgico
│   │   ├── HospitalizationSection.tsx
│   │   ├── PreUrpaSection.tsx
│   │   ├── EditableSections.tsx
│   │   ├── QuirofanoSection.tsx
│   │   ├── ObservationsSection.tsx
│   │   ├── UrpaSection.tsx
│   │   ├── MedicalOrdersSection.tsx
│   │   ├── MedicationSection.tsx
│   │   ├── AdditionalFieldsSection.tsx
│   │   └── SignatureSection.tsx
│   ├── MainMenu.tsx              # Menú principal
│   ├── SurgicalReportsList.tsx   # Lista de informes quirúrgicos
│   ├── PatientSurgerySelectionModal.tsx
│   ├── SurgicalReportForm.tsx    # Formulario principal de informe quirúrgico
│   ├── VitalConstantsTable.tsx   # Tabla de constantes vitales
│   ├── VitalConstantsGraphs.tsx  # Gráficos de constantes
│   └── ...otros componentes de evaluaciones
├── data/
│   └── mockSurgicalData.ts       # Datos mock de pacientes y cirugías
├── types/
│   ├── surgicalReport.ts         # Tipos del informe quirúrgico
│   └── evaluation.ts             # Tipos de evaluaciones
├── utils/
│   └── vitalConstantsValidation.ts  # Validación de constantes vitales
├── App.tsx                       # Componente principal
├── App.css                       # Estilos globales
└── main.tsx                      # Punto de entrada
```

## Datos Mock

La aplicación incluye datos de ejemplo:
- 4 pacientes con información completa
- 4 cirugías asociadas a los pacientes
- Constantes vitales de planta prellenadas

## Funcionalidades Destacadas

### Generación de PDF
- **Imprimir desde la lista:** Botón "Imprimir PDF" en cada informe guardado
- **Guardar e Imprimir:** Botón en el formulario que guarda y genera PDF automáticamente
- **Formato profesional:** PDF de 2 páginas con diseño idéntico a las imágenes de referencia
- **Descarga automática:** El PDF se descarga con nombre descriptivo (Paciente_Fecha.pdf)

### Constantes Vitales
- Tabla editable con validación de rangos
- Gráficos interactivos (Presión Arterial, FC, SAT O2)
- Diferenciación entre datos de planta y quirófano
- Alertas visuales para valores anormales

### Navegación
- Menú principal intuitivo
- Navegación entre módulos sin perder datos
- Formulario multipágina (1/2)
- Botones de navegación contextuales

### Almacenamiento
- Persistencia automática en localStorage
- Claves separadas para cada módulo:
  - `nursingEvaluations`: Evaluaciones generales
  - `surgicalReports`: Informes quirúrgicos

## Uso

1. **Acceder al sistema:**
   - Al iniciar, verás el menú principal con dos opciones

2. **Crear un informe quirúrgico:**
   - Selecciona "Informe Quirúrgico de Enfermería"
   - Haz clic en "Nuevo Informe Quirúrgico"
   - Selecciona un paciente
   - Selecciona la intervención quirúrgica
   - Los datos se precargan automáticamente
   - Completa los campos editables
   - Navega entre las páginas con "Siguiente" y "Anterior"
   - Guarda el informe

3. **Editar/Eliminar informes:**
   - Accede a la lista de informes
   - Usa los botones "Editar" o "Eliminar"

## Campos Readonly vs Editables

### Campos NO Editables (readonly - fondo gris):
- Todos los datos del paciente
- Datos de hospitalización
- Datos PRE-URPA
- Datos de quirófano
- Anestesista y enfermera URPA

### Campos Editables:
- Todos los checkboxes de la página 1
- Observaciones página 1
- **Medicación Quirófano** (fondo amarillo claro)
- Constantes vitales (añadir/modificar)
- **Fechas de entrada/salida URPA** (precargadas, editables - fondo amarillo claro)
- Órdenes médicas
- Medicación administrada
- Campos adicionales (vías, vendajes, etc.)
- Nombre de enfermera responsable

## Validaciones

- Constantes vitales con rangos normales:
  - TAS: 90-140 mmHg
  - TAD: 60-90 mmHg
  - FC: 60-100 lpm
  - SAT O2: 95-100%
  - EVA: 0-10 puntos

- Alertas visuales:
  - Verde: Normal
  - Amarillo: Advertencia
  - Rojo: Peligro

## Notas de Desarrollo

- No hay conexión a backend (todo funciona con localStorage)
- Los datos mock son realistas y sirven para demostración
- El diseño sigue fielmente las imágenes de referencia proporcionadas
- Responsive básico implementado
- Proyecto listo para integrar con API REST

## Próximas Mejoras Sugeridas

- Integración con backend/API
- Generación de PDF del informe
- Firma digital
- Búsqueda y filtros avanzados
- Exportación de datos
- Gestión de usuarios y permisos
- Histórico de cambios
- Notificaciones
