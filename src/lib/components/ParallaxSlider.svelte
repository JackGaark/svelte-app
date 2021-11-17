<script>
  import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
  import { debug } from 'svelte/internal';

  export let slides;
  export let title;
  export let title2;
  export let titleFontClassName;
  export let title2FontClassName = '';
  export let isMobile = false;

  let activeSlide;
  let x = 0;

  let slide_els = [];
  $: active_index = 0;

  const Cursors = {
    RIGHT: 'right-cursor',
    LEFT: 'left-cursor'
  };

  let sliderCursor = 'cursor';
  let wrapperWidth = 0;

  function handleMousemove(event) {
    const cursorXPosition = event.clientX;
    sliderCursor = wrapperWidth / 2 <= cursorXPosition ? Cursors.RIGHT : Cursors.LEFT;
  }

  // Go to next slide in project.
  const nextSlide = () => {
    if (active_index < slides.length - 1) {
      active_index += 1;
      activeSlide.style.transform = `translate3d(-${active_index * 100}vw, 0, 0)`;
    } else {
      // Go back to beginning of project slides.
      activeSlide.style.transform = `translate3d(0, 0, 0)`;
      active_index = 0;
    }
  };

  // Go to previous slide in project
  const prevSlide = () => {
    if (active_index === 0) {
      active_index = slides.length - 1;
      activeSlide.style.transform = `translate3d(-${active_index * 100}vw, 0, 0)`;
    } else {
      active_index -= 1;
      activeSlide.style.transform = `translate3d(-${active_index * 100}vw, 0, 0)`;
    }
  };

  // Handles the users click depending on which side of the page it's on
  const handleSliderClick = () => {
    if (sliderCursor === Cursors.RIGHT) {
      nextSlide();
    } else if (sliderCursor === Cursors.LEFT) {
      prevSlide();
    }
  };
</script>

<div
  class="slider-wrapper"
  bind:clientWidth={wrapperWidth}
  on:mousemove={handleMousemove}
  style={isMobile ? 'height:100%' : ''}
