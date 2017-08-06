function Accordion(options) {
  this.option = options;
  this.container = options.container;
  this.arrowDown = 'keyboard_arrow_down';
  this.arrowUp = 'keyboard_arrow_up';

}

Accordion.prototype.getTitle = function() {
  return this.option.mainTitle;
};
Accordion.prototype.getArrowDown = function() {
  return "keyboard_arrow_down";
};
Accordion.prototype.getArrowUp = function() {
  return "keyboard_arrow_up";
};

Accordion.prototype.getPanels = function() {
  return this.option.panels;
};
Accordion.prototype.getLenPanels = function() {
  return this.option.panels.length;
};
Accordion.prototype.removeClassOpen = function() {
  var el = document.querySelectorAll('.open'),
    i;
  for (i = 0; i < el.length; ++i) {
    el[i].classList.remove("open");
  }

};
Accordion.prototype.closeAllPanel = function() {
  var el = document.querySelectorAll('.slide'),
    i;
  for (i = 0; i < el.length; ++i) {
    el[i].setAttribute('data-state', "closed");
  }

};
Accordion.prototype.resetMarginPanels = function() {
  var el = document.querySelectorAll('.item-panels'),
    i;
  for (i = 0; i < el.length; ++i) {
    el[i].style.margin = "0";
  }

};
Accordion.prototype.resetArrow = function() {
  var el = document.querySelectorAll('.arrow'),
    i;
  for (i = 0; i < el.length; ++i) {
    el[i].textContent = this.getArrowDown();

  }
};
Accordion.prototype.resetAccorion = function() {
  this.removeClassOpen();
  this.closeAllPanel();
  this.resetMarginPanels();
  this.resetArrow();
};
Accordion.prototype.setState = function(ecurrentEl, state) {
  return ecurrentEl.setAttribute('data-state', state);
};

Accordion.prototype.toogleState = function(elem, arrow, index) {
  var self = this;
  var ecurrentEl = document.getElementById(elem);
  var currentArrow = document.getElementById(arrow);
  var getState = ecurrentEl.getAttribute('data-state');
  var getArrow = document.querySelector(".arrow");
  var itemPanels = document.getElementById("itemPanels-" + index);
  this.resetAccorion();

  if (getState == "closed") {
    this.setState(ecurrentEl, "open");
    itemPanels.style.margin = "30px 0";
    itemPanels.classList.add("open");
    currentArrow.textContent = self.getArrowUp(); // set arrow Up

  }
  if (getState == "open") {
    this.setState(ecurrentEl, "close");
    this.closeAllPanel();
    currentArrow.textContent = self.getArrowDown();
  }


};


Accordion.prototype.render = function(e) {

  var self = this;
  var panels = this.getPanels();
  var len = this.getLenPanels();
  var mainTitle = this.getTitle();
  var html = "";
  var content = document.getElementById(self.container);
  var index = 0;
  var slide = "";
  var htmlToogle = "";
  var htmlArrow = "";

  html += '<div class="global-title">' + mainTitle + '</div>';

  var currentArrow = this.arrowDown;

  for (var i = 0; i < len; i++) {
    index = i;
    slideID = "slide-" + i;
    arrowID = "arrow-" + i;
    itemPanels = "itemPanels-" + i;

    htmlToogle = '<div class="nav-toggle" onclick="Accordion.prototype.toogleState(\'' + slideID + '\', \'' + arrowID + '\', \'' + index + '\')">';
    htmlArrow = '<i class="material-icons arrow" id="' + arrowID + '">' + currentArrow + '</i>';

    if (!panels[i].content) { // if no content
      htmlToogle = '<div class="nav-toggle" style="cursor:auto">';
      htmlArrow = "";
    }

    html += '<div class="panels">';
    html += '<div class="item-panels" id="' + itemPanels + '" >';
    html += htmlArrow;
    html += htmlToogle;
    html += '<h3 class="item-title">' + panels[i].title + '</h3>';
    html += '<h4 class="item-desc">' + panels[i].subtitle + '</h4>';
    html += '</div>';
    html += '<div class="item-content slide" data-state="closed" id="' + slideID + '">' + panels[i].content + '</div>';
    html += '</div>';
    html += '</div>';

    el = document.getElementById(slideID);

  }

  content.innerHTML = html;

};




window.onload = function() {
  accordion.render();
};
