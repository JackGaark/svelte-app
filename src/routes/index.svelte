<script>
  import ParallaxSlider from '$lib/components/ParallaxSlider.svelte';
  import PopUp from '$lib/components/PopUp.svelte';
  import { _ } from 'svelte-i18n';
  import { initI18n } from '$lib/components/i18n/i18n.js';
  import { onMount, tick } from 'svelte';
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
  let innerWidth = 0;
  let innerHeight = 0;
  $: isLandscapeView = false;
  // Check for mobile device.
  onMount(async () => {
    //for testing purpose on mobile
    let forceMobile = false;
    isMobile = checkIsMobile(forceMobile);
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
    console.log(project_index);
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
  const projectsArray = [
    {
      id: 0,
      title: 'slider.1.title',
      title2: 'slider.1.title2',
      slidesData: [
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
          src: 'Super Bonjour guided Herschel away from their regionalist identity, and placed them in a global community. We used the magazine to reposition the brand, while working with our network to generate lasting ties with creatives and travelers.  Vol 1: Islands — a theme explored geographically and metaphorically.',
          type: 'text',
          title: 'Creating a Travel Magazine',
          fontSize: '54px',
          color: '#4E151D',
          backgroundColor: '#C3862C'
        },
        {
          src: '360 Content Strategy —<br>We took on the full scope of the project from editorial lineups, commissioning original content, social media meta accounts and branded Google Docs. We planned a launch event, during the LA Art Book Fair, on Echo Park’s island and a 1-800 number connecting callers to the sounds of island life.<br><br>Brand Positioning, Creative Direction <br>Production, Theme Development, Contributor Outreach <br>Pagination & Flatplan, Art Direction, Editorial Design<br>Print Management & Distribution Strategy <br>Event & Activation',
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
      ]
    },
    {
      id: 1,
      title: 'slider.2.title',
      title2: 'slider.2.title2',
      slidesData: [
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
          src: 'Establishing the brand’s storytelling style meant immersing ourselves in Osei Duro’s process and day-to-day out of the Accra studio in Ghana.  We dove deep, via workshops and collecting insights, to inform the brand’s expressions in photography, casting, styling, tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.',
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
      ]
    },
    {
      id: 2,
      title: 'slider.3.title',
      title2: 'slider.3.title2',
      slidesData: [
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
          src: 'Capturing the often overlooked in-between moments at home, our creative strategy positioned Fable’s  identity as slow, artisanal luxury. We defined codes that felt unique to Fable for a proprietary sense of refinement and emotionally engaging storytelling — while steering them away from a generic DTC look.',
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
      ]
    },
    {
      id: 3,
      title: 'slider.4.title',
      title2: 'slider.4.title2',
      slidesData: [
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
      ]
    },
    {
      id: 4,
      title: 'slider.4.title',
      title2: 'slider.4.title2',
      slidesData: [
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
          src: 'Our strategy evolved Nine Point’s brand identity into a complete ecosystem,including branding, design, direction, tone and photography.<br><br>Brand Strategy<br>Creative Direction<br>Identity & Digital Design<br>Voice & Messaging<br>Art Direction<br>Off-figure Sets & Props',
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
      ]
    }
  ];
</script>

<svelte:head>
  <title>Super Bonjour</title>
  <meta name="title" content="Creative Studio" />
  <meta
    name="description"
    content="We specialize in strategy, branding & content. We work with brands seeking cultural relevance. We advocate for progressive & sustainable values."
  />
  <meta
    name="viewport"
    content="height=device-height, initial-scale=1, width=device-width, initial-scale=1"
  />
  <meta property="og:url" content="https://www.superbonjour.com/" />
</svelte:head>
<svelte:body
  on:viewportchanged={() => {
    innerWidth = viewport.Width;
    innerHeight = viewport.Height;
    debugger;
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
      mobile's your thing <span style="color:#E0A239">➙</span>
      <span style="color:#f86c00">rotate your device</span>, that would be Super
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
    {#each projectsArray as project}
      <ParallaxSlider
        id={project.id}
        updateProjectIndex={(id) => handleProjectUpdate(id)}
        title={$_(project.title)}
        titleFont="roc-grotesk"
        title2={$_(project.title2)}
        isMobile={isMobile && isLandscapeView}
        {innerWidth}
        {innerHeight}
        slidesData={project.slidesData}
      />
    {/each}
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
