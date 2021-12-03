<script>
  import ParallaxSlider from '$lib/components/ParallaxSlider.svelte';
  import PopUp from '$lib/components/PopUp.svelte';
  import { _ } from 'svelte-i18n';
  import { initI18n } from '$lib/components/i18n/i18n.js';
  import { onMount } from 'svelte';
  import { checkIsMobile } from '$lib/utils/helpers';
  import '../app.css';

  initI18n();

  let modalOpen = false;
  function showModal() {
    modalOpen = true;
  }
  function hideModal() {
    modalOpen = false;
  }

  // We want the ui to be viewed in landscape on mobile devices.
  let isMobile = false;
  let viewport = null;
  $: innerWidth = 0;
  $: innerHeight = 0;
  $: isLandscapeView = false;
  // Check for mobile device.
  onMount(async () => {
    isMobile = checkIsMobile();
    if (isMobile) {
      document.body.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }
  });

  // Check that the phone is in landscape.
  onMount(() => {
    (async () => {
      // Dynamic import because of ssr and window manipulation.
      const { default: viewport_library } = await import('svelte-viewport-info');
      viewport = viewport_library;
      innerWidth = viewport_library?.Width || 0;
      innerHeight = viewport_library?.Height || 0;
      isLandscapeView = viewport_library?.Orientation === 'landscape' || false;
    })();
  });

  let containerEl;
  let MAX_NUM_PROJECTS = 17; // number of projects in html.
  // Keep track of the currently displayed project state.
  $: current_project_index = 0;

  // Slide in the next project vertically, if it exists.
  const nextProject = (project_index) => {
    if (project_index < MAX_NUM_PROJECTS) {
      return (containerEl.style.transform = `translate(0px, ${0 - project_index * innerHeight}px)`);
    }
  };

  // Slide in vertically previous project if it exists.
  const prevProject = (project_index) => {
    if (project_index >= 0 && project_index <= MAX_NUM_PROJECTS) {
      return (containerEl.style.transform = `translate(0px, ${0 - project_index * innerHeight}px)`);
    }
  };

  // Handles project state.
  const handleProjectUpdate = (updated_project_index) => {
    updated_project_index > current_project_index
      ? nextProject(updated_project_index)
      : prevProject(updated_project_index);
    return (current_project_index = updated_project_index);
  };
</script>

<svelte:head>
  <title>
    SuperBonjour
  </title>
  <meta name="description" content="Creative agency"/>
    <meta
    name="viewport"
    content="height=device-height, initial-scale=1, width=device-width, initial-scale=1"
    />
  </svelte:head>
<svelte:body
  on:viewportchanged={() => {
    innerWidth = viewport.Width;
    innerHeight = viewport.Height;
    handleProjectUpdate(current_project_index);
  }}
  on:resize={() => {
    innerWidth = viewport.Width;
    innerHeight = viewport.Height;
  }}
  on:orientationchangeend={() => {
    innerWidth = viewport.Width;
    innerHeight = viewport.Height;
    isLandscapeView = viewport.Orientation === 'landscape';
  }} />

<div class="header">
  <img src="images/dialog-icon.png" class="dialog-icon" alt="Dialog icon" on:click={showModal} />
</div>
<!-- Show a warning in portrait mode to rotate your phone. -->
<div class="mobile-portrait" style={`width:${innerWidth ? innerWidth + 'px' : '100vw'}`}>
  <div style="position:relative">
    <img class="image-logo mobile" src="images/mobile_super_bonjour.svg" alt="Logo" />

    <p class="mobile-portrait-message">
      Bonjour! <span style="color:#f86c00">✿</span>
      Our work looks best, viewed on desktop. We love a big screen with lots of pixels, but if
      <span style="color:#F8D0FB">☏</span>
      mobile's your thing,<span style="color:#E0A239">➙</span> rotate your device, that would be
      Super
      <span style="color:#F8D0FB">❛‿❛</span>
    </p>
  </div>
  <div style="display:flex; justify-content:space-between; margin-top:2rem;">
    <iframe
      title="dog on phone gif"
      src="https://giphy.com/embed/vM07ENm3Ue8xO"
      width={`${innerWidth / 4}`}
      height={`${innerWidth / 4}`}
      frameBorder="0"
      class="giphy-embed"
      allowFullScreen
    />
    <img style="transform:translate(0%,-35%)" src="images/peace_hand.svg" alt="peace hand" />
  </div>
</div>
<PopUp bind:modalOpen isMobile={isMobile && isLandscapeView} />

