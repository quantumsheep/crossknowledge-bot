// ==UserScript==
// @name         CrossKnowledge Bot
// @namespace    https://github.com/quantumsheep/crossknowledge-bot
// @version      0.1
// @description  Obliterate CrossKnowledge
// @author       QuantumSheep
// @match        https://reseau-ges.lms.crossknowledge.com/site/home*
// @match        https://reseau-ges.lms.crossknowledge.com/site/path*
// @match        https://cours.crossknowledge-player.com/staticCourseContent*
// @match        https://cours.crossknowledge-player.com/ckplayer2*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.href.startsWith('https://reseau-ges.lms.crossknowledge.com/site/home')) {
        document.querySelectorAll('.trainingSessionEditoBoxLi.trainingSessionEditoBoxLiOdd > a').forEach(e => window.open(e.href))
    } else if (window.location.href.startsWith('https://reseau-ges.lms.crossknowledge.com/site/path')) {
        setTimeout(async () => {
            const make_activity = (activity) => new Promise((resolve) => {
                activity.click()
                setTimeout(() => {
                    document.querySelector('.learning-object-image').click()
                    resolve()
                }, 2000)
            })

            const activities = Array.from(document.querySelectorAll('[data-activity-id]'))
            for (const e of activities) {
                if (!e.querySelector('.PathActivityStatus-icon.PathActivityStatus-icon--complete')) {
                    await make_activity(e)
                }
            }
        }, 4000)
    } else if (window.location.href.startsWith('https://cours.crossknowledge-player.com/staticCourseContent')) {
        setInterval(() => {
            document.getElementById('buttonnext').click()

            if (document.querySelector('#progressbar > .progressbar__progression').style.width === '100%') {
                window.close()
            }
        }, 2000)
    } else if (window.location.href.startsWith('https://cours.crossknowledge-player.com/ckplayer2')) {
        setInterval(() => {
            const btn = document.getElementById('btnNextButton')
            if (btn) {
                btn.click()
            }
        }, 200)
    }
})();
