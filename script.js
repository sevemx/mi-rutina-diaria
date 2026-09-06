/* =========================================================
   MI RUTINA DIARIA - VERSIÓN DINÁMICA
   =========================================================

   La rutina se guarda en:
   mi_rutina_config_v2

   El progreso de cada día se guarda independientemente.
   ========================================================= */


const STORAGE_ROUTINE = 'mi_rutina_config_v2';

const STORAGE_PROGRESS_PREFIX =
  'rutina_progreso_v2_';


/* =========================================================
   RUTINA ORIGINAL
   ========================================================= */

const DEFAULT_ROUTINE = [

  {
    id: 'morning',
    title: 'Mañana',
    emoji: '🌅',

    items: [

      {
        id: 'a1',
        emoji: '🐶',
        name: 'Sacar a los perros al baño y darles de comer',
        start: '07:00',
        end: '07:20'
      },

      {
        id: 'a2',
        emoji: '🍳',
        name: 'Desayunar',
        start: '07:20',
        end: '07:50'
      },

      {
        id: 'a3',
        emoji: '🍽️',
        name: 'Lavar los trastes',
        start: '07:50',
        end: '08:30'
      },

      {
        id: 'a4',
        emoji: '🪴',
        name: 'Regar las plantas',
        start: '08:30',
        end: '08:45'
      },

      {
        id: 'a5',
        emoji: '🧹',
        name: 'Lavar/limpiar el patio de los perros',
        start: '08:45',
        end: '09:20'
      },

      {
        id: 'a6',
        emoji: '🛏️',
        name: 'Hacer la cama',
        start: '09:20',
        end: '09:30'
      },

      {
        id: 'a7',
        emoji: '👕',
        name: 'Meter la ropa a la lavadora',
        start: '09:30',
        end: '09:35'
      },

      {
        id: 'a8',
        emoji: '🚿',
        name: 'Bañarme y arreglarme',
        start: '09:35',
        end: '10:05'
      },

      {
        id: 'a9',
        emoji: '💻',
        name: 'Publicidad / programación',
        start: '10:05',
        end: '11:00'
      },

      {
        id: 'a10',
        emoji: '🚗',
        name: 'Prepararme para salir, compras de despensa y salir a trabajar',
        start: '11:00',
        end: '12:00'
      }

    ]
  },


  {
    id: 'work',
    title: 'Trabajo',
    emoji: '🏢',

    items: [

      {
        id: 'a11',
        emoji: '🏢',
        name: 'Trabajo / compras / actividades externas',
        start: '12:00',
        end: '16:00'
      }

    ]
  },


  {
    id: 'afternoon',
    title: 'Tarde',
    emoji: '🌆',

    items: [

      {
        id: 'a12',
        emoji: '🏠',
        name: 'Llegar a casa y comer',
        start: '16:00',
        end: '16:30'
      },

      {
        id: 'a13',
        emoji: '🐶',
        name: 'Dar de comer a los perros',
        start: '16:30',
        end: '16:45'
      },

      {
        id: 'a14',
        emoji: '😌',
        name: 'Descansar',
        start: '16:45',
        end: '17:15'
      },

      {
        id: 'a15',
        emoji: '💻',
        name: 'Publicidad / programación',
        start: '17:15',
        end: '18:30'
      },

      {
        id: 'a16',
        emoji: '🧹',
        name: 'Pendientes de casa',
        start: '18:30',
        end: '19:00'
      },

      {
        id: 'a17',
        emoji: '🍽️',
        name: 'Cena',
        start: '19:00',
        end: '19:45'
      },

      {
        id: 'a18',
        emoji: '🐕',
        name: 'Pasear a los perros',
        start: '19:45',
        end: '20:15'
      }

    ]
  },


  {
    id: 'night',
    title: 'Noche',
    emoji: '🌙',

    items: [

      {
        id: 'a19',
        emoji: '🚿',
        name: 'Bañarme por la noche si lo necesito',
        start: '20:15',
        end: '20:45'
      },

      {
        id: 'a20',
        emoji: '📺',
        name: 'Ver televisión y relajarme',
        start: '20:45',
        end: '21:45'
      },

      {
        id: 'a21',
        emoji: '📋',
        name: 'Organizar el día siguiente y revisar pendientes',
        start: '21:45',
        end: '22:15'
      },

      {
        id: 'a22',
        emoji: '😌',
        name: 'Desconexión y preparación para dormir',
        start: '22:15',
        end: '23:00'
      },

      {
        id: 'a23',
        emoji: '😴',
        name: 'Hora objetivo para dormir',
        start: '23:00',
        end: '23:01'
      }

    ]
  }

];


