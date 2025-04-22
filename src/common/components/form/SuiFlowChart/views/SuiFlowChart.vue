<template>
  <div class="container">
    <button id="clickFinalSave" @click="$refs.chart.save()"></button>
    <button @click="handleDataInput">{{ $t("MSG_TXT_REFRESH") }}</button>
    <flowchart
      :nodes="tempnode"
      :connections="tempconnections"
      :removeConn="removeConn"
      :removeLastComponent="removeLastComponent"
      :width="'100%'"
      :height="560"
      :readonly="false"
      :pageId="this.pageId"
      :render="render"
      @editconnection="handleEditConnection"
      @onloadrefresh="handleDataInput"
      @save="handleChartSave"
      @select="handleSelect"
      @reldrop="relconfig"
      @disconnect="deleteRelation"
      @editnode="handleEditNode"
      @setNodeInfoForRelation="getNodeInfoForRelation"
      @deleteRelationOnDeleteNode="deleteRelationOnDeleteNode"
      ref="chart"
    >
    </flowchart>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */

import Flowchart from "../components/flowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "../utils/math";
//import test from "./test.json";

export default {
  name: "App",
  components: {
    Flowchart,
  },
  props: {
    pageId: {
      type: String,
      default: null,
    },
    workflowId: {
      type: String,
      default: null,
    },
    workflowNodeInfo: {
      type: Object,
      default: null,
    },
    callApp: {
      type: Boolean,
      default: true,
    },
    refreshCanvas: {
      type: Boolean,
      default: true,
    },
    relationrefresh: {
      type: Object,
      default: null,
    },
    canvasRefresh: {
      type: Boolean,
      default: true,
    },
    addNewNode: {
      type: Object,
      default: null,
    },
    onRefreshPage: {
      type: Boolean,
      default: false,
    },
    removeLastComponent: {
      type: Boolean,
      default: false,
    },
    setWorkflowNodeRefreshValue: {
      type: Object,
      default: null,
    },
    setWorkflowNodeRefresh: {
      type: Object,
      default: null,
    },
    removeConn: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      updateData: [],
      DataValue: true,
      tempnode: [],
      optionList: {
        nodeOptionList: [{ key: "", label: "" }],
      },
      parentvariable: {},
      childVar: {},
      nodes: [
        { id: 1, x: 50, y: 220, name: "Start", type: "Start" },
        { id: 2, x: 630, y: 220, name: "Shut Down", type: "Shut Down" },
        {
          id: 3,
          x: 540,
          y: 130,
          name: "Custom size",
          type: "operation",
          approvers: [{ id: 1, name: "Joyce" }],
          width: 120,
          height: 40,
        },
        {
          id: 4,
          x: 240,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 2, name: "Allen" }],
        },
        {
          id: 5,
          x: 440,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 3, name: "Teresa" }],
        },
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 4, position: "left" },
          id: 1,
          type: "pass",
        },
        {
          source: { id: 4, position: "right" },
          destination: { id: 5, position: "left" },
          id: 2,
          type: "pass",
        },
        {
          source: { id: 5, position: "right" },
          destination: { id: 2, position: "left" },
          id: 3,
          type: "pass",
        },
        {
          source: { id: 5, position: "bottom" },
          destination: { id: 4, position: "bottom" },
          id: 4,
          type: "reject",
        },
        {
          source: { id: 1, position: "top" },
          destination: { id: 3, position: "left" },
          id: 5,
          type: "pass",
        },
        {
          source: { id: 3, position: "right" },
          destination: { id: 2, position: "top" },
          id: 6,
          type: "pass",
        },
      ],
      tempconnections: [],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeData: [],
      connData: [],
      setNodeRelationInfo: [],
    };
  },
  async mounted() {
    this.nodeData = [];
    this.handleDataInput({});
  },
  watch: {
    removeLastComponent: function (value) {},

    refreshCanvas: function () {
      this.handleEditRelationPopup(this.relationrefresh);
    },
    canvasRefresh: function () {
      this.handleEditNodepopup(this.setWorkflowNodeRefreshValue);
    },
    callApp: function () {
      this.handleDataInput({});
    },
  },
  methods: {
    getNodeInfoForRelation(val) {
      this.$emit("setNodeInfoForRelation", val);
    },
    saveData() {
      if (this.readonly) {
        return;
      }
      document.getElementById("clickFinalSave").click();
    },

    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New Node",
        type: "Node Configuration",
        approvers: [],
      });
    },
    handleSelect(nodes) {},
    handleDataInput(updatedNodes) {
      this.parentvariable = updatedNodes;
      this.childVar = this.setWorkflowNodeRefresh;
      const workflowId = this.$store.state.workflowId;
      http
        .request(this.pageId, "DTS_RWR_00029", {
          path: {
            "workflow-id": workflowId,
          },
        })
        .then((res) => {
          const data = utils.clone(res.data);
          this.optionList.nodeOptionList = [];
          const options = [];
          data.forEach((obj, index) => {
            const option = {
              key: obj.workflowNodeUid,
              label: obj.nodeName,
              nodeId: obj.nodeId,
              pageId: obj.pageId,
              dataServiceId: obj.dataServiceId,
              moduleCode: obj.moduleCode,
              subModuleCode: obj.subModuleCode,
            };
            options.push(option);
          });
          if (utils.size(options) < 1) {
            options.push({ key: " ", label: "" });
          }
          this.optionList.nodeOptionList = options;
          this.tempnode = [];
          this.nodeData = data;
          this.nodeData.map((item) => {
            let obj = this.tempnode.push({
              id: item.workflowNodeUid,
              nodeId: item.nodeId,
              nodeName: item.nodeName,
              nodeTypeCode: item.nodeTypeCode,
              nodeTypeName: item.nodeTypeName,
              dataServiceId: item.dataServiceId,
              nodeOrder: `${item.nodeOrder}`,
              pageId: item.pageId,
              moduleName: item.moduleName,
              subModuleName: item.subModuleName,
              name: item.nodeId,
              type: item.nodeTypeName,
              approvers: [{ id: 1, name: item.nodeName }],
              x: Number(item.nodeXvalue),
              y: Number(item.nodeYvalue),
              workflowNodeParamList: item.workflowNodeParamList,
              deleteWorkflowNodeList: item.deleteWorkflowNodeList,
              deleteYn: item.deleteYn ? item.deleteYn : "N",
              finalModificationDTM: item.finalModificationDTM,
              finalModificationProgramId: item.finalModificationProgramId,
              finalModificationUserId: item.finalModificationUserId,
              firstRegistrationDTM: item.firstRegistrationDTM,
              firstRegistrationProgramId: item.firstRegistrationProgramId,
              firstRegistrationUserId: item.firstRegistrationUserId,
              insertWorkflowNodeList: item.insertWorkflowNodeList,
              moduleCode: item.moduleCode,
              node: item.node,
              nodeXvalue: item.nodeXvalue,
              nodeYvalue: item.nodeYvalue,
              originalFinalModificationDTM: item.originalFinalModificationDTM,
              processYn: item.processYn,
              subModuleCode: item.subModuleCode,
              updateWorkflowNodeList: item.updateWorkflowNodeList,
              workflowId: item.workflowId,
              workflowNodeRelationList: item.workflowNodeRelationList,
              workflowNodeUid: item.workflowNodeUid,
            });
          });
          this.connectionApi();
        });
    },
    connectionApi() {
      const workflowId = this.$store.state.workflowId;
      http
        .request(this.pageId, "DTS_RWR_00055", {
          path: {
            "workflow-id": workflowId,
          },
        })
        .then((res) => {
          const data = utils.clone(res.data);
          data.forEach((itm, index) => {});
          this.tempconnections = [];
          this.connData = data;
          let validConnIdx = 0;
          this.connData.map((item, index) => {
            let workflowNodeIdIndex = this.tempnode
              .map((e) => e.workflowNodeUid)
              .indexOf(item.workflowNodeUid);
            let workflowRelationIdIndex = this.tempnode
              .map((e) => e.workflowNodeUid)
              .indexOf(item.relationworkflowNodeUid);

            if (workflowNodeIdIndex > -1 && workflowRelationIdIndex > -1) {
              let conn = this.tempconnections.push({
                id: item.nodeRelationUid,
                name: item.nodeId,
                type: "pass",
                source: {
                  id: item.workflowNodeUid,
                  position: item.relationSourceLocValue,
                  dataServiceId: "",
                },
                destination: {
                  id: item.relationworkflowNodeUid,
                  position: item.relationDestLocValue,
                },
                relationUid: item.nodeRelationUid,
                deleteYn: item.deleteYn,
                firstRegistrationDTM: item.firstRegistrationDTM,
                firstRegistrationUserId: item.firstRegistrationUserId,
                firstRegistrationProgramId: item.firstRegistrationProgramId,
                finalModificationDTM: item.finalModificationDTM,
                finalModificationUserId: item.finalModificationUserId,
                finalModificationProgramId: item.finalModificationProgramId,
                originalFinalModificationDTM: item.originalFinalModificationDTM,
                nodeRelationUid: item.nodeRelationUid,
                workflowNodeUid: item.workflowNodeUid,
                workflowId: item.workflowId,
                nodeId: item.nodeId,
                relationNodeTypeCode: item.relationNodeTypeCode,
                relationNodeId: item.relationNodeId,
                relationRuleUid: item.relationRuleUid,
                pageId: item.pageId,
                dataServiceId: item.dataServiceId,
                nodeName: item.nodeName,
                processYn: item.processYn,
                ruleName: item.ruleName,
                relationNodeTypeName: item.relationNodeTypeName,
                moduleName: item.moduleName,
                subModuleName: item.subModuleName,
                relationSourceLocValue: item.relationSourceLocValue,
                relationDestLocValue: item.relationDestLocValue,
                relationworkflowNodeUid: item.relationworkflowNodeUid,
                workflowNodeRelationParam: item.workflowNodeRelationParam,
                insertWorkflowNodeRelationList:
                  item.insertWorkflowNodeRelationList,
                updateWorkflowNodeRelationList:
                  item.updateWorkflowNodeRelationList,
                deleteWorkflowNodeRelationList:
                  item.deleteWorkflowNodeRelationList,
                saveWorkflowNodeRelationParamList:
                  item.saveWorkflowNodeRelationParamList,
                deleteWorkflowNodeRelationParamList:
                  item.deleteWorkflowNodeRelationParamList,
                workflowNodeRelationParamList:
                  item.workflowNodeRelationParamList,
                relationRule: item.relationRule,
              });

              this.tempnode.map((e) => {
                if (
                  item.workflowNodeUid === e.workflowNodeUid &&
                  typeof e.dataServiceId !== "undefined"
                ) {
                  this.tempconnections[validConnIdx].source["dataServiceId"] =
                    e.dataServiceId;
                }
              });
              validConnIdx++;
            }
          });
        });
    },
    async handleChartSave(nodes, connections) {
      this.saveRelations(connections, "update");
      this.saveNodes(nodes, "update");
    },
    performSave(dataParams, type) {
      http
        .request(this.pageId, "DTS_RWR_00034", {
          data: dataParams,
        })
        .then(() => {
          this.handleDataInput();
        });
    },
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.$emit("nodepopup", "p01");
      this.$emit("setWorkflowNodeData", node, this.DataValue);
    },
    relconfig(connection) {
      this.$emit("relpopup", connection);
    },
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.getCurrentRelationInfo(connection);
      this.$emit("relationPopup", "p02", connection);
      this.$emit("setNodeRelationInfo", this.setNodeRelationInfo);
      this.setNodeRelationInfo = [];
    },
    getCurrentRelationInfo(connection) {
      this.tempconnections.map((rel) => {
        if (rel.nodeRelationUid === connection.relationUid) {
          rel.relationSourceLocValue = connection.source.position;
          rel.relationDestLocValue = connection.destination.position;
          if (connection.deleteYn === "Y") {
            rel.deleteYn = "Y";
            this.setNodeRelationInfo.push(rel);
            utils.messageBox(
              "confirm",
              this.$t("MSG_ALT_DLT_REL"),
              null,
              () => {
                this.saveRelations(this.setNodeRelationInfo, "delete");
              }
            );
          } else {
            this.setNodeRelationInfo.push(rel);
          }
        }
      });
    },
    deleteRelationOnDeleteNode(connection, type) {
      this.saveRelations(connection, type);
    },
    deleteRelation(connection) {
      connection.deleteYn = "Y";
      this.getCurrentRelationInfo(connection);
    },
    handleEditNodepopup(workflowNodeInfo) {
      const workflowId = this.$store.state.workflowId;
      if (workflowNodeInfo.workflowNodeParamList.length == 0) {
        workflowNodeInfo.workflowNodeParamList = [];
      } else {
        workflowNodeInfo.workflowNodeParamList[0].deleteYn = "N";
        workflowNodeInfo.workflowNodeParamList[0].workflowId =
          this.$store.state.workflowId;
      }

      const dataParams = {
        insertWorkflowNodeList: [workflowNodeInfo],
        updateWorkflowNodeList: [],
        deleteWorkflowNodeList: [],
      };

      const workflowNodeUid = workflowNodeInfo.workflowNodeUid;
      let self = this;
      utils.messageBox("confirm", this.$t("MSG_ALT_WANT_SAVE"), null, () => {
        http
          .request(this.pageId, "DTS_RWR_00033", {
            data: dataParams,
            path: {
              "workflow-id": workflowId,
              workflowNodeUid,
            },
          })
          .then(() => {
            this.handleDataInput();
            this.frame0 = {};
            this.dsWorkflowNode.submit();
          });
      });
    },
    handleEditRelationPopup(dataParams) {
      utils.messageBox("confirm", this.$t("MSG_ALT_WANT_SAVE"), null, () => {
        http
          .request(this.pageId, "DTS_RWR_00034", {
            data: dataParams,
          })
          .then(() => {
            this.handleDataInput();
          });
      });
    },
    saveNodes(data, type) {
      this.updateData = data;

      this.updateData.map((item) => {
        item.workflowNodeParamList = [];
        item.nodeXvalue = item.x;
        item.nodeYvalue = item.y;
      });

      const dataParams = {
        updateWorkflowNodeList: [],
        insertWorkflowNodeList: this.updateData,
        deleteWorkflowNodeList: [],
      };
      http
        .request(this.pageId, "DTS_RWR_00033", {
          data: dataParams,
          path: {
            "workflow-id": this.$store.state.workflowId,
          },
        })
        .then(() => {
          this.handleDataInput();
          this.$emit("onloadrefresh", this.updatedNodes);
        });
    },
    saveRelations(data, type) {
      const dataParams = {
        insertWorkflowNodeRelationList: [],
        updateWorkflowNodeRelationList: [],
        deleteWorkflowNodeRelationList: [],
      };
      utils.assign(dataParams, {
        workflowId: this.$store.state.workflowId,
      });
      if (type === "delete") {
        dataParams.deleteWorkflowNodeRelationList = data;
        this.performSave(dataParams, "deleteWorkflowNodeRelationList");
      } else if (type === "update") {
        dataParams.updateWorkflowNodeRelationList = data;
        this.performSave(dataParams, "updateWorkflowNodeRelationList");
      }
    },
    render: function (g, node, isSelected) {
      node.width = node.width || 120;
      node.height = node.height || 60;
      let borderColor = isSelected ? "#666666" : "#000000";
      if (node.type === "Start") {
        let body = g.append("rect").attr("class", "body");
        body.style("width", node.width + "px");
        body.style("fill", "#ebf1de");
        body.style("stroke", borderColor);
        body.style("stroke-width", "1px");
        body.style("height", roundTo20(node.height) + "px");
        body.attr("x", node.x);
        body.attr("y", node.y);
        body.attr("rx", 15);
        body.classed(node.type, true);
      } else {
        let body = g.append("rect").attr("class", "body");
        body
          .style("width", node.width + "px")
          .style("stroke", borderColor)
          .style("stroke-width", "1px");
        if (node.type !== "Start" && node.type !== "Shut Down") {
          body.style("fill", "#c6d9f1");
          body.style("height", roundTo20(node.height) + "px");
          body.attr("x", node.x);
          body.attr("y", node.y);
          body.attr("rx", 0);
          body.classed(node.type, true);
        } else {
          body
            .attr("x", node.x)
            .attr("y", node.y)
            .classed(node.type, true)
            .attr("rx", 15);
          body.style("height", roundTo20(node.height) + "px");
          body.style("fill", "#f2dcdb");
        }
        body.attr("stroke", borderColor);
      }

      // body text
      let text =
        node.type === "Start"
          ? node.approvers[0].name
          : node.type === "Shut Down"
          ? node.approvers[0].name
          : !node.approvers || node.approvers.length === 0
          ? "New Node"
          : node.approvers.length > 1
          ? `${node.approvers[0].name + "..."}`
          : node.approvers[0].name;
      let bodyTextY;
      if (node.type !== "Start" && node.type !== "Shut Down") {
        if (node.id === 3) {
          bodyTextY = node.y + 25;
        } else {
          bodyTextY = node.y + 15 + roundTo20(node.height - 20) / 2;
        }
      } else {
        bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
      }
      g.append("text")
        .attr("x", node.x + node.width / 2)
        .attr("y", bodyTextY - 5)
        .attr("class", "unselectable")
        .attr("text-anchor", "middle")
        .attr("dy", 0)

        .text(function () {
          return text;
        })
        .call(wrap, 120);
      function wrap(text, width) {
        text.each(function () {
          var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
              .text(null)
              .append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", dy + "em");
          while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word);
            }
          }
        });
      }
    },
  },
};
</script>
<style scoped>
#toolbar {
  margin-bottom: 10px;
}

.title {
  margin-top: 10px;
  margin-bottom: 0;
}

.subtitle {
  margin-bottom: 10px;
}

#toolbar > button {
  margin-right: 4px;
}

.container {
  width: 100%;
  margin: auto;
}
</style>
