/*
 * Copyright (c) 2006, www.never-online.net! All rights reserved.
 * web    : http://rank.im
 * author : rank
 * version: 0.10 beta
 * debug in IE6.0, Opera9.0, Mozilla Firefox1.5.0
 */ 

var neverModules = window.neverModules || {};

var _registerNS = window._registerNS || function (ns) {
  var levels = ns.split("."); var ns = neverModules;
  for (var i=(levels[0]=="neverModules")?1:0; i<levels.length; i++) {
    ns[levels[i]] = ns[levels[i]] || {};
    ns = ns[levels[i]];
  }; return ns;
};

var _createjsClass = window._createjsClass || function () {
  return function () { 
    this._defaultInitializer.apply(this,arguments); 
  };
}; 

_registerNS("neverModules.ui");
_registerNS("neverModules.configuration.ui.outlookMenu");

neverModules.configuration.ui.outlookMenu = {
  defaultAnimate: {delay:10, increase:4, decrease:3}
};

neverModules.ui.outlookMenu = _createjsClass();
neverModules.ui.outlookMenu.prototype = {

  _defaultInitializer: function (outlookMenuId, instanceName) {
    if (!document.getElementById(outlookMenuId)) 
      throw new Error("Can not get ref by outlookMenuId, maybe arguments raise a error");
    this.defaultAnimate = neverModules.configuration.ui.outlookMenu.defaultAnimate;
    this.menuNode  = document.getElementById(outlookMenuId);
    this.name      = instanceName;
    this.roots     = this.menuNode.getElementsByTagName("H4");;
    this.nodes     = this.menuNode.getElementsByTagName("UL");;
    this.showNode  = null;
    this.closeNode = null;
    this.heights   = [];
    this.animate   = this.defaultAnimate;
    this.isAnimate = false;
    return this;
  },

  render: function (defaultExpandNodeIndex) {
    defaultExpandNodeIndex = parseInt(defaultExpandNodeIndex)||0;
    this.showNode  = defaultExpandNodeIndex;
    this.closeNode = defaultExpandNodeIndex;
    for (var i=0; i<this.nodes.length; i++) {
      this.heights[i] = this.nodes[i].offsetHeight;
      this.nodes[i].style.display = defaultExpandNodeIndex==i?"block":"none";
      if (i<this.roots.length) 
      this.roots[i].onclick = new Function(this.name+ ".expandNode(" +i+ ");");
    }
    nodes = null; roots = null; return this;
  },

  setStyle: function (name) {
    this.menuNode.className = name;
    return this;
  },

  setAnimate: function (oAnimate) {
    if (typeof oAnimate!= "object") return this;
    this.animate = {delay:parseInt(oAnimate.delay)||this.defaultAnimate.delay, 
    increase:parseInt(oAnimate.increase)||this.defaultAnimate.increase, 
    decrease:parseInt(oAnimate.decrease)||this.defaultAnimate.decrease};
    return this;
  },

  expandNode: function (nNode) {
    if (this.isAnimate) return; var self = this;
    this.closeNode = this.showNode;
    this.showNode  = nNode;
    var showNode = this.nodes[self.showNode];
    var closeNode = this.nodes[self.closeNode];
    if (this.showNode!=this.closeNode) {
      closeNode.style.height = self.heights[self.closeNode]+"px";
      closeNode.style.overflow = "hidden"
      showNode.style.display = "block";
      showNode.style.overflow = "hidden";
      showNode.style.height = "1px";
      this.isAnimate = true;
      self._timer = window.setInterval(function () {
      self.animateNodes(self);}, this.animate.delay);
    }
    return this.nodes[this.showNode];
  },

  animateNodes: function () {
    var sw = this.nodes[this.showNode];
    var cw = this.nodes[this.closeNode];
    var sh = parseInt(sw.style.height)||1;
    var ch = parseInt(cw.style.height)||this.heights[this.closeNode];
    sw.style.height = (sh+this.animate.increase>=this.heights[this.showNode]?
    this.heights[this.showNode]:
    sh+this.animate.increase)+"px";
    cw.style.height = (ch-this.animate.decrease>0?
    ch-this.animate.decrease:1)+"px";
    if (sh>=this.heights[this.showNode] && ch<=this.animate.decrease) {
      sw.style.height = this.heights[this.showNode]+"px";
      cw.style.display = "none";
      this.isAnimate = false;
      window.clearInterval(this._timer);
    }  
  },

  dispose: function () {
    this.menuNode = null;
    for (var i=0; i<this.roots.length; i++)
      this.roots[i].onclick = null;
    this.roots  = null;
    this.nodes  = null;
    this._timer = null;
    return this;
  }

};