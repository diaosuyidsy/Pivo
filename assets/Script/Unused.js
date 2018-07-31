let physicsManager = cc.director.getPhysicsManager();
physicsManager.enabled = true;

let collisionManager = cc.director.getCollisionManager();
collisionManager.enabled = true;
// physicsManager.debugDrawFlags = 
//     // 0;
//     // cc.PhysicsManager.DrawBits.e_aabbBit |
//     // cc.PhysicsManager.DrawBits.e_pairBit |
//     // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
//     cc.PhysicsManager.DrawBits.e_jointBit |
//     cc.PhysicsManager.DrawBits.e_shapeBit
//     ;