/* =========================================================
   ELEMENTOS HTML
   ========================================================= */

const $ = id =>
  document.getElementById(id);


const els = {

  date: $('currentDate'),
  day: $('currentDay'),
  clock: $('clock'),

  percent: $('progressPercent'),
  fill: $('progressFill'),

  done: $('completedCount'),
  total: $('totalCount'),

  currentCard: $('currentActivityCard'),
  currentTime: $('currentActivityTime'),
  currentName: $('currentActivityName'),
  currentEmoji: $('currentActivityEmoji'),
  remaining: $('timeRemaining'),

  free: $('freeTimeCard'),
  freeText: $('freeTimeText'),

  nextCard: $('nextActivityCard'),
  nextTime: $('nextActivityTime'),
  nextName: $('nextActivityName'),
  nextEmoji: $('nextActivityEmoji'),

  container: $('activitiesContainer'),

  infoDone: $('infoCompleted'),
  infoTotal: $('infoTotal'),
  infoProgress: $('infoProgress'),
  infoNext: $('infoNext'),

  sleepTime: $('sleepTime'),
  infoSleep: $('infoSleep'),

  editorOverlay: $('editorOverlay'),
  editorSections: $('editorSections'),

  activityOverlay: $('activityOverlay'),

  sectionOverlay: $('sectionOverlay')

};


/* =========================================================
   ESTADO
   ========================================================= */

let routine =
  loadRoutine();


/* =========================================================
   UTILIDADES
   ========================================================= */

function clone(obj) {

  return JSON.parse(
    JSON.stringify(obj)
  );

}


function uid(prefix = 'id') {

  return (
    prefix +
    '_' +
    Date.now().toString(36) +
    '_' +
    Math.random()
      .toString(36)
      .slice(2, 8)
  );

}


function pad(n) {

  return String(n)
    .padStart(2, '0');

}


function toMinutes(time) {

  const [hours, minutes] =
    time.split(':').map(Number);

  return hours * 60 + minutes;

}


function duration(minutes) {

  if (minutes < 60) {

    return `${minutes} min`;

  }

  return `${Math.floor(minutes / 60)} h${
    minutes % 60
      ? ` ${minutes % 60} min`
      : ''
  }`;

}


/* =========================================================
   GUARDAR / CARGAR RUTINA
   ========================================================= */

function normalizeRoutine(data) {

  return data.map(
    (section, sectionIndex) => ({

      id:
        section.id ||
        uid('sec'),

      title:
        String(
          section.title ||
          `Sección ${sectionIndex + 1}`
        ),

      emoji:
        String(
          section.emoji ||
          '📌'
        ),

      items:
        Array.isArray(section.items)

          ? section.items.map(item => ({

              id:
                item.id ||
                uid('act'),

              emoji:
                String(
                  item.emoji ||
                  '📝'
                ),

              name:
                String(
                  item.name ||
                  'Actividad'
                ),

              start:
                item.start ||
                '08:00',

              end:
                item.end ||
                '08:30'

            }))

          : []

    })
  );

}


function saveRoutine(data = routine) {

  routine =
    normalizeRoutine(data);

  localStorage.setItem(
    STORAGE_ROUTINE,
    JSON.stringify(routine)
  );

}


function loadRoutine() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          STORAGE_ROUTINE
        )
      );

    if (
      saved &&
      Array.isArray(saved) &&
      saved.length
    ) {

      return normalizeRoutine(saved);

    }

  }

  catch (error) {

    console.warn(
      'No se pudo cargar la rutina.',
      error
    );

  }


  const fresh =
    clone(DEFAULT_ROUTINE);

  saveRoutine(fresh);

  return fresh;

}


/* =========================================================
   PROGRESO DIARIO
   ========================================================= */

function todayKey() {

  const d =
    new Date();

  return (
    `${d.getFullYear()}-` +
    `${pad(d.getMonth() + 1)}-` +
    `${pad(d.getDate())}`
  );

}


