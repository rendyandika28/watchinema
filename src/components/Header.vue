<template>
  <div class="header" :class="{ 'header--scrolled': scrolled }">
    <router-link to="/" class="header__brand">
      <img class="header__logo" src="../assets/logo.png" alt="Watchinema" />
    </router-link>
    <div class="header__overlay" v-if="menuOpen" @click="close"></div>
    <div class="header__items" :class="{ 'header__items--open': menuOpen }">
      <div class="header__search-wrapper">
        <svg class="header__search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          class="header__search"
          placeholder="Cari film..."
          v-model="searchQuery"
          @keyup.enter="searchMovie"
        />
      </div>
      <router-link to="/watchlist" class="header__link" @click.native="close">Watchlist</router-link>
    </div>
    <button class="header__menu-btn" :class="{ 'header__menu-btn--open': menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuOpen: false,
      scrolled: false,
      searchQuery: "",
      searching: false,
    };
  },
  methods: {
    close() {
      this.menuOpen = false;
    },
    searchMovie() {
      if (!this.searchQuery.trim() || this.searching) return;
      this.searching = true;
      this.$router.push({
        name: "Search",
        params: { name: this.searchQuery.trim() },
      });
      this.searchQuery = "";
      this.close();
      this.$nextTick(() => { this.searching = false; });
    },
  },
  created() {
    this._onScroll = () => { this.scrolled = window.scrollY > 60; };
    window.addEventListener("scroll", this._onScroll);
    this._onKeydown = (e) => { if (e.key === "Escape") this.close(); };
    window.addEventListener("keydown", this._onKeydown);
  },
  watch: {
    menuOpen(v) {
      document.body.style.overflow = v ? "hidden" : "";
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("keydown", this._onKeydown);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: var(--transition);
}

.header--scrolled {
  background: rgba(13, 10, 7, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.header__logo {
  object-fit: contain;
  width: 120px;
  transition: var(--transition);
}
.header--scrolled .header__logo {
  width: 100px;
}

.header__items {
  display: flex;
  align-items: center;
  gap: 28px;
}

.header__search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.header__search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-patina);
  pointer-events: none;
}
.header__search {
  width: 260px;
  padding: 10px 14px 10px 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-screenlight);
  font-family: "Lora", serif;
  font-size: 14px;
  transition: var(--transition);
}
.header--scrolled .header__search {
  background: var(--bg-seatback);
}
.header__search::placeholder {
  color: var(--text-patina);
}
.header__search:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 3px var(--accent-gold-glow);
}

.header__link {
  color: var(--text-patina);
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  transition: var(--transition);
  white-space: nowrap;
}
.header__link:hover {
  color: var(--accent-gold);
  border-color: var(--accent-gold);
  background: rgba(212, 160, 23, 0.08);
}

.header__menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px;
  cursor: pointer;
  z-index: 110;
}
.header__menu-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-screenlight);
  border-radius: 2px;
  transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.header__menu-btn:hover span {
  background: var(--accent-gold);
}
.header__menu-btn--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.header__menu-btn--open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.header__menu-btn--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .header {
    padding: 10px 16px;
  }
  .header__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
    animation: fadeIn 0.2s ease;
  }
  .header__items {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 80px 24px 24px;
    gap: 20px;
    background: rgba(13, 10, 7, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-left: 1px solid var(--border);
    z-index: 100;
  }
  .header__items--open {
    transform: translateX(0);
  }
  .header__search {
    width: 100%;
  }
  .header__menu-btn {
    display: flex;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
