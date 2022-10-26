import { render} from '../utils/render.js';
import BoardSizeView from '../view/boardSize-view.js';
import LeadersListView from '../view/leaders-view.js';
import PuzzleListView from '../view/puzzleList-view.js';
import SettingView from '../view/setting-view.js';
import StatsView from '../view/stats-view.js';
import NotationView from '../view/notation-view.js';
import WinDisplayView from '../view/winDisplay-view';
import MusicView from '../view/music-view';

export default class BoardPresenter {
  init = () => {
    const siteMainElement = document.querySelector('main');

    render(new SettingView(), siteMainElement);
    render(new MusicView(), siteMainElement);
    render(new StatsView(), siteMainElement);
    render(new BoardSizeView(), siteMainElement);
    render(new PuzzleListView(), siteMainElement);
    render(new LeadersListView(), siteMainElement);
    render(new WinDisplayView(), siteMainElement);
  };
}
