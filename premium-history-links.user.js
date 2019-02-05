// ==UserScript==
// @name         premium history links
// @namespace    https://steamcommunity.com/id/manic_/
// @version      1.4
// @description  all the history links to copy and paste
// @author       manic
// @grant        none
// @license      MIT

// @homepageURL     https://github.com/mninc/premium-history-links
// @supportURL      https://github.com/mninc/premium-history-links/issues
// @downloadURL     https://github.com/mninc/premium-history-links/raw/master/premium-history-links.user.js

// @run-at       document-end
// @match        https://backpack.tf/premium/search*
// ==/UserScript==

(function() {
    'use strict';

    let chosen = 3;


    function run() {
        let current_time = new Date();

        // side column
        let col = document.getElementsByClassName("col-md-4")[0];

        // new side div
        let div = document.createElement("div");
        div.className = "premium-search-form";
        let header = document.createElement("h2");
        header.className = "title";
        header.innerHTML = "Links";
        div.appendChild(header);

        if (document.getElementsByClassName("well well-sm").length === 0) {  // has premium


            let links2 = [];
            let links3 = [];

            let results = document.getElementsByClassName("result");
            for (let i = 0; i < results.length; i++) {
                let result = results[i];

                let link = result.getElementsByClassName("btn btn-default btn-xs")[1].href;
                let abbreviations = result.getElementsByTagName("abbr");
                if (abbreviations.length !== 2) continue;  // it has never been exchanged
                let days_old = (current_time - new Date(abbreviations[1].title)) / 1000 / 60 / 60 / 24;

                if (days_old > 90) continue;
                links3.push(link);
                if (days_old > 60) continue;
                links2.push(link);

            }


            let p = document.createElement("p");
            p.className = "warning";

            let small = document.createElement("small");
            small.className = "text-muted";
            small.innerHTML = "All in-date history links on this page. Clicking the text box will automatically copy the links to clipboard.";
            p.appendChild(small);
            div.appendChild(p);

            let toggle = document.createElement("div");
            toggle.className = "buttons btn-group";

            for (let i = 0; i < 2; i++) {
                let option = document.createElement("a");
                if (i === 0) {
                    option.innerText = "2 months";
                    option.id = "two_months";

                } else {
                    option.innerText = "3 months";
                    option.id = "three_months";
                    option.style["background-color"] = "#e6e6e6";
                    option.style["border-color"] = "#adadad";
                }
                option.className = "btn btn-default btn-xs";
                option.onclick = function() {
                    let other;
                    let box = document.getElementById("box");
                    if (this.id === "three_months") {
                        other = document.getElementById("two_months");
                        box.rows = links3.length;
                        box.value = links3.join("\n");
                        chosen = 3;
                    } else {
                        other = document.getElementById("three_months");
                        box.rows = links2.length;
                        box.value = links2.join("\n");
                        chosen = 2;
                    }

                    this.style["background-color"] = "#e6e6e6";
                    this.style["border-color"] = "#adadad";
                    other.style["background-color"] = "#fff";
                    other.style["border-color"] = "#ccc";


                };
                toggle.appendChild(option);
            }

            div.appendChild(toggle);
            div.insertAdjacentHTML("beforeend", "&nbsp;");

            let toggle2 = toggle.cloneNode(false);
            let open_all = document.createElement("a");
            open_all.innerHTML = '<p data-tip="top" data-original-title="You may have to allow popups from backpack.tf before this will work.">Open All</p>';
            open_all.className = "btn btn-default btn-xs";
            open_all.onclick = function() {
                if (chosen === 2) {
                    links2.forEach(function(link){
                        window.open(link, "_blank");
                    });
                } else {
                    links3.forEach(function(link){
                        window.open(link, "_blank");
                    });
                }
            };
            toggle2.appendChild(open_all);
            div.appendChild(toggle2);


            let box = document.createElement("textarea");
            box.readonly;
            box.spellcheck = false;
            box.onclick = function() {this.focus();this.select();document.execCommand('copy');};
            box.cols = 35;
            box.rows = links3.length;
            box.value = links3.join("\n");
            box.id = "box";
            div.appendChild(box);

            col.appendChild(div);


        } else {  // does not have premium
            let p, small;


            p = document.createElement("p");
            p.className = "warning";

            small = document.createElement("small");
            small.className = "text-muted";
            small.innerHTML = "You do not have premium!";

            p.appendChild(small);
            div.appendChild(p);


            let col = document.getElementsByClassName("col-md-4")[0];
            col.appendChild(div);
        }
    }

    window.onload = run;
})();