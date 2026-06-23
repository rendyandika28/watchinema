<template>
  <footer class="footer">
    <div class="footer__inner">
      <img class="footer__logo" src="../assets/logo-footer.png" alt="Watchinema" />
      <p class="footer__copy">© Watchinema</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-seatback);
}
.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
}
.footer__logo {
  object-fit: contain;
  opacity: 0.4;
}
.footer__copy {
  color: var(--text-dim);
  font-size: 12px;
  font-family: "JetBrains Mono", monospace;
}

@media (max-width: 567px) {
  .footer__inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
