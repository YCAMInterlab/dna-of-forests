<template lang="pug">
  section#list
    h1 採取したサンプル
    table
      thead
        tr
          th No.
          th 属名
          th 属名（英）
          th DNA配列
          th 同定に用いたDNA領域
          th 採取日
      tbody
        tr(v-for="(item, index) in items")
          td {{ index | zero-pad }}
          td {{ item.genus_ja }}
          td {{ item.genus_en }}
          td {{ item.dna }}
          td {{ item.region }}
          td {{ item.date }}
    ul#example-1
      li(v-for="item in items") {{ item.message }}
</template>

<script>
import Vue from 'vue'


export default Vue.extend({
  filters: {
    'zero-pad': function (value) {
      return (value<10) ? '0'+value : ''+value;
    }
  },
  data () {
    return {
      items: [
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'ATGCATGCATGCATGCATGC',
          region: 'ITS',
          date: '2016.10.09',
        },
      ]
    }
  }
})
</script>
