<template>
  <button
    @click.prevent="$emit('button-click')"
    :class="['btn', 'btn--' + variant, { 'btn--compact': compact }]"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
    variant: { type: String, default: "primary" },
    compact: Boolean,
  },
};
</script>

<style>
.btn {
  cursor: pointer;
  color: var(--text-screenlight);
  outline: none;
  border: none;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: var(--radius-sm);
  padding: 12px 44px;
  transition: var(--transition);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--compact {
  padding: 10px 22px;
}

.btn--primary {
  background: var(--curtain-red);
}
.btn--primary:hover {
  background: var(--curtain-red-hover);
  box-shadow: 0 4px 20px var(--curtain-red-glow);
}

.btn--secondary {
  background: rgba(232, 221, 208, 0.08);
  border: 1px solid var(--border);
}
.btn--secondary:hover {
  background: rgba(232, 221, 208, 0.14);
  border-color: var(--accent-gold);
}
</style>
