"use strict";

const translations = {
  uk: {
    heroTitle: "Максим",
    heroText: "Студент, який поєднує аналітичний підхід до програмування з інтересом до візуального мистецтва та створення контенту.",
    projectsLink: "Перейти до проєктів",
    navHome: "Головна",
    navContacts: "Контакти",
    themeButton: "Тема",
    aboutTitle: "Про мене",
    aboutText: "Навчаюся в КПІ. Захоплююсь штучним інтелектом, біоінформатикою, а також фотографією та відеомонтажем. Вільний час проводжу в тренажерному залі, граю в баскетбол, катаюсь на роликах або організовую тематичні кіновечори для друзів.",
    projectsTitle: "Проєкти",
    shownLabel: "Показано:",
    allTag: "Усі",
    detailsButton: "Деталі",
    repoLink: "Репозиторій",
    footerText: "Портфоліо студента.",
    footerContacts: "Відкрити контакти",
    contactsTitle: "Контакти",
    contactsText: "Тут зібрані основні способи зв'язку зі мною.",
    contactsListTitle: "Основні контакти",
    backHome: "Повернутися на головну",
    pageTitleIndex: "Портфоліо студента | Максим",
    pageTitleContacts: "Контакти | Максим",
    projects: [
      {
        id: 1,
        title: "ШІ та Біоінформатика",
        description: "Роботи з обробки генетичних даних.",
        details: "Проєкти включають обробку генетичних послідовностей, нормалізацію даних для моделей машинного навчання та створення Telegram-ботів для взаємодії.",
        tags: ["Python", "AI", "Data"]
      },
      {
        id: 2,
        title: "Фотографія",
        description: "Зйомки у різних жанрах: від портретів до репортажів.",
        details: "Досвід роботи з різними умовами освітлення, композицією та кольором. Проведення індивідуальних, студійних та вуличних фотосесій.",
        tags: ["Photo", "Art"]
      },
      {
        id: 3,
        title: "Відеомонтаж",
        description: "Створення та монтаж динамічних відеороликів.",
        details: "Робота з кольорокорекцією, звуком, додавання ефектів та переходів. Монтаж відео різної складності для соціальних мереж та особистих архівів.",
        tags: ["Video", "Editing"]
      }
    ]
  },
  en: {
    heroTitle: "Maksym",
    heroText: "A student who combines an analytical approach to programming with an interest in visual arts and content creation.",
    projectsLink: "Go to projects",
    navHome: "Home",
    navContacts: "Contacts",
    themeButton: "Theme",
    aboutTitle: "About me",
    aboutText: "Studying at KPI. I'm interested in Artificial Intelligence, Bioinformatics, as well as photography and video editing. I spend my free time at the gym, playing basketball, rollerblading, or organizing movie nights for friends.",
    projectsTitle: "Projects",
    shownLabel: "Shown:",
    allTag: "All",
    detailsButton: "Details",
    repoLink: "Repository",
    footerText: "Student portfolio.",
    footerContacts: "Open contacts",
    contactsTitle: "Contacts",
    contactsText: "Here you can find the main ways to contact me.",
    contactsListTitle: "Main contacts",
    backHome: "Back to home",
    pageTitleIndex: "Student Portfolio | Maksym",
    pageTitleContacts: "Contacts | Maksym",
    projects: [
      {
        id: 1,
        title: "AI & Bioinformatics",
        description: "Work on genetic data processing.",
        details: "Projects include processing genetic sequences, normalizing data for machine learning models, and building Telegram bots.",
        tags: ["Python", "AI", "Data"]
      },
      {
        id: 2,
        title: "Photography",
        description: "Shooting in various genres: from portraits to reportage.",
        details: "Experience working with different lighting conditions, composition, and color. Conducting individual, studio, and street photoshoots.",
        tags: ["Photo", "Art"]
      },
      {
        id: 3,
        title: "Video Editing",
        description: "Creating and editing dynamic videos.",
        details: "Working with color grading, sound, adding effects and transitions. Editing videos of varying complexity for social media and personal archives.",
        tags: ["Video", "Editing"]
      }
    ]
  }
};

