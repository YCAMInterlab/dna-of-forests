<template lang="pug">

canvas

</template>

<script>

import Vue from 'vue';

export default Vue.extend({

  props: ['dna','width_limit','height'],

  mounted: function() {
    this.renderBarcode()
  },

  watch: {
    dna: function (newVal) {
      this.renderBarcode()
    }
  },

  methods: {
    chunkString(str, length) {
      // 文字数lengthでstrを分割した配列を返す
      return str.match(new RegExp('.{1,' + length + '}', 'g'));
    },

    renderBarcode(){
      var canvas = this.$el;

      if(this.dna.length<=0){
        canvas.height = 0;
        canvas.width = 0;
      }
      else if (canvas.getContext) {

        var w = 2,
            h = this.height || 10,
            line_margin = 15, // 行間
            str_arr = null;

        // TODO: グローバルに定義
        var colors = {
          'A': "rgb(255,  51, 165)", // R: #ff33a5
          'T': "rgb( 51, 255, 109)", // G: #33ff6d
          'G': "rgb( 51, 126, 255)", // B: #337eff
          'C': "rgb(245, 255, 138)", // Y: #f5ff8a
          'N': "rgb(255, 255, 255)", // W: #ffffff
        }

        if(this.width_limit){

          var str_len = Math.floor(this.width_limit / w);
          str_arr = this.chunkString(this.dna, str_len);
          var lines = str_arr.length;
          canvas.height = h*lines + line_margin*(lines-1);
          canvas.width = this.width_limit;
        }
        else{
          str_arr = [this.dna];
          canvas.height = h;
          canvas.width = w*this.dna.length;
        }

        var context = canvas.getContext('2d');

        for(var j = 0; j < str_arr.length; j++){
          var str = str_arr[j];
          var x = 0,
              y = (h+line_margin)*j;
          for(var i = 0; i < str.length; i++){

            var c = str[i];
            if(colors[c]!==null){
              context.fillStyle = colors[c];
            }
            else{
              context.fillStyle = colors['N'];
            }

            x = (w*i);
            context.fillRect(x,y,w,h);
          }
        }
        this.$emit('drawcomplete',canvas);
      }
    }
  }
});

</script>