function progressKey() {

  return (
    STORAGE_PROGRESS_PREFIX +
    todayKey()
  );

}


function readProgress() {

  try {

    return JSON.parse(
      localStorage.getItem(
        progressKey()
      ) || '{}'
    );

  }

  catch (error) {

    return {};

  }

}


function writeProgress(data) {

  localStorage.setItem(
    progressKey(),
    JSON.stringify(data)
  );

}


/* =========================================================
   ACTIVIDADES
   ========================================================= */

function allItems() {

  return routine

    .flatMap(section =>

      section.items.map(item => ({

        ...item,

        sectionId:
          section.id,

        sectionTitle:
          section.title,

        sectionEmoji:
          section.emoji

      }))

    )

    .sort(
      (a, b) =>
        toMinutes(a.start) -
        toMinutes(b.start)
    );

}


function nowMinutes() {

  const d =
    new Date();

  return (
    d.getHours() * 60 +
    d.getMinutes()
  );

}


function currentOf(items, time) {

  return (

    items.find(item =>

      time >=
        toMinutes(item.start)

      &&

      time <
        toMinutes(item.end)

    ) || null

  );

}


function nextOf(items, time) {

  return (

    items

      .filter(
        item =>
          toMinutes(item.start) >
          time
      )

      .sort(
        (a, b) =>
          toMinutes(a.start) -
          toMinutes(b.start)
      )[0]

      || null

  );

}


function nextSleepTime() {

  const sleep =
    allItems().find(
      item =>
        /dormir/i.test(
          item.name
        )
    );

  return sleep
    ? sleep.start
    : '23:00';

}


/* =========================================================
   RELOJ
   ========================================================= */

