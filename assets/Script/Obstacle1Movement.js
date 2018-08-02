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
    speed: 20.0,
    Point1: cc.Node,
    Point2: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    var P1 = this.Point1.parent.convertToWorldSpace(this.Point1.position)
    var P2 = this.Point2.parent.convertToWorldSpace(this.Point2.position)
    P1 = this.node.parent.convertToNodeSpace(P1)
    P2 = this.node.parent.convertToNodeSpace(P2)

    // Calculate time, t = s/v

    var time = this.checkDistance(this.Point1, this.Point2) / this.speed
    var seq = cc.repeatForever(
      cc.sequence(cc.moveTo(time, P1.x, P1.y), cc.moveTo(time, P2.x, P2.y))
    )

    this.node.runAction(seq)
  },

  onCollisionEnter: function (other, self) {
    cc.log('Collision Enter')
  },

  checkDistance (nodeA, nodeB) {
    var dx = nodeA.x - nodeB.x
    var dy = nodeA.y - nodeB.y
    var distance = Math.sqrt(dx * dx + dy * dy)
    return distance
  }

  // update (dt) {},
})
