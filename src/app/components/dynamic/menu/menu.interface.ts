export interface IMenu {
    menuId: number;
    parentMenuId: number;
    menuTypeId: number;
    menuText: string;
    actionName: string;
    controllerName: string;
    cSSClassName: string;
    menuBullet: string;
    menuOrder: number;
    menuLevel: number;
    active: boolean;
}

export interface IMenuItem {
    navId: number;
    displayName: string;
    disabled: boolean;
    iconName: string;
    routeName?: string;
    children: IMenuItem[];
    isParent: boolean;
  }
