import type { Project, ServiceItem, QAItem } from './types';

export const COPY = {
  es: {
    nav: {
      work: 'Portafolio',     workHint: 'Nuestro trabajo',
      services: 'Servicios',  servicesHint: 'Qué hacemos',
      about: 'Nosotros',      aboutHint: 'Quiénes somos',
      contact: 'Contacto',    contactHint: 'Trabajemos juntos',
    },
    home: {
      reelTag:            'Showreel · 2024–2026',
      heroLine1:          'Donde las ideas',
      heroLine2:          'empiezan',
      heroLine3:          'a existir.',
      scrollHint:         'Desplaza',
      manifestoEyebrow:   'Latente · Estudio de diseño',
      manifesto:          'Tomamos conceptos sueltos, intuiciones, proyectos en borrador — y los convertimos en algo',
      manifestoUnderline: 'latente',
      manifesto2:         '. Algo que deja de ser intención y se vuelve realidad. Le damos vida a tus ideas.',
      featuredEyebrow:    'Proyectos seleccionados',
      featuredCta:        'Ver portafolio completo',
      tickerItems:        ['Branding', 'Fotografía', 'Web · Digital', 'Editorial', 'Social Media', 'Experiencias', 'Ilustración', 'Animación'],
    },
    portfolio: {
      eyebrow:     'Portafolio',
      title:       'Trabajos hechos con cabeza, mano y latido.',
      filterLabel: 'Filtrar por',
      filters: {
        all:          'Todos',
        photo:        'Fotografía',
        branding:     'Branding',
        naming:       'Naming',
        product:      'Producto',
        web:          'Web',
        social:       'Social Media',
        content:      'Creación de contenido',
        experience:   'Experiencia',
        editorial:    'Editorial',
        illustration: 'Ilustración',
        video:        'Video / Animación',
      },
      backToTop:   'Volver arriba',
      viewProject: 'Ver proyecto',
    },
    services: {
      eyebrow:   'Servicios',
      title:     'Seis disciplinas, una sola estética.',
      subtitle:  'Trabajamos por proyecto o como estudio de cabecera. Cada servicio se piensa con criterio editorial y se ejecuta con cuidado de oficio.',
      headLine:  'Conoce nuestros servicios',
      cta:       'Si tienes una idea, Hagámosla Latente.',
      ctaButton: 'Contáctanos',
      items: [
        {
          id: 'branding', n: '01', t: 'Branding',
          d: 'Creación de marca, naming, manual de marca y rebranding.',
          intro: [
            'Construimos la base de tu proyecto. Nos encargamos del nombre estratégico ideal (',
            { term: 'naming' },
            '), diseñar tu identidad visual desde cero (',
            { term: 'creación de marca' },
            '), estructurar las reglas de su uso (',
            { term: 'manual de marca' },
            ') o transformar por completo tu imagen existente para que se alinee con tus objetivos actuales (',
            { term: 'rebranding' },
            '). Desarrollamos todo lo necesario para que salgas al mercado con una identidad sólida, coherente y profesional.',
          ],
          glossary: {
            'naming': 'Investigamos, validamos y creamos el nombre estratégico e ideal para tu nuevo proyecto o producto.',
            'creación de marca': 'Diseñamos tu universo visual desde cero (logotipo, paleta de colores, tipografías y recursos gráficos) para que tu proyecto tenga una identidad única.',
            'manual de marca': 'Te entregamos la guía oficial de tu marca, con las reglas de uso de tu identidad para que puedas aplicar tu logo, colores y fuentes correctamente.',
            'rebranding': 'Rediseñamos o refrescamos tu identidad existente para adaptarla a la etapa actual de tu proyecto.',
          },
        },
        {
          id: 'editorial', n: '02', t: 'Diseño editorial',
          d: 'Revistas, libros y folletos con cuidado tipográfico.',
          intro: [
            'Le damos estructura, orden y diseño profesional a tus palabras. Nos encargamos de la diagramación, maquetación y diseño estético de piezas impresas o digitales como ',
            { term: 'revistas' },
            ', ',
            { term: 'libros' },
            ', ',
            { term: 'folletos o catálogos' },
            ', entre otros, asegurando que tus contenidos se vean atractivos, limpios, ordenados y muy fáciles de leer.',
          ],
          glossary: {
            'revistas': 'Maquetación, diseño de portadas y diagramación de publicaciones periódicas, ya sean comerciales, culturales, científicas, corporativas o de nicho.',
            'libros': 'Diseño completo de portadas, contraportadas y diagramación de páginas internas para textos literarios, educativos, corporativos, infantiles o coffee table books.',
            'folletos o catálogos': 'Diseño de catálogos de productos o servicios, portafolios y material informativo en diferentes formatos.',
          },
        },
        {
          id: 'web', n: '03', t: 'Diseño web',
          d: 'Landing pages, sitios completos y mockups funcionales — diseño y desarrollo.',
          intro: [
            'Creamos y diseñamos tu sitio web a la medida de tus necesidades. Desarrollamos desde ',
            { term: 'landing pages' },
            ' hasta ',
            { term: 'páginas web completas' },
            '. Nos encargamos de todo el proceso de punta a punta: desde el prototipo interactivo visual (',
            { term: 'mockup funcional' },
            ') hasta la entrega de tu página web con ',
            { term: 'programación y funcionamiento' },
            '.',
          ],
          glossary: {
            'landing pages': 'Una página web de un solo scroll, optimizada específicamente para vender un producto, servicio o captar datos de clientes.',
            'páginas web completas': 'Sitio web completo con varias secciones (Inicio, Nosotros, Servicios, Contacto) y funcionalidades específicas según la necesidad.',
            'mockup funcional': 'Interfaz visual y flujo interactivo exacto de tu web para que sepas cómo se va a ver y operar antes de pasar a la programación.',
            'programación y funcionamiento': 'Desarrollo de tu sitio web para entregarlo 100% operativo.',
          },
        },
        {
          id: 'photo', n: '04', t: 'Fotografía',
          d: 'Producto, estudio, creativa, eventos y pasarela.',
          intro: [
            'Somos un estudio fotográfico profesional. Coordinamos y ejecutamos sesiones completas de ',
            { term: 'fotografía de producto' },
            ', ',
            { term: 'fotografía para contenido' },
            ', retratos y ',
            { term: 'fotos en estudio' },
            ' y producciones con ',
            { term: 'dirección de arte' },
            '. Adicionalmente hacemos ',
            { term: 'cobertura de eventos' },
            '.',
          ],
          glossary: {
            'fotografía de producto': 'Imágenes creativas, iluminadas y detalladas de lo que vendes, ideales para catálogos, páginas web o e-commerce.',
            'fotografía para contenido': 'Producción de fotos con storytelling que acompañen el universo visual de las marcas para redes sociales, páginas web y diferentes canales de difusión.',
            'fotos en estudio': 'Retratos profesionales e institucionales con iluminación controlada para empresas, lookbooks de moda o similares.',
            'dirección de arte': 'Sesiones conceptuales y artísticas que usan composiciones, storytelling y universos visuales para contar una historia específica sobre tu proyecto y comunicar sus valores y esencia.',
            'cobertura de eventos': 'Cobertura técnica de lanzamientos, pasarelas de moda, conferencias, reuniones corporativas o celebraciones de marca.',
          },
        },
        {
          id: 'social', n: '05', t: 'Contenido & Redes',
          d: 'Contenido estático, videos y reels, pauta y campañas digitales.',
          intro: [
            'Gestionamos y activamos tus canales digitales de forma estratégica. Diseñamos la parrilla visual de tu perfil combinando ',
            { term: 'contenido estático' },
            ' y ',
            { term: 'video' },
            '; potenciamos tu alcance mediante el uso de ',
            { term: 'pauta digital' },
            ' y ',
            { term: 'campañas creativas' },
            ' enfocadas en tu objetivo. Adicionalmente manejamos y mantenemos activa tu comunidad a través del ',
            { term: 'community management' },
            '.',
          ],
          glossary: {
            'contenido estático': 'Diseño de posts individuales, carruseles y fotografía para el feed de tus redes sociales.',
            'video': 'Grabación y edición de formatos cortos y dinámicos para difusión por redes. Video de producto, de servicios o informativos sobre el proyecto.',
            'pauta digital': 'Configuración, segmentación y optimización de tus anuncios pagos en Meta Ads o Google Ads para llegar a clientes potenciales y público objetivo.',
            'campañas creativas': 'Estrategias completas con un objetivo específico (un lanzamiento, un descuento de temporada) para ser distribuidas en todos tus canales digitales.',
            'community management': 'Gestión diaria de tus redes: interacción con la comunidad, respuesta a mensajes y comentarios, y monitoreo constante de tus canales.',
          },
        },
        {
          id: 'experience', n: '06', t: 'Experiencia',
          d: 'Campañas creativas, activaciones, pop-ups, vallas, pendones y pósters.',
          intro: [
            'Llevamos tu marca al mundo físico. Diseñamos ',
            { term: 'campañas creativas' },
            ' de alto impacto, planeamos ',
            { term: 'activaciones y tiendas pop up' },
            ', adaptamos tu identidad a ',
            { term: 'formatos impresos' },
            ' a gran escala como vallas, pendones o posters para ferias o locales comerciales y diseñamos ',
            { term: 'stands y vitrinas' },
            ' de marcas y experiencias.',
          ],
          glossary: {
            'campañas creativas': 'Conceptos e ideas disruptivas pensadas para llamar la atención del público en el entorno físico.',
            'activaciones y tiendas pop up': 'Diseño y planeación de tiendas temporales, dinámicas interactivas y eventos para que la gente se relacione directamente con tu marca.',
            'formatos impresos': 'Soportes visuales para el entorno urbano o comercial. Desde vallas de gran escala, hasta pendones y posters promocionales para ferias, locales o puntos de venta, asegurando alta legibilidad e impacto visual.',
            'stands y vitrinas': 'Planificamos, estructuramos y diseñamos el espacio comercial o expositivo de tu marca para tus ferias, congresos, eventos, lanzamiento o tiendas logrando que tu espacio destaque y atraiga la atención de los asistentes.',
          },
        },
      ] as ServiceItem[],
    },
    about: {
      eyebrow:    'Nosotros',
      photoCaption: 'Creamos marcas\nLatentes.',
      qa: [
        {
          q: '¿Por qué Latente?',
          a: [
            'Latente es aquello que cobra vida. (aquello que empieza a vibrar)',
            'Es el momento exacto en que una idea deja de ser solo pensamiento, toma forma y empieza a existir: ese punto donde algo deja de ser una intención y se vuelve una realidad.',
          ],
        },
        {
          q: '¿Qué hacemos?',
          a: [
            'En Latente creemos que hay muchas ideas que aún no se han materializado por eso nosotras tomamos conceptos sueltos, intuiciones, proyectos en construcción, sueños de marca, proyectos que todavía no tienen forma, que están en borrador o en conversación y los convertimos en proyectos tangibles, reales, coherentes y concretos, en sueños cumplidos, los convertimos en ideas latentes. En resumen, le damos vida a tus ideas.',
          ],
        },
        {
          q: '¿Quiénes somos?',
          a: [
            'Somos un estudio de diseño especializado en branding, fotografía, diseño editorial, diseño web, y creación de contenido, donde convertimos cualquier idea que puedas tener en una realidad; tangibilizamos esas ideas para que sean proyectos latentes, que existen, que tienen identidad, estructura y vida propia.',
          ],
        },
      ] as QAItem[],
    },
    contact: {
      eyebrow:       'Contacto',
      titleA:        'Agenda',
      titleB:        'tu cita.',
      heroTitle:     'Hagamos tu proyecto Latente.',
      heroCta:       'Déjanos tus datos',
      sub:           'Cuéntanos del proyecto. Respondemos en menos de 48 horas hábiles.',
      form: {
        name:    'Nombre',
        email:   'Correo',
        phone:   'Teléfono',
        service: 'Servicio',
        message: 'Cuéntanos del proyecto',
        send:    'Enviar mensaje',
        sending: 'Enviando…',
        sent:    '¡Recibido! Hablamos pronto.',
      },
      calendlyCta:  'Reservar slot',
      calendar: {
        title: 'Próximas franjas disponibles',
        sub:   'Lunes a viernes · Hora Colombia (GMT-5)',
      },
      monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      dayHeads:   ['L','M','M','J','V','S','D'],
    },
    footer: {
      contact:  'Contacto',
      legal:    'Cookies · Términos · © Latente Estudio',
      location: 'Bogotá / Medellín · CO',
    },
  },
  en: {
    nav: {
      work: 'Our work',   workHint: 'Our work',
      services: 'Services', servicesHint: 'What we do',
      about: 'About us',  aboutHint: 'Who we are',
      contact: 'Contact', contactHint: 'Let\'s work together',
    },
    home: {
      reelTag:            'Showreel · 2024–2026',
      heroLine1:          'Where ideas',
      heroLine2:          'start',
      heroLine3:          'to exist.',
      scrollHint:         'Scroll',
      manifestoEyebrow:   'Latente · Design studio',
      manifesto:          'We take loose concepts, hunches, projects still in draft — and turn them into something',
      manifestoUnderline: 'latent',
      manifesto2:         '. Something that stops being intention and becomes reality. We bring your ideas to life.',
      featuredEyebrow:    'Selected projects',
      featuredCta:        'See full portfolio',
      tickerItems:        ['Branding', 'Photography', 'Web · Digital', 'Editorial', 'Social Media', 'Experiences', 'Illustration', 'Animation'],
    },
    portfolio: {
      eyebrow:     'Work',
      title:       'Where ideas become realities',
      filterLabel: 'Filter by',
      filters: {
        all:          'All',
        photo:        'Photography',
        branding:     'Branding',
        naming:       'Naming',
        product:      'Product',
        web:          'Web',
        social:       'Social Media',
        content:      'Content Creation',
        experience:   'Experience',
        editorial:    'Editorial',
        illustration: 'Illustration',
        video:        'Video / Animation',
      },
      backToTop:   'Back to top',
      viewProject: 'View project',
    },
    services: {
      eyebrow:   'Services',
      title:     'Six disciplines, one aesthetic.',
      subtitle:  'We work by project or as your in-house studio. Each service is shaped with editorial judgment and crafted with care.',
      headLine:  'Discover our services',
      cta:       'If you have an idea, let\'s make it Latente.',
      ctaButton: 'Contact us',
      items: [
        {
          id: 'branding', n: '01', t: 'Branding',
          d: 'Brand creation, naming, brand guidelines and rebranding.',
          intro: [
            'We build the foundation of your project. We take care of the ideal strategic name (',
            { term: 'naming' },
            '), designing your visual identity from scratch (',
            { term: 'brand creation' },
            '), structuring the rules for its use (',
            { term: 'brand guidelines' },
            ') or completely transforming your existing image so it aligns with your current goals (',
            { term: 'rebranding' },
            '). We develop everything you need to go to market with a solid, coherent and professional identity.',
          ],
          glossary: {
            'naming': 'We research, validate and create the ideal strategic name for your new project or product.',
            'brand creation': 'We design your visual universe from scratch (logo, color palette, typefaces and graphic assets) so your project has a unique identity.',
            'brand guidelines': 'We hand you the official guide to your brand, with the rules for using your identity so you can apply your logo, colors and fonts correctly.',
            'rebranding': 'We redesign or refresh your existing identity to adapt it to the current stage of your project.',
          },
        },
        {
          id: 'editorial', n: '02', t: 'Editorial design',
          d: 'Magazines, books and brochures with typographic care.',
          intro: [
            'We give your words structure, order and professional design. We handle the layout and aesthetic design of printed or digital pieces such as ',
            { term: 'magazines' },
            ', ',
            { term: 'books' },
            ', ',
            { term: 'brochures or catalogs' },
            ', among others, making sure your content looks attractive, clean, organized and very easy to read.',
          ],
          glossary: {
            'magazines': 'Layout, cover design and page composition for periodical publications, whether commercial, cultural, scientific, corporate or niche.',
            'books': 'Complete design of covers, back covers and interior page layout for literary, educational, corporate or children\'s texts, or coffee table books.',
            'brochures or catalogs': 'Design of product or service catalogs, portfolios and informative material in different formats.',
          },
        },
        {
          id: 'web', n: '03', t: 'Web design',
          d: 'Landing pages, full sites and functional mockups — design and build.',
          intro: [
            'We create and design your website tailored to your needs. We develop everything from ',
            { term: 'landing pages' },
            ' to ',
            { term: 'full websites' },
            '. We take care of the whole process from end to end: from the interactive visual prototype (',
            { term: 'functional mockup' },
            ') to delivering your website with ',
            { term: 'development and functionality' },
            '.',
          ],
          glossary: {
            'landing pages': 'A single-scroll web page, optimized specifically to sell a product or service or to capture customer data.',
            'full websites': 'A complete website with several sections (Home, About, Services, Contact) and specific features depending on your needs.',
            'functional mockup': 'The exact visual interface and interactive flow of your website so you know how it will look and work before moving on to development.',
            'development and functionality': 'Development of your website so it is delivered 100% operational.',
          },
        },
        {
          id: 'photo', n: '04', t: 'Photography',
          d: 'Product, studio, creative, events and runway.',
          intro: [
            'We are a professional photography studio. We coordinate and run complete sessions of ',
            { term: 'product photography' },
            ', ',
            { term: 'content photography' },
            ', portraits and ',
            { term: 'studio photos' },
            ' and productions with ',
            { term: 'art direction' },
            '. We also offer ',
            { term: 'event coverage' },
            '.',
          ],
          glossary: {
            'product photography': 'Creative, well-lit and detailed images of what you sell, ideal for catalogs, websites or e-commerce.',
            'content photography': 'Photo production with storytelling that supports the visual universe of brands for social media, websites and other channels.',
            'studio photos': 'Professional and corporate portraits with controlled lighting for companies, fashion lookbooks and the like.',
            'art direction': 'Conceptual and artistic sessions that use composition, storytelling and visual universes to tell a specific story about your project and communicate its values and essence.',
            'event coverage': 'Technical coverage of launches, fashion runways, conferences, corporate meetings or brand celebrations.',
          },
        },
        {
          id: 'social', n: '05', t: 'Content & Social',
          d: 'Static content, videos and reels, paid media and digital campaigns.',
          intro: [
            'We manage and activate your digital channels strategically. We design your profile\'s visual grid combining ',
            { term: 'static content' },
            ' and ',
            { term: 'video' },
            '; we boost your reach through ',
            { term: 'paid media' },
            ' and ',
            { term: 'creative campaigns' },
            ' focused on your goal. We also manage and keep your community active through ',
            { term: 'community management' },
            '.',
          ],
          glossary: {
            'static content': 'Design of individual posts, carousels and photography for your social media feed.',
            'video': 'Shooting and editing of short, dynamic formats for social media. Product, service or informational videos about your project.',
            'paid media': 'Setup, targeting and optimization of your paid ads on Meta Ads or Google Ads to reach potential customers and your target audience.',
            'creative campaigns': 'Complete strategies with a specific goal (a launch, a seasonal discount) to be distributed across all your digital channels.',
            'community management': 'Daily management of your networks: community interaction, replying to messages and comments, and constant monitoring of your channels.',
          },
        },
        {
          id: 'experience', n: '06', t: 'Experience',
          d: 'Creative campaigns, activations, pop-ups, billboards, banners and posters.',
          intro: [
            'We bring your brand into the physical world. We design high-impact ',
            { term: 'creative campaigns' },
            ', plan ',
            { term: 'activations and pop-up stores' },
            ', adapt your identity to large-scale ',
            { term: 'printed formats' },
            ' such as billboards, banners or posters for fairs or retail spaces, and design ',
            { term: 'stands and displays' },
            ' for brands and experiences.',
          ],
          glossary: {
            'creative campaigns': 'Disruptive concepts and ideas designed to grab the public\'s attention in the physical environment.',
            'activations and pop-up stores': 'Design and planning of temporary stores, interactive experiences and events so people connect directly with your brand.',
            'printed formats': 'Visual supports for urban or commercial settings. From large-scale billboards to promotional banners and posters for fairs, shops or points of sale, ensuring high legibility and visual impact.',
            'stands and displays': 'We plan, structure and design your brand\'s commercial or exhibition space for fairs, conferences, events, launches or stores, making your space stand out and attract attendees\' attention.',
          },
        },
      ] as ServiceItem[],
    },
    about: {
      eyebrow:    'About',
      photoCaption: 'We create\nLatent brands.',
      qa: [
        {
          q: 'Why Latente?',
          a: [
            'Something latent is that which comes to life.',
            "It's the exact moment an idea stops being just a thought, takes shape and begins to exist: the point where something stops being an intention and becomes a reality.",
          ],
        },
        {
          q: 'What do we do?',
          a: [
            "At Latente we believe there are many ideas that haven't been made real yet, so we take loose concepts, hunches, projects still under construction, brand dreams, projects that don't have a shape yet, that are still a draft or a conversation, and turn them into tangible, real, coherent and concrete projects, into fulfilled dreams: we turn them into latent ideas. In short, we bring your ideas to life.",
          ],
        },
        {
          q: 'Who are we?',
          a: [
            "We're a design studio specialized in branding, photography, editorial design, web design, and content creation, where we turn any idea you might have into a reality; we make those ideas tangible so they become latent projects that exist, that have identity, structure and a life of their own.",
          ],
        },
      ] as QAItem[],
    },
    contact: {
      eyebrow:      'Contact',
      titleA:       'Book',
      titleB:       'a meeting.',
      heroTitle:    "Let's make your project Latent.",
      heroCta:      'Leave us your details.',
      sub:          'Tell us about your project.',
      form: {
        name:    'Name',
        email:   'Email',
        phone:   'Phone',
        service: 'Service',
        message: 'Tell us about your project',
        send:    'Send message',
        sending: 'Sending…',
        sent:    'Got it! Talk soon.',
      },
      calendlyCta:  'Book a slot',
      calendar: {
        title: 'Next available slots',
        sub:   'Mon–Fri · Colombia time (GMT-5)',
      },
      monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      dayHeads:   ['M','T','W','T','F','S','S'],
    },
    footer: {
      contact:  'Contact',
      legal:    'Cookies · Terms · © Latente Studio',
      location: 'Bogotá / Medellín · CO',
    },
  },
} as const;

