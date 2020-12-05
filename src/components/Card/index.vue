<template>
  <div class="card" :class="map[type]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    type: {
      type: String,
      default: 'total'
    }
  },
  data() {
    return {
      map: {
        total: 'card-tol',
        today: 'card-day'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-tol::before{
    content: 'Tol'
}
.card-day::before{
    content: 'Day'
}
.card {
    transition: .5s ease;
    background: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    padding: 1.25rem;
    overflow: hidden;
    position: relative;
    transform: perspective(3em) rotateX(0deg) rotateY(-1.175deg) rotateZ(-1deg);
    &:hover{
        transform: perspective(0em) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        border: 1px solid #dee2e6;
    }
    &::before{
        transition: .5s ease;
        // content: "TOL";
        display: block;
        font-size: 8rem;
        font-family: 'OldMinchoD';
        font-weight: 900;
        position: absolute;
        bottom: 4rem;
        line-height: 0;
        left: -.85rem;
        padding: 0;
        margin: 0;
        color: rgba(0, 0, 0, 0.1);
        z-index: 0;
        transform: scale(0.8,1);
    }
}
</style>
