<script>
  import ParallaxSlider from "$lib/components/ParallaxSlider.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import { _ } from 'svelte-i18n';
  import { initI18n } from "$lib/components/i18n/i18n.js";
  import "../app.css"

  initI18n();

  let modalOpen = false;
  function showModal() {
    modalOpen = true;
  }
  function hideModal() {
    modalOpen = false;
  }
</script>


<div class="header">
    <img src="images/dialog-icon.png" class="dialog-icon" alt="Dialog icon" on:click={showModal} />
</div>

<PopUp bind:modalOpen></PopUp>

<main>
  <div class="container">
    <ParallaxSlider
      title="{$_('slider.1.title')}"
      slides={[
        {
          src: "images/HSCo_Mag_1.png",
          type: "image"
        },
        {
          src:"images/HSCo_Mag_2.png",
          type: "image"
        },
        {
          src:"images/HSCo_Mag_3.png",
          type: "image"
        },
        {
          src:"images/HSCo_Mag_4.png",
          type: "image"
        },
        {
          src:"images/HSCo_Mag_5.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_6.png",
          type: "image"
        },
        {
          src: "Magazines *♡* also a great medium to reposition a brand. We created a tool to build a community and generate lasting ties with creatives & travelers.Vol 1: Islands — a theme explored geographically, and metaphorically. From the launch party at Echo Park Island to a 1 800 number connecting you to the sounds of island life, every detail was considered.",
          type: "text",
          title: "Creating a Travel Magazine",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "360 Content Strategy — <br>We took on the project’s full scope from editorial lineups, branded Google docs and social media meta accounts to commissioning original content. Working with the SB network was key when building Hershel’s global community and content.<br><br>Brand Positioning, Creative Direction, Production, Theme Development, Contributor Outreach, Pagination & Flatplan, Art Direction, Editorial Design, Print Management and Distribution Strategy.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        },
        {
          src: "Imogene Barron, Ryan Daniel Browne, Eva Cremers, Natasha & Dino Forte, Michelle Maguire, Meaghan Way, Kelsey McClellan, Ashley Oliveri, Catherine Potvin, Marie H. Rainville, Houmi Sakata, Victoria Sieczka, Aileen Son, Oumayma Ben Tanfous, Stephanie Mercier Voyer, Stephen Wilde, ​​Nico Young, Sacha Jackson, Editor<br><br>Featuring Hana Vu, Danny Smiles, Bradley Sheppard, Amélie Rousseaux, Apolla Echino, Maxime Bayol, Marc Cefalu Awards<br> <br>Editorial, Entire Publication — Applied Arts 2021<br>Design, Éditorial — Concours Idéa 2021",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.1.title')}"
      slides={[
        {
          src: "images/OD_1.png",
          type: "image"
        },
        {
          src:"images/OD_2.png",
          type: "image"
        },
        {
          src:"images/OD_3.png",
          type: "image"
        },
        {
          src:"images/OD_4.png",
          type: "image"
        },
        {
          src:"images/OD_5.png",
          type: "image"
        },
        {
          src: "images/OD_6.png",
          type: "image"
        },
        {
          src: "images/OD_7.png",
          type: "image"
        },
        {
          src: "Working out of the Accra studio and residence, we were immersed in Osei Duro’s process and day-to-day. We dove deep, via workshops and collecting insights to inform the brand’s expressions — in photography, casting, styling, tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.",
          type: "text",
          title: "Brand Platform & Campaign Strategy",
          fontSize: "54px",
          color: "#E1D8CA",
          backgroundColor: "#111E0C"
        },
        {
          src: "Deep Dive & Immersion — <br>Factory and textile print shop visits and day-to-day operations<br><br>Brand Audit & Strategy — <br>Review of all the content to help establish a new strategy,<br> workshops and brand platform<br><br>2019 Campaign Shoots —<br>Creative Direction<br>Pre-production & On-set Direction<br>Campaign Shoots, on location<br>Lookbook Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E1D8CA",
          backgroundColor: "#111E0C"
        },
        {
          src: "Campaign Photography Kay Kwabia<br>Film Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour<br>Styling Osei Duro, footwear and accessories sourced from Kantamanto Market<br>Models Eyiwaa, Amisum, Julee, David<br>Shot in Accra, Ghana",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E1D8CA",
          backgroundColor: "#111E0C"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.1.title')}"
      slides={[
        {
          src: "images/Fable_1.png",
          type: "image"
        },
        {
          src:"images/Fable_2.png",
          type: "image"
        },
        {
          src:"images/Fable_3.png",
          type: "image"
        },
        {
          src:"images/Fable_4.png",
          type: "image"
        },
        {
          src: "images/Fable_5.png",
          type: "image"
        },
        {
          src: "videos/Fable_SuperBonjour.mp4",
          type: "video"
        },
        {
          src: "Carefully crafting each image, capturing the often overlooked in-between moments, the campaign positioned Fable as slow artisanal luxury and celebrates the softness of life at home. We defined codes that felt unique to Fable, for a proprietary sense of refinement and emotionally engaging storytelling — while steering them away from a generic DTC look. ",
          type: "text",
          title: "Brand Campaign Strategy",
          fontSize: "54px",
          color: "#CBD0BA",
          backgroundColor: "##290B15"
        },
        {
          src: "Brand Audit & Campaign Strategy —<br>Review of the photo content on digital channels to establish a new strategy<br><br>2020 Campaign Shoot —<br> Creative Direction<br>Pre-production & On-set Direction<br>Ecomm Direction ",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##290B15"
        },
        {
          src: "Campaign Photography Mathieu Fortin<br>Campaign Videography Gerardo Alcaine<br>Sets & Props Audrey St-Laurent<br>Retouching & E-commerce Photography Bonesso Dumas<br>Copy Sacha Jackson<br>Produced & Shot at Studio L’Éloi, Montréal",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##290B15"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.3.title')}"
      slides={[ 
        {
          src: "images/HSCo_1.png",
          type: "image"
        },
        {
          src: "images/HSCo_2.png",
          type: "image"
        },
        {
          src: "images/HSCo_3.png",
          type: "image"
        },
        {
          src: "images/HSCo_4.png",
          type: "image"
        },
        {
          src: "images/HSCo_5.png",
          type: "image"
        },
        {
          src: "images/HSCo_6.png",
          type: "image"
        },
        {
          src: "images/HSCo_7.png",
          type: "image"
        },
        {
          src: "A fresh take on everyone’s favourite backpack, we repositioned Herschel’s PNW roots: moving them out of the forest and into the world. Tapping into transformative travel, we explored the trip itself. How? Each season we discovered a new city with soul and a neighbourhood with community to tell stories about stepping outside and connecting to culture. ",
          type: "text",
          title: "Positioning & Seasonal Campaign Direction",
          fontSize: "54px",
          color: "#CABADF",
          backgroundColor: "#384163"
        },
        {
          src: "In a creative partnership with their internal team, we supported their brand strategy by developing a distinct approach to seasonal versus product campaigns and a go-to-market strategy (drops and partnerships). Creative Direction Campaign Strategy On-set Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#384163"
        },
        {
          src: "This edit includes images from various seasons<br>Photography Stephen Wilde<br>Styling Mila Franovic, Tiana Franks<br>Sets & Props Oliver Stenberg<br>HMU Maxine Munson, Becca Randle, Maria Walton<br>Production Marta Sanderson, Pip Groom, Robyn Farnham<br>Shot in LA, London & Vancouver",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#384163"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.4.title')}"
      slides={[
        {
          src: "images/NP_1.png",
          type: "image"
        },
        {
          src:"images/NP_2.png",
          type: "image"
        },
        {
          src:"videos/NP_3.mp4",
          type: "video"
        },
        {
          src:"videos/NP_4.mp4",
          type: "video"
        },
        {
          addPadding: true,
          src:"videos/video7.mp4",
          type: "video"
        },
        {
          src:"images/NP_6.png",
          type: "image"
        },
        {
          src:"images/NP_7.png",
          type: "image"
        },
        {
          src:"videos/NP_8.mp4",
          type: "video"
        },
        {
          src: "We had deep and honest conversations as we took the founders through Brand Therapy™. We busted the myths of a dated industry culture and uncovered their unique positioning. It informed a comprehensive ecosystem for Nine Point’s identity — elevated branding, a bold website and engaging social content for the future of progressive lifestyle and cannabis brands.",
          type: "text",
          title: "(Re)Brand & Identity System",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "Our strategy evolved Nine Point’s brand identity into a complete ecosystem,<br>including branding, design, direction, tone and photography.<br><br>Brand Strategy<br>Creative Direction<br>Identity & Digital Design<br>Voice & Messaging<br>Art Direction<br>Off-figure Sets & Props.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        },
        {
          src: "Voice & Copy Sacha Jackson<br>Photography Jennifer Latour<br>Styling Leila Bani<br>HMU Karin Shoji",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        }
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.8.title')}"
      slides={[
        {
        src: "images/HIRRS_1.png",
        type: "image"
        },
        {
        src: "images/HIRRS_2.png",
        type: "image"
        },
        {
          src: "images/HIRRS_3.png",
          type: "image"
        },
        {
          src: "images/HIRRS_4.png",
          type: "image"
        },
        {
          src: "images/HIRRS_5.png",
          type: "image"
        },

        {
          src: "images/HIRRS_6.png",
          type: "image"
        },
        {
          src: "The body says what words cannot. Focusing on women's movement, the HIRRS launch campaign aimed to express a vulnerable, artful and quietly powerful voice that needs to be heard. Our direction countered traditional beauty ideals and challenged the male gaze. Bringing together an all woman crew, our approach updated the representation of women’s bodies.",
          type: "text",
          title: "Launch & Brand Campaign ",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#290B15"
        },
        {
          src: "Supporting their slow fashion ethos, we worked with the founders to establish a<br>creative direction designed to last.<br>Creative Direction<br>Art Buying<br>Casting<br>On-set Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        },
        {
          src: "Photography Jennifer Latour<br>Assist. Emilia Kalka<br>Styling Lelia Bani<br>HMU Maxine Munson<br>Models Iman, Kiko & Rhi",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        }
      ]}   
    />
    <ParallaxSlider
      title="{$_('slider.6.title')}"
      slides={[
        {
          src: "images/LB_1_1.png",
          type: "image"
        },
        {
          src:"images/LB_1_2.png",
          type: "image"
        },
        {
          src:"images/LB_1_3.png",
          type: "image"
        },
        {
          src:"images/LB_1_5.png",
          type: "image"
        },
        {
          src:"images/LB_1_6.png",
          type: "image"
        },
        {
          src: "Operating on a foundation of trust means we can experiment and take risks. The conceptual directions we define each seasonal are self-aware and researched. We pull from cultural events, behavioral trends and the ever shifting collective understanding of the world we live in. We invite new talent to the set, making sure we tell the story from a place of relevance and inclusivity.",
          type: "text",
          title: "Scope",
          color: "#4E151D",
          backgroundColor: "#C84600"
        },
        {
          src: "Having history with the brand and team, SB x LB share a lot of trust and respect.<br>As their campaign partners, we have had the pleasure to support their brand<br>leaders and creative team.<br><br>Creative Direction<br>Campaign Strategy<br>Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C84600"
        },
        {
          src: "Photography Melissa Gamache, Pegah Farahmand, Carlo Calope<br>Assist. Renaud Lafrenière, Patrick Custo-Blanch, William Cole, Jeremy Bobrow,<br>Aljosa Alijagic, Don Loga<br>Styling Frederique Gauthier, Tinashe Musara, Assist. Leah Grantham, Haji Maa<br>HMU Cynthia-Christina Cadieux, Marianne Caron, Léonie Lévesque, Assist. Ana-<br>Maria Cimpoia, Claudine Jourdain<br>Models Jefferson, Sophie, Jade, Celeste, Mustapha, Sheida, Damian, Miranda,<br>Megane, Chelsea, Miles, Soukayna<br>Sets & Props Michaël Ho, Marie Hélène Lavoie<br>Production Kristia Louis-Seize, Studio L’Éloi, Little Burgundy Shoes",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C84600"
        },
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.6.title')}"
      slides={[
        {
          src: "images/Rise_1.png",
          type: "image"
        },
        {
          src:"images/Rise_2.png",
          type: "image"
        },
        {
          src:"images/Rise_3.png",
          type: "image"
        },
        {
          src:"images/Rise_4.png",
          type: "image"
        },
        {
          src:"images/Rise_5.png",
          type: "image"
        },
        {
          src:"images/Rise_6.png",
          type: "image"
        },
        {
          src: "videos/Rise_7.mp4",
          type: "video"
        },
        {
          src: "When concepting for this launch, we landed on a strategy to revive RISE’s cultural relevance. Defining their creative pillars as emotion, vibrancy and wonder, we invited the audience to feel intellectually stimulated, and walk away with a story. Anchored in playful escapism, the campaign spoke to the perennially curious as a physical manifestation of indulgence.",
          type: "text",
          title: "New Product Launch OOH Campaign",
          fontSize: "54px",
          color: "#84402A",
          backgroundColor: "#C374F6"
        },
        {
          src: "Having history with the brand and team, SB x LB share a lot of trust and respect.<br>As their campaign partners, we have had the pleasure to support their brand<br>leaders and creative team.<br><br>Creative Direction<br>Campaign Strategy<br>Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C374F6"
        },
        {
          src: "Photography Mathieu Fortin, Nik Mirus<br>Assist. Alexis Belhumeur, Aljosa Alijagic, Jeremy Bobrow<br>Styling Marianne Dubreuil<br>HMU Nicolas Blanchet<br> Sets & Props Audrey St-Laurent<br>Brand Strategy Marissa De Miguel<br>Models Nicholas, Hawa, Yvan, Lina<br>Produced & Shot st Studio L’Éloi, Montréal",
          type: "text",
          title: "Rise Kombucha",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C374F6"
        },
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/KOMBI_1.png",
          type: "image"
        },
        {
          src:"images/KOMBI_2.png",
          type: "image"
        },
        {
          src:"images/KOMBI_3.png",
          type: "image"
        },
        {
          src:"images/KOMBI_4.png",
          type: "image"
        },
        {
          src:"images/KOMBI_5.png",
          type: "image"
        },
        {
          src:"images/KOMBI_6.png",
          type: "image"
        },
        {
          src: "We translated Kombi’s 60+ years of family history into vibrant, engaging images that invite all to join the fun. Partnering with them to myth bust performance and elitism in the outdoor space, we built a positioning around participation, play and inclusion. With Kombi, it’s a family thing.",
          type: "text",
          title: "Campaign Strategy",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "##3851BA"
        },
        {
          src: "As Kombi’s strategic and creative partner we supported their internal team<br>throughout campaign development from concept to production.<br> Additionally, we supported the brand to shape their customer facing personality.<br>Creative Direction<br>Campaign Strategy<br>Concept<br>Voice & Messaging<br> Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction<br>Production",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##3851BA"
        },
        {
          src: "Photography Kelly Jacob, assisted by Renaud Robert, Tom Berthelot<br>  Videography  Matt Charland, Oli Chapo<br>Styling Izabel Soucy, Assist. Samuel Joubert<br>HMU Valeria Amirova<br>Models Sam, Juliette, Jade, Cole, Rokko Riders<br>Catherine Perrault, Antoine St-Hilaire, Julien Gauthier, Jacob Gagnon<br>Producer Jade Fortin Côté, Assist.  Alexis Gauvin B.",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##3851BA"
        },
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/NIKE_1.png",
          type: "image"
        },
        {
          src:"images/NIKE_2.png",
          type: "image"
        },
        {
          src:"images/NIKE_3.png",
          type: "image"
        },
        {
          src:"images/NIKE_4.png",
          type: "image"
        },
        {
          src:"images/NIKE_5.png",
          type: "image"
        },
        {
          src:"images/NIKE_6.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
        }
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.7.title')}"
      slides={[ 
        {
          src: "images/LB_2_1.png",
          type: "image"
        },
        {
          imageSrc: "images/LB_2_2.png",
          videoSrc: "videos/LB_2_2v.mp4",
          type: "two-columns"
        },
        {
          src: "images/LB_2_3.png",
          type: "image"
        },
        {
          src: "images/LB_2_4.png",
          type: "image"
        },
        {
          src: "images/LB_2_5.png",
          type: "image"
        },
        {
          src: "images/LB_2_6.png",
          type: "image"
        },
        {
          src:"images/LB_2_7.png",
          type: "image"
        },
        {
          src:"images/LB_2_8.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.7.title')}"
      slides={[ 
        {
          src: "images/CIS_1.png",
          type: "image"
        },
        {
          imageSrc: "images/LB_2_2.png",
          videoSrc: "videos/LB_2_2v.mp4",
          type: "two-columns"
        },
        {
          src: "images/CIS_2.png",
          type: "image"
        },
        {
          src: "images/CIS_3.png",
          type: "image"
        },
        {
          src: "images/CIS_4.png",
          type: "image"
        },
        {
          src: "images/CIS_5.png",
          type: "image"
        },
        {
          src:"images/CIS_6.png",
          type: "image"
        },
        {
          src:"images/CIS_7x.png",
          type: "image"
        },
        {
          src:"images/CIS_8.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.9.title')}"
      slides={[
        {
          src:"images/LOUISE_1.png",
          type: "image"
        },
        {
          src: "images/LOUISE_2.png",
          type: "image"
        },
        {
          src: "images/LOUISE_3.png",
          type: "image"
        },
        {
          src: "images/LOUISE_4.png",
          type: "image"
        }
      ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/GHANA_1.png",
          type: "image"
        },
        {
          src:"images/GHANA_2.png",
          type: "image"
        },
        {
          src:"images/GHANA_3.png",
          type: "image"
        },
        {
          src:"images/GHANA_4.png",
          type: "image"
        },
        {
          src:"images/GHANA_5.png",
          type: "image"
        },
        {
          src:"images/GHANA_6.png",
          type: "image"
        },
        {
          src:"images/GHANA_7.png",
          type: "image"
        },
        {
          src:"images/GHANA_8.png",
          type: "image"
        },
        {
          src:"images/GHANA_9.png",
          type: "image"
        },
        {
          src:"images/GHANA_10.png",
          type: "image"
        },
        {
          src:"images/GHANA_11.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
        }
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/DT1_1.png",
          type: "image"
        },
        {
          src:"images/DT1_2.png",
          type: "image"
        },
        {
          src:"images/DT1_3.png",
          type: "image"
        },
        {
          src:"images/DT1_4.png",
          type: "image"
        },
        {
          src:"images/DT1_5.png",
          type: "image"
        },
        {
          src:"images/DT1_6.png",
          type: "image"
        },
        {
          src:"images/DT1_7.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
        }
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/Saxx_1.png",
          type: "image"
        },
        {
          src:"images/Saxx_2.png",
          type: "image"
        },
        {
          src:"images/Saxx_3.png",
          type: "image"
        },
        {
          src:"images/Saxx_4.png",
          type: "image"
        },
        {
          src:"images/Saxx_5.png",
          type: "image"
        },
        {
          src:"images/Saxx_6.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
        }
        ]}
    />
    <ParallaxSlider 
        title="{$_('slider.2.title')}"
        slides={[
          {
            src: "images/ALTI_1.png",
            type: "image"
          },
          {
            src: "images/ALTI_2.png",
            type: "image"
          },
          {
            src: "images/ALTI_3.png",
            type: "image"
          },
          {
            src: "images/ALTI_4.png",
            type: "image"
          },
          {
            src: "images/ALTI_5.png",
            type: "image"
          },
          {
            src: "images/ALTI_6.png",
            type: "image"
          },
          {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file"
          }
        ]}
    />
    <ParallaxSlider
      title="{$_('slider.5.title')}"
      slides={[
        {
          src: "images/DT_2_1.png",
          type: "image"
        },
        {
          src:"images/DT_2_2.png",
          type: "image"
        },
        {
          src:"images/DT_2_3.png",
          type: "image"
        },
        {
          src:"images/DT_2_4.png",
          type: "image"
        },
        {
          src:"images/DT_2_5x.png",
          type: "image"
        },
        {
          src:"images/DT_2_6.png",
          type: "image"
        },
        {
          src:"images/DT_2_7.png",
          type: "image"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
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
  }

  .header {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 1000;
    font-family: "Opposit-Medium";
  }

  .dialog-icon {
    width: 64px;
    height: 39px;
    padding: 33px;
    cursor: pointer;
    margin-top: 30px;
    margin-right: 25px;
  }

  
  
  @media screen and (max-width:600px){
    .dialog-icon {
      width: 37px;
      height: 23px;
      padding: 15px;
    }
  }
  
</style>