export const PROJECTS: Project[] = [
  {
    id: 'entre-nubes',
    title:     { es: 'Entre nubes y eucaliptos', en: 'Entre nubes y eucaliptos' },
    client:    { es: 'Branding', en: 'Branding' },
    year: '2025',
    cats: ['branding', 'illustration'],
    catsLabel: { es: 'Branding · Ilustración', en: 'Branding · Illustration' },
    summary:   { es: 'Identidad de marca para Entre Nubes.', en: 'Brand identity for Entre Nubes.' },
    cover: '/assets/portfolio/galeria/01-entre-nubes.png',
    aspect: '1440/602', accent: '#7972FA',
    detail: {
      paragraphs: {
        es: [
          'Entre nubes y eucaliptos es un glamping y ecolodge ubicado en Manizales, Colombia. Para su lanzamiento comercial, ellos necesitaban estructurar una identidad gráfica completa que estandarizara la comunicación visual del negocio antes de abrir sus puertas de forma oficial al público.',
          'Lo que hicimos fue desarrollar la marca y su sistema visual desde cero, creando el logotipo principal y diseños personalizados basados en la estructura de las cabañas. Definimos técnicamente el uso de tipografías, layouts y paletas cromáticas dentro de un manual de marca, y entregamos los archivos para la producción de la señalética exterior y las aplicaciones textiles y de papelería que ellos requerían.',
        ],
        en: [
          'Entre nubes y eucaliptos is a glamping and ecolodge located in Manizales, Colombia. For its commercial launch, they needed to build a complete graphic identity that would standardize the business’s visual communication before officially opening its doors to the public.',
          'What we did was develop the brand and its visual system from scratch, creating the main logotype and custom designs based on the structure of the cabins. We technically defined the use of typography, layouts and color palettes within a brand manual, and delivered the files for producing the exterior signage and the textile and stationery applications they required.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/entre-nubes/logo-lockup.png'] },
        { type: 'pair', images: ['/assets/portfolio/entre-nubes/logo-cream.png', '/assets/portfolio/entre-nubes/tote-bag.png'] },
        { type: 'pair', images: ['/assets/portfolio/entre-nubes/door-hanger.png', '/assets/portfolio/entre-nubes/website-mockup.png'] },
      ],
    },
  },
  {
    id: 'tanto-y-mas',
    title:     { es: 'Tanto y más', en: 'Tanto y más' },
    client:    { es: 'Producto · Fotografía', en: 'Product · Photography' },
    year: '2025',
    cats: ['product', 'photo'],
    catsLabel: { es: 'Producto · Fotografía', en: 'Product · Photography' },
    summary:   { es: 'Diseño de producto y fotografía para Tanto y más.', en: 'Product design and photography for Tanto y más.' },
    cover: '/assets/portfolio/galeria/02-tanto-y-mas.png',
    aspect: '660/459', accent: '#DE5738',
    detail: {
      paragraphs: {
        es: [
          'Tanto y más es una marca y un concepto de introspección, salud mental y gestión de emociones desarrollado por la psicóloga Valentina Duarte. Para el lanzamiento y materialización física de su proyecto, ella requería el diseño de producto y la identidad de línea para dos herramientas terapéuticas.',
          'Lo que hicimos fue desarrollar el diseño gráfico de empaques, productos y editoriales desde cero para ambas líneas. Diseñamos las cartas de introspección con su respectiva bolsa de lienzo y un notepad de ejercicios, así como la caja de emociones. Una vez el cliente produjo, con nuestro acompañamiento las muestras físicas, realizamos la dirección de arte y la fotografía del producto.',
        ],
        en: [
          'Tanto y más is a brand and a concept around introspection, mental health and emotional management developed by psychologist Valentina Duarte. For the launch and physical materialization of her project, she needed product design and line identity for two therapeutic tools.',
          'What we did was develop the graphic design of packaging, products and editorial pieces from scratch for both lines. We designed the introspection cards with their canvas pouch and an exercise notepad, as well as the emotions box. Once the client produced the physical samples with our guidance, we handled the art direction and product photography.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/tanto-y-mas/1.png'] },
        { type: 'pair', images: ['/assets/portfolio/tanto-y-mas/2.png', '/assets/portfolio/tanto-y-mas/3.png'] },
        { type: 'pair', images: ['/assets/portfolio/tanto-y-mas/4.png', '/assets/portfolio/tanto-y-mas/5.png'] },
        { type: 'pair', images: ['/assets/portfolio/tanto-y-mas/6.png', '/assets/portfolio/tanto-y-mas/7.png'] },
      ],
    },
  },
  {
    id: 'la-enoteca-de-dani',
    title:     { es: 'La Enoteca de Dani', en: 'La Enoteca de Dani' },
    client:    { es: 'Branding · Fotografía · Ilustración', en: 'Branding · Photography · Illustration' },
    year: '2025',
    cats: ['branding', 'photo', 'illustration'],
    catsLabel: { es: 'Branding · Fotografía · Ilustración', en: 'Branding · Photography · Illustration' },
    summary:   { es: 'Identidad y contenido de marca para La Enoteca de Dani.', en: 'Brand identity and content for La Enoteca de Dani.' },
    cover: '/assets/portfolio/galeria/03-la-enoteca-de-dani.png',
    gridSize: 'size-full',
    aspect: '1/1', accent: '#EDFB8C',
    detail: {
      paragraphs: {
        es: [
          'La enoteca de Dani es un proyecto de una pareja Colombiana, ellos querían abrir su establecimiento de venta, conservación y degustación de vino en la ciudad de Bogotá y nos pidieron que realizáramos el branding e identidad visual.',
          'Creamos una marca elegante, donde la tipografía es el foco de atención, complementándola con un elemento gráfico en perfecta armonía, que posteriormente se uso en el nombre y como iconografía y sello de la marca. Adicionalmente, creamos la gráfica de redes sociales, manteniendo elegancia pero acercándose a su público pues su lema es "vino sin pretensiones".',
        ],
        en: [
          'La enoteca de Dani is a project by a Colombian couple who wanted to open a wine sales, storage and tasting venue in Bogotá, and asked us to develop the branding and visual identity.',
          'We created an elegant brand where typography is the focal point, complemented by a graphic element in perfect harmony that was later used within the name and as the brand\'s iconography and seal. We also created the social media graphics, keeping the elegance while feeling closer to their audience, since their motto is "wine without pretense."',
        ],
      },
      blocks: [
        { type: 'triple', images: ['/assets/portfolio/enoteca-dani/1.png', '/assets/portfolio/enoteca-dani/2.png', '/assets/portfolio/enoteca-dani/3.png'] },
        { type: 'triple', images: ['/assets/portfolio/enoteca-dani/4.png', '/assets/portfolio/enoteca-dani/5.png', '/assets/portfolio/enoteca-dani/6.png'] },
        { type: 'full', images: ['/assets/portfolio/enoteca-dani/7.png'] },
        { type: 'pair', images: ['/assets/portfolio/enoteca-dani/8.png', '/assets/portfolio/enoteca-dani/9.png'] },
        { type: 'pair', images: ['/assets/portfolio/enoteca-dani/10.png', '/assets/portfolio/enoteca-dani/11.png'] },
      ],
    },
  },
  {
    id: 'revista-indice',
    title:     { es: 'Revista índice de mi país', en: 'Índice de mi país Magazine' },
    client:    { es: 'Editorial · Producto', en: 'Editorial · Product' },
    year: '2025',
    cats: ['editorial', 'product'],
    catsLabel: { es: 'Editorial · Producto', en: 'Editorial · Product' },
    summary:   { es: 'Diagramación y diseño editorial de Revista Índice.', en: 'Layout and editorial design for Índice Magazine.' },
    cover: '/assets/portfolio/galeria/04-revista-indice.png',
    gridSize: { all: 'size-half' },
    aspect: '1327/1024', accent: '#DCD0FC',
    detail: {
      paragraphs: {
        es: [
          'Índice de mi país es un medio de comunicacion colombiano que quiere resaltar todo lo positivo que tiene el país.',
          'Para la edición caribe de su revista física realizamos todo el diseño editorial, desde la portada, las publicidades y todo el contenido interno. Mantuvimos comunicación constante con el equipo, con la curaduría de fotografía y de estilo y acompañamos el proceso de producción de los más de 20.000 ejemplares que se repartieron en la zona Caribe del país.',
        ],
        en: [
          'Índice de mi país is a Colombian media outlet that wants to highlight everything positive about the country.',
          'For the Caribbean edition of their print magazine, we handled all of the editorial design, from the cover and ads to all of the internal content. We kept constant communication with the team, curating photography and style, and supported the production process of the more than 20,000 copies distributed across the country\'s Caribbean region.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/revista-indice/1.png'] },
        { type: 'full', images: ['/assets/portfolio/revista-indice/2.png'] },
      ],
    },
  },
  {
    id: 'guale',
    title:     { es: 'Gualé', en: 'Gualé' },
    client:    { es: 'Branding · Ilustración', en: 'Branding · Illustration' },
    year: '2025',
    cats: ['branding', 'illustration'],
    catsLabel: { es: 'Branding · Ilustración', en: 'Branding · Illustration' },
    summary:   { es: 'Ilustración y publicidad para Gualé.', en: 'Illustration and advertising for Gualé.' },
    cover: '/assets/portfolio/galeria/05-guale.png',
    gridSize: { all: 'size-half', branding: 'size-half' },
    aspect: '429/553', accent: '#7972FA',
    detail: {
      paragraphs: {
        es: [
          'Gualé es un ejercicio creativo de ilustración y publicidad inspirado en una empresa que vende experiencias de kayak para parejas, tiene el propósito de ser una experiencia romántica al aire libre.',
          'Estas ilustraciones son la fusión de la experiencia al aire libre y el amor romántico en pareja, invitando a adquirir esta experiencia.',
        ],
        en: [
          'Gualé is a creative illustration and advertising exercise inspired by a company that sells kayak experiences for couples, meant to be a romantic experience outdoors.',
          'These illustrations are a fusion of the outdoor experience and romantic love as a couple, inviting people to book the experience.',
        ],
      },
      blocks: [
        { type: 'triple', images: ['/assets/portfolio/guale/1.png', '/assets/portfolio/guale/2.png', '/assets/portfolio/guale/3.png'] },
        { type: 'full', images: ['/assets/portfolio/guale/4.png'] },
        { type: 'pair', images: ['/assets/portfolio/guale/5.png', '/assets/portfolio/guale/9.png'] },
        { type: 'pair', images: ['/assets/portfolio/guale/6.png', '/assets/portfolio/guale/7.png'] },
        { type: 'full', images: ['/assets/portfolio/guale/8.png'] },
      ],
    },
  },
  {
    id: 'alana',
    title:     { es: 'Alana', en: 'Alana' },
    client:    { es: 'Fotografía · Branding · Creación de contenido · Social Media', en: 'Photography · Branding · Content Creation · Social Media' },
    year: '2025',
    cats: ['photo', 'branding', 'content', 'social'],
    catsLabel: { es: 'Fotografía · Branding · Creación de contenido · Social Media', en: 'Photography · Branding · Content Creation · Social Media' },
    summary:   { es: 'Identidad pop con script retro para Alana.', en: 'Pop identity with retro script for Alana.' },
    cover: '/assets/portfolio/galeria/06-alana.png',
    gridSize: { branding: 'size-half' },
    aspect: '1440/602', accent: '#DE5738',
    detail: {
      paragraphs: {
        es: [
          'Alana Lana es un emprendimiento de tejido en crochet y tejido de punto que necesitaba desarrollar todo su universo visual.',
          'Para ellos realizamos todo el proceso desde cero, el naming, el branding, sus elementos e identidad visual, la estética de sus redes sociales y algunas fotografías iniciales que requerían y con todo esto logramos un resultado que captura la esencia juvenil y colorida de la marca.',
        ],
        en: [
          'Alana Lana is a crochet and knitwear venture that needed to develop its entire visual universe.',
          'For them we carried out the whole process from scratch — the naming, the branding, its elements and visual identity, the aesthetic of its social media and some initial photographs they needed — and with all of this we achieved a result that captures the youthful, colorful essence of the brand.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/alana/1.png'], aspect: '1323/960' },
        {
          type: 'carousel',
          images: [
            '/assets/portfolio/alana/carrusel/1.png',
            '/assets/portfolio/alana/carrusel/2.png',
            '/assets/portfolio/alana/carrusel/3.png',
            '/assets/portfolio/alana/carrusel/4.png',
            '/assets/portfolio/alana/carrusel/5.png',
            '/assets/portfolio/alana/carrusel/6.png',
          ],
          bg: '/assets/portfolio/alana/carrusel/fondo.png',
        },
        {
          type: 'mosaic3',
          images: [
            '/assets/portfolio/alana/2.png',
            '/assets/portfolio/alana/3.png',
            '/assets/portfolio/alana/5.png',
            '/assets/portfolio/alana/4.png',
            '/assets/portfolio/alana/6.png',
          ],
          aspects: ['514/911', '352/352', '360/530', '388/507', '388/388'],
        },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/alana/7.png',
            '/assets/portfolio/alana/8.png',
            '/assets/portfolio/alana/9.png',
          ],
        },
      ],
    },
  },
  {
    id: 'guin-guino',
    title:     { es: 'Güin Güino', en: 'Güin Güino' },
    client:    { es: 'Branding · Ilustración · Producto', en: 'Branding · Illustration · Product' },
    year: '2025',
    cats: ['branding', 'illustration', 'product'],
    catsLabel: { es: 'Branding · Ilustración · Producto', en: 'Branding · Illustration · Product' },
    summary:   { es: 'Identidad e ilustración para Güin Güino.', en: 'Identity and illustration for Güin Güino.' },
    cover: '/assets/portfolio/galeria/07-guin-guino.png',
    gridSize: { branding: 'size-half' },
    aspect: '651/851', accent: '#EDFB8C',
    detail: {
      paragraphs: {
        es: [
          'Güin güino es un ejercicio creativo de marca para una heladería infantil con sabores naturales.',
          'Inspirándonos en Sammy el heladero, desarróllanos este concepto, donde Güin güino (como le dicen a media lengua los niños a los pingüinos) es el centro de todo. Esta marca la creamos desde el nombre hasta el concepto final y realizamos todas las ilustraciones presentes en su universo. El resultado fue una marca tierna, que tiene un persona que se identifica con su público infantil sin ser lo que estaría en el imaginario tradicional de una heladería para niños.',
        ],
        en: [
          "Güin güino is a creative branding exercise for a children's ice cream shop with natural flavors.",
          'Drawing inspiration from Sammy the ice cream man, we developed this concept, where Güin güino (the toddler mispronunciation of "pingüino," penguin) is the heart of it all. We created this brand from the name to the final concept and produced every illustration present in its universe. The result was a tender brand with a personality that connects with its young audience, without falling into the traditional imagery expected of a children\'s ice cream shop.',
        ],
      },
      blocks: [
        { type: 'pair', images: ['/assets/portfolio/guin-guino/1.png', '/assets/portfolio/guin-guino/2.png'] },
        { type: 'pair', images: ['/assets/portfolio/guin-guino/3.png', '/assets/portfolio/guin-guino/4.png'] },
        { type: 'full', images: ['/assets/portfolio/guin-guino/cabecera.png'] },
      ],
    },
  },
  {
    id: 'nuggets-fries',
    title:     { es: 'Nuggets & Fries', en: 'Nuggets & Fries' },
    client:    { es: 'Branding · Ilustración', en: 'Branding · Illustration' },
    year: '2025',
    cats: ['branding', 'illustration'],
    catsLabel: { es: 'Branding · Ilustración', en: 'Branding · Illustration' },
    summary:   { es: 'Identidad y contenido de marca para Nuggets & Fries.', en: 'Brand identity and content for Nuggets & Fries.' },
    cover: '/assets/portfolio/galeria/08-nuggets-fries.png',
    gridSize: { branding: 'size-half' },
    aspect: '699/903', accent: '#DCD0FC',
    detail: {
      paragraphs: {
        es: [
          'Nuestro pollo de nuggets and fries es el desarrollo de marca para un restaurante que vende precisamente nuggets y papas.',
          'Ellos llegaron a nosotros con un nombre creado pero querían darle una identidad visual y, sobre todo, un personaje característico a su negocio. De este desarrollo nació el persona que representa al restaurante y su sistema de marca que es simple pero alegre y característico.',
        ],
        en: [
          'Our Nuggets and Fries chicken is a brand development for a restaurant that sells exactly that: nuggets and fries.',
          'They came to us with a name already created but wanted a visual identity and, above all, a character to represent their business. From this development the character representing the restaurant was born, along with a brand system that is simple but cheerful and distinctive.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/nuggets-fries/1.png'], aspect: '1327/884' },
        {
          type: 'duoStack',
          images: [
            '/assets/portfolio/nuggets-fries/2.png',
            '/assets/portfolio/nuggets-fries/3.png',
            '/assets/portfolio/nuggets-fries/4.png',
          ],
          aspects: ['699/903', '593/494', '596/379'],
        },
        { type: 'full', images: ['/assets/portfolio/nuggets-fries/5.png'], aspect: '1327/986' },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/nuggets-fries/6.png',
            '/assets/portfolio/nuggets-fries/7.png',
            '/assets/portfolio/nuggets-fries/8.png',
          ],
        },
      ],
    },
  },
  {
    id: 'moiras',
    title:     { es: 'Moiras', en: 'Moiras' },
    client:    { es: 'Ilustración · Producto', en: 'Illustration · Product' },
    year: '2025',
    cats: ['illustration', 'product'],
    catsLabel: { es: 'Ilustración · Producto', en: 'Illustration · Product' },
    summary:   { es: 'Tarot ilustrado para constelaciones familiares.', en: 'Illustrated tarot deck for family constellations.' },
    cover: '/assets/portfolio/galeria/09-moriras.png',
    aspect: '604/416', accent: '#7972FA',
    detail: {
      paragraphs: {
        es: [
          'Moiras es un producto de trabajo personal desarrollado de la mano de la psicóloga Adriana Borray, especialista en constelaciones familiares.',
          'A partir de la práctica que ella realiza con constelación familiares individuales con plantillas, creamos una tarot para esta misma práctica. Este proyecto se llevó a cabo desde la investigación hasta su creación conceptual, ilustración y producción en físico.',
        ],
        en: [
          'Moiras is a personal-work product developed together with psychologist Adriana Borray, a specialist in family constellations.',
          'Based on the individual family-constellation practice she performs with templates, we created a tarot deck for this same practice. This project was carried out from the research phase through to its conceptual creation, illustration, and physical production.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/moiras/1.png'], aspect: '1326/884' },
        {
          type: 'duoStack',
          images: [
            '/assets/portfolio/moiras/2.png',
            '/assets/portfolio/moiras/3.png',
            '/assets/portfolio/moiras/4.png',
          ],
          aspects: ['664/878', '608/405', '604/416'],
        },
      ],
    },
  },
  {
    id: 'revista-camino-a-china',
    title:     { es: 'Revista Camino a China', en: 'Camino a China Magazine' },
    client:    { es: 'Editorial · Producto', en: 'Editorial · Product' },
    year: '2025',
    cats: ['editorial', 'product'],
    catsLabel: { es: 'Editorial · Producto', en: 'Editorial · Product' },
    summary:   { es: 'Diseño editorial y fotografía para Revista Camino a China.', en: 'Editorial design and photography for Camino a China Magazine.' },
    cover: '/assets/portfolio/galeria/10-revista-camino-a-china.png',
    aspect: '650/520', accent: '#DE5738',
    detail: {
      paragraphs: {
        es: [
          'La asociación colombo china tiene diferentes publicaciones digitales y en nuestro trabajo conjunto con ellos realizamos dos ediciones de la revista Camino a China.',
          'Esta revista destaca las historias de personas colombianas que han tenido la experiencia de vivir en china o que viven allá y como conecta esto con sus raíces colombianas. Para ello realizamos todo el proceso de curaduría de artículos, diseñamos las publicidades internas y todo el diseño de portada y contenido editorial de la revista hasta su lanzamiento digital en la página de la asociación.',
        ],
        en: [
          'The Colombo-Chinese association has several digital publications, and together with them we produced two editions of Camino a China magazine.',
          'This magazine highlights the stories of Colombians who have lived in China or currently live there, and how this experience connects with their Colombian roots. For this, we carried out the entire article curation process, designed the internal advertisements, and handled all cover and editorial content design for the magazine through to its digital launch on the association\'s website.',
        ],
      },
      blocks: [
        {
          type: 'pair',
          images: [
            '/assets/portfolio/revista-camino-a-china/1.png',
            '/assets/portfolio/revista-camino-a-china/2.png',
          ],
        },
        { type: 'full', images: ['/assets/portfolio/revista-camino-a-china/3.png'], aspect: '1327/995' },
      ],
    },
  },
  {
    id: 'lovely',
    title:     { es: 'Lovely', en: 'Lovely' },
    client:    { es: 'Diseño editorial', en: 'Editorial design' },
    year: '2025',
    cats: ['editorial'],
    catsLabel: { es: 'Diseño editorial', en: 'Editorial design' },
    summary:   { es: 'Identidad de marca para Lovely.', en: 'Brand identity for Lovely.' },
    cover: '/assets/portfolio/galeria/11-lovely.png',
    aspect: '645/967', accent: '#EDFB8C',
    detail: {
      paragraphs: {
        es: [
          'Lovely lingerie es un emprendimiento colombiano que vende lencería. La dueña basan su estrategia en el empoderamiento femenino y el acompañamiento de los momentos que puede generar la ropa interior.',
          'Nuestro trabajo con Lovely empezó con un rebranding que saco la marca de lo que se esperaba tipográficamente y estéticamente de un negocio de lencería. Adicionalmente realizamos un estudio fotográfico que tuviera cohesión con esa idea de no ser una marca de lencería tradicional, donde las prendas acompañan momentos íntimos pero también momentos cotidianos y son una oda al cuerpo de la mujer.',
        ],
        en: [
          "Lovely lingerie is a Colombian venture that sells lingerie. Its owner bases her strategy on female empowerment and on accompanying the moments that underwear can create.",
          "Our work with Lovely began with a rebrand that took the brand away from what was typographically and aesthetically expected of a lingerie business. We also carried out a photographic study cohesive with the idea of not being a traditional lingerie brand, where the garments accompany intimate moments but also everyday moments, and are an ode to the woman's body.",
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/lovely/1.png'], aspect: '1327/556' },
        {
          type: 'strip',
          images: [
            '/assets/portfolio/lovely/2.png',
            '/assets/portfolio/lovely/3.png',
            '/assets/portfolio/lovely/4.png',
            '/assets/portfolio/lovely/5.png',
            '/assets/portfolio/lovely/6.png',
            '/assets/portfolio/lovely/7.png',
          ],
        },
        {
          type: 'pair',
          images: ['/assets/portfolio/lovely/8.png', '/assets/portfolio/lovely/9.png'],
          aspects: ['659/1705', '640/1705'],
        },
        {
          type: 'strip',
          images: [
            '/assets/portfolio/lovely/10.png',
            '/assets/portfolio/lovely/11.png',
            '/assets/portfolio/lovely/12.png',
            '/assets/portfolio/lovely/13.png',
            '/assets/portfolio/lovely/14.png',
          ],
        },
        {
          type: 'pair',
          images: ['/assets/portfolio/lovely/15.png', '/assets/portfolio/lovely/16.png'],
          aspects: ['645/967', '644/967'],
        },
        { type: 'full', images: ['/assets/portfolio/lovely/17.png'], aspect: '1312/1722' },
      ],
    },
  },
  {
    id: 'indice',
    title:     { es: 'Índice de mi país', en: 'Índice de mi país' },
    client:    { es: 'Social Media', en: 'Social Media' },
    year: '2025',
    cats: ['social'],
    catsLabel: { es: 'Social Media', en: 'Social Media' },
    summary:   { es: 'Identidad visual y contenido de redes para Índice de mi país.', en: 'Visual identity and social content for Índice de mi país.' },
    cover: '/assets/portfolio/galeria/12-indice.png',
    aspect: '424/530', accent: '#DCD0FC',
    detail: {
      paragraphs: {
        es: [
          'Índice de mi país es un medio de comunicacion colombiano que quiere resaltar todo lo positivo que tiene el país. Cuando ellos llegaron a nosotros no tenían una estética definida y querían generar una gráfica que representara el color y la fuerza de ser este medio de buenas noticias y datos positivos de colombia.',
          'Para ellos creamos toda la identidad visual, paleta de color, distribución y formatos para redes y por meses desarrollamos el contenido, planeamos los calendarios, creamos las piezas, las campañas y los captions para el mismo fin.',
        ],
        en: [
          'Índice de mi país is a Colombian media outlet that wants to highlight everything positive about the country. When they came to us they had no defined aesthetic and wanted a graphic language that represented the color and strength of being this outlet for good news and positive data about Colombia.',
          'For them we created the entire visual identity, color palette, layout and formats for social media, and for months we developed the content, planned the calendars, created the pieces, the campaigns, and the captions toward that same goal.',
        ],
      },
      blocks: [
        {
          type: 'pair',
          images: ['/assets/portfolio/indice/1.png', '/assets/portfolio/indice/2.png'],
          aspects: ['653/816', '653/816'],
        },
        { type: 'full', images: ['/assets/portfolio/indice/3.png'], aspect: '1327/1107' },
        { type: 'full', images: ['/assets/portfolio/indice/4.png'], aspect: '1327/1659' },
        { type: 'full', images: ['/assets/portfolio/indice/5.png'], aspect: '784/651' },
        { type: 'full', images: ['/assets/portfolio/indice/6.png'], aspect: '519/650' },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/indice/7.png',
            '/assets/portfolio/indice/8.png',
            '/assets/portfolio/indice/9.png',
          ],
          aspects: ['424/530', '424/530', '424/530'],
        },
      ],
    },
  },
  {
    id: 'mieliflora',
    title:     { es: 'MieliFlora', en: 'MieliFlora' },
    client:    { es: 'Social Media · Fotografía · Creación de contenido', en: 'Social Media · Photography · Content Creation' },
    year: '2025',
    cats: ['social', 'photo', 'content'],
    catsLabel: { es: 'Social Media · Fotografía · Creación de contenido', en: 'Social Media · Photography · Content Creation' },
    summary:   { es: 'Identidad de marca y fotografía de producto para MieliFlora.', en: 'Brand identity and product photography for MieliFlora.' },
    cover: '/assets/portfolio/galeria/13-mieliflora.png',
    aspect: '1440/604', accent: '#7972FA',
    heroImage: '/assets/portfolio/mieliflora/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'Mieliflora es un emprendimiento de apicultura, ubicado en los llanos orientales; tienen productos como la miel 100% orgánica, la crema de apitocina, un lip balm y un exfoliante que querían resaltar en su contenido de redes sociales.',
          'Para esto reestructuramos los pilares de contenido de la marca y generamos unas redes cercanas, informativas y divertidas. Hicimos un viaje a Los Llanos para la creación de contenido y creamos una sección de recetas para la marca. Adicionalmente le dimos una nueva vida estética a la parrilla y las publicaciones estáticas e hicimos un trabajo de fotografía de producto y fotografía en campo.',
        ],
        en: [
          'Mieliflora is a beekeeping venture based in the Eastern Plains of Colombia; they have products like 100% organic honey, apitoxin cream, a lip balm and an exfoliant they wanted to highlight in their social media content.',
          'To do this we restructured the brand\'s content pillars and built a social presence that\'s close, informative and fun. We traveled to Los Llanos to create content and built out a recipes section for the brand. We also gave the grid and static posts a new aesthetic and did product and field photography work.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/mieliflora/1.png'], aspect: '1325/1193' },
        { type: 'triple', images: [
            '/assets/portfolio/mieliflora/2.png',
            '/assets/portfolio/mieliflora/3.png',
            '/assets/portfolio/mieliflora/4.png',
          ], aspects: ['421/527', '422/527', '422/527'] },
        { type: 'triple', images: [
            '/assets/portfolio/mieliflora/5.png',
            '/assets/portfolio/mieliflora/6.png',
            '/assets/portfolio/mieliflora/7.png',
          ], aspects: ['421/526', '422/527', '421/526'] },
        { type: 'full', images: ['/assets/portfolio/mieliflora/8.png'], aspect: '1327/1194' },
        { type: 'quadStack', images: [
            '/assets/portfolio/mieliflora/9.mp4',
            '/assets/portfolio/mieliflora/10.png',
            '/assets/portfolio/mieliflora/11.png',
            '/assets/portfolio/mieliflora/12.png',
            '/assets/portfolio/mieliflora/13.png',
          ], aspects: ['1440/2560', '365/462', '2430/3038', '2430/3038', '366/459'] },
      ],
    },
  },
  {
    id: 'artistas-y-pandemia',
    title:     { es: 'Coffee table book Artistas y pandemia', en: 'Coffee table book Artistas y pandemia' },
    client:    { es: 'Editorial · Fotografía', en: 'Editorial · Photography' },
    year: '2025',
    cats: ['editorial', 'photo'],
    catsLabel: { es: 'Editorial · Fotografía', en: 'Editorial · Photography' },
    summary:   { es: 'Editorial y fotografía para el libro Artistas y pandemia.', en: 'Editorial design and photography for the book Artistas y pandemia.' },
    cover: '/assets/portfolio/galeria/14-artistas-y-pandemia.png',
    aspect: '1329/997', accent: '#DE5738',
    heroImage: '/assets/portfolio/artistas-y-pandemia/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'El coffee table book "Artistas y pandemia: vivencias a través de la imagen" es el resultado fotográfico y editorial de un ejercicio realizado con seis artistas, donde cada imagen representa su vivencia, en relación con su arte, durante la pandemia.',
          'El libro recopila los textos de los artistas, los diez puntos clave de cada imagen y estas fotografías finales.',
        ],
        en: [
          'The coffee table book "Artistas y pandemia: vivencias a través de la imagen" is the photographic and editorial result of an exercise carried out with six artists, where each image represents their experience, in relation to their art, during the pandemic.',
          "The book brings together the artists' texts, the ten key points of each image, and these final photographs.",
        ],
      },
      blocks: [
        {
          type: 'duoStack',
          images: [
            '/assets/portfolio/artistas-y-pandemia/2.png',
            '/assets/portfolio/artistas-y-pandemia/1.png',
            '/assets/portfolio/artistas-y-pandemia/3.png',
          ],
          aspects: ['656/987', '638/479', '639/479'],
        },
        { type: 'full', images: ['/assets/portfolio/artistas-y-pandemia/4.png'], aspect: '1327/995' },
        {
          type: 'strip',
          images: [
            '/assets/portfolio/artistas-y-pandemia/5.png',
            '/assets/portfolio/artistas-y-pandemia/6.png',
            '/assets/portfolio/artistas-y-pandemia/7.png',
            '/assets/portfolio/artistas-y-pandemia/8.png',
          ],
        },
        { type: 'full', images: ['/assets/portfolio/artistas-y-pandemia/9.png'], aspect: '1329/997' },
      ],
    },
  },
  {
    id: 'cada-vez-mas-cerca-de-la-pension',
    title:     { es: 'Podcast Cada vez más cerca de la pensión', en: 'Podcast Cada vez más cerca de la pensión' },
    client:    { es: 'Branding · Naming · Animación · Ilustración · Social Media', en: 'Branding · Naming · Animation · Illustration · Social Media' },
    year: '2025',
    cats: ['branding', 'naming', 'video', 'illustration', 'social'],
    catsLabel: { es: 'Branding · Naming · Animación · Ilustración · Social Media', en: 'Branding · Naming · Animation · Illustration · Social Media' },
    summary:   { es: 'Branding, naming y animación para Cada vez más cerca de la pensión.', en: 'Branding, naming and animation for Cada vez más cerca de la pensión.' },
    cover: '/assets/portfolio/galeria/15-cada-vez-mas-cerca-de-la-pension.png',
    aspect: '1440/605', accent: '#EDFB8C',
    heroImage: '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'Cada vez más cerca de la pensión es un podcast de dos primas que habla sobre todas las situaciones de la adultez desde el humor.',
          'Diseñamos e ilustramos la imagen para el podcast, animamos la introducción para los capítulos y realizamos el universo visual de la misma.',
        ],
        en: [
          'Cada vez más cerca de la pensión is a podcast by two cousins that talks about all the situations of adulthood through humor.',
          'We designed and illustrated the image for the podcast, animated the intro for the episodes, and created its whole visual universe.',
        ],
      },
      blocks: [
        {
          type: 'full',
          images: ['/assets/portfolio/cada-vez-mas-cerca-de-la-pension/video-intro.mp4'],
          aspect: '3840/2160',
        },
        {
          type: 'strip',
          images: [
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/1.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/2.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/3.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/4.png',
          ],
          aspects: ['324/324', '324/323', '324/324', '324/324'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/5.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/6.png',
          ],
          aspects: ['645/845', '640/845'],
        },
        {
          type: 'strip',
          images: [
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/7.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/8.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/9.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/10.png',
          ],
          aspects: ['318/318', '318/318', '318/318', '318/318'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/11.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/12.png',
          ],
          aspects: ['643/804', '643/803'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/13.png',
            '/assets/portfolio/cada-vez-mas-cerca-de-la-pension/14.png',
          ],
          aspects: ['638/798', '637/796'],
        },
      ],
    },
  },
  {
    id: 'claudia-sandoval',
    title:     { es: 'Claudia Sandoval', en: 'Claudia Sandoval' },
    client:    { es: 'Branding', en: 'Branding' },
    year: '2025',
    cats: ['branding'],
    catsLabel: { es: 'Branding', en: 'Branding' },
    summary:   { es: 'Identidad de marca para Claudia Sandoval.', en: 'Brand identity for Claudia Sandoval.' },
    cover: '/assets/portfolio/galeria/16-claudia-sandoval.png',
    aspect: '1728/2145', accent: '#DCD0FC',
    heroImage: '/assets/portfolio/claudia-sandoval/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'Claudia Sandoval es una consultora de arquitectura y urbanismo que nos contactó para el branding de su marca personal.',
          'Para ella realizamos el logo y la identidad visual basada en su nombre, el resultado es un logo limpio, que une las líneas simples del dibujo arquitectónico con las iniciales de la dueña y el minimalismo que ella nos pidió.',
        ],
        en: [
          'Claudia Sandoval is an architecture and urban planning consultant who reached out to us for the branding of her personal brand.',
          'For her we created the logo and visual identity based on her name, resulting in a clean logo that combines the simple lines of architectural drawing with the owner\'s initials and the minimalism she asked for.',
        ],
      },
      blocks: [
        {
          type: 'pair',
          images: [
            '/assets/portfolio/claudia-sandoval/1.png',
            '/assets/portfolio/claudia-sandoval/2.png',
          ],
          aspects: ['644/799', '644/799'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/claudia-sandoval/3.png',
            '/assets/portfolio/claudia-sandoval/4.png',
          ],
          aspects: ['715/715', '576/715'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/claudia-sandoval/5.png',
            '/assets/portfolio/claudia-sandoval/6.png',
          ],
          aspects: ['829/572', '461/572'],
        },
      ],
    },
  },
  {
    id: 'conversaciones-en-la-mesa',
    title:     { es: 'Conversaciones en la mesa', en: 'Conversaciones en la mesa' },
    client:    { es: 'Ilustración · Editorial', en: 'Illustration · Editorial' },
    year: '2025',
    cats: ['illustration', 'editorial'],
    catsLabel: { es: 'Ilustración · Editorial', en: 'Illustration · Editorial' },
    summary:   { es: 'Ilustración y diseño editorial para Conversaciones en la mesa.', en: 'Illustration and editorial design for Conversaciones en la mesa.' },
    cover: '/assets/portfolio/galeria/17-conversaciones-en-la-mesa.png',
    aspect: '1959/1359', accent: '#7972FA',
    heroImage: '/assets/portfolio/conversaciones-en-la-mesa/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'Conversaciones en la mesa y otras perlitas fue un ejercicio creativo de análisis de estereotipos que se instauran en el inconsciente de las personas.',
          'Este coffee table book es el resultado gráfico, editorial y de redacción, donde realizamos desde los textos hasta la ilustración digital para su producción.',
        ],
        en: [
          "Conversaciones en la mesa y otras perlitas was a creative exercise analyzing the stereotypes embedded in people's unconscious minds.",
          'This coffee table book is the graphic, editorial and writing result, where we handled everything from the texts to the digital illustration for its production.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/conversaciones-en-la-mesa/1.png'], aspect: '1326/974' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/conversaciones-en-la-mesa/2.png',
            '/assets/portfolio/conversaciones-en-la-mesa/3.png',
          ],
          aspects: ['653/576', '653/577'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/conversaciones-en-la-mesa/4.png',
            '/assets/portfolio/conversaciones-en-la-mesa/5.png',
          ],
          aspects: ['653/453', '653/453'],
        },
      ],
    },
  },
  {
    id: 'educapaz',
    title:     { es: 'Sello editorial Educapaz', en: 'Sello editorial Educapaz' },
    client:    { es: 'Branding', en: 'Branding' },
    year: '2025',
    cats: ['branding'],
    catsLabel: { es: 'Branding', en: 'Branding' },
    summary:   { es: 'Identidad de marca para EDUCAPAZ.', en: 'Brand identity for EDUCAPAZ.' },
    cover: '/assets/portfolio/galeria/18-educapaz.png',
    aspect: '1821/2232', accent: '#DE5738',
    heroImage: '/assets/portfolio/educapaz/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'El sello editorial de Educapaz es un branding derivado de la marca existente para los productos editoriales de la fundación.',
          'Para esta marca, creamos el sello central que acompañaría las publicaciones y las ramas que las clasificarían.',
        ],
        en: [
          "Educapaz's editorial imprint is a branding derived from the foundation's existing brand for its editorial products.",
          'For this brand, we created the central seal that would accompany the publications and the branches that would classify them.',
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/educapaz/1.png'], aspect: '1323/43' },
        { type: 'full', images: ['/assets/portfolio/educapaz/2.png'], aspect: '1323/338' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/educapaz/3.png',
            '/assets/portfolio/educapaz/4.png',
          ],
          aspects: ['684/745', '607/744'],
        },
        { type: 'full', images: ['/assets/portfolio/educapaz/5.png'], aspect: '1323/43' },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/educapaz/6.png',
            '/assets/portfolio/educapaz/7.png',
            '/assets/portfolio/educapaz/8.png',
          ],
          aspects: ['430/496', '429/496', '430/496'],
        },
        { type: 'full', images: ['/assets/portfolio/educapaz/9.png'], aspect: '1323/882' },
        { type: 'full', images: ['/assets/portfolio/educapaz/10.png'], aspect: '1323/43' },
        { type: 'full', images: ['/assets/portfolio/educapaz/11.png'], aspect: '1323/278' },
      ],
    },
  },
  {
    id: 'merch-cultura-caribe',
    title:     { es: 'Merch cultura Caribe', en: 'Merch cultura Caribe' },
    client:    { es: 'Ilustración · Producto', en: 'Illustration · Product' },
    year: '2025',
    cats: ['illustration', 'product'],
    catsLabel: { es: 'Ilustración · Producto', en: 'Illustration · Product' },
    summary:   { es: 'Ilustración y producto para Merch Cultura Caribe.', en: 'Illustration and product design for Merch Cultura Caribe.' },
    cover: '/assets/portfolio/galeria/19-merch-cultura-caribe.png',
    aspect: '1953/2187', accent: '#EDFB8C',
    heroImage: '/assets/portfolio/merch-cultura-caribe/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'La merch "cultura caribe" está inspirada en la riqueza visual, el colorido y la calidez del Caribe y la selva colombiana. La línea busca celebrar la colombianidad a través de piezas textiles.',
          'Desarrollamos un sistema de ilustraciones y diagramaciones que funcionan de manera individual y en conjunto, con una paleta cromática vibrante y caribeña.',
        ],
        en: [
          'The "cultura caribe" merch line is inspired by the visual richness, color and warmth of the Caribbean and the Colombian jungle. The line seeks to celebrate Colombian identity through textile pieces.',
          'We developed a system of illustrations and layouts that work both individually and together, with a vibrant, Caribbean-inspired color palette.',
        ],
      },
      blocks: [
        {
          type: 'pair',
          images: [
            '/assets/portfolio/merch-cultura-caribe/1.png',
            '/assets/portfolio/merch-cultura-caribe/2.png',
          ],
          aspects: ['683/764', '617/764'],
        },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/merch-cultura-caribe/3.png',
            '/assets/portfolio/merch-cultura-caribe/4.png',
            '/assets/portfolio/merch-cultura-caribe/5.png',
          ],
          aspects: ['428/479', '428/479', '431/482'],
        },
        { type: 'full', images: ['/assets/portfolio/merch-cultura-caribe/6.png'], aspect: '1328/565' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/merch-cultura-caribe/7.png',
            '/assets/portfolio/merch-cultura-caribe/8.png',
          ],
          aspects: ['651/728', '652/729'],
        },
        { type: 'full', images: ['/assets/portfolio/merch-cultura-caribe/9.png'], aspect: '1320/340' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/merch-cultura-caribe/10.png',
            '/assets/portfolio/merch-cultura-caribe/11.png',
          ],
          aspects: ['651/729', '651/729'],
        },
      ],
    },
  },
  {
    id: 'jolgorio',
    title:     { es: 'Jolgorio', en: 'Jolgorio' },
    client:    { es: 'Branding · Naming', en: 'Branding · Naming' },
    year: '2025',
    cats: ['branding', 'naming'],
    catsLabel: { es: 'Branding · Naming', en: 'Branding · Naming' },
    summary:   { es: 'Naming y branding para Jolgorio.', en: 'Naming and branding for Jolgorio.' },
    cover: '/assets/portfolio/galeria/20-jolgorio.png',
    aspect: '3963/4920', accent: '#DCD0FC',
    heroImage: '/assets/portfolio/jolgorio/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'Jolgorio es una empresa de catering, que también ofrece el servicio de chef privado y soluciones gastronómicas.',
          'Para ellos realizamos la marca desde cero, comenzando por el naming y su comunicación escrita, y realizando el branding, alineado al nombre y al objetivo de la marca y creando todo el sistema visual.',
        ],
        en: [
          'Jolgorio is a catering company that also offers private chef services and gastronomic solutions.',
          "For them we built the brand from scratch, starting with the naming and its written communication, and developing the branding aligned with the name and the brand's objective, creating its entire visual system.",
        ],
      },
      blocks: [
        {
          type: 'pair',
          images: [
            '/assets/portfolio/jolgorio/1.png',
            '/assets/portfolio/jolgorio/2.png',
          ],
          aspects: ['637/791', '637/791'],
        },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/jolgorio/3.png',
            '/assets/portfolio/jolgorio/4.png',
            '/assets/portfolio/jolgorio/5.png',
          ],
          aspects: ['427/538', '428/538', '429/539'],
        },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/jolgorio/6.png',
            '/assets/portfolio/jolgorio/7.png',
          ],
          aspects: ['658/816', '654/817'],
        },
        { type: 'full', images: ['/assets/portfolio/jolgorio/8.png'], aspect: '1321/1640' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/jolgorio/9.png',
            '/assets/portfolio/jolgorio/10.png',
          ],
          aspects: ['635/789', '635/789'],
        },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/jolgorio/11.png',
            '/assets/portfolio/jolgorio/12.png',
            '/assets/portfolio/jolgorio/13.png',
          ],
          aspects: ['429/535', '428/535', '428/535'],
        },
      ],
    },
  },
  {
    id: 'procrastinador',
    title:     { es: 'Manual del procastinador', en: 'Manual del procastinador' },
    client:    { es: 'Ilustración · Editorial', en: 'Illustration · Editorial' },
    year: '2025',
    cats: ['illustration', 'editorial'],
    catsLabel: { es: 'Ilustración · Editorial', en: 'Illustration · Editorial' },
    summary:   { es: 'Ilustración y diseño editorial para el Manual del Procrastinador.', en: 'Illustration and editorial design for the Manual del Procrastinador.' },
    cover: '/assets/portfolio/galeria/21-procrastinador.png',
    aspect: '1326/920', accent: '#7972FA',
    heroImage: '/assets/portfolio/procrastinador/cabecera.png',
    detail: {
      paragraphs: {
        es: [
          'El manual del procastinador es un ejercicio creativo, que resulta en un coffee table book ilustrado y editorial. Este libro recopila una serie de láminas que hablan sobre la procrastinación y tiene el propósito de ser ameno y decorativo.',
        ],
        en: [
          "The procrastinator's manual is a creative exercise that results in an illustrated, editorial coffee table book. This book gathers a series of plates that talk about procrastination and aims to be entertaining and decorative.",
        ],
      },
      blocks: [
        { type: 'full', images: ['/assets/portfolio/procrastinador/1.png'], aspect: '1326/920' },
        {
          type: 'pair',
          images: [
            '/assets/portfolio/procrastinador/2.png',
            '/assets/portfolio/procrastinador/3.png',
          ],
          aspects: ['650/573', '649/573'],
        },
        {
          type: 'triple',
          images: [
            '/assets/portfolio/procrastinador/4.png',
            '/assets/portfolio/procrastinador/5.png',
            '/assets/portfolio/procrastinador/6.png',
          ],
          aspects: ['421/371', '421/371', '421/371'],
        },
        { type: 'full', images: ['/assets/portfolio/procrastinador/7.png'], aspect: '1326/1170' },
      ],
    },
  },
];

