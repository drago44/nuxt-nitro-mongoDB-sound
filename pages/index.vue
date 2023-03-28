<template>
  <main class="main">
    <section class="hero">
      <div class="hero__container">
        <div class="hero__info">
          <h1 class="hero__title">Listen your <span>favorite</span> music</h1>
          <p class="hero__descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            maiores ab eum accusantium fugit quibusdam perspiciatis numquam
            harum non rem!
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  .hero {
    position: relative;
    min-height: 50vh;
    color: white;
    padding: rem(100) rem(0);

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://wallpaperaccess.com/full/1792302.jpg');
      background-size: 200% 107%;
      background-repeat: repeat-x;
      overflow: hidden;
      animation: slide 120s linear infinite;
    }
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
    }

    &__info {
      -webkit-backdrop-filter: blur(rem(15));
      backdrop-filter: blur(rem(15));
      text-align: center;
      border-radius: rem(10);
      max-width: rem(700);
      padding: rem(40);
    }

    &__title {
      @include adaptiveValue('font-size', 54, 30);
      margin-bottom: rem(20);
      span {
        color: $accentColor;
      }
    }

    &__descr {
      font-size: rem(20);
    }
  }

  @keyframes slide {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 400% 0;
    }
  }
</style>
