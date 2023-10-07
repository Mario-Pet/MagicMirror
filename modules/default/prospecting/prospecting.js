//helloworld.js:

Module.register("prospecting", {
    // Default module config.
    defaults: {
      text: "Hello World!",
    },
  
    // Override dom generator.
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = "hello world >... "
      return wrapper;
    },
  });