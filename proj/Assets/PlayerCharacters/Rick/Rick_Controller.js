#pragma strict

function Start () {
}

function Update () {
  if (Input.GetButton ("Fire1")) {
    GetComponent(Rick_Anim).attack();
  } else if (Input.GetAxis ("Horizontal") > 0.001) {
    GetComponent(Rick_Anim).walk();
  } else {
    GetComponent(Rick_Anim).idle();
  }
}