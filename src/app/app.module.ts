import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { ComputerComponent } from './computer/computer.component';
import { ChooseplayerComponent } from './chooseplayer/chooseplayer.component';
import { GameComponent } from './game/game.component';

const appRoutes: Routes = []

@NgModule({
  declarations: [
    AppComponent, PlayComponent, ComputerComponent, ChooseplayerComponent, GameComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
