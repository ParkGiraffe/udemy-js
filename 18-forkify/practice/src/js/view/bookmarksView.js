import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;
  _errorMessage = 'No bookrmarks yet, Find a nice recipe and bookmark it :)';
  _message = '';


  /** 북마크를 로드 때마다 렌더 */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
