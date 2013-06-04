#pragma strict

var walking : boolean = true;
var transitionToWalking : boolean = false;
var walkingOffsets = new Array();
var attackOffsets = new Array();

function Awake () {
  var i = 0;
  for (i = 0; i < 8; ++i) {
    walkingOffsets.Push(new Vector2(.125 * i, .3333333));
  }
  for (i = 0; i < 3; ++i) {
    attackOffsets.Push(new Vector2(.125 * i, 0));
  }
  transitionToWalking = true;
}

function Update () {
  if (Input.GetAxis ("Horizontal") > 0.001) {
    walking = false;
    StartCoroutine(AttackAnim());
  }
  if (transitionToWalking) {
    transitionToWalking = false;
    walking = true;
    StartCoroutine(WalkAnim());
  }
}

function WalkAnim() {
  var i = 0;
  while (walking) {
    renderer.material.SetTextureOffset ("_MainTex", walkingOffsets[i]);
    i = (i + 1) % walkingOffsets.length;
    yield new WaitForSeconds (.08);
  };
}

function AttackAnim() {
  var i = 0;
  while (i < attackOffsets.length) {
    renderer.material.SetTextureOffset ("_MainTex", attackOffsets[i]);
    i = i + 1;
    yield new WaitForSeconds (.08);
  };
  transitionToWalking = true;
}
