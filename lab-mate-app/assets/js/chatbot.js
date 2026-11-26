/*
 * LabMate Botpress chatbot integration
 * This file contains the same Botpress host and Bot ID used by the
 * original LabMate website, separated from index.html.
 */
(() => {
  "use strict";

  const BOT_BASE_URL = "https://vdk-viber-runtime-prod.bot.botpress.host";
  const BOT_ID = "eb4e3491-d2cf-41db-9e38-89f39e5944fc";
  const CONFIG_URL = `${BOT_BASE_URL}/edge/bots/${BOT_ID}/config`;

  if (window.__LABMATE_BOTPRESS_STARTED__) return;
  window.__LABMATE_BOTPRESS_STARTED__ = true;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `${BOT_BASE_URL}/edge/webchat.css`;
  document.head.appendChild(css);

  const sdk = document.createElement("script");
  sdk.src = `${BOT_BASE_URL}/edge/webchat.js`;
  sdk.onload = async () => {
    try {
      const response = await fetch(CONFIG_URL);
      if (!response.ok) {
        throw new Error(`Botpress config request failed (${response.status})`);
      }

      const result = await response.json();
      if (!result || !result.webchat) {
        throw new Error("Botpress configuration is missing webchat settings.");
      }

      if (!window.VdkEdgeWebchat ||
          typeof window.VdkEdgeWebchat.mount !== "function") {
        throw new Error("Botpress webchat SDK did not expose mount().");
      }

      window.VdkEdgeWebchat.mount({
        ...result.webchat,
        mode: "bubble",
        baseUrl: BOT_BASE_URL,
        botId: BOT_ID
      });
    } catch (error) {
      console.error("[LabMate chatbot]", error);
      window.__LABMATE_BOTPRESS_STARTED__ = false;
    }
  };
  sdk.onerror = () => {
    console.error("[LabMate chatbot] Failed to load Botpress webchat SDK.");
    window.__LABMATE_BOTPRESS_STARTED__ = false;
  };
  document.head.appendChild(sdk);
})();