<main>
  <div class="container" bind:this={containerEl}>
    <ParallaxSlider
      id={0}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.1.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.1.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/HSCo_Mag_1.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_Mag_2.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_Mag_3.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_Mag_4.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_Mag_5.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_Mag_6.jpg',
          type: 'image'
        },
        {
          src: 'Magazines *♡* Also a great medium to reposition a brand. We created a tool to build a community and generate lasting ties with creatives and travelers.<br>Vol 1: Islands — a theme explored geographically and metaphorically. From the launch party on Echo Park’s island to a 1-800 number connecting you to the sounds of island life, every detail was considered.  ',
          type: 'text',
          title: 'Creating a Travel Magazine',
          fontSize: '54px',
          color: '#4E151D',
          backgroundColor: '#C3862C'
        },
        {
          src: '360 Content Strategy — <br>We took on the full scope from editorial lineups, branded Google Docs and social media meta accounts, to commissioning original content. Working with our network was key when building Herschel’s global community.<br><br>Brand Positioning, Creative Direction  <br>Production, Theme Development, Contributor Outreach <br>Pagination & Flatplan, Art Direction, Editorial Design <br>Print Management & Distribution Strategy <br>Event & Activation',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C3862C'
        },
        {
          src: 'Imogene Barron, Ryan Daniel Browne, Eva Cremers, Natasha & Dino Forte, Michelle Maguire, Meaghan Way, Kelsey McClellan, Ashley Oliveri, Catherine Potvin, Marie H. Rainville, Houmi Sakata, Victoria Sieczka, Aileen Son, Oumayma Ben Tanfous, Stephanie Mercier Voyer, Stephen Wilde, ​​Nico Young<br>Sacha Jackson, Editor<br><br>Featuring Hana Vu, Danny Smiles, Bradley Sheppard, Amélie Rousseaux, Apolla Echino, Maxime Bayol, Marc Cefalu<br><br>Awards<br> Editorial, Entire Publication — Applied Arts 2021<br>Design, Éditorial — Concours Idéa 2021',
          type: 'text',
          title: 'Contributors',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C3862C'
        }
      ]}
    />
    <ParallaxSlider
      id={1}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.2.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.2.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/OD_1.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_2.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_3.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_4.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_5.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_6.jpg',
          type: 'image'
        },
        {
          src: 'images/OD_7.jpg',
          type: 'image'
        },
        {
          src: 'Working out of the Accra studio and residence, we were immersed in Osei Duro’s process and day-to-day. We dove deep, via workshops and collecting insights to inform the brand’s expressions — in photography, casting, styling, tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.',
          type: 'text',
          title: 'Brand Platform & Campaign Strategy',
          fontSize: '54px',
          color: '#E1D8CA',
          backgroundColor: '#111E0C'
        },
        {
          src: 'Deep Dive & Immersion — <br>Factory and textile print shop visits and day-to-day operations<br><br>Brand Audit & Strategy — <br>Review of all the content to help establish a new strategy,<br> workshops and brand platform<br><br>2019 Campaign Shoots —<br>Creative Direction<br>Pre-production & On-set Direction<br>Campaign Shoots, on location<br>Lookbook Direction',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#111E0C'
        },
        {
          src: 'Campaign Photography Kay Kwabia<br>Film Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour<br>Styling Osei Duro, footwear and accessories sourced from Kantamanto Market<br>Models Eyiwaa, Amisum, Julee, David<br>Shot in Accra, Ghana',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#111E0C'
        }
      ]}
    />
    <ParallaxSlider
      id={2}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.3.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.3.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/Fable_1.jpg',
          type: 'image'
        },
        {
          src: 'images/Fable_2.jpg',
          type: 'image'
        },
        {
          src: 'images/Fable_3.jpg',
          type: 'image'
        },
        {
          src: 'images/Fable_4.jpg',
          type: 'image'
        },
        {
          src: 'images/Fable_5.jpg',
          type: 'image'
        },
        {
          src: 'videos/Fable_6.mp4',
          type: 'video'
        },
        {
          src: 'Carefully crafting each image, capturing the often overlooked in-between moments, the campaign positioned Fable as slow artisanal luxury and celebrates the softness of life at home. We defined codes that felt unique to Fable, for a proprietary sense of refinement and emotionally engaging storytelling — while steering them away from a generic DTC look. ',
          type: 'text',
          title: 'Brand Campaign Strategy',
          fontSize: '54px',
          color: '#CBD0BA',
          backgroundColor: '##290B15'
        },
        {
          src: 'Brand Audit & Campaign Strategy —<br>Review of the photo content on digital channels to establish a new strategy<br><br>2020 Campaign Shoot —<br> Creative Direction<br>Pre-production & On-set Direction<br>Ecomm Direction ',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '##290B15'
        },
        {
          src: 'Campaign Photography Mathieu Fortin<br>Campaign Videography Gerardo Alcaine<br>Sets & Props Audrey St-Laurent<br>Retouching & E-commerce Photography Bonesso Dumas<br>Copy Sacha Jackson<br>Produced & Shot at Studio L’Éloi, Montréal',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '##290B15'
        }
      ]}
    />
    <ParallaxSlider
      id={3}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.4.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.4.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/HSCo_1.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_2.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_3.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_4.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_5.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_6.jpg',
          type: 'image'
        },
        {
          src: 'images/HSCo_7.jpg',
          type: 'image'
        },
        {
          src: 'A fresh take on everyone’s favourite backpack, we repositioned Herschel’s PNW roots: moving them out of the forest and into the world. Tapping into transformative travel, we explored the trip itself. How? Each season we discovered a new city with soul and a neighbourhood with community to tell stories about stepping outside and connecting to culture. ',
          type: 'text',
          title: 'Positioning & Seasonal Campaign Direction',
          fontSize: '54px',
          color: '#CABADF',
          backgroundColor: '#384163'
        },
        {
          src: 'In a creative partnership with their internal team, we supported their brand strategy by developing a distinct approach to seasonal versus product campaigns and a go-to-market strategy (drops and partnerships). <br><br>Creative Direction<br>Campaign Strategy<br>On-set Direction',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#384163'
        },
        {
          src: 'This edit includes images from various seasons<br>Photography Stephen Wilde<br>Styling Mila Franovic, Tiana Franks<br>Sets & Props Oliver Stenberg<br>HMU Maxine Munson, Becca Randle, Maria Walton<br>Production Marta Sanderson, Pip Groom, Robyn Farnham<br>Shot in LA, London & Vancouver',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#384163'
        }
      ]}
    />
    <ParallaxSlider
      id={4}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.5.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.5.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/NP_1.jpg',
          type: 'image'
        },
        {
          src: 'images/NP_2.jpg',
          type: 'image'
        },
        {
          src: 'videos/NP_3.mp4',
          type: 'video'
        },
        {
          src: 'videos/NP_4.mp4',
          type: 'video'
        },
        {
          src: 'videos/NP_5.mp4',
          type: 'video'
        },
        {
          src: 'images/NP_6.jpg',
          type: 'image'
        },
        {
          addPadding: true,
          src: 'videos/NP_7.mov',
          type: 'video',
          backgroundColor: '#231F20'
        },
        {
          src: 'videos/NP_8.mp4',
          type: 'video'
        },
        {
          src: 'We had deep and honest conversations as we took the founders through Brand Therapy™. We busted the myths of a dated industry culture and uncovered their unique positioning. It informed a comprehensive ecosystem for Nine Point’s identity — elevated branding, a bold website and engaging social content for the future of progressive lifestyle and cannabis brands.',
          type: 'text',
          title: '(Re)Brand & Identity System',
          fontSize: '54px',
          color: '#4E151D',
          backgroundColor: '#C3862C'
        },
        {
          src: 'Our strategy evolved Nine Point’s brand identity into a complete ecosystem,<br>including branding, design, direction, tone and photography.<br><br>Brand Strategy<br>Creative Direction<br>Identity & Digital Design<br>Voice & Messaging<br>Art Direction<br>Off-figure Sets & Props',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C3862C'
        },
        {
          src: 'Voice & Copy Sacha Jackson<br>Photography Jennifer Latour<br>Styling Leila Bani<br>HMU Karin Shoji',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C3862C'
        }
      ]}
    />
    <ParallaxSlider
      id={5}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.6.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.6.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/HIRRS_1.jpg',
          type: 'image'
        },
        {
          src: 'images/HIRRS_2.jpg',
          type: 'image'
        },
        {
          src: 'images/HIRRS_3.jpg',
          type: 'image'
        },
        {
          src: 'images/HIRRS_4.jpg',
          type: 'image'
        },
        {
          src: 'images/HIRRS_5.jpg',
          type: 'image'
        },

        {
          src: 'images/HIRRS_6.jpg',
          type: 'image'
        },
        {
          src: "The body says what words cannot. Focusing on women's movement, the HIRRS launch campaign aimed to express a vulnerable, artful and quietly powerful voice that needs to be heard. Our direction countered traditional beauty ideals and challenged the male gaze. Bringing together an all woman crew, our approach updated the representation of women’s bodies.",
          type: 'text',
          title: 'Launch & Brand Campaign ',
          fontSize: '54px',
          color: '#FFFFFF',
          backgroundColor: '#290B15'
        },
        {
          src: 'Supporting their slow fashion ethos, we worked with the founders to establish a creative direction designed to last.<br>Creative Direction<br>Art Buying<br>Casting<br>On-set Direction',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#290B15'
        },
        {
          src: 'Photography Jennifer Latour<br>Assist. Emilia Kalka<br>Styling Lelia Bani<br>HMU Maxine Munson<br>Models Iman, Kiko & Rhi',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#290B15'
        }
      ]}
    />
    <ParallaxSlider
      id={6}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.7.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.7.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/LB_1_1.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_1_2.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_1_3.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_1_5.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_1_6.jpg',
          type: 'image'
        },
        {
          src: 'Operating on a foundation of trust means we can experiment and take risks. The conceptual directions we define each seasonal are self-aware and researched. We pull from cultural events, behavioral trends and the ever shifting collective understanding of the world we live in. We invite new talent to the set, making sure we tell the story from a place of relevance and inclusivity.',
          type: 'text',
          title: 'Scope',
          color: '#4E151D',
          backgroundColor: '#C84600'
        },
        {
          src: 'Having history with the brand and team, SB x LB share a lot of trust and respect.<br>As their campaign partners, we have had the pleasure to support their brand<br>leaders and creative team.<br><br>Creative Direction<br>Campaign Strategy<br>Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C84600'
        },
        {
          src: 'Photography Melissa Gamache, Pegah Farahmand, Carlo Calope<br>Assist. Renaud Lafrenière, Patrick Custo-Blanch, William Cole, Jeremy Bobrow,<br>Aljosa Alijagic, Don Loga<br>Styling Frederique Gauthier, Tinashe Musara, Assist. Leah Grantham, Haji Maa<br>HMU Cynthia-Christina Cadieux, Marianne Caron, Léonie Lévesque, Assist. Ana-<br>Maria Cimpoia, Claudine Jourdain<br>Models Jefferson, Sophie, Jade, Celeste, Mustapha, Sheida, Damian, Miranda,<br>Megane, Chelsea, Miles, Soukayna<br>Sets & Props Michaël Ho, Marie Hélène Lavoie<br>Production Kristia Louis-Seize, Studio L’Éloi, Little Burgundy Shoes',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C84600'
        }
      ]}
    />
    <ParallaxSlider
      id={7}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.8.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.8.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/Rise_1.jpg',
          type: 'image'
        },
        {
          src: 'images/Rise_2.jpg',
          type: 'image'
        },
        {
          src: 'images/Rise_3.jpg',
          type: 'image'
        },
        {
          src: 'images/Rise_4.jpg',
          type: 'image'
        },
        {
          src: 'images/Rise_5.jpg',
          type: 'image'
        },
        {
          src: 'images/Rise_6.jpg',
          type: 'image'
        },
        {
          src: 'videos/Rise_7.mp4',
          type: 'video'
        },
        {
          src: 'When concepting for this launch, we landed on a strategy to revive RISE’s cultural relevance. Defining their creative pillars as emotion, vibrancy and wonder, we invited the audience to feel intellectually stimulated, and walk away with a story. Anchored in playful escapism, the campaign spoke to the perennially curious as a physical manifestation of indulgence.',
          type: 'text',
          title: 'New Product Launch OOH Campaign',
          fontSize: '54px',
          color: '#84402A',
          backgroundColor: '#C374F6'
        },
        {
          src: 'We built a creative strategy which recognized that the brand is larger than the product. Working in tandem with the brand strategist we developed an integrated campaign (photography, video, microsite direction, OOH design, event programming including guests and speakers, invitation design, and social media assets).<br><br>Creative Direction<br>On-set Direction<br>Design<br>Event & Activation ',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C374F6'
        },
        {
          src: 'Photography Mathieu Fortin, Nik Mirus<br>Assist. Alexis Belhumeur, Aljosa Alijagic, Jeremy Bobrow<br>Styling Marianne Dubreuil<br>HMU Nicolas Blanchet<br> Sets & Props Audrey St-Laurent<br>Brand Strategy Marissa De Miguel<br>Models Nicholas, Hawa, Yvan, Lina<br>Produced & Shot st Studio L’Éloi, Montréal',
          type: 'text',
          title: 'Rise Kombucha',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C374F6'
        }
      ]}
    />
    <ParallaxSlider
      id={8}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.9.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.9.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/KOMBI_1.jpg',
          type: 'image'
        },
        {
          src: 'images/KOMBI_2.jpg',
          type: 'image'
        },
        {
          src: 'images/KOMBI_3.jpg',
          type: 'image'
        },
        {
          src: 'images/KOMBI_4.jpg',
          type: 'image'
        },
        {
          src: 'images/KOMBI_5.jpg',
          type: 'image'
        },
        {
          src: 'images/KOMBI_6.jpg',
          type: 'image'
        },
        {
          src: 'We translated Kombi’s 60+ years of family history into vibrant, engaging images that invite all to join the fun. Partnering with them to myth bust performance and elitism in the outdoor space, we built a positioning around participation, play and inclusion. With Kombi, it’s a family thing.',
          type: 'text',
          title: 'Campaign Strategy',
          fontSize: '54px',
          color: '#FFFFFF',
          backgroundColor: '#3851BA'
        },
        {
          src: 'As Kombi’s strategic and creative partner we supported their internal team<br>throughout campaign development from concept to production.<br> Additionally, we supported the brand to shape their customer facing personality.<br>Creative Direction<br>Campaign Strategy<br>Concept<br>Voice & Messaging<br> Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction<br>Production',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#3851BA'
        },
        {
          src: 'Photography Kelly Jacob, assisted by Renaud Robert, Tom Berthelot<br>  Videography  Matt Charland, Oli Chapo<br>Styling Izabel Soucy, Assist. Samuel Joubert<br>HMU Valeria Amirova<br>Models Sam, Juliette, Jade, Cole, Rokko Riders<br>Catherine Perrault, Antoine St-Hilaire, Julien Gauthier, Jacob Gagnon<br>Producer Jade Fortin Côté, Assist.  Alexis Gauvin B.',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#3851BA'
        }
      ]}
    />
    <ParallaxSlider
      id={9}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.10.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.10.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/NIKE_1.jpg',
          type: 'image'
        },
        {
          src: 'images/NIKE_2.jpg',
          type: 'image'
        },
        {
          src: 'images/NIKE_3.jpg',
          type: 'image'
        },
        {
          src: 'images/NIKE_4.jpg',
          type: 'image'
        },
        {
          src: 'images/NIKE_5.jpg',
          type: 'image'
        },
        {
          addPadding: true,
          src: 'videos/NIKE_6.mp4',
          type: 'video',
          backgroundColor: '#222232'
        },
        {
          src: 'As part of the North American Nike campaign to revive the cultural caché of Air Max, we were brought on as the Canadian team. The images, featuring multimedia artist Will Selviz were rolled out at Nike and Foot Locker, in-store and online,  and to launch Air Max Day.',
          type: 'text',
          title: 'Air Max Will Selviz',
          fontSize: '54px',
          color: '#FFFFFF',
          backgroundColor: '#222232'
        },
        {
          src: 'Working closely with the in-house leads, we were on set in Vancouver to art direct and liaise with the Portland and NYC teams.',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#222232'
        },
        {
          src: 'Vancouver Team — Talent Will Selviz Photography Conor Cunningham Assist. Rob Seebacher, Mats Schram, Donnel Barroso Styling Leila Bani, Assist. Masha Pazhouh, Deo Cruz HMU Christopher Deagle DOP The Pool Service Production Design Hank Mann Sets & Props Freddy Harder, Lauren Barrufa 1st AD Richard AmiesProduction Blue Amber, Vancouver',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#222232'
        }
      ]}
    />
    <ParallaxSlider
      id={10}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.11.title')}
      title2={$_('slider.11.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/LB_2_1.jpg',
          type: 'image'
        },
        {
          imageSrc: 'images/LB_2_2.jpg',
          videoSrc: 'videos/LB_2_2v.mp4',
          type: 'two-columns'
        },
        {
          src: 'images/LB_2_3.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_2_4.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_2_5.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_2_6.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_2_7.jpg',
          type: 'image'
        },
        {
          src: 'images/LB_2_8.jpg',
          type: 'image'
        },
        {
          src: 'Photography Kelly Jacob, Akina Chan, Briggs Ogloff, William Arcand, Marie H. Rainville, Assist. Don Loga, Emily Velasquez Gilbert, Kyle Gibson, Alex Guiry, Axel & Jacques Palomares, Greg Beck Videography Gerardo Alcaine Styling Tinashe Musara, Leila Bani, Tiana Franks, Frédérique Gauthier, Izabel Soucy, Assist. Eunice Huot, Alyson Holler Sets & Props Evelyne Morin HMU Ashley Diabo, Maxine Munsun, Maria Walton, Alana & Maddie Alper, Léonie Lévesque, Claudine Jourdain Models Ivy, Jamil, Ludovie, Kevin, Simone, Zacc, Anastasia, Tatenda, Shade, Whitney, Ciana Yekta, Chanel, Noémie Jérôme, Naomy, Adams, Production Aaron Van Dyck (Vancouver),  Kristia Louis-Seize (Montréal)',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#A3232E'
        }
      ]}
    />
    <ParallaxSlider
      id={11}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.12.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.12.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/CIS_1.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_2.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_3.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_4.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_5.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_6.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_7.jpg',
          type: 'image'
        },
        {
          src: 'images/CIS_8.jpg',
          type: 'image'
        },
        {
          src: 'We updated the brand strategy to support the client’s<br>shift from trend retailer to a purpose-driven brand. We<br>brought significant changes to the DNA, resetting them<br>on a foundation of inclusion, a community-first<br>approach that is still true to the brand today. Extending<br>these values behind the lens with the crew and talent<br>allowed us to prove the Call It Spring family is real.',
          type: 'text',
          title: 'Creative Direction & Brand DNA',
          fontSize: '54px',
          color: '#C34C25',
          backgroundColor: '#CABADF'
        },
        {
          src: 'As the once-upon-a-time in house, we go way back. Our history, trust and<br>deep understanding of their business reality positioned us as long-term<br>partners.<br>Creative Direction<br>Brand Strategy<br>Messaging Casting<br>On-set Direction<br>SB Secret Sauce Shot List<br>Shoe Face Ratio™',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#CABADF'
        },
        {
          src: 'This edit includes images from various seasons.<br>Photography Tim Barber Styling Imogene Barron<br>Sets & Props Sean Daly<br>HMU Nikki Providence, Sandy Ganzer, Danielle & Nicole Kahlani<br>Models KC, Dronme, Sandrine, Shaheem, Barbie, Julian, Christie, Alexis, Bella,<br>Sahara, Josiah<br>Production The Production Club, Jade Jean-Marie, Natasha Forte, Camp<br>Productions Shot on location in LA & London',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#CABADF'
        }
      ]}
    />
    <ParallaxSlider
      id={12}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.13.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.13.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/LOUISE_1.jpg',
          type: 'image'
        },
        {
          src: 'images/LOUISE_2.jpg',
          type: 'image'
        },
        {
          src: 'images/LOUISE_3.jpg',
          type: 'image'
        },
        {
          src: 'images/LOUISE_4.jpg',
          type: 'image'
        },
        {
          src: 'How do you begin with a sound and create imagery that<br>speaks to the emotion and personal message of a song?<br>With Louise Burns, coming to terms with teen stardom<br>led her towards heartbreaking introspection and her<br>fourth album, Portraits. Our creative direction<br>recognized her growth and spoke to the strength of<br>being a grown ass woman.',
          type: 'text',
          title: 'Creative Direction & Design',
          fontSize: '54px',
          color: '#FFFFFF',
          backgroundColor: '#1D1D1D'
        },
        {
          src: 'We worked collaboratively  with Louise to define her new<br>look and build the team to help create it.<br><br>Creative Direction<br>On-set Direction<br>Graphic Design',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#1D1D1D'
        },
        {
          src: 'Photography Jennifer Latour<br>Styling Redia Soltis<br>HMU Taylor Smits, Harriet Sales',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#1D1D1D'
        }
      ]}
    />
    <ParallaxSlider
      id={13}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.14.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.14.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/GHANA_1.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_2.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_3.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_4.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_5.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_6.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_7.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_8.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_9.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_10.jpg',
          type: 'image'
        },
        {
          src: 'images/GHANA_11.jpg',
          type: 'image'
        },
        {
          src: 'Through our relationship with Osei Duro, we<br>experienced something beyond a typical partnership.<br>We collaborated with creatives in many cities, travelled<br>and immersed ourselves in different realities, and<br>challenged our understanding of (slow) fashion. It<br>fundamentally changed our understanding of the<br>industry, our practice and our impact.',
          type: 'text',
          title: 'A Photo Essay on Slow Fashion',
          fontSize: '54px',
          color: '#E1D8CA',
          backgroundColor: '#111E'
        },
        {
          src: 'Campaign Photography Jessica Sarkodie, Mathieu Fortin Film & Travel Photography Super BonjourSets & Props Osei Duro, Super Bonjour Styling Osei Duro, Jay Forest HMU by Alana & Maddie Alper Models Nuerki, Penny Shot in Montréal and in various locations around Accra, Ghana',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#111E'
        }
      ]}
    />
    <ParallaxSlider
      id={14}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.15.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.15.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/DT1_1.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_2.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_3.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_4.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_5.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_6.jpg',
          type: 'image'
        },
        {
          src: 'images/DT1_7.jpg',
          type: 'image'
        },
        {
          src: 'As their creative partners, we worked with the in-house<br>team to course correct their positioning vis-a-vis a<br>booming wellness industry. We refined a proprietary<br>take on self-care and rituals, updated their overall<br>design codes to inform their campaigns, packaging, tone<br>and OOH messaging.',
          type: 'text',
          title: 'Brand Positioning & Campaign Strategy',
          fontSize: '54px',
          color: '#FFFFFF',
          backgroundColor: '#290B15'
        },
        {
          src: 'Creative Direction, Campaign Strategy, Art Buying & On-set Direction<br>Video Storyboarding & Direction<br>Packaging Design ',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#290B15'
        },
        {
          src: 'This edit includes images from various seasons<br>Photography by Mathieu Fortin<br>Assist. Martin Lacroix, Marc-André Dumas, Carlo Calope,<br>Gerardo Alcaine Sets & Props Evelyne Morin, Audrey St-Laurent<br>Production Studio L’Éloi, Montréal',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#290B15'
        }
      ]}
    />
    <ParallaxSlider
      id={15}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.16.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.16.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/Saxx_1.jpg',
          type: 'image'
        },
        {
          src: 'images/Saxx_2.jpg',
          type: 'image'
        },
        {
          src: 'images/Saxx_3.jpg',
          type: 'image'
        },
        {
          src: 'images/Saxx_4.jpg',
          type: 'image'
        },
        {
          src: 'images/Saxx_5.jpg',
          type: 'image'
        },
        {
          src: 'images/Saxx_6.jpg',
          type: 'image'
        },
        {
          src: 'For the love of dad — a feminist take on Father’s Day,<br>updating how men are portrayed. Inspired by Linda<br>McCartney’s family photos, our concept was anchored in<br>the compassionate and tender gaze of a partner.<br>Challenging the outdated codes of masculinity, we<br>analyzed what it means to be a father (figure) today and<br>crafted a love letter to the true spirit of fatherhood.',
          type: 'text',
          title: 'Campaign Concept & Storytelling',
          fontSize: '54px',
          color: '#C84600',
          backgroundColor: '#CABADF'
        },
        {
          src: 'Sometimes, casting needs to happen on both sides of the lens. We<br>reached out to our community to find the right pairing of family and<br> photographer. Partnering with our favorite London-based<br>photographer, Imogene Barron, we captured sweet father-daughter<br>moments at the Jean-Marie home.<br>Creative Direction<br>Messaging<br>Casting<br>Art Buying<br>Virtual Art Direction',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#CABADF'
        },
        {
          src: 'Photography Imogene Barron, Assist James Giffiths<br>Styling Imogene Barron, Assist. Alicia Ellis<br>London Production Jade Jean-Marie<br>Vancouver Production Aaron Van Dyck<br>Featuring The Jean-Marie Family — Leon, Iggy & Milou<br>Shot on location in London',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#CABADF'
        }
      ]}
    />
    <ParallaxSlider
      id={16}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.17.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.17.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/ALTI_1.jpg',
          type: 'image'
        },
        {
          src: 'images/ALTI_2.jpg',
          type: 'image'
        },
        {
          src: 'images/ALTI_3.jpg',
          type: 'image'
        },
        {
          src: 'images/ALTI_4.jpg',
          type: 'image'
        },
        {
          src: 'images/ALTI_5.jpg',
          type: 'image'
        },
        {
          src: 'images/ALTI_6.jpg',
          type: 'image'
        },
        {
          src: 'Starting from a copy brief, we rooted this concept in<br>emotional insights, designed to unite. Capturing that<br>very moment of transformation — the feeling of<br>achieving a new personal best — we called in a<br>community of lunchtime athletes and introducing them<br>to their new favorite retailer.',
          type: 'text',
          title: 'OOH Campaign Direction',
          fontSize: '54px',
          color: '#F8D0FB',
          backgroundColor: '#C34C25'
        },
        {
          src: 'We joined the in-house team to develop an awareness campaign for multiple<br>cities and new markets.<br><br>Campaign Strategy & Qualitative Insights<br>Storyboarding, Casting & On-set Direction<br>SB Secret Sauce Shot List',
          type: 'text',
          title: 'Scope',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C34C25'
        },
        {
          src: 'Photography by Mathieu Fortin, Assist. Aljosa Alijagic, William Cole<br> Styling by Farah Benosman, Assist. Marianne Blais & Pascale Tessier<br>Sets & Props Mathilde Beaudoin-Tessier, Jean-Philippe Pelletier<br>HMU Valeria Amirova, Assist. Marie-Pier Tardif<br>Models Sheida, Noémie, Diizon, Amélie<br> Production Jordan R. Bruneau, Madame Brown<br>Shot at the Olympic Stadium, Montréal ',
          type: 'text',
          title: 'Credits',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#C34C25'
        }
      ]}
    />
    <ParallaxSlider
      id={17}
      updateProjectIndex={(id) => handleProjectUpdate(id)}
      title={$_('slider.18.title')}
      titleFont="roc-grotesk"
      title2={$_('slider.18.title2')}
      isMobile={isMobile && isLandscapeView}
      {innerWidth}
      {innerHeight}
      slidesData={[
        {
          src: 'images/DT_2_1.jpg',
          type: 'image'
        },
        {
          src: 'images/DT_2_2.jpg',
          type: 'image'
        },
        {
          src: 'images/DT_2_3.jpg',
          type: 'image'
        },
        {
          src: 'images/DT_2_4.jpg',
          type: 'image'
        },
        {
          addPadding: true,
          backgroundColor: '#9A7429',
          src: 'videos/DT_2_5 LIGHT.mp4',
          type: 'video'
        },
        {
          src: 'images/DT_2_6.jpg',
          type: 'image'
        },
        {
          src: 'images/DT_2_7.jpg',
          type: 'image'
        },
        {
          src: 'Creative Direction, Campaign Strategy & On-set Direction<br>Super Bonjour<br>This edit includes images from various seasons.<br>Photography Nik Mirus, Mathieu Fortin<br>Assist. Jeremy Bobrow, Marc-André Dumas<br>DOP Nik Mirus Assist. Gerardo Alcaine, Gaffer Bastien<br>Mayer, Grip Stéphane Klopp<br> Copy & Script Sacha Jackson<br>Sets & Props Evelyne Morin, Audrey St-Laurent, Michaël Ho<br>Styling Rima Chahine<br>Produced & Shot at Studio L’Éloi, Montréal',
          type: 'text',
          title: 'Fable Home',
          font: 'roc-grotesk, sans-serif',
          fontSize: '30px',
          color: '#E2EE75',
          backgroundColor: '#9A7429'
        }
      ]}
    />
  </div>
