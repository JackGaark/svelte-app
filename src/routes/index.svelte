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
          src: "images/HSCo_1.png",
          type: "image"
        },
        {
          src:"images/HSCo_2.png",
          type: "image"
        },
        {
          src:"images/HSCo_3.png",
          type: "image"
        },
        {
          src:"images/HSCo_4.png",
          type: "image"
        },
        {
          src:"images/HSCo_5.png",
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
          src: "Magazines *♡* also a great medium to reposition a brand. We created a tool to build a community and generate lasting ties with creatives & travelers.Vol 1: Islands — a theme explored geographically, and metaphorically. From the launch party at Echo Park Island to a 1 800 number connecting you to the sounds of island life, every detail was considered.",
          type: "text",
          title: "Creating a Travel Magazine",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "360 Content Strategy — We took on the project’s full scope from editorial lineups, branded Google docs and social media meta accounts to commissioning original content. Working with the SB network was key when building Hershel’s global community and content.",
          srcTwo: "Brand Positioning, Creative Direction, Production, Theme Development, Contributor Outreach, Pagination & Flatplan, Art Direction, Editorial Design, Print Management and Distribution Strategy.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "36px",
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
          src: "Working out of the Accra studio & residence, we were immersed in Osei Duro ‘s process day-to-day. Via workshops we dove deep  into the brand, collecting  insights to inform the brand’s expressions — through photography, casting, styling, in their tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.",
          type: "text",
          title: "Brand Platform & Campaign Strategy",
          fontSize: "54px",
          color: "#E1D8CA",
          backgroundColor: "#290B15"
        },
        {
          src: "Deep Dive & Immersion — Factory visits, textile printshop visits, and day-to-day operations Brand Audit & Strategy — Review of all their content to establish a new strategy, Brand Therapy™ workshops & new brand platform 2019 Campaign Shoots — Creative Direction Pre-production & On Set Direction Campaigns on location LookBook Direction.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "36px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
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
          src: "Magazines *♡* also a great medium to reposition a brand. We created a tool to build a community and generate lasting ties with creatives & travelers.Vol 1: Islands — a theme explored geographically, and metaphorically. From the launch party at Echo Park Island to a 1 800 number connecting you to the sounds of island life, every detail was considered.",
          type: "text",
          title: "Creating a Travel Magazine",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "360 Content Strategy — We took on the project’s full scope from editorial lineups, branded Google docs and social media meta accounts to commissioning original content. Working with the SB network was key when building Hershel’s global community and content. Brand Positioning, Creative Direction, Production, Theme Development, Contributor Outreach, Pagination & Flatplan, Art Direction, Editorial Design, Print Management and Distribution Strategy.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "36px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
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
      title="{$_('slider.3.title')}"
      slides={[ 
        {
          src: "images/HSCo_Mag_1.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_2.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_3.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_4.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_5.png",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_6.png",
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
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "Creative Direction, Brand Strategy & Identity, Print & Digital Design, Voice & Messaging, by Super Bonjour Art Direction & Off-figure Styling by Super Bonjour Voice & Copy by Sacha Jackson Photography by Jennifer Latour Styling by Leila Bani HMU by Karin Shoji.",
          type: "text",
          title: "Heading file",
          font: "roc-grotesk, sans-serif",
          fontSize: "36px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        }
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
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          backgroundbackgroundColor: "#3851BA"
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
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file"
        },
        {
          src: "The body sats what words cannot- vulnerable, free and quitely powerful.  Our creative direction counterbalances traditional beauty ideals and removes the male gaze to introduce a woman's body in a new and real context. HIRRS is designed for a woman's movement.",
          type: "text",
          title: "Heading file",
          color: "#E2EE75"
        }
      ]}   
    />
    <ParallaxSlider
      title="{$_('slider.9.title')}"
      slides={[
        {
          src:"images/11-sb_2.jpg",
          type: "image"
        },
        {
          src: "images/12-sb-berlinb.jpg",
          type: "image"
        },
        {
          src: "images/13-sb_rise_4b.jpg",
          type: "image"
        },
        {
          src: "images/14-sb_cis_6.jpg",
          type: "image"
        },
        {
          src: "images/16-sb_boy_1.jpg",
          type: "image"
        },
        {
          src: "images/17-sb_cis_5.jpg",
          type: "image"
        }
      ]}
    />
    <ParallaxSlider
    title="{$_('slider.10.title')}"
    slides={[
        {
          src: "images/10-sb_4.jpg",
          type: "image"  
        }
      ]}
  />
    <ParallaxSlider
      title="{$_('slider.11.title')}"
      slides={[
          {
          src: "images/18-sb-denisets.jpg",
          type: "image"
          },
          { 
          src: "images/19-sb_cis_9b.jpg",
          type: "image"
          },
          { 
          src: "images/20-sb-rentree4.jpg",
          type: "image"
          },
          { 
          src: "images/21-sb_cis_8.jpg",
          type: "image"
          },
          { 
          src: "images/24-sb_cis_10.jpg",
          type: "image"
          },
          { 
          src: "images/24-sb_cis_10.jpg",
          type: "image"
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
    margin-right: 23px;
  }

  
  
  @media screen and (max-width:600px){
    .dialog-icon {
      width: 37px;
      height: 23px;
      padding: 15px;
    }
  }
  
</style>
