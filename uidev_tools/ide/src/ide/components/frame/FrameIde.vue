<template>
  <div class="ide-frame">
    <div class="ide-header"/>
    <div class="ide-main">
      <div class="ide-lnb--left"/>
      <div class="ide-main">
        <!-- LE 연계시 SuiPageHeader isShownPageTitle=true 적용을 위해 -page-root-container 클래스 추가 -->
        <div class="ide-contents -page-root-container">
          <router-view />
        </div>
      </div>
      <div class="ide-lnb--right"/>
    </div>    
    <div class="ide-footer"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.ide-frame {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.ide-header {
  height: var.$gnb-height;
}
.ide-main {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
}
.ide-lnb--left {
  width: var.$lnb-left-width;
  height: inherit;
}
.ide-contents {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.ide-lnb--right {
  width: var.$lnb-right-width;
}
.ide-footer {
  height: var.$footer-height;
}
</style>