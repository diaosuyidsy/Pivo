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
    FirstRoad: cc.Node,
    Road1Prefab: cc.Prefab,
    PrefabParent: cc.Node,
    _currentPointer: 0,
    _maxPointer: 4,
    _prefabHolder: [cc.Node]
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    // Push the first road onto the holder
    this._prefabHolder.push(this.FirstRoad)
    this._currentPointer++
    this.generateNextLevel()
    // Generate the next x level according to maxpointer
    // this.testent = cc.instantiate(this.Road1Prefab)
    // this.testent.parent = this.PrefabParent
  },

  generateNextLevel () {
    // If current pointer is more than max, reset to 0
    if (this._currentPointer > this._maxPointer) {
      this._currentPointer = 0
    }
    // If the array has not reached the limit, then push more
    if (this._prefabHolder.length <= this._maxPointer) {
      this._prefabHolder.push(cc.instantiate(this.Road1Prefab))
      this.setCorrectPosition(this._prefabHolder[this._currentPointer])
      this._prefabHolder[this._currentPointer].parent = this.PrefabParent
      this._currentPointer++
    } else {
      // If it has already reached the limit then destroy the current road and reconstruct a new one
      if (this._prefabHolder[this._currentPointer] != null) {
        this._prefabHolder[this._currentPointer].destroy()
        this._prefabHolder[this._currentPointer] = cc.instantiate(
          this.Road1Prefab
        )
        this.setCorrectPosition(this._prefabHolder[this._currentPointer])
        this._prefabHolder[this._currentPointer] = this.PrefabParent
      }
    }
  },

  // Connect the roads
  setCorrectPosition (target) {
    var lastIndex = this._currentPointer == 0
      ? this._maxPointer
      : this._currentPointer - 1
    var lastNode = this._prefabHolder[lastIndex].children[0].children[
      this._prefabHolder[lastIndex].children[0].children.length - 1
    ]
    target.position = lastNode.parent.convertToWorldSpace(lastNode.position)
  }

  // update (dt) {},
})
