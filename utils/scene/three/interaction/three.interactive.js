const {Raycaster: a, Vector2: h} = global.THREE;

var c = class {
  target;
  name;
  intersected;
  wasIntersected = !1;
  distance;

  constructor(e, s) {
    this.target = e, this.name = s, this.intersected = !1, this.distance = 0
  }
}, i = class {
  type;
  cancelBubble;
  originalEvent;
  coords = new h(0, 0);
  distance = 0;
  intersected = !1;

  constructor(e, s = null) {
    this.cancelBubble = !1, this.type = e, this.originalEvent = s
  }

  stopPropagation() {
    this.cancelBubble = !0
  }
}, u = class {
  renderer;
  camera;
  domElement;
  bindEventsOnBodyElement;
  mouse;
  supportsPointerEvents;
  interactiveObjects;
  closestObject;
  raycaster;
  treatTouchEventsAsMouseEvents;

  constructor(e, s, t, n) {
    this.renderer = e, this.camera = s, this.domElement = t, this.bindEventsOnBodyElement = !0, typeof n < "u" && n && (this.bindEventsOnBodyElement = !1), this.mouse = new h(-1, 1), this.supportsPointerEvents = !!window.PointerEvent, this.interactiveObjects = [], this.closestObject = null, this.raycaster = new a, t.addEventListener("click", this.onMouseClick), this.supportsPointerEvents ? (this.bindEventsOnBodyElement ? t.ownerDocument.addEventListener("pointermove", this.onDocumentMouseMove) : t.addEventListener("pointermove", this.onDocumentMouseMove), t.addEventListener("pointerdown", this.onMouseDown), t.addEventListener("pointerup", this.onMouseUp)) : (this.bindEventsOnBodyElement ? t.ownerDocument.addEventListener("mousemove", this.onDocumentMouseMove) : t.addEventListener("mousemove", this.onDocumentMouseMove), t.addEventListener("mousedown", this.onMouseDown), t.addEventListener("mouseup", this.onMouseUp), t.addEventListener("touchstart", this.onTouchStart, {passive: !0}), t.addEventListener("touchmove", this.onTouchMove, {passive: !0}), t.addEventListener("touchend", this.onTouchEnd, {passive: !0})), this.treatTouchEventsAsMouseEvents = !0
  }

  dispose = () => {
    this.domElement.removeEventListener("click", this.onMouseClick), this.supportsPointerEvents ? (this.domElement.ownerDocument.removeEventListener("pointermove", this.onDocumentMouseMove), this.domElement.removeEventListener("pointerdown", this.onMouseDown), this.domElement.removeEventListener("pointerup", this.onMouseUp)) : (this.domElement.ownerDocument.removeEventListener("mousemove", this.onDocumentMouseMove), this.domElement.removeEventListener("mousedown", this.onMouseDown), this.domElement.removeEventListener("mouseup", this.onMouseUp), this.domElement.removeEventListener("touchstart", this.onTouchStart), this.domElement.removeEventListener("touchmove", this.onTouchMove), this.domElement.removeEventListener("touchend", this.onTouchEnd))
  };
  add = (e, s = []) => {
    if (e) if (s.length > 0) s.forEach(t => {
      let n = e.getObjectByName(t);
      if (n) {
        let o = new c(n, t);
        this.interactiveObjects.push(o)
      }
    }); else {
      let t = new c(e, e.name);
      this.interactiveObjects.push(t)
    }
  };
  remove = (e, s = []) => {
    if (!e) return;
    let t = new Set(s.length > 0 ? s : [e.name]);
    this.interactiveObjects = this.interactiveObjects.filter(n => !t.has(n.name))
  };
  update = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera), this.interactiveObjects.forEach(n => {
      n.target && this.checkIntersection(n)
    }), this.interactiveObjects.sort(function (n, o) {
      return n.distance - o.distance
    });
    let e = this.interactiveObjects.find(n => n.intersected) ?? null;
    if (e != this.closestObject) {
      if (this.closestObject) {
        let n = new i("mouseout");
        this.dispatch(this.closestObject, n)
      }
      if (e) {
        let n = new i("mouseover");
        this.dispatch(e, n)
      }
      this.closestObject = e
    }
    let s;
    this.interactiveObjects.forEach(n => {
      !n.intersected && n.wasIntersected && (s || (s = new i("mouseleave")), this.dispatch(n, s))
    });
    let t;
    this.interactiveObjects.forEach(n => {
      n.intersected && !n.wasIntersected && (t || (t = new i("mouseenter")), this.dispatch(n, t))
    })
  };
  checkIntersection = e => {
    let s = this.raycaster.intersectObjects([e.target], !0);
    if (e.wasIntersected = e.intersected, s.length > 0) {
      let t = s[0].distance;
      s.forEach(n => {
        n.distance < t && (t = n.distance)
      }), e.intersected = !0, e.distance = t
    } else e.intersected = !1
  };
  onDocumentMouseMove = e => {
    this.mapPositionToPoint(this.mouse, e.clientX, e.clientY);
    let s = new i("mousemove", e);
    this.interactiveObjects.forEach(t => {
      this.dispatch(t, s)
    })
  };
  onTouchMove = e => {
    this.mapPositionToPoint(this.mouse, e.touches[0].clientX, e.touches[0].clientY);
    let s = new i(this.treatTouchEventsAsMouseEvents ? "mousemove" : "touchmove", e);
    this.interactiveObjects.forEach(t => {
      this.dispatch(t, s)
    })
  };
  onMouseClick = e => {
    this.update();
    let s = new i("click", e);
    this.interactiveObjects.forEach(t => {
      t.intersected && this.dispatch(t, s)
    })
  };
  onMouseDown = e => {
    this.mapPositionToPoint(this.mouse, e.clientX, e.clientY), this.update();
    let s = new i("mousedown", e);
    this.interactiveObjects.forEach(t => {
      t.intersected && this.dispatch(t, s)
    })
  };
  onTouchStart = e => {
    this.mapPositionToPoint(this.mouse, e.touches[0].clientX, e.touches[0].clientY), this.update();
    let s = new i(this.treatTouchEventsAsMouseEvents ? "mousedown" : "touchstart", e);
    this.interactiveObjects.forEach(t => {
      t.intersected && this.dispatch(t, s)
    })
  };
  onMouseUp = e => {
    let s = new i("mouseup", e);
    this.interactiveObjects.forEach(t => {
      this.dispatch(t, s)
    })
  };
  onTouchEnd = e => {
    this.mapPositionToPoint(this.mouse, e.touches[0].clientX, e.touches[0].clientY), this.update();
    let s = new i(this.treatTouchEventsAsMouseEvents ? "mouseup" : "touchend", e);
    this.interactiveObjects.forEach(t => {
      this.dispatch(t, s)
    })
  };
  dispatch = (e, s) => {
    e.target && !s.cancelBubble && (s.coords = this.mouse, s.distance = e.distance, s.intersected = e.intersected, e.target.dispatchEvent(s))
  };
  mapPositionToPoint = (e, s, t) => {
    let n = this.renderer.domElement.getBoundingClientRect();
    e.x = (s - n.left) / n.width * 2 - 1, e.y = -((t - n.top) / n.height) * 2 + 1
  }
};
export {u as InteractionManager, i as InteractiveEvent, c as InteractiveObject};
