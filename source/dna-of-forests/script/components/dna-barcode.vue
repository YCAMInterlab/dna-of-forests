<template lang="pug">

canvas

</template>

<script>

import Vue from 'vue';

export default Vue.extend({

  props: ['dna'],

  mounted: function() {
    this.renderBarcode()
  },

  watch: {
    dna: function (newVal) {
      this.renderBarcode()
    }
  },

  methods: {
    renderBarcode(){
      var x = 0,
          y = 0,
          w = 2,
          h = 10,
          margin = 10,
          canvas = this.$el;

      var total_w = w*this.dna.length;

      // if(this.orikaeshi){
      //   var lines = (total_w / this.orikaeshi) + (total_w % this.orikaeshi)*1;
      //   canvas.height = h*lines + margin*(lines-1);
      //   canvas.width = this.orikaeshi;
      // }
      // else{
        canvas.height = h;
        canvas.width = total_w;
      // }

      if (canvas.getContext) {

        var context = canvas.getContext('2d');

        var colors = {
          'A': "rgb(255,  51, 165)", // R: #ff33a5
          'T': "rgb( 51, 255, 109)", // G: #33ff6d
          'G': "rgb( 51, 126, 255)", // B: #337eff
          'C': "rgb(245, 255, 138)", // Y: #f5ff8a
        }

        for(var i = 0; i < this.dna.length; i++){
          var c = this.dna[i];
          if(colors[c]!==null){
            context.fillStyle = colors[c];
          }
          else{
            context.fillStyle = "rgb(0, 0, 0)";
          }
          x = (w*i);
          context.fillRect(x,y,w,h);
        }
      }
    }
  }
});

</script>