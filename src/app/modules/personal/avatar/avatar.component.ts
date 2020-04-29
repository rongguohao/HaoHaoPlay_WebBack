import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { cropbox, H_Http } from '@core';


@Component({
  selector: 'dialog-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {

  isVisible = false;

  options = {
    imageBox: '.imageBox',
    thumbBox: '.thumbBox',
    spinner: '.spinner',
    imgSrc: '',
    previewBoxF: '.previewBoxF',
    previewBoxS: '.previewBoxS'
  };

  cropper: any = null;

  @Output() onSave = new EventEmitter();

  constructor(
    private msg: NzMessageService,
    private http: H_Http) { }


  ngOnInit() {
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
    const baseStr = this.cropper.getDataURL();
    this.http.put('CurrentUser/UpdateHeadImg', { Base64Str: baseStr }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.msg.success('更新成功');
    });
  }

  upload() {
    const input = document.getElementById('avatarInput');
    input.click();
    input.onchange = this.changeImg.bind(this);
  }

  changeImg(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
      const url = reader.result as string;
      this.options.imgSrc = url;
      await cropbox(this.options).then((obj) => {
        this.cropper = obj;
        this.cropper.draw();
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  turnLeft() {
    this.cropper.turnLeft();
  }

  turnRight() {
    this.cropper.turnRight();
  }

  large() {
    this.cropper.zoomIn();
  }

  reduce() {
    this.cropper.zoomOut();
  }
}

