ccm.files[ "configs.js" ] = {
  "demo": {
    key: "demo",
    task: "<h4>1. Lesen Sie den Text und reflektieren Sie.</h4>" +
    "<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der " +
    "Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding " +
    "seines Lebens gedreht hatte und mit der Beute verschwinden wollte! Hatte einer seiner zahllosen Kollegen dieselbe " +
    "Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten " +
    "die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine " +
    "Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon hören.</p>",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "onfinish": {
      "log": true,
      "data": {
        "store": [ "ccm.store", { "name": "exercise_results", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": "demo"
      },
    }
  },
  "local": {
    key: "local",
    task: "<h4>1. Lesen Sie den Text und reflektieren Sie.</h4>" +
    "<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der " +
    "Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding " +
    "seines Lebens gedreht hatte und mit der Beute verschwinden wollte! Hatte einer seiner zahllosen Kollegen dieselbe " +
    "Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten " +
    "die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine " +
    "Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon hören.</p>",
    "data": {
      "store": [ "ccm.store", { "name": "exercise" } ],
      "key": "exercise",
      "user": true
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "submit_button": "Save",
    //"show_results": true,
    "onfinish": {
      "alert": "Saved!",
      "login": true,
      "store": true
    }
  }
};