// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var LevelCreator = require('LevelCreator')

var PlayerWalk = cc.Class({
  extends: cc.Component,

  properties: {
    LevelHolder: cc.Node,
    WayPointHolder: cc.Node,
    _wayPoints: [cc.Node],
    _currentWPIndex: 0,
    _targetWayPoint: cc.Node,
    WalkSpeed: 1.0,
    _LevelCreateIndex: 0 // Increase if rewalked, generate new level && destroy old when reached 2
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.node.on('Rewalk', event => {
      // Find the next children and fill WayPointHolder with it
      // Next get its position in the parent
      var index = 0
      for (; index < this.LevelHolder.children.length; index++) {
        if (this.LevelHolder.children[index] == this.WayPointHolder.parent) {
          break
        }
      }
      // If we break, then we have found the target index, which is
      this.WayPointHolder = this.LevelHolder.children[index + 1].children[0]
      this._wayPoints = this.WayPointHolder.children
      this._currentWPIndex = 0
      // Then decide if we want to generate a new level & destroy the old
      this._LevelCreateIndex++

      if (this._LevelCreateIndex >= 2) {
        LevelCreator._instance.generateNextLevel()
      }
      this.walk()
    })
  },

  start () {
    this._wayPoints = this.WayPointHolder.children
    cc.log(this._wayPoints.length)
    this.walk()
  },

  walk () {
    // To maintain a certain speed, need to calculate the distance to the next node for t = s/v
    var distanceToNext = this.checkDistance(
      this._wayPoints[this._currentWPIndex].parent.convertToWorldSpace(
        this._wayPoints[this._currentWPIndex].position
      )
    )
    // this is the action to move to the next point
    var actionTo = new cc.moveTo(
      distanceToNext / this.WalkSpeed,
      this._wayPoints[this._currentWPIndex].parent.convertToWorldSpace(
        this._wayPoints[this._currentWPIndex].position
      )
    )
    var callback = new cc.callFunc(this.walkCallBack, this)
    this.node.runAction(new cc.sequence(actionTo, callback))
  },

  // After walk to the point, callback is executed to walk to the next point
  walkCallBack () {
    if (this._currentWPIndex < this._wayPoints.length - 1) {
      this._currentWPIndex++
      this.walk()
    } else {
      this.node.emit('Rewalk')
    }
  },

  // Return the distance in float from this node to targetNode
  checkDistance (targetNode) {
    var dx = targetNode.x - this.node.x
    var dy = targetNode.y - this.node.y
    var distance = Math.sqrt(dx * dx + dy * dy)
    return distance
  }
})
