// Use IIFE (Immediately Invoked Function Expression) to wrap the plugin to not pollute global namespace with whatever is defined inside here
(function() {
  let state$ = window.PEX.pluginAPI.createNewState({});

  // Init function called by the PluginService when plugin is loaded
  function load(participants$, conferenceDetails$) {

    window.PEX.actions$.ofType(window.PEX.actions.RECEIVE_CHAT_MESSAGE).subscribe((action) => {

      let sidebar = document.getElementById('conference-container').className;
      let bar = document.querySelector("#pex-sidebar-container > div.pex-sidebar__list > pex-roster-list").className;

      if (!sidebar.includes("sidebar-open") && bar.includes("hide")) {
        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'s'}));
        setTimeout(() => {
          window.dispatchEvent(new KeyboardEvent('keyup',{'key':'s'}));
        }, 1000);
      }

      if (sidebar.includes("sidebar-open") && !bar.includes("hide")) {
        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'S'}));
        window.dispatchEvent(new KeyboardEvent('keyup',{'key':'S'}));
      }

      if (!sidebar.includes("sidebar-open") && !bar.includes("hide")) {
        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'S'}));
        window.dispatchEvent(new KeyboardEvent('keyup',{'key':'S'}));
        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'S'}));
        window.dispatchEvent(new KeyboardEvent('keyup',{'key':'S'}));
      }

    });
  }

  // context menu item functions
  function chatIndicator() {
  }

  // unload / cleanup function
  function unload() {
      // clean up any globals or other cruft before being removed before i get killed.
      console.log('unload survey-plugin');
  }

  // Register our plugin with the PluginService - make sure id matches your package.json
  PEX.pluginAPI.registerPlugin({
    id: 'chat-notify-plugin-1.0',
    load: load,
    unload: unload,
    chatIndicator: chatIndicator,
    state$: state$
  });
})(); // End IIFE
