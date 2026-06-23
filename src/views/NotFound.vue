<template>
  <div class="nf">
    <Header />
    <div class="nf__hero">
      <h1>404</h1>
      <p>Halaman tidak ditemukan</p>
      <router-link to="/" class="nf__link">Kembali ke Beranda</router-link>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "NotFound",
  components: { Header },
  metaInfo: {
    title: "404 — Halaman Tidak Ditemukan · Watchinema",
    meta: [
      { name: "description", content: "Halaman yang kamu cari tidak ada." },
      { property: "og:title", content: "404 — Watchinema" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: () => window.location.origin + "/404" },
    ],
  },
};
</script>

<style scoped>
.nf {
  min-height: 100vh;
  background: var(--bg-auditorium);
}
.nf__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 12px;
  text-align: center;
  padding: 0 24px;
}
.nf__hero h1 {
  font-family: "Oswald", sans-serif;
  font-size: 8rem;
  font-weight: 700;
  color: var(--accent-gold);
  line-height: 1;
  letter-spacing: -0.04em;
}
.nf__hero p {
  color: var(--text-patina);
  font-size: 18px;
}
.nf__link {
  color: var(--text-screenlight);
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-top: 16px;
  transition: var(--transition);
}
.nf__link:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}
</style>
