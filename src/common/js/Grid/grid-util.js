import store from '~system/vuex';

export default {

  /**
   * 그리드의 데이터를 엑셀로 다운로드 받기 위해 사용하는 펑션
   *
   * @function onDownloadExcel
   * @param  {string} pageNm  : 페이지명
   * @param  {Object} columnObj  : 칼럼 참조
   * @param  {Object} datasetObj  : datasets 참조
   * @param  {string} excelFileNm  : 다운로드 받을 엑셀 파일 명, 확장자 포함
   * @param  {Object} metaObj  : 메타
   */
  downloadGridToExcel(pageNm, columnObj, datasetObj, excelFileNm, metaObj) {
    // const grid = this.$refs.detailGrid;
    // const fileName = "excel-export.xlsx";

    // this.fileName = fileName;
    let meta = {};

    if (metaObj) {
      meta = metaObj;
    }
    if (!meta.headerTitle) {
      meta.headerTitle = {};
      utils.forEach(columnObj, item => {
        if (item.datafield) { // jqx grid
          meta.headerTitle[item.datafield] = item.text;
        } else { // uidev gird
          meta.headerTitle[item.value] = item.text;
        }
      });
    }

    const data = datasetObj.getRawData();
    const dtmColumns = [];
    const exportUserNameColumns = [];
    columnObj.forEach(column => {
      if (column.datafield) {
        if (/(DTM|DT|DateTime)$/.test(column.datafield)) {
          dtmColumns.push(column.datafield);
        }
      } else if (column.value) {
        if (/(DTM|DT|DateTime)$/.test(column.value)) {
          dtmColumns.push(column.value);
        }
      }

      if(column.excelExportUserName) { //excelExportUserName에 Display값을 넣어 보냄. 1:Name, 2:Name/Department
        exportUserNameColumns.push({datafield: column.excelExportUserName.datafield, displayType: column.excelExportUserName.displayType});
      } 
    });
    data.forEach(item => {
      dtmColumns.forEach(dtmColumn => {
        if (dtmColumn && dtmColumn.length === 8) {
          item[dtmColumn] = utils.dateformatToClient(item[dtmColumn], 'S');
        } else {
          item[dtmColumn] = utils.dateformatToClient(item[dtmColumn]);
        }
      });

      // finalModificationDisplayLangId
      // finalModificationUserId
      // finalModificationKnoxId
      // finalModificationLoginId
      // finalModificationUserName
      // finalModificationUserGlobalName
      // finalModificationDepartmentName
      // finalModificationDepartmentEnglishName
      exportUserNameColumns.forEach(exportData => {
        const userName = 'finalModificationUser'+ (store.getters.userInfo.langId === 'en' ? 'Global' : '')  + 'Name';
        const departmentName = 'finalModificationDepartment'+ (store.getters.userInfo.langId === 'en' ? 'English' : '')  + 'Name';
        //console.log(item, exportData, item[userName] + (exportData.displayType === 2 ? ' / '+ item[departmentName] : ''));
        item[exportData.datafield] = (item[userName] !== null ? item[userName] : '') + (item[userName] !== null && exportData.displayType === 2 ? ' / ' : '')+ (exportData.displayType === 2 ? item[departmentName] : '');
      });
    });

    const dataParams = {
      data,
      meta,
    };

    http.request(pageNm, 'DTS_CMZ_00042', {
      data: dataParams,
      responseType: 'arraybuffer',
    }).then(res => {
      this.downloadBlob(res, excelFileNm);
      // let blob = new Blob([res.data], {type: res.headers['content-type']});
      // if(window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(blob, excelFileNm);
      // }
      // else {
      //   let link = document.createElement('a');
      //   link.href = window.URL.createObjectURL(blob);
      //   link.target = '_blank';
      //   if(excelFileNm) link.download = excelFileNm;
      //   link.click();
      // }
    });
  },
  /**
   * 그리드의 데이터를 엑셀로 다운로드 받기 위해 사용하는 펑션
   *
   * @function onDownloadExcel
   * @param  {string} pageNm  : 페이지명
   * @param  {Object} columnObj  : 칼럼 참조
   * @param  {Object} dataObj  : datasets 참조
   * @param  {string} excelFileNm  : 다운로드 받을 엑셀 파일 명, 확장자 포함
   * @param  {Object} metaObj  : 메타
   */
  downloadDataToExcel(pageNm, columnObj, dataObj, excelFileNm, metaObj) {
    let meta = {};

    if (metaObj) {
      meta = metaObj;
    }
    if (!meta.headerTitle) {
      meta.headerTitle = {};
      utils.forEach(columnObj, item => {
        if (item.datafield) { // jqx grid
          meta.headerTitle[item.datafield] = item.text;
        } else { // uidev grid
          meta.headerTitle[item.value] = item.text;
        }
      });
    }


    const data = dataObj;
    const dataParams = {
      data,
      meta,
    };

    http.request(pageNm, 'DTS_CMZ_00042', {
      data: dataParams,
      responseType: 'arraybuffer',
    }).then(res => {
      this.downloadBlob(res, excelFileNm);
    });
  },
  downloadBlob(res, fileName) {
    const blob = new Blob([res.data], { type: res.headers['content-type'] });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      if (fileName) link.download = fileName;
      link.click();
    }
  },
  checkMetaSave() {
    return false;
  },
  getConfigurationValue(configId, moduleCode, subModuleCode) {
    let result = '';
    const filtered = store.getters.configList.filter(item => item.configurationId === configId);
    if (filtered.length > 0) {
      const configApplyCode = filtered[0].configurationApplyCode;
      result = filtered[0].configurationDefaultValue;
      if (configApplyCode === 'M') {
        const findItem = filtered.find(item => item.configurationApplyModuleCode === moduleCode
          && (item.configurationApplySubModuleCode === 'ALL' || item.configurationApplySubModuleCode === subModuleCode));
        if (findItem) {
          result = findItem.configurationValue;
        }
      } else if (configApplyCode === 'A') {
        const findItem = filtered.find(item => item.configurationApplyModuleCode === '01' && item.configurationApplySubModuleCode === '001');
        if (findItem) {
          result = findItem.configurationValue;
        }
      }
    }
    return result;
  },
  hasRoleNickName(roleNickName) {
    return store.getters.userInfo.roleList.filter(item => item.roleNickName === roleNickName).length > 0;
  },
  /**
   * treeView 컴포넌트에 맞게 목록형 데이터를 계층형 구조로 변환하여 반환
   * @param keyMap : 키 명칭을 맵핑
   * @param data : 변환할 데이터
   * @returns {Array}
   */
  getMakeTreeData(keyMap, data, useTemplate = false) {
    const treeMap = {};
    const rootNode = [];
    let compiled;

    if (useTemplate) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      compiled = _.template(keyMap.text);
    }

    _.forEach(data, item => {
      let tmpText = '';

      if (useTemplate) {
        const tmpParam = {};
        // const arr = keyMap.text.match(/(?<=\{\{)([\s\S]+?)(?=\}\})/gi);
        const arr = keyMap.text.match(/{{([\s\S]+?)}}/g);
        for (const i in arr) {
          const a = arr[i].replace('{{', '').replace('}}', '');
          // tmpParam[arr[i].trim()] = item[arr[i].trim()];
          tmpParam[a.trim()] = item[a.trim()];
        }
        tmpText = compiled(tmpParam);
      } else {
        tmpText = (item[keyMap.text] || 'text');
      }

      const treeNode = {
        id: item[keyMap.id] || 'id',
        parentId: item[keyMap.parentId] || 'parentId',
        folderYn: item[keyMap.folderYn] || 'folderYn',
        level: item[keyMap.level] || 'level',
        value: item[keyMap.value] || 'value',
        text: tmpText,
        opened: true,
        children: [],
      };

      treeMap[treeNode.id] = _.assign(treeNode, item);
    });

    utils.forEach(treeMap, (value, key) => {
      const treeNode = value;
      if (treeMap[treeNode.parentId]) {
        treeMap[treeNode.parentId].children.push(treeNode);
      } else {
        rootNode.push(treeNode);
      }
    });

    return rootNode;
  },
  /**
   * treeView 컴포넌트에 맞게 목록형 데이터를 계층형 구조로 변환하여 반환
   * @param keyMap : 키 명칭을 맵핑
   * @param data : 변환할 데이터
   * @returns {Array}
   */
   getMakeUrTreeData(keyMap, data, useTemplate = false) {
    const treeMap = {};
    const rootNode = [];
    let compiled;

    if (useTemplate) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      compiled = _.template(keyMap.text);
    }

    _.forEach(data, item => {
      let tmpText = '';

      if (useTemplate) {
        const tmpParam = {};
        const arr = keyMap.text.match(/{{([\s\S]+?)}}/g);
        for (const i in arr) {
          const a = arr[i].replace('{{', '').replace('}}', '');
          tmpParam[a.trim()] = item[a.trim()];
        }
        tmpText = compiled(tmpParam);
      } else {
        tmpText = (item[keyMap.text] || 'text');
      }

      const treeNode = {
        id: item[keyMap.id] || 'id',
        parentId: item[keyMap.parentId] || 'parentId',
        folderYn: item[keyMap.folderYn] || 'folderYn',
        level: item[keyMap.level] || 'level',
        value: item[keyMap.value] || 'value',
        text: tmpText,
        opened: true,
        contents: {},
        treeInfo: {
          name: tmpText,
          depth: item[keyMap.level - 1] || 'depth',
          key: item[keyMap.id] || 'id',
          parentKey: item[keyMap.parentId] || 'parentKey',
          searched: false,
          selected: false,
          checked: false,
          hasChild: false,
          expanded: true,
          inlineEdit: false,
          draggable: false,
        },
        children: [],
      };

      treeMap[treeNode.id] = _.assign(treeNode, item);
    });

    // eslint-disable-next-line no-unused-vars
    utils.forEach(treeMap, (value, _key) => {
      const treeNode = value;
      if (treeMap[treeNode.parentId]) {
        treeMap[treeNode.parentId].children.push(treeNode);
        treeMap[treeNode.parentId].treeInfo.hasChild = true;
      } else {
        rootNode.push(treeNode);
      }
    });

    return rootNode;
  },
  /**
   * 그리드에서 사용하는 date 랜더러
   * @param r, c, v, h, p
   * @param dateOpt
   * @returns
   */
  dateCellRenderer(r, c, v, h, p, dateOpt) {
    return h.replace(v, utils.dateformatToClient(v, dateOpt));
  },
  /**
   * 그리드에서 사용하는 decimal 랜더러
   * @param r, c, v, h, p
   * @returns
   */
  numberCellRenderer(r, c, v, h, p, decimalCount) {
    return h.replace(`>${v}<`, `>${utils.numberFormat(v, decimalCount)}<`);
  },
  /**
   * 부서명을 session.langId와 displayLangId 를 비교하여
   * departmentName 과 departmentEnglishName 중 하나로 표현
   * @param {Object} fieldMap
   * @returns {String}
   */
  bindDeptNameCellRenderer(fieldMap) {

    // 화살표 펑션으로 변경금지( this 사용)
    return function(r, c, v, h, p) {
      let _deptName = '';

      if (this.owner) {
        const _curRow = this.owner.getboundrows()[r];

        const _defaultName = {
          displayLanguageId: 'displayLanguageId',
          departmentName: 'departmentName',
          departmentEnglishName: 'departmentEnglishName',
        };

        if (fieldMap && !utils.isEmpty(fieldMap)) {
          for (const prop in fieldMap) {
            if (_defaultName.hasOwnProperty(prop)) {
              _defaultName[prop] = fieldMap[prop];
            } else {
              console.log(`fieldMap 정보(${prop}:${fieldMap[prop]})가 정확하지 않습니다.`);
              return false;
            }
          }
        }

        if (store.getters.userInfo.langId == _curRow[_defaultName.displayLanguageId]) {
          _deptName = utils.trim(_curRow[_defaultName.departmentName]);
        } else {
          _deptName = utils.trim(_curRow[_defaultName.departmentEnglishName]);
        }
      }
      return h.replace(`>${v}<`, `>${_deptName}<`);
    };
  },

  print() {

  },

  convertTreedataToFlatdata(data, key, parentKey) {
    // make map
    const treeMap = {};
    const roots = [];
    const DFSOrder = [];
    _.forEach(data, row => {
      treeMap[row[key]] = row;
      row.children = [];
      row.depth = 0;
    });
    // make tree
    _.forEach(data, row => {
      if (row[parentKey] && treeMap[row[parentKey]]) {
        treeMap[row[parentKey]].children.push(row);
      } else {
        roots.push(row);
      }
    });

    const dfsOrder = (node, order, depth) => {
      order.push(node);
      node.depth = depth;
      node.children.forEach(child => {
        dfsOrder(child, order, depth + 1);
      });
    };

    // make DFS order
    roots.forEach(root => {
      dfsOrder(root, DFSOrder, 0);
    });
    return DFSOrder;
  },

};
