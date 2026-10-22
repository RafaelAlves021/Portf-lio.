document.addEventListener('DOMContentLoaded', () => {
  // --- Efeito de Digitação no Terminal ---
  const nameLine = document.getElementById('typed-line');
  const roleLine = document.getElementById('line-role');
  const text = 'Rafael Alves';
  const role = 'Estudante de Análise e Desenvolvimentos de Sistemas';

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
  // Adicionamos a propriedade "link" a cada objeto.
  const projectsData = [
    {
      title: "Espaço Natália Moraes",
      tag: "landing page comercial",
      category: "landing",
      description: "Landing page premium desenvolvida para um salão de beleza em Benfica (RJ), especialista em alisamento e cachos. O site conta com catálogo de serviços, apresentação da equipa, área de depoimentos e integração direta com WhatsApp para agendamentos e venda de cosméticos.",
      techs: ["HTML", "CSS", "JavaScript"],
      link: "https://espaconataliamoraes.com.br/"
    },
    {
      title: "Studio Carla Gonçalves",
      tag: "landing page comercial",
      category: "landing",
      description: "Site desenvolvido para um studio de estética em Magalhães Bastos (RJ), focado em cílios e sobrancelhas. O projeto possui um design sofisticado, galeria de resultados antes e depois, catálogo de procedimentos detalhado e botões de conversão integrados ao WhatsApp.",
      techs: ["HTML", "CSS", "JavaScript"],
      link: "https://rafaelalves021.github.io/Studio-Carla-Gon-alves/"
    },
    {
      title: "X-Academia",
      tag: "landing page comercial",
      category: "landing",
      description: "Landing page desenvolvida e comercializada para uma academia real localizada em Magalhães Bastos (RJ). Conta com secção de modalidades, diferenciais, tabela de planos de assinatura, formulário de agendamento integrado com envio para o WhatsApp e mapa de localização.",
      techs: ["HTML", "CSS", "JavaScript"],
      link: "https://rafaelalves021.github.io/X-Academia/"
    },
    {
      title: "Sistema de Delivery Web",
      tag: "full-stack / python",
      category: "backend",
      description: "Plataforma web de entrega desenvolvida em Python com o framework Django. O sistema conta com gestão completa de cardápio, fluxo de pedidos em tempo real, painel administrativo e autenticação de utilizadores baseada na arquitetura MVT.",
      techs: ["Python", "Django", "HTML/CSS", "JavaScript"],
      link: "" // Link em branco por agora, conforme solicitado
    },
    {
      title: "Barbearia do Feio",
      tag: "site institucional",
      category: "institutional",
      description: "Site para uma barbearia real em Magalhães Bastos (RJ), com sistema de marcação de horário e espaço para avaliação dos clientes. Paleta preto e branco old school e nomes de serviço com gíria carioca — \"disfarce\" em vez de degradê, \"nevou\" em vez de platinado.",
      techs: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      link: "https://rafaelalves021.github.io/Projeto-Barbearia/"
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
      // Cria a lista de tecnologias
      const techsHTML = project.techs.map(tech => `<li>${tech}</li>`).join('');

      // Lógica para o Link: Se a propriedade "link" tiver algum texto, criamos o HTML do botão.
      // Adicionamos 'target="_blank"' para abrir numa nova aba e 'rel="noopener"' por questões de segurança.
      const linkHTML = project.link 
        ? `<a href="${project.link}" target="_blank" rel="noopener" class="more-projects" style="margin-top: 16px; margin-bottom: 0;">acessar projeto ↗</a>` 
        : '';

      const article = document.createElement('article');
      article.className = 'project';
      article.setAttribute('data-category', project.category);

      // Injetamos a variável ${linkHTML} no final do conteúdo do projeto
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
          ${linkHTML}
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