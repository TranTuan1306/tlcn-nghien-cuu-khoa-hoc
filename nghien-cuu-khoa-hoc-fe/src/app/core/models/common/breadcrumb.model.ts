export class BreadCrumb {
  heading: string;
  lstBreadcrumb: Array<ListBreadCrumb>;
}

export class ListBreadCrumb {
  title: string;
  link: string;
}

// export class BreadCrumb {
//   heading: string;
//   listBreadcrumb: BreadcrubmObj[];
//   constructor(initObj: {
//     heading: string;
//     listBreadcrumb: BreadcrubmObj[];
//   }) {
//     this.heading = initObj.heading;
//     this.listBreadcrumb = initObj.listBreadcrumb;
//   }
// }

// export class BreadcrubmObj {
//   title: string;
//   link: string;
// }