let currentLanguage = localStorage.getItem("language") || "uk";
let currentTheme = localStorage.getItem("theme") || "light";
let selectedTag = "all";
let currentModalProjectId = null;

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLanguage();
  initProjects();
  initModal();
  initBackToTop();
});

function initTheme() {
  const themeButton = document.getElementById("themeToggle");

  applyTheme();

  if (!themeButton) {
    return;
  }

  themeButton.addEventListener("click", function () {
    if (currentTheme === "light") {
      currentTheme = "dark";
    } else {
      currentTheme = "light";
    }

    localStorage.setItem("theme", currentTheme);
    applyTheme();
  });
}

function applyTheme() {
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function initLanguage() {
  const buttons = document.querySelectorAll("[data-lang]");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentLanguage = button.dataset.lang;
      localStorage.setItem("language", currentLanguage);
      applyLanguage();
      renderTagButtons();
      renderProjects();
      refreshModal();
      updateLanguageButtons();
    });
  });

  applyLanguage();
  updateLanguageButtons();
}

function applyLanguage() {
  const page = document.body.dataset.page;
  const currentTexts = translations[currentLanguage];
  const elements = document.querySelectorAll("[data-i18n]");

  document.documentElement.lang = currentLanguage;

  if (page === "index") {
    document.title = currentTexts.pageTitleIndex;
  }

  if (page === "contacts") {
    document.title = currentTexts.pageTitleContacts;
  }

  elements.forEach(function (element) {
    const key = element.dataset.i18n;
    element.textContent = currentTexts[key];
  });
}

function updateLanguageButtons() {
  const buttons = document.querySelectorAll("[data-lang]");

  buttons.forEach(function (button) {
    if (button.dataset.lang === currentLanguage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function initProjects() {
  if (!document.getElementById("projectGrid")) {
    return;
  }

  renderTagButtons();
  renderProjects();
}

function getProjects() {
  return translations[currentLanguage].projects;
}

function renderTagButtons() {
  const tagList = document.getElementById("tagList");
  const projects = getProjects();
  const tags = ["all"];

  projects.forEach(function (project) {
    project.tags.forEach(function (tag) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  tagList.innerHTML = "";

  tags.forEach(function (tag) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-button";
    button.dataset.tag = tag;

    if (tag === "all") {
      button.textContent = translations[currentLanguage].allTag;
    } else {
      button.textContent = tag;
    }

    if (tag === selectedTag) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      selectedTag = tag;
      renderTagButtons();
      renderProjects();
    });

    tagList.appendChild(button);
  });
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const resultCount = document.getElementById("resultCount");

  if (!grid || !resultCount) {
    return;
  }

  const projects = getProjects();
  let filteredProjects = projects;

  if (selectedTag !== "all") {
    filteredProjects = projects.filter(function (project) {
      return project.tags.includes(selectedTag);
    });
  }

  resultCount.textContent = filteredProjects.length + " / " + projects.length;
  grid.innerHTML = "";

  filteredProjects.forEach(function (project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const tagsHtml = project.tags.map(function (tag) {
      return '<span class="project-tag">' + tag + "</span>";
    }).join("");

    article.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-actions">
        <button type="button" data-id="${project.id}">${translations[currentLanguage].detailsButton}</button>
      </div>
    `;

    const button = article.querySelector("button");
    button.addEventListener("click", function () {
      openModal(project.id);
    });

    grid.appendChild(article);
  });
}

function initModal() {
  const modal = document.getElementById("projectModal");
  const closeButton = document.getElementById("modalClose");
  const overlay = document.getElementById("modalOverlay");

  if (!modal || !closeButton || !overlay) {
    return;
  }

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDetails = document.getElementById("modalDetails");
  const modalRepo = document.getElementById("modalRepo");
  const project = getProjects().find(function (item) {
    return item.id === projectId;
  });

  if (!modal || !project) {
    return;
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.textContent = project.details;
  modalRepo.href = "https://github.com/maksym"; 
  modal.classList.add("open");
  currentModalProjectId = projectId;
}

function closeModal() {
  const modal = document.getElementById("projectModal");

  if (modal) {
    modal.classList.remove("open");
  }

  currentModalProjectId = null;
}

function refreshModal() {
  if (currentModalProjectId !== null) {
    openModal(currentModalProjectId);
  }
}

function initBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  });

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}