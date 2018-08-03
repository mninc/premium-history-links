// ==UserScript==
// @name         premium history links
// @namespace    https://steamcommunity.com/id/manic_/
// @version      1.1
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


    function run() {

        // side column
        let col = document.getElementsByClassName("col-md-4")[0];

        // new side div
        let div = document.createElement("div");
        div.className = "premium-search-form";
        let header = document.createElement("h2");
        header.className = "title";
        header.innerHTML = "Links";
        div.appendChild(header);

        if (document.getElementsByClassName("well well-sm").length === 0) {
            // has premium

            // click all 'last-exchanged' buttons
            let last_exchanged = document.getElementsByClassName("btn btn-default btn-xs btn-last-exchanged");
            for (let i = 0; i < last_exchanged.length; i++) {
                last_exchanged[i].click();
            }

            function wait() {
                let ok = true;
                last_exchanged = document.getElementsByClassName("btn btn-default btn-xs btn-last-exchanged");
                for (let i = 0; i < last_exchanged.length; i++) {
                    if (last_exchanged[i].innerText !== "Never") ok = false;
                }

                if (!ok) {
                    // not all last-exchanged buttons loaded yet
                    setTimeout(wait, 100);
                } else {
                    let links = [];

                    let button_groups = document.getElementsByClassName("buttons btn-group");
                    for (let i = 0; i < button_groups.length; i++) {
                        let group = button_groups[i];

                        // get last exchange a
                        let last_exchange;
                        if (group.getElementsByClassName("btn btn-default btn-xs btn-last-exchanged").length > 0) {
                            // Never exchanged
                            continue;
                        } else if (group.getElementsByClassName("btn btn-xs btn-last-exchanged btn-warning").length > 0) {
                            last_exchange = group.getElementsByClassName("btn btn-xs btn-last-exchanged btn-warning")[0];
                        } else if (group.getElementsByClassName("btn btn-xs btn-last-exchanged btn-success").length > 0) {
                            last_exchange = group.getElementsByClassName("btn btn-xs btn-last-exchanged btn-success")[0];
                        } else {
                            continue;
                        }

                        let days_old = parseInt(last_exchange.innerText.split(" ")[0]);
                        if (days_old > 90) continue;


                        links.push("https://backpack.tf/item/" + last_exchange.getAttribute("data-original-id").toString());


                    }

                    let p, small;

                    p = document.createElement("p");
                    p.className = "warning";

                    small = document.createElement("small");
                    small.className = "text-muted";
                    small.innerHTML = "All in-date history links on this page. Clicking the text box will automatically copy the links to clipboard.";
                    p.appendChild(small);
                    div.appendChild(p);

                    let box = document.createElement("textarea");
                    box.readonly;
                    box.spellcheck = false;
                    box.onclick = function() {this.focus();this.select();document.execCommand('copy');};
                    box.cols = 35;
                    box.rows = links.length;
                    box.value = links.join("\n");
                    div.appendChild(box);

                    col.appendChild(div);

                }

            }
            wait();




        } else {
            // does not have premium
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