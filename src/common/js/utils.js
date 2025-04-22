import _ from 'lodash';
import ArrayUtil from './Array/array-util';
import DatasetUtil from './dataset-util';
import DateUtil from './Date';
import ObjectUtil from './Object/object-util';
import StringUtil from './String/string-util';
import LangUtil from './Lang/lang-util';
import NumberUtil from './Number/number-util';
import GridUtil from './Grid/grid-util';
import ComponentUtil from './Component/component-util';
// import ReportUtil from './Report/report-util';
import LayoutUtil from './Layout/layout-util.js';
import DF from './decimal-format.js';
import ChartUtil from './chart-util.js';

const _install = (utils, util) => {
    _.forEach(_.keys(util), (funcName) => {
        utils[funcName] = util[funcName];
    });
};

const _initUtilMethods = (utils) => {
    _install(utils, ArrayUtil);
    _install(utils, DatasetUtil);
    _install(utils, DateUtil);
    _install(utils, ObjectUtil);
    _install(utils, StringUtil);
    _install(utils, LangUtil);
    _install(utils, NumberUtil);
    _install(utils, GridUtil);
    _install(utils, ComponentUtil);
    // _install(utils, ReportUtil);
    _install(utils, LayoutUtil);
    _install(utils, DF);
    _install(utils, ChartUtil);
};

class Utils {
    constructor() {
        _initUtilMethods(this);
    }

    /**
     * utils 에 유틸 함수를 등록한다.
     *
     * @param  {String} utilFuncName
     * @param  {Function} utilFunc
     */
    install(utilFuncName, utilFunc = null) {
        this[utilFuncName] = utilFunc;
    }
}

const utils = new Utils();
window.utils = utils;
export default utils;