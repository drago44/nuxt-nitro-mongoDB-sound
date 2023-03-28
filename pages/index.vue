<template>
  <main class="main">
    <section class="hero">
      <div class="hero__container">
        <div class="hero__info">
          <h1 class="hero__title">Listen your favorite music</h1>
          <p class="hero__descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            maiores ab eum accusantium fugit quibusdam perspiciatis numquam
            harum non rem!
          </p>
        </div>
        <img
          class="hero__img"
          src="https://wallpaperaccess.com/full/1792302.jpg"
          alt="music"
        />
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  .hero {
    position: relative;
    color: white;
    padding: rem(100) rem(0);
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
    }

    &__info {
      -webkit-backdrop-filter: blur(15px);
      backdrop-filter: blur(15px);
      text-align: center;
      border-radius: rem(10);
      max-width: rem(700);
      padding: rem(40);
    }

    &__title {
      @include adaptiveValue('font-size', 54, 30);
    }

    &__descr {
      font-size: rem(20);
    }

    &__img {
      position: absolute;
      z-index: -1;
      min-width: 200%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      animation: slide 30s linear infinite;
    }
  }

  @keyframes slide {
    100% {
      transform: translateX(-30%);
    }
  }
</style>
