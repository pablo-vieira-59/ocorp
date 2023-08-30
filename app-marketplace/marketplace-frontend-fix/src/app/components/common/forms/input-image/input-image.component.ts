import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttachmentCreateDTO } from 'src/app/models/DTO/AttachmentCreateDTO';
import { AttachmentService } from 'src/app/services/attachment.services';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent {
  @Input()
  inputId = ''

  @Input()
  label = '';
  @Input()
  description = '';

  @Input()
  currentImage = '';

  @Output()
  currentImageChange = new EventEmitter<any>();

  @Input()
  imageGuid = '';

  @Output()
  imageGuidChange = new EventEmitter<any>();

  constructor(
		private serviceAttachment: AttachmentService) { }

  ngOnInit(){

  }

  async UpdateImage(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;

		if (files && files[0]) {
			const file = files[0];

			// const reader = new FileReader();
			// reader.onload = e => this.currentImage = (reader.result as string);

			// reader.readAsDataURL(file);

			var attachment = {
				file: file,
				attachmentTypeId: 1
			} as AttachmentCreateDTO;

			var result = await this.serviceAttachment.UploadAttachment(attachment);
			this.imageGuid = result;
			this.currentImage = this.serviceAttachment.GetAttachmentUrl(result);
      this.currentImageChange.emit(this.currentImage);
      this.imageGuidChange.emit(this.imageGuid);
		}
	}
}
