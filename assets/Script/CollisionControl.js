// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var GameManager = require('GameManager')

cc.Class({
  extends: cc.Component,

  properties: {
    ParticlePrefab: cc.Prefab,
    Level: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {},
  onCollisionEnter: function (other, self) {
    // Call OnplayerDead in GameManager
    GameManager._instance.onPlayerDead()
    var par = cc.instantiate(this.ParticlePrefab)

    par.x = this.node.parent.convertToWorldSpace(this.node.position).x
    par.y = this.node.parent.convertToWorldSpace(this.node.position).y
    par.parent = this.Level
    this.node.parent.destroy()
  }
  // update (dt) {},
})