function updateClock() {

  const d =
    new Date();

  els.clock.textContent =
    `${pad(d.getHours())}:` +
    `${pad(d.getMinutes())}:` +
    `${pad(d.getSeconds())}`;

  els.date.textContent =
    d.toLocaleDateString(
      'es-ES',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

  els.day.textContent =
    d.toLocaleDateString(
      'es-ES',
      {
        weekday: 'long'
      }
    );

}


/* =========================================================
   RENDER PRINCIPAL
   ========================================================= */

function render() {

  routine =
    loadRoutine();

  const items =
    allItems();

  const state =
    readProgress();

  const time =
    nowMinutes();

  const current =
    currentOf(
      items,
      time
    );

  const next =
    nextOf(
      items,
      time
    );


  const completed =
    items.reduce(

      (count, item) =>
        count +
        (state[item.id] ? 1 : 0),

      0

    );


  const percent =
    items.length
      ? Math.round(
          completed /
          items.length *
          100
        )
      : 0;


  updateClock();


  /* PROGRESO */

  els.percent.textContent =
    percent;

  els.fill.style.width =
    `${percent}%`;

  els.done.textContent =
    completed;

  els.total.textContent =
    items.length;

  els.infoDone.textContent =
    completed;

  els.infoTotal.textContent =
    items.length;

  els.infoProgress.textContent =
    percent;


  /* HORA DE DORMIR */

  const sleep =
    nextSleepTime();

  els.sleepTime.textContent =
    sleep;

  els.infoSleep.textContent =
    sleep;


  /* ACTIVIDAD ACTUAL */

  els.currentCard.hidden =
    !current;

  els.free.hidden =
    !!current;


  if (current) {

    els.currentTime.textContent =
      `${current.start} — ${current.end}`;

    els.currentName.textContent =
      current.name;

    els.currentEmoji.textContent =
      current.emoji;

    els.remaining.textContent =
      `Faltan ${
        duration(
          Math.max(
            1,
            toMinutes(current.end) -
            time
          )
        )
      }`;

  }


  /* TIEMPO LIBRE */

  if (!current) {

    els.freeText.textContent =
      next

        ? `La siguiente actividad comienza a las ${next.start}.`

        : 'No hay más actividades programadas.';

  }


  /* SIGUIENTE */

  els.nextCard.hidden =
    !next;


  if (next) {

    els.nextTime.textContent =
      `${next.start} — ${next.end}`;

    els.nextName.textContent =
      next.name;

    els.nextEmoji.textContent =
      next.emoji;

    els.infoNext.textContent =
      `${next.start} — ${next.name}`;

  }

  else {

    els.infoNext.textContent =
      '—';

  }


  renderActivities(
    items,
    state,
    time
  );

}


/* =========================================================
   MOSTRAR ACTIVIDADES
   ========================================================= */

function renderActivities(
  items,
  state,
  time
) {

  els.container.innerHTML =
    '';


  routine.forEach(
    sectionData => {

      const section =
        document.createElement(
          'section'
        );

      section.className =
        'section';


      const title =
        document.createElement(
          'div'
        );

      title.className =
        'section-title';

      title.textContent =
        `${sectionData.emoji} ${sectionData.title}`;

      section.appendChild(
        title
      );


      const sectionItems =
        items.filter(
          item =>
            item.sectionId ===
            sectionData.id
        );


      sectionItems.forEach(
        item => {

          const done =
            !!state[item.id];

          const current =
            currentOf(
              items,
              time
            );

          const isCurrent =
            current &&
            current.id ===
            item.id;

          const past =
            time >=
              toMinutes(item.end)
            &&
            !isCurrent;


          const card =
            document.createElement(
              'article'
            );

          card.className =
            `activity` +

            (done
              ? ' done'
              : '') +

            (isCurrent
              ? ' current'
              : '') +

            (past
              ? ' past'
              : '');


          card.innerHTML = `

            <button
              class="toggle"
              type="button"
              aria-label="Marcar actividad"
            >
              ${done ? '✓' : '○'}
            </button>

            <div class="activity-main">

              <h3 class="activity-title"></h3>

              <div class="activity-meta">

                <span class="pill">
                  ${item.start} — ${item.end}
                </span>

                <span class="pill">
                  ⏱ ${duration(
                    Math.max(
                      0,
                      toMinutes(item.end) -
                      toMinutes(item.start)
                    )
                  )}
                </span>

              </div>

            </div>

            <div class="status">

              ${
                done
                  ? 'COMPLETADA'
                  : isCurrent
                    ? 'ACTUAL'
                    : 'PENDIENTE'
              }

            </div>

          `;


          card.querySelector(
            '.activity-title'
          ).textContent =
            `${item.emoji} ${item.name}`;


          card.querySelector(
            '.toggle'
          ).addEventListener(
            'click',
            () => {

              const nextState =
                readProgress();

              nextState[item.id] =
                !nextState[item.id];

              writeProgress(
                nextState
              );

              render();

            }
          );


          section.appendChild(
            card
          );

        }
      );


      if (
        sectionItems.length === 0
      ) {

        const empty =
          document.createElement(
            'div'
          );

        empty.className =
          'empty-section';

        empty.textContent =
          'No hay actividades en esta sección.';

        section.appendChild(
          empty
        );

      }


      els.container.appendChild(
        section
      );

    }
  );

}


/* =========================================================
   ABRIR EDITOR
   ========================================================= */

function openEditor() {

  renderEditor();

  els.editorOverlay.hidden =
    false;

  document.body.classList.add(
    'modal-open'
  );

}


function closeEditor() {

  els.editorOverlay.hidden =
    true;

  document.body.classList.remove(
    'modal-open'
  );

}


/* =========================================================
   EDITOR
   ========================================================= */

function renderEditor() {

  els.editorSections.innerHTML =
    '';


  routine.forEach(
    section => {

      const box =
        document.createElement(
          'div'
        );

      box.className =
        'editor-section';

      box.dataset.sectionId =
        section.id;


      box.innerHTML = `

        <div class="editor-section-header">

          <div class="section-name-wrap">

            <span
              class="drag-handle"
              title="Arrastra para cambiar el orden"
            >
              ☷
            </span>

            <span class="section-emoji">
              ${section.emoji}
            </span>

            <div>

              <strong
                class="editor-section-title"
              ></strong>

              <small>
                ${section.items.length}
                ${
                  section.items.length === 1
                    ? 'actividad'
                    : 'actividades'
                }
              </small>

            </div>

          </div>


          <div class="editor-actions">

            <button
              class="mini-button add-activity"
              type="button"
            >
              ＋ Actividad
            </button>

            <button
              class="mini-button edit-section"
              type="button"
            >
              ✏️
            </button>

            <button
              class="mini-button delete-section danger"
              type="button"
            >
              🗑️
            </button>

          </div>

        </div>


        <div class="editor-items"></div>

      `;


      box.querySelector(
        '.editor-section-title'
      ).textContent =
        section.title;


      const itemsBox =
        box.querySelector(
          '.editor-items'
        );


      [...section.items]

        .sort(
          (a, b) =>
            toMinutes(a.start) -
            toMinutes(b.start)
        )

        .forEach(
          item => {

            const row =
              document.createElement(
                'div'
              );

            row.className =
              'editor-item';

            row.draggable =
              true;

            row.dataset.itemId =
              item.id;


            row.innerHTML = `

              <span
                class="drag-handle"
                title="Arrastra para cambiar el orden"
              >
                ⠿
              </span>

              <span class="editor-item-emoji">
                ${item.emoji}
              </span>

              <div class="editor-item-main">

                <strong
                  class="editor-item-name"
                ></strong>

                <span>
                  ${item.start} — ${item.end}
                  ·
                  ${duration(
                    Math.max(
                      0,
                      toMinutes(item.end) -
                      toMinutes(item.start)
                    )
                  )}
                </span>

              </div>

              <button
                class="mini-button edit-item"
                type="button"
              >
                ✏️
              </button>

              <button
                class="mini-button delete-item danger"
                type="button"
              >
                🗑️
              </button>

            `;


            row.querySelector(
              '.editor-item-name'
            ).textContent =
              item.name;


            row.querySelector(
              '.edit-item'
            ).addEventListener(
              'click',
              () =>
                openActivityForm(
                  section.id,
                  item.id
                )
            );


            row.querySelector(
              '.delete-item'
            ).addEventListener(
              'click',
              () =>
                deleteActivity(
                  section.id,
                  item.id
                )
            );


            addItemDragHandlers(
              row
            );


            itemsBox.appendChild(
              row
            );

          }
        );


      box.querySelector(
        '.add-activity'
      ).addEventListener(
        'click',
        () =>
          openActivityForm(
            section.id
          )
      );


      box.querySelector(
        '.edit-section'
      ).addEventListener(
        'click',
        () =>
          editSection(
            section.id
          )
      );


      box.querySelector(
        '.delete-section'
      ).addEventListener(
        'click',
        () =>
          deleteSection(
            section.id
          )
      );


      addSectionDragHandlers(
        box
      );


      els.editorSections.appendChild(
        box
      );

    }
  );

}


/* =========================================================
   ARRASTRAR ACTIVIDADES
   ========================================================= */

function addItemDragHandlers(row) {

  row.addEventListener(
    'dragstart',
    event => {

      event.dataTransfer.setData(
        'text/plain',
        row.dataset.itemId
      );

      event.dataTransfer.effectAllowed =
        'move';

      row.classList.add(
        'dragging'
      );

    }
  );


  row.addEventListener(
    'dragend',
    () => {

      row.classList.remove(
        'dragging'
      );

    }
  );


  row.addEventListener(
    'dragover',
    event => {

      event.preventDefault();

      const dragging =
        els.editorSections.querySelector(
          '.editor-item.dragging'
        );

      if (
        !dragging ||
        dragging === row
      ) {
        return;
      }


      const box =
        row.parentElement;

      const rect =
        row.getBoundingClientRect();


      box.insertBefore(

        dragging,

        event.clientY <
          rect.top +
          rect.height / 2

          ? row

          : row.nextSibling

      );

    }
  );


  row.addEventListener(
    'drop',
    event => {

      event.preventDefault();

      syncEditorOrder();

    }
  );

}


/* =========================================================
   ARRASTRAR SECCIONES
   ========================================================= */

function addSectionDragHandlers(
  box
) {

  box.addEventListener(
    'dragstart',
    event => {

      if (
        !event.target.classList.contains(
          'editor-section'
        )
      ) {
        return;
      }


      event.dataTransfer.setData(
        'section',
        box.dataset.sectionId
      );

      box.classList.add(
        'dragging-section'
      );

    }
  );


  box.addEventListener(
    'dragend',
    () => {

      box.classList.remove(
        'dragging-section'
      );

    }
  );


  box.addEventListener(
    'dragover',
    event => {

      if (
        event.target.closest(
          '.editor-item'
        )
      ) {
        return;
      }


      event.preventDefault();


      const dragging =
        els.editorSections.querySelector(
          '.dragging-section'
        );


      if (
        !dragging ||
        dragging === box
      ) {
        return;
      }


      const rect =
        box.getBoundingClientRect();


      els.editorSections.insertBefore(

        dragging,

        event.clientY <
          rect.top +
          rect.height / 2

          ? box

          : box.nextSibling

      );

    }
  );


  box.setAttribute(
    'draggable',
    'true'
  );

}


/* =========================================================
   GUARDAR ORDEN DEL EDITOR
   ========================================================= */

function syncEditorOrder() {

  document
    .querySelectorAll(
      '.editor-section'
    )
    .forEach(box => {

      const section =
        routine.find(
          s =>
            s.id ===
            box.dataset.sectionId
        );

      if (!section) {
        return;
      }


      const ids =
        [
          ...box.querySelectorAll(
            '.editor-item'
          )
        ].map(
          element =>
            element.dataset.itemId
        );


      const map =
        new Map(
          section.items.map(
            item =>
              [item.id, item]
          )
        );


      section.items =
        ids
          .map(
            id =>
              map.get(id)
          )
          .filter(Boolean);

    });


  saveRoutine();

}


/* =========================================================
   FORMULARIO DE ACTIVIDAD
   ========================================================= */

function populateSectionSelect(
  selected
) {

  const select =
    $('activitySection');

  select.innerHTML =
    '';


  routine.forEach(
    section => {

      const option =
        document.createElement(
          'option'
        );

      option.value =
        section.id;

      option.textContent =
        `${section.emoji} ${section.title}`;

      option.selected =
        section.id === selected;

      select.appendChild(
        option
      );

    }
  );

}


function openActivityForm(
  sectionId,
  activityId = null
) {

  populateSectionSelect(
    sectionId ||
    routine[0]?.id
  );


  $('editActivityId').value =
    activityId || '';

  $('activitySectionId').value =
    sectionId || '';


  if (activityId) {

    const section =
      routine.find(
        s =>
          s.id ===
          sectionId
      );


    const item =
      section?.items.find(
        i =>
          i.id ===
          activityId
      );


    if (!item) {
      return;
    }


    $('formEyebrow').textContent =
      'Editar actividad';

    $('formTitle').textContent =
      'Modificar actividad';

    $('activityName').value =
      item.name;

    $('activityEmoji').value =
      item.emoji;

    $('activityStart').value =
      item.start;

    $('activityEnd').value =
      item.end;

    $('activitySection').value =
      sectionId;

  }

  else {

    $('formEyebrow').textContent =
      'Nueva actividad';

    $('formTitle').textContent =
      'Agregar actividad';

    $('activityName').value =
      '';

    $('activityEmoji').value =
      '📝';

    $('activityStart').value =
      '08:00';

    $('activityEnd').value =
      '08:30';

  }


  $('formError').hidden =
    true;


  els.activityOverlay.hidden =
    false;

  document.body.classList.add(
    'modal-open'
  );


  setTimeout(
    () =>
      $('activityName').focus(),
    50
  );

}


function closeActivityForm() {

  els.activityOverlay.hidden =
    true;

  document.body.classList.remove(
    'modal-open'
  );

}


/* =========================================================
   GUARDAR ACTIVIDAD
   ========================================================= */

function saveActivityFromForm(
  event
) {

  event.preventDefault();


  const name =
    $('activityName')
      .value
      .trim();

  const emoji =
    $('activityEmoji')
      .value
      .trim()
      || '📝';

  const start =
    $('activityStart')
      .value;

  const end =
    $('activityEnd')
      .value;

  const sectionId =
    $('activitySection')
      .value;

  const error =
    $('formError');


  if (
    !name ||
    !start ||
    !end
  ) {

    error.textContent =
      'Completa todos los campos.';

    error.hidden =
      false;

    return;

  }


  if (
    toMinutes(end) <=
    toMinutes(start)
  ) {

    error.textContent =
      'La hora de finalización debe ser posterior a la hora de inicio.';

    error.hidden =
      false;

    return;

  }


  const oldSectionId =
    $('activitySectionId').value;

  const id =
    $('editActivityId').value;


  /* EDITAR */

  if (id) {

    const oldSection =
      routine.find(
        s =>
          s.id ===
          oldSectionId
      );


    const item =
      oldSection?.items.find(
        i =>
          i.id ===
          id
      );


    if (item) {

      item.name =
        name;

      item.emoji =
        emoji;

      item.start =
        start;

      item.end =
        end;


      if (
        oldSectionId !==
        sectionId
      ) {

        oldSection.items =
          oldSection.items.filter(
            i =>
              i.id !== id
          );


        routine
          .find(
            s =>
              s.id ===
              sectionId
          )
          .items
          .push(item);

      }

    }

  }


  /* NUEVA */

  else {

    routine
      .find(
        s =>
          s.id ===
          sectionId
      )
      .items
      .push({

        id:
          uid('act'),

        emoji,

        name,

        start,

        end

      });

  }


  /* ORDENAR */

  routine.forEach(
    section => {

      section.items.sort(
        (a, b) =>
          toMinutes(a.start) -
          toMinutes(b.start)
      );

    }
  );


  saveRoutine();

  closeActivityForm();

  renderEditor();

  render();

}


/* =========================================================
   SECCIONES
   ========================================================= */

function openSectionForm() {

  $('sectionName').value =
    '';

  $('sectionEmoji').value =
    '📌';


  els.sectionOverlay.hidden =
    false;

  document.body.classList.add(
    'modal-open'
  );


  setTimeout(
    () =>
      $('sectionName').focus(),
    50
  );

}


function closeSectionForm() {

  els.sectionOverlay.hidden =
    true;

  document.body.classList.remove(
    'modal-open'
  );

}


function createSection(
  event
) {

  event.preventDefault();


  const title =
    $('sectionName')
      .value
      .trim();

  const emoji =
    $('sectionEmoji')
      .value
      .trim()
      || '📌';


  if (!title) {
    return;
  }


  routine.push({

    id:
      uid('sec'),

    title,

    emoji,

    items: []

  });


  saveRoutine();

  closeSectionForm();

  renderEditor();

  render();

}


function editSection(
  sectionId
) {

  const section =
    routine.find(
      s =>
        s.id ===
        sectionId
    );


  if (!section) {
    return;
  }


  const title =
    prompt(
      'Nombre de la sección:',
      section.title
    );


  if (title === null) {
    return;
  }


  const clean =
    title.trim();


  if (!clean) {

    alert(
      'El nombre no puede quedar vacío.'
    );

    return;

  }


  const emoji =
    prompt(
      'Emoji de la sección:',
      section.emoji
    );


  section.title =
    clean;


  if (
    emoji !== null &&
    emoji.trim()
  ) {

    section.emoji =
      emoji.trim();

  }


  saveRoutine();

  renderEditor();

  render();

}


function deleteSection(
  sectionId
) {

  const section =
    routine.find(
      s =>
        s.id ===
        sectionId
    );


  if (!section) {
    return;
  }


  const message =
    section.items.length

      ? `La sección "${section.title}" contiene ${section.items.length} actividades. ¿Eliminarla y todas sus actividades?`

      : `¿Eliminar la sección "${section.title}"?`;


  if (
    !confirm(message)
  ) {
    return;
  }


  routine =
    routine.filter(
      s =>
        s.id !==
        sectionId
    );


  saveRoutine();

  renderEditor();

  render();

}


/* =========================================================
   ELIMINAR ACTIVIDAD
   ========================================================= */

function deleteActivity(
  sectionId,
  itemId
) {

  const section =
    routine.find(
      s =>
        s.id ===
        sectionId
    );


  const item =
    section?.items.find(
      i =>
        i.id ===
        itemId
    );


  if (
    !item ||
    !confirm(
      `¿Eliminar "${item.name}"?`
    )
  ) {
    return;
  }


  section.items =
    section.items.filter(
      i =>
        i.id !==
        itemId
    );


  const progress =
    readProgress();


  delete progress[itemId];

  writeProgress(
    progress
  );


  saveRoutine();

  renderEditor();

  render();

}


/* =========================================================
   EXPORTAR
   ========================================================= */

function exportRoutine() {

  const data = {

    app:
      'Mi Rutina Diaria',

    version:
      2,

    exportedAt:
      new Date().toISOString(),

    routine

  };


  const blob =
    new Blob(

      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],

      {
        type:
          'application/json'
      }

    );


  const url =
    URL.createObjectURL(
      blob
    );


  const a =
    document.createElement(
      'a'
    );

  a.href =
    url;

  a.download =
    `mi-rutina-${todayKey()}.json`;

  a.click();


  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   IMPORTAR
   ========================================================= */

function importRoutine(
  file
) {

  const reader =
    new FileReader();


  reader.onload =
    () => {

      try {

        const parsed =
          JSON.parse(
            reader.result
          );


        const data =
          Array.isArray(parsed)
            ? parsed
            : parsed.routine;


        if (
          !Array.isArray(data) ||
          !data.length
        ) {

          throw new Error();

        }


        routine =
          normalizeRoutine(
            data
          );


        routine.forEach(
          section => {

            section.items.sort(
              (a, b) =>
                toMinutes(a.start) -
                toMinutes(b.start)
            );

          }
        );


        saveRoutine();

        renderEditor();

        render();


        alert(
          'Rutina importada correctamente.'
        );

      }

      catch (error) {

        alert(
          'No se pudo importar el archivo. Verifica que sea un archivo JSON exportado por esta aplicación.'
        );

      }

    };


  reader.readAsText(
    file
  );

}


/* =========================================================
   RESTAURAR RUTINA ORIGINAL
   ========================================================= */

function restoreDefault() {

  if (
    !confirm(
      'Esto reemplazará tu rutina personalizada por la rutina original. ¿Continuar?'
    )
  ) {
    return;
  }


  routine =
    clone(
      DEFAULT_ROUTINE
    );


  saveRoutine();

  renderEditor();

  render();

}


/* =========================================================
   EVENTOS
   ========================================================= */

$('editBtn')
  .addEventListener(
    'click',
    openEditor
  );


$('closeEditorBtn')
  .addEventListener(
    'click',
    closeEditor
  );


$('addSectionBtn')
  .addEventListener(
    'click',
    openSectionForm
  );


$('exportBtn')
  .addEventListener(
    'click',
    exportRoutine
  );


$('restoreBtn')
  .addEventListener(
    'click',
    restoreDefault
  );


$('importInput')
  .addEventListener(
    'change',
    event => {

      if (
        event.target.files[0]
      ) {

        importRoutine(
          event.target.files[0]
        );

      }

      event.target.value =
        '';

    }
  );


$('activityForm')
  .addEventListener(
    'submit',
    saveActivityFromForm
  );


$('closeActivityBtn')
  .addEventListener(
    'click',
    closeActivityForm
  );


$('cancelActivityBtn')
  .addEventListener(
    'click',
    closeActivityForm
  );


$('activitySection')
  .addEventListener(
    'change',
    event => {

      $('activitySectionId')
        .value =
        event.target.value;

    }
  );


$('sectionForm')
  .addEventListener(
    'submit',
    createSection
  );


$('closeSectionBtn')
  .addEventListener(
    'click',
    closeSectionForm
  );


$('cancelSectionBtn')
  .addEventListener(
    'click',
    closeSectionForm
  );


$('resetBtn')
  .addEventListener(
    'click',
    () => {

      if (
        confirm(
          '¿Quieres reiniciar las actividades de hoy?'
        )
      ) {

        localStorage.removeItem(
          progressKey()
        );

        render();

      }

    }
  );


/* Cerrar modal tocando fuera */

[
  els.editorOverlay,
  els.activityOverlay,
  els.sectionOverlay

].forEach(
  overlay => {

    overlay.addEventListener(
      'click',
      event => {

        if (
          event.target !==
          overlay
        ) {
          return;
        }


        if (
          overlay ===
          els.editorOverlay
        ) {

          closeEditor();

        }


        if (
          overlay ===
          els.activityOverlay
        ) {

          closeActivityForm();

        }


        if (
          overlay ===
          els.sectionOverlay
        ) {

          closeSectionForm();

        }

      }
    );

  }
);


/* ESC */

document.addEventListener(
  'keydown',
  event => {

    if (
      event.key ===
      'Escape'
    ) {

      closeActivityForm();

      closeSectionForm();

      closeEditor();

    }

  }
);


/* =========================================================
   INICIO
   ========================================================= */

render();


/* Reloj */

setInterval(
  updateClock,
  1000
);


/* Actualizar actividad */

setInterval(
  render,
  30000
);


/* Cuando regresamos a la aplicación */

document.addEventListener(
  'visibilitychange',
  () => {

    if (
      !document.hidden
    ) {

      render();

    }

  }
);