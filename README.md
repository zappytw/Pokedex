# 🔍 Pokedex App

Una aplicación web moderna y dinámica para explorar el mundo Pokémon, construida con **JavaScript Vanilla**. Este proyecto consume la [PokéAPI](https://pokeapi.co/) para ofrecer datos en tiempo real, estadísticas detalladas y una experiencia de usuario fluida con animaciones personalizadas.

## ✨ Características Actuales

- **Carga Eficiente:** Uso de `localStorage` para almacenar la lista de Pokémon y reducir las peticiones a la API.
- **Búsqueda Avanzada:** Filtrado en tiempo real por nombre o ID.
- **Interfaz Responsiva:** Diseño adaptativo que incluye un sistema de paginación (50 Pokémon por página).
- **Panel Detallado (SidePanel):** - Visualización de tipos con colores dinámicos.
  - Gráficos de barras de estadísticas base con gradientes de color según el valor.
  - Sistema de efectos de sonido (Cries y efectos Shiny).
  - Visualización de variantes Shiny con animaciones de destellos.
- **Feedback Visual:** Spinners de carga y animaciones de "squish" al interactuar con las imágenes.

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura semántica.
* **CSS3** - Variables personalizadas (`:root`), animaciones y Flexbox/Grid.
* **JavaScript (ES6+)** - Manipulación del DOM, Fetch API y Programación Asíncrona.
* **PokéAPI** - Fuente de datos externa.

## 📸 Previsualización de la Interfaz

> [!TIP]
> Haz clic en cualquier tarjeta de Pokémon para abrir el panel lateral y ver sus estadísticas detalladas y escuchar su rugido.

---

## 🗺️ Roadmap de Implementaciones Futuras

Este proyecto está en constante evolución. A continuación, las funcionalidades planeadas para las próximas versiones:

### 🧬 Soporte Multi-Forma (Sidepanel Dinámico)
- [ ] **Soporte para Formas Mega:** Evoluciones temporales con cambio de stats y tipos.
- [ ] **Soporte para Formas Regionales:** Inclusión de variantes de Alola, Galar, Hisui y Paldea.
- [ ] **Soporte para Formas Alternas:** Manejo de cambios estéticos y técnicos (ej. Rotom, Deoxys).
- [ ] **Actualización en Tiempo Real:** El panel cambiará automáticamente estadísticas y tipos al conmutar entre formas.

### 📚 Información Expandida
- [ ] **Habilidades (Abilities):** Mostrar descripción y efectos de las habilidades.
- [ ] **Entradas de la Pokédex:** Descripciones individuales para cada Pokémon
- [ ] **Línea Evolutiva:** Mapa visual de cómo evoluciona el Pokémon actual.

### 🎒 Utilidades de Entrenador
- [ ] **Sistema de Favoritos:** Guardar Pokémon preferidos usando `LocalStorage`.
- [ ] **Constructor de Equipos (Team Builder):** Crear, nombrar y guardar equipos de 6 Pokémon.
- [ ] **Análisis de Tipos:** Mostrar fortalezas y debilidades (Type Effectiveness) en el panel.

### ⚔️ Módulos de Combate
- [ ] **Calculadora de Daño:** Herramienta para medir el impacto de movimientos entre dos Pokémon.

### 🎨 Mejoras de UI/UX
- [ ] **Modo Oscuro/Claro:** Soporte para temas personalizados.
- [ ] **Filtros Avanzados:** Filtrar por tipo, generación o hábitat.

---

## ⚙️ Instalación y Uso
1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/nombre-de-tu-repo.git](https://github.com/tu-usuario/nombre-de-tu-repo.git)
   ```
2. Abre el archivo index.html en tu navegador o usa una extensión como Live Server en VS Code.
1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/nombre-de-tu-repo.git](https://github.com/tu-usuario/nombre-de-tu-repo.git)
