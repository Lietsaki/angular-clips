import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

  constructor() {}

  ngOnInit(): void {}

  selectTab(tab: TabComponent) {
    this.tabs?.forEach((tab) => {
      tab.active = false;
    });

    tab.active = true;

    // Returning false prevents the default behaviour of the event that triggered this method.
    // For example, it prevents the <a> tag from adding a # to the url.
    return false;
  }

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter((tab) => tab.active);

    if ((!activeTabs || !activeTabs.length) && this.tabs && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }
}
