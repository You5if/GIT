import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IMenuItem } from 'src/app/components/dynamic/menu/menu.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: IMenuItem[];
  @ViewChild('childMenu') public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
