<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Watchinema",
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap");

:root {
  --bg-auditorium: #0d0a07;
  --bg-seatback: #1c1410;
  --bg-card: #261d17;
  --bg-muted: #2f241c;

  --text-screenlight: #e8ddd0;
  --text-patina: #9c8b78;
  --text-dim: #6b5d4f;

  --accent-gold: #d4a017;
  --accent-gold-hover: #e8b82a;
  --accent-gold-glow: rgba(212, 160, 23, 0.25);

  --curtain-red: #b91c1c;
  --curtain-red-hover: #dc2626;
  --curtain-red-glow: rgba(185, 28, 28, 0.3);

  --border: rgba(232, 221, 208, 0.08);
  --border-hover: rgba(232, 221, 208, 0.18);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.6);

  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
}

body {
  font-family: "Lora", serif;
  font-weight: 400;
  background: var(--bg-auditorium);
  color: var(--text-screenlight);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg-auditorium);
}
::-webkit-scrollbar-thumb {
  background: var(--bg-muted);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-dim);
}
</style>