</main>

<style>
  :global(body) {
    padding: 0;
  }
  .container {
    overflow: hidden;
    transition: transform 0.5s linear;
  }
  .header {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 1000;
    font-family: 'Opposit-Medium';
  }

  .dialog-icon {
    width: 64px;
    height: 39px;
    padding: 33px;
    cursor: pointer;
    margin-top: 28px;
    margin-right: 25px;
  }
  .mobile-portrait {
    display: none;
  }

  /* Portrait Mobile*/
  @media screen and (max-device-width: 480px) and (orientation: portrait) {
    .mobile-portrait {
      display: block;
      box-sizing: border-box;
      position: fixed;
      background: #0003fe;
      height: 100vh;
      z-index: 1000;
      padding: 3rem;
      overflow: scroll;
    }

    .mobile-portrait-message {
      font-family: roc-grotesk;
      color: #e2ee75;
      font-size: 24px;
      line-height: 1.3;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  /* Landscape Mobile*/
  @media screen and (max-width: 1200px) and (max-height: 499px) {
    :global(html) {
      height: 100%;
      width: 100%;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #0000ff;
    }
    :global(body) {
      padding: 0;
      height: 100%;
      width: 100%;
      height: 100vh;
      width: 100vw;
      margin: 0;
      overflow: hidden;
      background-color: #0000ff;
    }

    .container {
      overflow: visible;
      transition: transform 0.5s linear;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0;
      margin: 0;
    }
    .dialog-icon {
      width: 25px;
      height: unset;
      padding: 20px;
      margin-top: 20px;
      margin-right: 25px;
    }
  }

  @media screen and (max-width: 600px) {
    .dialog-icon {
      width: 37px;
      height: 23px;
      padding: 15px;
    }
  }
</style>
