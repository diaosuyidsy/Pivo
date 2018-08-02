// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var LevelCreator = cc.Class({
  extends: cc.Component,

  properties: {
    FirstRoad: cc.Node,
    Road1Prefab: cc.Prefab,
    RoadPrefabs: [cc.Prefab],
    ObstaclePrefabs: [cc.Prefab],
    PrefabParent: cc.Node,
    _currentPointer: 0,
    _lastRoad: cc.Node,
    MaxRoadOnMap: 2,
    _prefabHolder: [cc.Node]
  },

  statics: {
    _instance: null
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.warn(' =================== LevelCreator Init ===================')
    LevelCreator._instance = this
    cc.game.addPersistRootNode(this.node)
  },

  start () {
    // Push the first road onto the holder
    this._prefabHolder.push(this.FirstRoad)
    this._lastRoad = this.FirstRoad
    this._currentPointer++

    this.generateNextLevel()
    this.generateNextLevel()

    // Generate the next x level according to maxpointer
    // this.testent = cc.instantiate(this.Road1Prefab)
    // this.testent.parent = this.Prefathis.FirstRoadbParent
  },

  generateNextLevel () {
    // Decide if the random road is a road or a obstacle, normally its back and forth
    var RandomRoad = this._currentPointer % 2 == 0
      ? this.RoadPrefabs[
          this.getRandomIntInclusive(0, this.RoadPrefabs.length - 1)
        ]
      : this.ObstaclePrefabs[
          this.getRandomIntInclusive(0, this.ObstaclePrefabs.length - 1)
        ]
    // If current pointer is more than max, reset to 0
    if (this._currentPointer > this.MaxRoadOnMap) {
      this._currentPointer = 0
    }
    cc.log('Pointer Position: ' + this._currentPointer)
    // If the array has not reached the limit, then push more
    if (this._prefabHolder.length <= this.MaxRoadOnMap) {
      var raoad = cc.instantiate(RandomRoad)
      this.setCorrectRotation(raoad)
      this._prefabHolder.push(raoad)
      this._lastRoad = raoad

      this.setCorrectPosition(this._prefabHolder[this._currentPointer])
      this._prefabHolder[this._currentPointer].parent = this.PrefabParent
      this._currentPointer++
    } else {
      // If it has already reached the limit then destroy the current road and reconstruct a new one
      if (this._prefabHolder[this._currentPointer] != null) {
        this._prefabHolder[this._currentPointer].destroy()
        var raoad = cc.instantiate(RandomRoad)
        this.setCorrectRotation(raoad)
        this._prefabHolder[this._currentPointer] = raoad
        this._lastRoad = raoad

        this.setCorrectPosition(this._prefabHolder[this._currentPointer])
        this._prefabHolder[this._currentPointer].parent = this.PrefabParent
        this._currentPointer++
      }
    }
  },

  // Connect the roads
  setCorrectPosition (target) {
    var lastIndex = this._currentPointer == 0
      ? this.MaxRoadOnMap
      : this._currentPointer - 1
    var lastNode = this._prefabHolder[lastIndex].children[0].children[
      this._prefabHolder[lastIndex].children[0].children.length - 1
    ]
    target.position = lastNode.parent.convertToWorldSpace(lastNode.position)
  },

  // Smoothly connect the road, so we need to set its rotation correctly
  // Author: LYY
  setCorrectRotation (raoad) {
    var pointBefore = this._lastRoad.children[0].children

    var SlopEndPosition2 = pointBefore[
      pointBefore.length - 1
    ].parent.convertToWorldSpace(pointBefore[pointBefore.length - 1].position)
    var SlopEndPosition1 = pointBefore[
      pointBefore.length - 2
    ].parent.convertToWorldSpace(pointBefore[pointBefore.length - 2].position)

    var slopEndY = SlopEndPosition2.y - SlopEndPosition1.y
    var slopEndX = SlopEndPosition2.x - SlopEndPosition1.x

    var point = raoad.children[0].children
    var SlopStartPosition2 = point[1].parent.convertToWorldSpace(
      point[1].position
    )
    var SlopStartPosition1 = point[0].parent.convertToWorldSpace(
      point[0].position
    )

    var slopeStartY = SlopStartPosition2.y - SlopStartPosition1.y
    var slopeStartX = SlopStartPosition2.x - SlopStartPosition1.x

    var angleBefore = Math.atan2(slopEndX, slopEndY)
    var angleStart = Math.atan2(slopeStartX, slopeStartY)

    raoad.rotation = cc.radiansToDegrees(angleBefore - angleStart)
  },

  getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
  }
  // update (dt) {},
})
