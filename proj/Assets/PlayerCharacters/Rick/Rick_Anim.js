#pragma strict

private var loopAnim = 'idle';  // idle or walk
private var pauseLoopAnim = false;

private var idleOffsets = [ 
  new Vector2(0, .6666666)
];

private var walkOffsets = [ 
  new Vector2(.000, .3333333),
  new Vector2(.125, .3333333),
  new Vector2(.250, .3333333),
  new Vector2(.375, .3333333),
  new Vector2(.500, .3333333),
  new Vector2(.625, .3333333),
  new Vector2(.750, .3333333),
  new Vector2(.875, .3333333)
];
  
private var attackOffsets = [ 
  Vector2(0, 0), 
  Vector2(.125, 0), 
  Vector2(.250, 0) 
];

function Awake () { 
  StartCoroutine(IdleAnim());
}

function idle() {
  if (loopAnim !== 'idle') StartCoroutine(IdleAnim());
}

function walk() {
  if (loopAnim !== 'walk') StartCoroutine(WalkAnim());
}

function attack() {
  if (!pauseLoopAnim) StartCoroutine(AttackAnim());
}

/*
// TODO: move the following update function into character controller.
function Update () {
  if (Input.GetButton ("Fire1")) {
    attack();
  } else if (Input.GetAxis ("Horizontal") > 0.001) {
    walk();
  } else {
    idle();
  }
}
*/

private function IdleAnim() {
  StopCoroutine(loopAnim);
  loopAnim = 'idle';
  var i = 0;
  while (loopAnim === 'idle') {
    if (!pauseLoopAnim) {
      renderer.material.SetTextureOffset ("_MainTex", idleOffsets[i]);
      i = (i + 1) % idleOffsets.length;
    }
    yield new WaitForSeconds (.08);
  };
}

private function WalkAnim() {
  StopCoroutine(loopAnim);
  loopAnim = 'walk';
  var i = 0;
  while (loopAnim === 'walk') {
    if (!pauseLoopAnim) {
      renderer.material.SetTextureOffset ("_MainTex", walkOffsets[i]);
      i = (i + 1) % walkOffsets.length;
    }
    yield new WaitForSeconds (.08);
  };
}

private function AttackAnim() {
  pauseLoopAnim = true;
  var i = 0;
  while (i < attackOffsets.length) {
    renderer.material.SetTextureOffset ("_MainTex", attackOffsets[i]);
    i = i + 1;
    yield new WaitForSeconds (.08);
  };
  pauseLoopAnim = false;
}
