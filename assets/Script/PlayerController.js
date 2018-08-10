// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var GameManager = require('GameManager')
cc.Class({
  extends: cc.Component,

  properties: {
    PlayerRing: {
      default: null,
      type: cc.Node
    },

    Canvas: cc.Node,

    _t: 0.0,
    RotateSpeed: 0.05,

    _playerRotationRadius: 0.0,

    _startRotateRight: false,
    _startRotateLeft: false
  },

  // LIFE-CYCLE CALLBACKS:

  start () {
    // Get player's rotation radius
    var dx = this.PlayerRing.x
    var dy = this.PlayerRing.y
    this._playerRotationRadius = Math.sqrt(dx * dx + dy * dy)
  },

  update (dt) {
    // Set player's rotation
    this.PlayerRing.x = this._playerRotationRadius * Math.cos(this._t)
    this.PlayerRing.y = this._playerRotationRadius * Math.sin(this._t)
    // IF player press left rotate left, vice versa
    if (this._startRotateLeft) this._t += this.RotateSpeed
    if (this._startRotateRight) this._t -= this.RotateSpeed
  },

  // On Key pressed down
  onKeyDown: function (event) {
    switch (event.keyCode) {
      case cc.KEY.a:
        this._startRotateLeft = true
        break
      case cc.KEY.d:
        this._startRotateRight = true
        break
    }
  },

  // On key released
  onKeyUp: function (event) {
    switch (event.keyCode) {
      case cc.KEY.a:
        this._startRotateLeft = false
        break
      case cc.KEY.d:
        this._startRotateRight = false
        break
    }
  },

  onTouchStart (event) {
    var touches = event.getTouches()
    var touchLoc = touches[0].getLocation()
    var canvasWidth = this.Canvas.getComponent(cc.Canvas).designResolution.width

    if (touchLoc.x <= canvasWidth / 2) {
      this._startRotateLeft = true
    } else {
      this._startRotateRight = true
    }
    // cc.log(touchLoc.x + ' , ' + touchLoc.y)
    // cc.log(this.Canvas.getComponent(cc.Canvas).designResolution.width)
  },

  onTouchEnd (event) {
    this._startRotateLeft = false
    this._startRotateRight = false
  },

  // Trivia
  onLoad: function () {
    // add key down and key up event
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    this.Canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
    this.Canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  },

  destroy () {
    this._super()
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    this.Canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
    this.Canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }
})
