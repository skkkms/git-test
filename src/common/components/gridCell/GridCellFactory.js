import Vue from 'vue';
import _ from 'lodash';

import CellAttachFileButton from './CellAttachFileButton/CellAttachFileButton';
import CellBadge from './CellBadge/CellBadge';
import CellButton from './CellButton/CellButton';
import CellButtonList from './CellButtonList/CellButtonList';
import CellCheckbox from './CellCheckbox/CellCheckbox';
import CellDateLabel from './CellDateLabel/CellDateLabel';
import CellFileDnButton from './CellFileDnButton/CellFileDnButton';
import CellLabel from './CellLabel/CellLabel';
import CellMultiSelect from './CellMultiSelect/CellMultiSelect';
import CellMultiUserSelect from './CellMultiUserSelect/CellMultiUserSelect';
import CellMultiUserSelectAdv from './CellMultiUserSelectAdv/CellMultiUserSelectAdv';
import CellPermissionCheckbox from './CellPermissionCheckbox/CellPermissionCheckbox';
import CellSegmentBox from './CellSegmentBox/CellSegmentBox';
import CellSelect from './CellSelect/CellSelect';
import CellStateButton from './CellStateButton/CellStateButton';
import CellTextarea from './CellTextarea/CellTextarea';
import CellTextField from './CellTextField/CellTextField';
import CellTextFieldWithButton from './CellTextFieldWithButton/CellTextFieldWithButton';
import CellUserName from './CellUserName/CellUserName';
import CellUserSelect from './CellUserSelect/CellUserSelect';

const KEY_EDITOR = '$customeditor';

class GridCellFactory {

  createCustomCell(cellClass, row, column, value, htmlElement, propsData, dataset, grid) {
    const editor = new cellClass(row, column, value, htmlElement, propsData, dataset, grid);
    htmlElement[KEY_EDITOR] = editor;
    return editor;
  }

  refreshCell(row, column, value, htmlElement) {
    const editor = htmlElement[KEY_EDITOR];
    htmlElement.$cellEditor = editor;
    if (editor) {
      editor.refreshEditor(row, column, value, htmlElement);
    }
  }

  createCellAttachFileButton(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellAttachFileButton, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellBadge(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellBadge, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellButton(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellButton, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellButtonList(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellButtonList, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellCheckbox(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellCheckbox, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellDateLabel(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellDateLabel, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellFileDnButton(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellFileDnButton, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellLabel(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellLabel, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellMultiSelect(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellMultiSelect, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellMultiUserSelect(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellMultiUserSelect, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellMultiUserSelectAdv(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellMultiUserSelectAdv, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellPermissionCheckbox(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellPermissionCheckbox, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellSegmentBox(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellSegmentBox, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellSelect(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellSelect, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellStateButton(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellStateButton, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellTextarea(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellTextarea, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellTextField(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellTextField, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellTextFieldWithButton(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellTextFieldWithButton, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellUserName(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellUserName, row, column, value, htmlElement, propsData, dataset, grid);
  }
  createCellUserSelect(row, column, value, htmlElement, propsData, dataset, grid) {
    return this.createCustomCell(CellUserSelect, row, column, value, htmlElement, propsData, dataset, grid);
  }
  

  installAPI() {
    window.utils.install('createCustomCell', this.createCustomCell.bind(this));
    window.utils.install('refreshCell', this.refreshCell.bind(this));
    window.utils.install('createCellAttachFileButton', this.createCellAttachFileButton.bind(this));
    window.utils.install('createCellBadge', this.createCellBadge.bind(this));
    window.utils.install('createCellButton', this.createCellButton.bind(this));
    window.utils.install('createCellButtonList', this.createCellButtonList.bind(this));
    window.utils.install('createCellCheckbox', this.createCellCheckbox.bind(this));
    window.utils.install('createCellDateLabel', this.createCellDateLabel.bind(this));
    window.utils.install('createCellFileDnButton', this.createCellFileDnButton.bind(this));
    window.utils.install('createCellLabel', this.createCellLabel.bind(this));
    window.utils.install('createCellMultiSelect', this.createCellMultiSelect.bind(this));
    window.utils.install('createCellMultiUserSelect', this.createCellMultiUserSelect.bind(this));
    window.utils.install('createCellMultiUserSelectAdv', this.createCellMultiUserSelectAdv.bind(this));
    window.utils.install('createCellPermissionCheckbox', this.createCellPermissionCheckbox.bind(this));
    window.utils.install('createCellSegmentBox', this.createCellSegmentBox.bind(this));
    window.utils.install('createCellSelect', this.createCellSelect.bind(this));
    window.utils.install('createCellStateButton', this.createCellStateButton.bind(this));
    window.utils.install('createCellTextarea', this.createCellTextarea.bind(this));
    window.utils.install('createCellTextField', this.createCellTextField.bind(this));
    window.utils.install('createCellTextFieldWithButton', this.createCellTextFieldWithButton.bind(this));
    window.utils.install('createCellUserName', this.createCellUserName.bind(this));
    window.utils.install('createCellUserSelect', this.createCellUserSelect.bind(this));
  }
}

export default new GridCellFactory();
