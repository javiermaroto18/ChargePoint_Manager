# ⚡ ChargePoint Manager

Sistema de gestión de infraestructura de carga para vehículos eléctricos. Landing page moderna y responsive construida con React, TypeScript y Tailwind CSS.

## 🚀 Estado del Proyecto

- ✅ **Servidor de desarrollo funcionando**
- ✅ **Todas las pruebas pasando (29/29)**
- ✅ **Componentes validados**
- ✅ **Diseño responsive implementado**

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

## 🛠️ Instalación

\`\`\`bash
# Instalar dependencias
npm install
\`\`\`

## 🎯 Scripts Disponibles

### Desarrollo

\`\`\`bash
# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev
\`\`\`

### Testing

\`\`\`bash
# Ejecutar tests una vez
npx vitest run

# Ejecutar tests en modo watch
npm test

# Ejecutar tests con interfaz visual
npm run test:ui

# Ejecutar tests con reporte de cobertura
npm run test:coverage
\`\`\`

### Producción

\`\`\`bash
# Compilar para producción
npm run build

# Preview del build de producción
npm run preview

# Linting
npm run lint
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
ChargePoint_Manager/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.tsx       # Barra de navegación
│   │   ├── Hero.tsx         # Sección hero principal
│   │   ├── Features.tsx     # Características del producto
│   │   └── Footer.tsx       # Pie de página
│   ├── tests/              # Pruebas unitarias
│   │   ├── setup.ts        # Configuración de testing
│   │   ├── Navbar.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── Features.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── App.test.tsx
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── vitest.config.ts        # Configuración de Vitest
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
└── package.json
\`\`\`

## 🧪 Testing

El proyecto incluye 29 pruebas unitarias que cubren todos los componentes:

- **Navbar**: 4 tests
- **Hero**: 8 tests
- **Features**: 6 tests
- **Footer**: 6 tests
- **App**: 5 tests

### Tecnologías de Testing

- **Vitest**: Framework de testing
- **@testing-library/react**: Utilidades de testing para React
- **@testing-library/jest-dom**: Matchers adicionales
- **@testing-library/user-event**: Simulación de eventos de usuario
- **jsdom**: Entorno DOM simulado

## 🎨 Tecnologías

### Core

- **React** 19.2.0 - Biblioteca de UI
- **TypeScript** 5.9.3 - Superset tipado de JavaScript
- **Vite** 7.2.4 - Build tool y dev server

### Estilos

- **Tailwind CSS** 4.1.18 - Framework de CSS utility-first
- **@tailwindcss/postcss** - Plugin PostCSS para Tailwind v4
- **PostCSS** 8.5.6 - Procesador CSS
- **Autoprefixer** 10.4.23 - Añade prefijos CSS automáticamente

### UI/UX

- **lucide-react** 0.562.0 - Iconos SVG
- **@tailwindcss/forms** 0.5.11 - Estilos mejorados para formularios

### Desarrollo

- **ESLint** - Linter de código
- **TypeScript ESLint** - Reglas de ESLint para TypeScript

## 🌟 Características

### ✅ Implementadas

- 🎨 Diseño moderno y minimalista
- 📱 Totalmente responsive
- ⚡ Rendimiento optimizado con Vite
- 🧪 Suite completa de tests
- 🎯 TypeScript para seguridad de tipos
- 🌈 Efectos visuales con gradientes y blur
- ♿ Accesibilidad básica implementada

### 🔄 En Desarrollo

- 🔐 Sistema de autenticación
- 📊 Dashboard de administración
- 🗺️ Navegación con React Router
- 📝 Validación de formularios
- 🌐 Internacionalización (i18n)

## 📊 Resultados de Tests

\`\`\`
Test Files  5 passed (5)
     Tests  29 passed (29)
  Duration  5.23s
\`\`\`

## 🐛 Problemas Resueltos

### Tailwind CSS v4 Compatibility

**Problema**: Error con PostCSS plugin de Tailwind CSS v4

**Solución**:
- ✅ Instalado \`@tailwindcss/postcss\`
- ✅ Actualizado \`postcss.config.js\`
- ✅ Migrado CSS a sintaxis de Tailwind v4

## 📝 Documentación Adicional

- [ANALISIS_COMPONENTES.md](./ANALISIS_COMPONENTES.md) - Análisis detallado de componentes y arquitectura

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

---

**Última actualización**: 16 de enero de 2026
**Versión**: 0.0.0
**Autor**: Javier - 2ºDAWE DWEC
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
