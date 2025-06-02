import View from './View.js';
import preivewView from './preivewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

    _generateMarkup() {
      return this._data
        .map(result => preivewView.render(result, false))
        .join('');
    }
}

export default new ResultsView();
