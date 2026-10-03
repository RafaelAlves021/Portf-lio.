document.addEventListener('DOMContentLoaded', () => {
  // --- Efeito de Digitação no Terminal ---
  const nameLine = document.getElementById('typed-line');
  const roleLine = document.getElementById('line-role');
  const text = 'Rafael Alves';
  const role = 'estudante de ADS — em busca de estágio em TI';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    nameLine.textContent = text;
    roleLine.textContent = role;
  } else {
    let i = 0;
    function typeName() {
      if (i <= text.length) {
        nameLine.textContent = text.slice(0, i);
        i++;
        setTimeout(typeName, 60);
      } else {
        setTimeout(typeRole, 200);
      }
    }

    let j = 0;
    function typeRole() {
      if (j <= role.length) {
        roleLine.textContent = role.slice(0, j);
        j++;
        setTimeout(typeRole, 22);
      }
    }

    typeName();
  }

  // --- Array de Dados dos Projetos ---
  const projectsData = [
    {
      title: "X-Academia",
      tag: "landing page comercial",
      category: "landing",
      description: "Landing page desenvolvida e comercializada para uma academia real localizada em Magalhães Bastos (RJ). Conta com secção de modalidades, diferenciais, tabela de planos de assinatura, formulário de agendamento integrado com envio para o WhatsApp e mapa de localização.",
      techs: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Sistema de Delivery Web",
      tag: "full-stack / python",
      category: "backend",
      description: "Plataforma web de entrega desenvolvida em Python com o framework Django. O sistema conta com gestão completa de cardápio, fluxo de pedidos em tempo real, painel administrativo e autenticação de utilizadores baseada na arquitetura MVT.",
      techs: ["Python", "Django", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Barbearia do Feio",
      tag: "site institucional",
      category: "institutional",
      description: "Site para uma barbearia real em Magalhães Bastos (RJ), com sistema de marcação de horário e espaço para avaliação dos clientes. Paleta preto e branco old school e nomes de serviço com gíria carioca — \"disfarce\" em vez de degradê, \"nevou\" em vez de platinado.",
      techs: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    }
  ];

  // --- Renderização Dinâmica dos Projetos ---
  const container = document.getElementById('projects-container');

  function renderProjects(filter = 'all') {
    container.innerHTML = '';

    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
      const techsHTML = project.techs.map(tech => `<li>${tech}</li>`).join('');

      const article = document.createElement('article');
      article.className = 'project';
      article.setAttribute('data-category', project.category);

      article.innerHTML = `
        <div class="project-marker" aria-hidden="true"></div>
        <div class="project-content">
          <div class="project-top">
            <h3>${project.title}</h3>
            <span class="project-tag">${project.tag}</span>
          </div>
          <p class="project-desc">${project.description}</p>
          <ul class="project-tech">
            ${techsHTML}
          </ul>
        </div>
      `;

      container.appendChild(article);
    });
  }

  renderProjects();

  // --- Filtros Dinâmicos de Projetos ---
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      renderProjects(filterValue);
    });
  });
});