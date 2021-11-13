import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wmwstudio-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories = [
    {
      id: 1,
      name: "1",
      icon: "1"
    },
    {
      id: 2,
      name: "2",
      icon: "2"
    },
    {
      id: 3,
      name: "3",
      icon: "3"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
