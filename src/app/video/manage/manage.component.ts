import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modalService: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? '2' : '1';
      this.sort$.next(this.videoOrder);
    });

    this.clipService.getUserClips(this.sort$).subscribe((docs) => {
      this.clips = [];

      docs.forEach((doc) => {
        this.clips.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort(e: Event) {
    const { value } = e.target as HTMLSelectElement;
    // Simpler alternative-> this.router.navigateByUrl(`/manage?sort=${value}`);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault();
    this.activeClip = clip;
    this.modalService.toggleModal('editClip');
  }

  updateClip(clipToUpdate: IClip) {
    this.clips.forEach((clip, i) => {
      if (clip.docID === clipToUpdate.docID) {
        this.clips[i].title = clipToUpdate.title;
      }
    });
  }

  async deleteClip($event: Event, clipToDelete: IClip) {
    // In this case, the $event is not necessary since we were using the <a> tag with href="#" to get the cursor pointer
    // on hover, but we can achieve that with the hover:cursor-pointer tailwind class.
    // $event.preventDefault();

    await this.clipService.deleteClip(clipToDelete);
    this.clips = this.clips.filter((clip) => clip.docID !== clipToDelete.docID);
  }
}
