// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {},

  update (dt) {
    this.rotate()
  },

  rotate () {
    var diff = {
      x: this.target.x - this.node.x,
      y: this.target.y - this.node.y
    }
    var angle = Math.atan2(diff.x, diff.y)
    this.node.rotation = cc.radiansToDegrees(angle)
  }
})
