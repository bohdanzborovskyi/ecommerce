import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {navigation} from "./navBarMenu";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [
    NgForOf,
    MatButton
  ],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.css'
})
export class NavContentComponent implements OnInit{

  categories:any
  @Input() selectedSection:any

  ngOnInit(): void {
    this.categories = navigation
  }

}
