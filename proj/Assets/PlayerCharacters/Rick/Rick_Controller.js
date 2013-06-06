#pragma strict

private var controller : CharacterController = null;
private var forwardVelocity: Vector2 = new Vector2(-0.2, 0);

function Start () {
  controller = collider as CharacterController;
}

function Update () {
  if (Input.GetButton ("Fire1")) {
    GetComponent(Rick_Anim).attack();
  } else if (Input.GetAxis ("Horizontal") > 0.001) {
    GetComponent(Rick_Anim).walk();
    controller.SimpleMove(forwardVelocity);
  } else {
    GetComponent(Rick_Anim).idle();
  }
}