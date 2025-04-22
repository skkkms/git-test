<script>
export default {
  name: 'SuiPopupMixin',  
  data() {
    return {
      mouseDownPosition: {x: 0, y: 0},
      prevDelta: {x: 0, y: 0},
      deltaPosition: {x: 0, y: 0},
      transLimitBound: {
        left: 0, 
        top: 0, 
        right: 0,
        bottom: 0,
      },
      eventBinded: false,
      translateX: 0,
      translateY: 0,
    };
  },
  computed: {    
    transformStyle() {
      return `translate(${this.translateX}px, ${this.translateY}px)`;
    },
  },  
  methods: {
    getModalElement() {
      return this.$el;
    },
    getContainerElement() {
      const elem = this.$el.querySelector('.sui-modal__container');
      elem.style.backfaceVisibility = 'hidden';
      return elem;
    },
    onHeaderMouseDown(event) {      
      this.setInitBounds(event);
      this.bindEvents();
    },
    onDocumentMouseMove(event) {
      this.deltaPosition = {
        x: event.clientX - this.mouseDownPosition.x,
        y: event.clientY - this.mouseDownPosition.y,
      }

      let transX = (this.prevDelta.x + this.deltaPosition.x);
      if (transX < this.transLimitBound.left) {
        transX = this.transLimitBound.left;
      } else if (this.transLimitBound.right > 0 && transX > this.transLimitBound.right) {
        transX = this.transLimitBound.right;
      }
      let transY = (this.prevDelta.y + this.deltaPosition.y);
      if (transY < this.transLimitBound.top) {
        transY = this.transLimitBound.top;
      } else if (this.transLimitBound.bottom > 0 && transY > this.transLimitBound.bottom) {
        transY = this.transLimitBound.bottom;
      }
      this.translateX = transX;
      this.translateY = transY;
      
      if (this.getContainerElement()) {        
        this.getContainerElement().style.transform = this.transformStyle;
      }
    },
    onDocumentMouseUp() {
      this.unbindEvents();
    },
    bindEvents() {
      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDocumentMouseUp);
      this.eventBinded = true;
    },
    unbindEvents() {
      if (this.eventBinded) {
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.eventBinded = false;
      }      
    },
    setInitBounds(event) {
      const bounds = this.getContainerElement().getBoundingClientRect();
      const windowBounds = this.getModalElement().getBoundingClientRect();
      this.mouseDownPosition = { x: event.clientX, y: event.clientY };
      this.transLimitBound.left = (-1 * (windowBounds.width - bounds.width) / 2);
      this.transLimitBound.right = (windowBounds.width - bounds.width) / 2;
      this.transLimitBound.top = (-1 * (windowBounds.height - bounds.height) / 2);
      this.transLimitBound.bottom = (windowBounds.height - bounds.height) / 2;

      this.prevDelta.x = this.translateX;
      this.prevDelta.y = this.translateY;
      this.deltaPosition.x = 0;
      this.deltaPosition.y = 0;
      this.bounds = bounds;
    },
  },
  beforeDestroy() {    
    this.unbindEvents();
  }
};
</script>