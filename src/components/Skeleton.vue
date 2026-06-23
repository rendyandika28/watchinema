<template>
  <div
    class="skt"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height,
      borderRadius: radius,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    width: { default: "100%" },
    height: { default: "20px" },
    radius: { default: "var(--radius-sm)" },
  },
};
</script>

<style scoped>
.skt {
  background: linear-gradient(
    90deg,
    var(--bg-card) 25%,
    var(--bg-muted) 50%,
    var(--bg-card) 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}
</style>
