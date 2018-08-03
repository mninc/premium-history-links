// ==UserScript==
// @name         premium history links
// @namespace    https://steamcommunity.com/id/manic_/
// @version      1.0
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

    let div = document.createElement("div");
    div.className = "premium-search-form";
    let header = document.createElement("h2");
    header.className = "title";
    header.innerHTML = "Links";
    div.appendChild(header);

    let text = [];
    let links = document.getElementsByClassName("btn btn-default btn-xs");
    let prem = false;
    for (let i = 0; i < links.length; i++) {
        let a = links[i];
        if (a.href.includes("/item/")) {
            text.push(a.href + " ");
            prem = true;
        }

    }

    let p, small;
    if (prem) {
        p = document.createElement("p");
        p.className = "warning";

        small = document.createElement("small");
        small.className = "text-muted";
        small.innerHTML = "All history links on this page. Clicking the text box will automatically copy the links to clipboard.";
        p.appendChild(small);
        div.appendChild(p);

        let box = document.createElement("textarea");
        box.readonly;
        box.spellcheck = false;
        box.onclick = function() {this.focus();this.select();document.execCommand('copy');};
        box.cols = 35;
        box.rows = text.length;
        box.value = text.join("\n");
        div.appendChild(box);
    } else {
        p = document.createElement("p");
        p.className = "warning";

        small = document.createElement("small");
        small.className = "text-muted";
        small.innerHTML = "You do not have premium!";

        p.appendChild(small);
        div.appendChild(p);
    }



    let col = document.getElementsByClassName("col-md-4")[0];
    col.appendChild(div);
})();