>
  <img class="image-logo" src="images/LOGO-Ai small_Super Bonjour smaller.svg" alt="Logo" />
  <img class="image-logo mobile" src="images/LOGOFACE-Ai.svg" alt="Logo" />
  <h2 class="slider-title">
    <span class={`${titleFontClassName || ''}`}>{title}</span>
    <span class={`${title2FontClassName || ''}`}>{title2 || ''}</span>
  </h2>
  <div
    class={`slider ${sliderCursor}`}
    bind:this={activeSlide}
    on:click={handleSliderClick}
    style={`width: ${slides.length}00vw`}
  >
    {#each slides as slide, i}
      <div bind:this={slide_els[i]}>
        {#if slide.type === 'image'}
          <div
            id={i}
            class={`slide ${sliderCursor}`}
            style={`background-position: ${i}00vw center; background-image: url(${slide.src})`}
          />
        {:else if slide.type === 'video'}
          <div
            id={i}
            class={`slide  slide-video ${sliderCursor} ${
              slide.addPadding ? 'slide-video-extra-padding' : ''
            }`}
            style={`background-position: ${i}00vw center; position: relative;`}
          >
            <div class="video-container">
              <!-- svelte-ignore a11y-media-has-caption -->
              <video src={slide.src} autoplay="true" loop muted playsinline />
            </div>
          </div>
        {:else if slide.type === 'two-columns'}
          <div class="slide two-columns-slide">
            <div class="slide-column slide-left-column">
              <video src={slide.videoSrc} autoplay="true" loop muted playsinline />
            </div>
            <div class="slide-column slide-right-column">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img src={slide.imageSrc} alt="left column image" />
            </div>
          </div>
        {:else}
          <div
            class="slide text_slide"
            style={`background-color: ${slide.backgroundColor}; color:${
              slide.color
            }; font-family: ${slide.font || 'moret'}; font-size: ${slide.fontSize}`}
          >
            <div class="text_slide_container">
              <h5 class="text_title">
                {slide.title}
              </h5>
              {@html slide.src}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  <div class="paginator">
    <h4>{active_index + 1} / {slides.length}</h4>
  </div>
</div>

<style>
  video::-webkit-media-controls-fullscreen-button,
  video::-webkit-media-controls-play-button,
  video::-webkit-media-controls-pausebutton {
    display: none;
  }

  .video-container {
    position: absolute;
    padding-bottom: 56.25%;
    padding-top: 0;
    height: 0;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .video-container iframe,
  .video-container object,
  .video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .image-logo.mobile {
    display: none;
  }

  .slider-title .roc-grotesk {
    font-family: 'roc-grotesk', sans-serif;
  }

  .slide-video-extra-padding video {
    width: 70vw;
    height: 70vh;
    margin-left: 15vw;
    margin-right: 15vw;
    /* object-fit: none; */
    margin-top: 15vh;
    margin-bottom: 15vh;
  }
  .slide-video-extra-padding {
    background-color: #c374f6;
  }

  .slide-column {
    flex-shrink: 1;
    background-color: #c374f6;
    width: 25vw;
    min-height: 300px;
    display: flex;
    align-items: center;
  }

  .slide-right-column {
    margin-left: 55px;
  }

  .slide-left-column {
    margin-right: 55px;
  }

  .slide-left-column video {
    width: 100%;
    height: auto;
  }

  .slide-right-column img {
    width: 100%;
    height: auto;
  }

  .two-columns-slide {
    display: flex;
    background-color: #c374f6;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }
  .text_slide_container {
    padding-left: 55px;
    padding-top: 50px;
    width: 80%;
    line-height: 130%;
  }

  .text_title {
    padding-top: 50px;
    padding-bottom: 10px;
    margin-bottom: 2px;
    color: #e2ee75;
    font-size: 18px;
    font-weight: 100;
    font-family: 'Opposit-Medium';
    line-height: 39px;
  }

  .text_slide {
    background-color: #290b15;
    height: 100vh;
    width: 100vw;
    color: white;
    text-align: 15vw;
    font-size: 50px;
    font-weight: 100;
    font-family: 'moret';
  }

  .slider {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    transition: all 200ms ease-out 0s;
  }

  .slide {
    height: 100vh;
    width: 100vw;
    background-size: cover;
    transition: all 200ms ease-out 0s;
  }

  .slider-wrapper {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    width: 100vw;
    overflow: hidden;
    transition: 0.3s all;
  }

  .arrow {
    font-family: 'Roc Wide';
    position: absolute;
    width: 70px;
    cursor: pointer;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #fff;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .paginator {
    position: absolute;
    bottom: 0;
    right: 20vw;
    text-align: center;
    width: 100px;
    font-family: 'moret';
    /* background-color: rgb(255 255 255 / 80%); */
    color: #fff;
    font-size: 36px;
  }

  .slider-title {
    font-family: 'moret';
    /* background-color: rgb(255 255 255 / 80%); */
    min-width: 20vw;
    padding: 25px;
    padding-left: 55px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    position: absolute;
    z-index: 1;
    left: 0px;
    bottom: 0;
    color: #fff;
    font-size: 38px;
    font-weight: normal;
  }
  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  .image-logo {
    position: fixed;
    left: 55px;
    top: 30px;
    width: 177px;
    height: 4.75rem;
    z-index: 1;
    cursor: url(/images/home-cursor.png), auto;
  }

  .right-cursor {
    cursor: url(/images/right-cursor.svg), auto;
  }
  .left-cursor {
    cursor: url(/images/left-cursor.svg), auto;
  }

  @media screen and (max-width: 1200px) {
    .slider-title {
      bottom: 0;
      margin-bottom: -10px;
      font-size: 2.25rem;
    }
    .paginator {
      font-size: 1.6rem;
      right: 20vw;
      bottom: 0;
      margin-bottom: -10px;
    }

    .slide {
      background-attachment: scroll;
      background-position: center !important;
    }

    .image-logo {
      width: 177px;
    }
  }

  @media screen and (max-width: 600px) {
    video {
      width: 100vw;
      height: auto;
      object-fit: unset;
    }

    .slide-right-column {
      margin-left: 10px;
    }

    .slide-left-column {
      margin-right: 10px;
    }
    .slide-video-extra-padding video {
      width: 75vw;
      height: auto;
      margin: 20px 50px;
    }

    .image-logo {
      display: none;
    }
    .image-logo.mobile {
      display: block;
    }

    .slider-title {
      font-size: 1rem;
      width: 5vw;
      padding-left: 25px;
    }

    .paginator {
      font-size: 1rem;
      right: 5vw;
      margin-right: 35px;
    }

    .slide {
      height: 60vw;
    }

    .text_slide {
      padding-top: 0px;
      font-size: 10px !important;
    }

    .text_slide_container {
      padding-top: 5px;
      padding-left: 25px;
    }

    .text_title {
      padding-top: 5px;
      font-size: 18px;
      margin-top: 0;
    }

    .image-logo {
      width: 117px;
      top: 10px;
      left: 25px;
    }
  }
  @media screen and (orientation: landscape) and (max-height: 499px) {
  }
</style>
